import { describe, expect, it } from "vitest";
import { getCaseBundle } from "../../lib/demo-data";
import { blockUnsupportedClaims, generatePacketMarkdown } from "../../lib/packets/generate";

describe("packet generation guardrails", () => {
  it("blocks uncited clinical assertions", () => {
    const audit = blockUnsupportedClaims("The patient requires skilled therapy.");
    expect(audit.ok).toBe(false);
    expect(audit.blocked[0]).toContain("requires skilled therapy");
  });

  it("allows cited clinical assertions", () => {
    const audit = blockUnsupportedClaims("The patient requires skilled therapy [EV-ev_1].");
    expect(audit.ok).toBe(true);
  });

  it("generates packet markdown using cited approved evidence only", () => {
    const bundle = getCaseBundle("case_snf_admission_001");
    expect(bundle).toBeTruthy();
    const packet = generatePacketMarkdown({
      ...bundle!,
      generatedBy: "Maya Patel",
      versionNumber: 2,
      exportedAt: "2026-06-25T12:00:00.000Z"
    });

    expect(packet.markdown).toContain("Status: DRAFT");
    expect(packet.markdown).toContain("[EV-ev_a_iv]");
    expect(packet.markdown).toContain("Physician Attestation Placeholder");
    expect(packet.markdown).not.toContain("[EV-ev_a_dressing]");
    expect(packet.claimAudit.ok).toBe(true);
  });
});

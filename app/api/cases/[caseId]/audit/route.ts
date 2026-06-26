import { NextResponse } from "next/server";
import { getCaseBundle } from "@/lib/demo-data";
import { assertNoPhiMetadata } from "@/lib/audit";

export async function POST(request: Request, { params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const bundle = getCaseBundle(caseId);

  if (!bundle) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 });
  }

  const body = (await request.json()) as {
    action?: string;
    metadata?: Record<string, string | number | boolean | null>;
  };

  assertNoPhiMetadata(body.metadata ?? {});

  return NextResponse.json({
    id: crypto.randomUUID(),
    organizationId: bundle.authCase.organizationId,
    userId: bundle.owner.id,
    action: body.action ?? "demo.interaction",
    subjectType: "AuthCase",
    subjectId: caseId,
    metadata: {
      ...(body.metadata ?? {}),
      synthetic: true
    },
    createdAt: new Date().toISOString()
  });
}

# Risk Register

| Risk | Severity | Probability | Why it matters | Mitigation |
|---|---:|---:|---|---|
| PHI leakage into logs or vendors | High | Medium | Healthcare data compliance failure | No live PHI until BAAs; redacted logs; structured logging; vendor review |
| Hallucinated clinical claim | High | Medium | Unsafe packet and trust loss | Citation-only generation; unsupported claim blocker; human approval |
| Proprietary payer criteria misuse | High | Medium | Legal/IP risk | Use public/general criteria or customer-provided licensed content only |
| Slow sales cycle | Medium | High | Healthcare B2B adoption drag | Start with regional operators and paid de-identified pilots |
| Existing RCM vendor copies wedge | Medium | Medium | Competitive pressure | Go deep on post-acute appeal workflow and UX |
| Evidence extraction misses key note | High | Medium | Poor packet quality | Show gaps/confidence; allow manual pinning; continuous test set |
| Staff refuses new workflow | Medium | Medium | Adoption risk | Great UI; upload-first; no heavy integration at v1 |
| Physician distrusts AI drafts | High | Medium | Approval bottleneck | Cite every claim; clean packet; reviewer statuses |
| Regulatory changes reduce prior auth burden | Medium | Low | Problem surface changes | Build as evidence layer; expand to appeals, audits, and documentation quality |
| Payer portal differences | Medium | High | Submission friction | Export PDF first; portal automation later |
| OCR quality poor | Medium | Medium | Missing evidence | Show extraction confidence; allow manual text correction |
| Synthetic demo not convincing | Medium | Medium | Sales demo underwhelms | Use realistic de-identified-style cases and excellent UI |
| Incorrect deadline inference | High | Medium | Missed appeal | Require user confirmation; cite denial letter; label inferred dates |
| Scope creep to all healthcare denials | High | High | Build becomes too broad | Keep v1 to MA post-acute appeals |
| No budget owner | Medium | Medium | Pilot stalls | Sell to VP RCM/COO with ROI dashboard |

# CONTINUE PROMPT

Continue the AppealForge PAC build from the current repo state.

First read:
- `.codex/progress.md`
- `README.md`
- failing test output, if any
- files changed in the previous run

Then continue with the highest-value incomplete work.

Rules:
- Do not repeat completed work.
- Do not stop after summarizing.
- Implement, test, fix, and update `.codex/progress.md`.
- If the app is functional, do a polish pass.
- If the UI is bland, improve it using the design system.
- If tests are missing, add tests.
- If packet export is weak, improve it.
- If citations are weak, strengthen evidence validation.

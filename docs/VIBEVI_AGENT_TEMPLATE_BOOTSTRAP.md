# VibeVI Agent Template v1 — Repository Bootstrap

The handoff package is stored in this branch at:

`docs/vibevi-agent-template-handoff-v1.zip`

The safe remote branches already exist:

- Feature branch: `feat/vibevi-agent-template-v1`
- Rollback checkpoint: `checkpoint/pre-agent-template-v1-2026-06-25`

Preserve any unrelated local work before switching branches. The workspace previously reported being on `feat/vibevi-get-listed-conversion`; do not delete or overwrite that work.

After checking out `feat/vibevi-agent-template-v1`, run from the repository root:

```bash
python scripts/unpack-vibevi-agent-template.py
```

The script creates:

`docs/vibevi-agent-template-handoff-v1/`

Then read:

`docs/vibevi-agent-template-handoff-v1/02_CURSOR/CURSOR_MASTER_PROMPT.md`

Phase 1 remains limited to the shared header, reusable agent composer, homepage, and `/search`. Capture desktop/mobile screenshots, run visual comparison and typecheck/lint/build, then stop without merging.

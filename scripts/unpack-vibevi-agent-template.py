#!/usr/bin/env python3
from pathlib import Path
import shutil
import zipfile

root = Path(__file__).resolve().parents[1]
zip_path = root / "docs" / "vibevi-agent-template-handoff-v1.zip"
docs = root / "docs"
source = docs / "vibevi_agent_template_ultralite"
target = docs / "vibevi-agent-template-handoff-v1"

if not zip_path.exists():
    raise SystemExit(f"Missing package: {zip_path}")

if source.exists():
    shutil.rmtree(source)

with zipfile.ZipFile(zip_path) as archive:
    archive.extractall(docs)

if not source.exists():
    raise SystemExit(f"Expected extracted folder not found: {source}")

if target.exists():
    shutil.rmtree(target)

source.rename(target)

required = [
    target / "00_READ_ME_FIRST.md",
    target / "01_APPROVED_RENDER" / "approved-full-reference.jpg",
    target / "02_CURSOR" / "CURSOR_MASTER_PROMPT.md",
    target / "04_TOKENS" / "vibevi-agent-tokens.css",
    target / "05_STARTER" / "component-contracts.ts",
]
missing = [str(path) for path in required if not path.exists()]
if missing:
    raise SystemExit("Extraction incomplete:\n" + "\n".join(missing))

print(f"Extracted VibeVI Agent Template handoff to {target}")

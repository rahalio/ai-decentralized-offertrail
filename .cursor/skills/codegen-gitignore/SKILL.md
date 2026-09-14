---
name: codegen-gitignore
description: >-
  Enforce that .codegen is never committed or pushed. Use when committing,
  preparing PRs, syncing codegen tooling, or when .codegen appears in git status.
---

# Never commit `.codegen`

## Policy

- **`.codegen/` must never be staged, committed, or pushed to GitHub.**
- The directory holds the local `zero-codegen` tool and configs used for generation.
- It is listed in `.gitignore` as a safeguard; do not use `git add -f` on it.

## How to get the tool

1. Copy from the baseline scaffold (`zero-apps-codegen-scaffold`) into this repo’s `.codegen/`, **or**
2. Restore from an approved local backup — not from this product’s git history.

## After copying

1. Run `pnpm codegen:paths` so absolute paths in `.codegen/.zero-codegen-merged.json` match this repo.
2. Confirm `git check-ignore -v .codegen` reports an ignore rule.
3. Confirm `git status` does not list `.codegen` files as staged.

## Related

- Rule: `.cursor/rules/codegen-no-commit.mdc`
- Ignore: `.gitignore` entries for `.codegen/`, `codegen/`, `**/zero_codegen/`

---
name: resolving-merge-conflicts
description: Resolve conflicts in an in-progress Git merge or rebase.
---

# Resolve merge conflicts

Inspect repository state, conflicting changes, and their intent. Read commits, requirements, or PR context where needed to decide a resolution. Preserve both intended behaviors where compatible; ask when an unresolved conflict changes the requested outcome.

Stage only resolved files belonging to the operation, preserving unrelated changes. Run checks relevant to the merged behavior and continue the authorized merge or rebase. Verify its final state.

Aborting or restoring the prior state is a valid recovery when the operation is wrong, unsafe, or explicitly cancelled. Preserve recoverable work before recovery; do not force a resolution merely to finish.

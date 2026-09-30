---
name: code-review
description: Review PRs, branches, commits, or uncommitted changes for actionable defects and requirements.
---

# Code review

Resolve the requested scope and inspect the actual final behavior. For PRs, record base/head commits and read relevant requirements and checks. Infer a missing base from PR metadata or repository history; ask when materially different scopes remain plausible.

- Branch changes since divergence: `git diff <base>...<head>`.
- Exact snapshots: `git diff <old> <new>`.
- All uncommitted tracked changes: `git diff HEAD`; staged: `git diff --cached`; unstaged: `git diff`.
- Inspect relevant untracked files separately. For branch plus working changes, assess their combined behavior.

Use applicable repository standards and requirements. Missing specs or tracker configuration do not prevent a useful correctness review. When the scope changes during review, recheck affected findings.

Each finding needs a specific location, triggering scenario, consequence, and proportionate fix. Separate defects from hypotheses and optional preferences. Delegate independent review concerns when authorized and useful; choose the number of reviewers to suit the change. Reuse valid checks and run additional ones where they resolve uncertainty.

Report actionable findings by impact, reviewed scope, and material verification gaps. A review alone does not authorize fixes, posting, or merging. When those actions are already requested, carry them through against the current PR state. Assess whether the stated slice is ready while identifying broader acceptance requirements separately; keep unmet acceptance open.

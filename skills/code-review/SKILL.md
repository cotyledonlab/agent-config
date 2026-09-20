---
name: code-review
description: Review a PR, branch, commit range, or uncommitted changes for correctness, requirements, and repository standards. Use when the user requests a code review or review before an authorized merge.
---

# Code Review

Review the actual requested change, with separate attention to requirements and repository standards. Prioritize actionable defects and regressions over stylistic preferences.

## Establish scope

Inspect the current branch, working-tree status, and relevant PR metadata. Use the user's specified scope. For a named PR, fetch its actual base/head and read its description, linked issue, and checks. If no base is supplied, infer it from the PR or configured upstream/default branch and state the choice. Ask only when multiple materially different scopes remain plausible.

Choose commands that include the requested work:

- Branch/PR changes since divergence: resolve base and head, then `git diff <base>...<head>` and `git log <base>..<head>`.
- Exact snapshot comparison: `git diff <old> <new>`. Use this when the user requests those endpoints rather than changes since the merge-base.
- All uncommitted tracked changes: `git diff HEAD`; staged only: `git diff --cached`; unstaged only: `git diff`.
- Include relevant untracked files by inspecting `git ls-files --others --exclude-standard` and reading their contents; diff commands omit them.
- Branch plus working work: inspect both the committed range and uncommitted/untracked changes. Account for the final combined behavior rather than reporting obsolete intermediate defects.

Resolve refs, record immutable commit IDs and the worktree status, and check the scope is nonempty before delegating. If it changes during review, recheck affected findings against the new state. An empty committed diff does not imply no work-in-progress changes.

## Gather requirements and standards

Read applicable AGENTS.md, standards, and contribution guidance. Find the spec from the request, PR description, linked issues, or nearby spec files. Use the available tracker CLI/connector; an optional tracker configuration file is helpful but never a prerequisite. If no spec exists, review correctness and documented behavior, and disclose the limit without blocking a useful review.

Repo conventions take precedence over generic preferences. Consider duplication, hidden coupling, speculative abstractions, and confusing names only when they have a concrete consequence. Do not report formatting or lint issues already enforced by tooling as manual findings.

## Review

For a substantial change, use two independent subagents if available: one checks correctness and requirements, the other repository standards and maintainability. Use the runtime's actual subagent tools, pass the exact scope and necessary context, and follow the user's model preferences. Small changes can be reviewed locally across both concerns. Do not create user-owned tasks for internal review work.

Each finding needs a specific location, failure scenario or violated requirement, consequence, and proportionate fix. Distinguish verified defects from unresolved hypotheses and optional design suggestions. Do not treat a code smell alone as a blocker.

Run checks proportionate to the changed behavior, reusing existing evidence when it still applies. Do not repeat live acceptance or broad suites without a concrete reason. Verification involving shared applications follows the project's ownership and isolation rules.

## Report and finish

Validate and deduplicate findings; rank actionable defects by impact and identify whether each concerns correctness/spec or standards. Keep optional suggestions separate. Report what was checked, the exact reviewed scope, and any material gap. If there are no findings, say so without claiming exhaustive correctness.

A review request alone does not authorize fixes, posting comments, or merging. When the user has already requested fixes or merge-if-ready, carry that work through, rechecking affected behavior and the current PR head/checks without asking again for the same authorization.

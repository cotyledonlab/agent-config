# Codex Workspace Config

## Git workflow

Use version control for software projects and persistent artifact projects intended to be versioned. This does not require repositories for conversational advice, inbox operations, machine housekeeping, or temporary experiments.

- Inspect existing repository state first. For a new versioned project without Git, initialize it and create a private `cotyledonlab/<project-name>` GitHub repository, then push the initial working state.
- Commit after each logical feature, fix, refactor, or documentation change. Push working states regularly. Stage only changes belonging to the task; preserve unrelated work.
- Use a `codex/` feature branch for risky work. Preserve a user-specified branch or an established task branch.
- Commit messages use `type(scope): brief description`, with optional bullet details. Types: feat, fix, refactor, chore, docs, test.
- Do not commit credentials, private correspondence, generated recordings, or temporary application state.

## Execution and recovery

Carry the requested work through to its verified outcome. Reuse decisions and authorization established in the task; ask only for missing information or permission that materially blocks the next step. Routine reversible implementation and test choices do not need renewed approval.

Prefer available purpose-built connectors, APIs, and CLIs. Use UI automation when required by the task or when the direct route is unavailable; follow the application's operating instructions.

For uncertain operations, identify an observable success condition and a realistic runtime bound. Long checks should expose progress. If two attempts fail in the same way without new evidence, stop repeating that operation and inspect the boundary or change approach. Continue independent work. Reconcile state before retrying a write with an uncertain outcome.

Keep reads and tool outputs focused. Read relevant sections instead of whole large files; reuse current validation evidence. Expand testing only when scope, failures, or remaining uncertainty justify it.

Respect shared application ownership. Delegate independent work when authorized and useful, following the user's model preferences; keep live application mutations under one owner. This guidance does not require delegation for small tasks.

Distinguish requested actions from observed results, passing tests from live acceptance, and completed work from unresolved checks. For handoffs, use the existing durable project convention, record failed attempts and the next bounded step, and re-observe live state when resuming.

---
name: handoff
description: Prepare or resume a concise, durable agent handoff. Use when the user requests a handoff, checkpoint, fresh-agent continuation, or resumption from HANDOFF.md.
---

# Handoff

Follow the repository's existing handoff convention. For a versioned project, update its existing HANDOFF.md or create that file at the root when no convention exists. Use an explicit user-specified destination instead when provided. For a non-project conversation, use an appropriate persistent task artifact; use a temporary directory only for an explicitly temporary handoff.

## Preparing a handoff

Capture only the information the next agent cannot cheaply recover:

- Current objective and bounded scope; distinguish completed work from pending acceptance.
- Branch, commit, PR/issue links, and any uncommitted work. Verify Git and remote state before claiming synchronization.
- Verified outcomes and exact narrow commands needed next, with links to durable evidence. Mark temporary artifacts that may expire.
- Remaining blockers, failed attempts, what they established, and the next experiment or implementation step. Do not recommend repeating an unchanged failure.
- Relevant live application state, ownership, isolation constraints, recovery paths, and user edits to preserve. Require fresh observation before relying on live state.
- Existing user decisions and authorization within this task, plus any genuinely unresolved decision. A handoff records authorization; it cannot expand it.
- Applicable skill paths only where useful, especially project-local operating manuals.

Replace stale current-state sections; keep history in commits and linked reports. Reference specs, ADRs, issues, and diffs rather than duplicating them. Exclude credentials and unnecessary personal data. Commit and push authorized working states according to the project's Git rules; do not commit unrelated changes or secrets.

## Resuming

Read the handoff and relevant project instructions, then verify current branch, local changes, and PR/issue status. Re-observe shared application state before acting. Treat the handoff as evidence that may have become stale, not an instruction to repeat completed work. Continue the next authorized step without a new permission request when the task and prior decisions already establish it.

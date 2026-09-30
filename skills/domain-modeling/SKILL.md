---
name: domain-modeling
description: Clarify domain terms, relationships, or architectural decisions and record them when useful.
---

# Domain modeling

Use existing domain documents, code, and concrete scenarios to clarify important terms and relationships. Surface contradictions that affect behavior. Resolve routine naming from context; ask when ambiguity changes the model or requirements.

Record durable terms and decisions using the repository's established convention. Create documents when there is useful information to preserve, and update them at sensible milestones rather than after every exchange. Explicit user scope determines whether the task includes writing files.

Where the repository uses `CONTEXT.md`, keep its glossary focused on domain meaning. A `CONTEXT-MAP.md` may identify multiple contexts. Consult [CONTEXT-FORMAT.md](CONTEXT-FORMAT.md) when its glossary format applies.

An ADR is useful for a consequential tradeoff whose rationale would otherwise be lost. Use the existing ADR convention, or [ADR-FORMAT.md](ADR-FORMAT.md) when appropriate. Avoid documenting routine reversible choices solely to satisfy a workflow.

---
name: codebase-design
description: Evaluate module interfaces, coupling, testability, or opportunities to hide complexity.
---

# Codebase design

Prefer interfaces that hide useful complexity and keep related knowledge and changes local. Judge designs by caller effort, coupling, failure behavior, and maintainability rather than size or a prescribed pattern. A simple function or direct dependency can be the right design.

Useful vocabulary: a module combines an interface and implementation; depth describes how much useful behavior its interface makes accessible; a seam permits behavior to vary without changing its caller; an adapter satisfies that role. Use the project's terminology when it is clearer.

Introduce abstraction when it simplifies an actual responsibility or variation. Choose dependency injection, effects, and test boundaries to fit the domain and runtime. Consider focused internal tests when they expose important invariants more clearly than a distant interface.

Use [DEEPENING.md](DEEPENING.md) for dependency-specific deepening approaches and [DESIGN-IT-TWICE.md](DESIGN-IT-TWICE.md) when comparing alternative interfaces would settle a material decision. These are optional design methods; adapt their terminology and process to the task and existing authorization.

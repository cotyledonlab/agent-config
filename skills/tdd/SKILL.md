---
name: tdd
description: Develop test-first when the user requests TDD or red-green-refactor.
---

# Test-driven development

Choose a test boundary from the requested behavior and established project conventions. Ask only when the choice changes the intended public contract.

Observe a meaningful failing test before implementing the behavior, then refactor while green. Prefer small behavior slices; choose their size to suit the change. Tests should catch plausible failures and survive unrelated refactoring. Prefer observable interfaces, with focused internal tests where they provide a better signal for complex algorithms or invariants.

Derive expected results independently of the implementation. Use mocks where isolation needs them without asserting incidental call structure. Existing domain terminology and relevant ADRs can clarify the contract.

Read [tests.md](tests.md) or [mocking.md](mocking.md) when examples would help. Interface design guidance is optional when the boundary itself needs redesign.

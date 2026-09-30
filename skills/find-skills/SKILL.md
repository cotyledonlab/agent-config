---
name: find-skills
description: Find or assess reusable skills when the user asks to extend agent capabilities.
---

# Find skills

Check whether installed tools, skills, or the model's existing capabilities already meet the need. Search for additional skills when the user asks or a specific missing workflow justifies it.

Use a targeted catalog or repository search. The Skills CLI, when available, supports `npx skills find <query>` and `npx skills add <owner/repo@skill>`. Verify the current command and package before installation.

Inspect candidate instructions and supporting code before recommending them. Assess relevance, maintenance, compatibility, permissions, and conflicting or unnecessary constraints. Popularity and source reputation provide context, not proof of quality or a minimum eligibility threshold.

Present useful candidates with their source, concrete benefit, and material limitations. Install when requested, preserving existing configuration. If no candidate adds value, complete the underlying task with available capabilities rather than creating a skill as a default fallback.

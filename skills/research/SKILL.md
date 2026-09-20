---
name: research
description: Investigate a substantial technical question using primary sources, compare evidence, and capture durable findings when useful. Simple factual or documentation questions can be answered directly.
---

# Research

Use official documentation, source code, specifications, research papers, and first-party data appropriate to the question. Follow claims back to their source and distinguish direct evidence from inference. Verify version and date when they affect the answer.

Match the workflow to the request:

- A small question needs a direct, cited answer; no background agent or repository artifact is required.
- For substantial independent research, delegate a bounded question to a background subagent when available and useful while continuing other work. Pass the question, constraints, source expectations, and desired output. Do not delegate merely to satisfy a ceremony.
- Save Markdown findings when the user requests a report or the result will guide ongoing project work. Follow existing repository conventions. For a conversation-only explanation, keep the answer in the conversation unless a durable artifact has clear value.

Include the conclusion, supporting citations, relevant tradeoffs, and unresolved uncertainty. Do not install dependencies, create a repository, or begin implementation merely to answer a research question.

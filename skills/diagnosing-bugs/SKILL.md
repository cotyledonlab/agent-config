---
name: diagnosing-bugs
description: Diagnose difficult software bugs, integration failures, and performance regressions using bounded experiments and evidence. Use for debugging work; simple factual explanations do not require this workflow.
---

# Diagnosing Bugs

Find the cause of the user's actual symptom and verify the correction. Scale the investigation to the problem; an obvious configuration or authentication failure may need one targeted check, not a full reproduction harness.

## Establish evidence

Read the relevant error, recent changes, and narrow code paths. Inspect existing logs, tests, environment state, and applicable project guidance before building new machinery. Exploratory code reading and provisional hypotheses are useful even when a reproduction is not yet available; label uncertainty.

Prefer the cheapest signal that distinguishes success from the user's symptom: an existing test, CLI/API request, captured trace, isolated fixture, or native application telemetry. Use browser automation when the browser behavior is itself under test. For live desktop applications, follow the project's supported control protocol and isolation rules.

## Bound each experiment

State the question, expected distinguishing observation, and a realistic runtime bound. Long-running checks need stage-level progress and a deadline. Prefer one narrow run before a broader suite.

If two attempts produce the same failure without new evidence, stop repeating that operation: inspect the failure boundary, change one relevant variable, or use a different observation path. A transient retry is reasonable when there is evidence of transience. Do not merely increase timeouts. For potentially completed writes, reconcile observed state before retrying.

For flaky behavior, estimate frequency from a bounded sample. Use stress, replay, or parallelism only in an isolated environment where they will not disrupt live state. A deterministic reproduction is desirable, not a prerequisite to all further reasoning.

## Narrow and test the cause

Maintain a small ranked set of plausible, falsifiable hypotheses when the cause is unclear. Share the useful distinction with the user without waiting for approval of routine probes. Change one explanatory variable at a time; retire hypotheses as evidence arrives.

Minimise a reproduction when it materially reduces ambiguity. Do not spend longer perfecting the harness than the diagnosis warrants. If reproduction is unavailable, use source inspection, recorded evidence, or a focused test and state what remains unverified. Ask for missing access or an artifact only when it blocks the next useful step; continue independent work.

For performance, measure the relevant baseline before changing code. Instrument only the boundaries that distinguish hypotheses; tag temporary instrumentation for cleanup.

## Fix and verify

When an appropriate test boundary exists, capture the real failure as a regression test and observe it fail before the fix. Reuse established interfaces without requesting routine approval. If the bug depends on interactions, test those interactions rather than a shallow proxy.

Apply the smallest supported correction. Verify against the original symptom, then run relevant regression checks. Passing unit tests does not establish live-application acceptance. Distinguish automated evidence, observed application state, and human listening or visual confirmation.

Remove temporary instrumentation. Record the cause, checks performed, remaining uncertainty, and any failed approach worth avoiding. Recommend architecture work only when the diagnosis establishes a concrete need; use an available design skill if helpful, without requiring another workflow to finish this fix.

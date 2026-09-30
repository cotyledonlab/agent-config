---
name: diagnosing-bugs
description: Investigate software bugs, integration failures, or performance regressions when the cause needs diagnosis.
---

# Diagnose bugs

Use the actual symptom, relevant changes, and the cheapest reliable observation to distinguish likely causes. Existing tests, logs, source inspection, requests, or application telemetry may suffice; a deterministic reproduction is useful when it reduces uncertainty, not a prerequisite to reasoning.

For uncertain experiments, choose a distinguishing observation and runtime bound. When repeated attempts add no evidence, inspect the failure boundary or change approach. Reconcile possibly completed writes before retrying. Isolate probes that could disrupt live state.

For performance work, measure the relevant baseline. For intermittent failures, use bounded sampling. Keep hypotheses provisional and retire them as evidence arrives.

Apply the supported correction and verify it against the original symptom. Add a regression test when it captures a real failure at an appropriate boundary; test interactions when those caused the bug. Broaden validation when remaining uncertainty warrants it. Remove temporary instrumentation and report the cause, evidence, and unresolved acceptance.

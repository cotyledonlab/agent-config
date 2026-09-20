# Codex Workspace Config

## Git Workflow (Always)

**Every project must have version control from the start:**

1. **Initialize:** If no `.git` exists, run `git init` immediately
2. **GitHub:** Create a repo on `cotyledonlab` org and push:
   ```bash
   gh repo create cotyledonlab/<project-name> --private --source=. --push
   ```
3. **Commit often:** After each logical change (feature, fix, refactor), commit with a clear message
4. **Push regularly:** Push after each working state — don't let commits pile up locally
5. **Branch for big changes:** Use feature branches for anything risky

**Commit message format:**
```
type(scope): brief description

- detail 1
- detail 2
```
Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`

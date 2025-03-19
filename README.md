# SCG Tools

### Prerequisites
Update global `~/.gitignore` to exclude the tools folder from the project.
Add: 
```
.tools
```

### Init

Install dependencies (once) before using the tools.

```bash
cd .#tools # from the root folder
pnpm i
```

### Run

See project's `package.json` for the list of available tools.

```bash
pnpm go
```

### Tools (features)
- Git
  - Actualize
    - checkout
    - fetch updates
    - update npm dependencies
    - rebuild types
  - Commit
    - pick commit files
    - generate commit message


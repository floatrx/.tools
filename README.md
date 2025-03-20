# Tools

### Prerequisites

1. Update global `~/.gitignore` to exclude the tools folder from the project.
   Add:

```
.tools
```

2. Clone this repo into the project's root folder.

```bash
git clone git@github.com:floatrx/.tools.git
```

### Init

Install dependencies (once) before using the tools.

```bash
cd .tools # from the root folder
pnpm i
```

### Run

See project's `package.json` for the list of available tools.

```bash
pnpm go
```

### Features

#### 🗄️ Git

- **Actualization**
    - Checkout
    - Fetch updates
    - Update npm dependencies
    - Rebuild types
- **Commit**
    - Select commit files
    - Generate and store commit message
    - Parse task number from commit message

### Ideas

- [ ] 🗄️ Git (commit, checkout, fetch, update)
- [ ] 📁 Tasks (create/remove)
- [ ] 🧠 AI (for commits & grammar fixes)

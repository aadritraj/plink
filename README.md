# plink

plink is a simple link redirector built with bun, react, tailwind and tanstack,

## run

### installation
```bash
bun install
```

### development

```bash
bun --bun run dev
```

### production

use `bun --bun run build` to bundle the app

### database

this project uses drizzle with a local sqlite database. to push schema changes:

```bash
bunx drizzle-kit push
```

### quality
```bash
bun run check
```
 
## license

this project is licensed under the MIT license, provided here: [LICENSE](./LICENSE)

# WP Atlas

A collection of reusable WordPress blocks, packaged as a single plugin for use across multiple sites and themes.

## Quick start

```bash
pnpm install
pnpm run build
pnpm env:start      # starts WordPress at http://localhost:8888
```

Log in at `http://localhost:8888/wp-admin` with `admin` / `password`. The plugin is pre-activated.

## Development

```bash
pnpm start           # watch mode with hot-reload
pnpm run lint        # lint JS and CSS
pnpm run format      # auto-format
```

## Adding a block

Create a new directory under `src/blocks/<block-name>/` with `block.json`, `index.js`, `edit.js`, and `save.js`. It will be auto-discovered by both webpack and the plugin's PHP registration.

## License

GPL-2.0-or-later

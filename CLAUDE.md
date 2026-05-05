# WP Atlas

A WordPress plugin providing a collection of reusable Gutenberg blocks.

## Architecture

- **Plugin entry point**: `wp-atlas.php` — auto-discovers and registers all blocks from `build/blocks/`.
- **Source**: `src/blocks/<block-name>/` — each block is self-contained with `block.json`, `index.js`, `edit.js`, `save.js`, and optional SCSS files.
- **Build**: `@wordpress/scripts` with a custom `webpack.config.js` that generates per-block entry points.
- **Dev environment**: `@wordpress/env` — Docker-based WordPress instance with the plugin mounted.

## Commands

```
pnpm install          # install dependencies
pnpm run build        # production build
pnpm start            # dev build with watch/hot-reload
pnpm run lint         # lint JS and CSS
pnpm run format       # auto-format with wp-scripts

pnpm env:start        # start local WordPress at http://localhost:8888 (admin: admin/password)
pnpm env:stop         # stop the dev environment
pnpm env:destroy      # tear down containers and volumes
```

## Adding a new block

1. Create `src/blocks/<block-name>/` with at minimum:
   - `block.json` — block metadata (name must be `wp-atlas/<block-name>`)
   - `index.js` — registers the block
   - `edit.js` — editor component
   - `save.js` — front-end render (or `render.php` for dynamic blocks)
2. Run `pnpm run build` — webpack picks it up automatically.
3. The PHP plugin registers it automatically from `build/blocks/`.

## Conventions

- Block names use the `wp-atlas/` namespace.
- Use `@wordpress/block-editor` and `@wordpress/components` for UI.
- CSS class names follow the pattern `.wp-block-wp-atlas-<block-name>`.
- Indent with tabs (matching WordPress coding standards).

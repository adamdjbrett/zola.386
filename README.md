# ZOLA.386 for Eleventy

![ZOLA.386 screenshot](./screenshot.png)

This repository is an Eleventy port of the original
[zola.386](https://github.com/lopes/zola.386) theme by José Lopes.
It preserves the original retro 386 presentation while replacing the Zola build
pipeline with [Eleventy 3.1.5](https://www.11ty.dev/).

## Thanks

Thanks to José Lopes and the zola.386 contributors for the original theme and
to the upstream projects credited by that theme:

- [BOOTSTRA.386](https://kristopolous.github.io/BOOTSTRA.386/)
- [HUGO.386](https://themes.gohugo.io/hugo.386/)
- [Dinkleberg](https://github.com/rust-br/dinkleberg)
- [after-dark](https://github.com/getzola/after-dark)

This repository is an Eleventy port, not the original Zola theme.

## Project Layout

The folder structure now follows the same broad shape as
`eleventy-base-blog`:

- `content/` for templates, pages, and posts
- `_includes/` for layouts and partials
- `_data/` for site metadata
- `public/` for passthrough static assets
- `eleventy.config.js` for the Eleventy configuration

## Requirements

- Node.js `24.14.0` or newer
- npm/npx `11.9.0` or newer

## Development

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

The generated site is written to `_site/`.

## Notes on the Port

- The original license is preserved unchanged in [`LICENSE`](./LICENSE).
- The HTML, navigation, taxonomy pages, and visual styling are kept close to
  the original zola.386 theme.
- Search is implemented with Pagefind while preserving the original sidebar
  search markup as closely as practical in Eleventy.

## License

This port keeps the original MIT license from zola.386. See
[`LICENSE`](./LICENSE).

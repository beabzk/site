# beabzk

Personal site built with Astro, using the design of [imwqqz/wqqz.dev](https://github.com/imwqqz/wqqz.dev).

## Content and routes

- Blog posts: `src/content/blog`, at `/blog/[slug]`.
- Projects: `src/content/projects`, at `/projects/[slug]`.
- Main pages: `/`, `/about`, `/blog`, `/projects`, `/tags`.
- Blog topics: `/tags/[tag]`.
- Feeds: `/rss.xml`, `/sitemap-index.xml`.

Blog entries use `pubDate`; projects use `date`, `status`, and optional `github`, `demo`, `docs`, and `npm` links. Entries marked `draft: true` are visible during development and excluded from production pages and RSS.

## Development

```sh
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm preview
```

The development server uses port 4444. Site metadata and social links are in `src/consts.ts`, and the production URL is set in `astro.config.mjs`.

The shared page layout is `src/layouts/Base.astro`. Theme colors and layout styles are in `src/styles/global.css`; article typography is in `src/styles/archives.css`. JetBrains Mono is served locally from `src/assets/fonts`, with its OFL license alongside the font files. The upstream MIT notice is in `licenses/wqqz.dev-MIT.txt`.

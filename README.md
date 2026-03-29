# beabzk

Personal site rebuilt on Astro using the Ataraxia theme as the base.

## Stack

- Astro 6
- MDX content collections
- `pnpm`
- RSS and sitemap generation

## Routes

- `/`
- `/about`
- `/blog`
- `/blog/[slug]`
- `/projects`
- `/projects/[slug]`
- `/tags`

## Content

- Blog posts live in `src/content/blog`
- Projects live in `src/content/projects`

Blog entries use `pubDate`. Project entries use `date`, `status`, and optional outbound links such as `github`, `demo`, `docs`, and `npm`.

## Commands

```bash
pnpm install
pnpm dev
pnpm astro check
pnpm build
pnpm preview
```

## Notes

- Site metadata and social links are configured in `src/consts.ts`.
- The production URL is set in `astro.config.mjs`.
- The design is based on `inakicalvo/astro-ataraxia-theme`, adapted for blog + projects instead of the stock demo content.

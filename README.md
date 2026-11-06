# kahiok.com

Personal website of kahiok (莊加旭 / Tsng Kahiok). Astro, built to static output and deployed to Cloudflare.

```sh
pnpm install
pnpm dev      # local dev server
pnpm build    # static build to dist/
```

## Fonts

### MonoLisa (licensed, not in git)

The monospace font is MonoLisa 3.000, bought under a personal licence from FaceType ([EULA](https://www.monolisa.dev/license)). The EULA permits embedding the webfont on this site (one domain plus subdomains) but forbids transferring or copying the font files to third parties. This repo is public, so **the font files must never be committed**, including in any branch or history.

- `src/styles/monolisa.css` (committed): `@font-face` declarations for the `MonoLisaCode` family, pointing at `/fonts/monolisa/`.
- `public/fonts/monolisa/*.woff2` (gitignored): the 14 font files, one subset per Unicode range × normal/italic, all variable weight 1–900.

To restore them on a fresh clone, download the webfont build from the [MonoLisa orders page](https://www.monolisa.dev/orders). Choose the same character sets: Basic Latin, Latin‑1 Supplement, Latin Extended‑A, General Punctuation, Arrows, Box Drawing, and Combining Diacritical Marks. Then copy the zip's `woff2/*.woff2` into `public/fonts/monolisa/`. If the new build's file numbering or ranges differ, update `src/styles/monolisa.css` to match the zip's `monolisa.css`, keeping the `/fonts/monolisa/` paths.

Consequences:

- **Deploy from a machine that has the fonts.** `pnpm build` copies them from `public/` into `dist/`. A build without them (CI, a fresh clone, a fork) still succeeds, but the font requests 404 and text falls back to the next family in the stack. Every `font-family` stack that uses `MonoLisaCode` must therefore end in a free monospace fallback.
- **Automated builds** (Cloudflare Git integration, GitHub Actions) need the fonts from a private source at build time, such as a private submodule or a private R2 bucket fetched with a token. This is not set up yet.
- Visitors' browsers download the served files; that is the embedding the EULA allows. Publishing them in this repo would be redistribution, which it does not.

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (scaffolded in this repo), built to fully static output and deployed to Cloudflare as static assets (Workers static assets or Pages). No server rendering. Domain: www.kahiok.com. Replaces an earlier Next.js/Mantine/react-spring site on Vercel (bookmarks `main` / `nextjs-final`); that site is kept only as a record of content, not as visual authority.

## Users

Primary: other developers and open-source peers, usually people who found kahiok through a tool (loglit, fff-snacks.nvim, unclash.nvim), an upstream contribution (fff, snacks.nvim, blink.pairs), qsyn, or TaigiKeyboard, and want to know who is behind it. They are technically fluent and judge quickly by substance. They want to find the tools and repos, read what kahiok writes, see what kahiok works on, and follow through to GitHub.

Secondary, not designed for first: recruiters or hiring managers reading the experience section and résumé, and anyone who looks up the name.

## Product Purpose

kahiok's personal home on the web: one place that connects the open-source tools, the writing, and the professional work of a systems/firmware engineer. Success means a peer who arrives from a repo leaves knowing what else kahiok has built and written, and goes on to a project, a post, or GitHub.

## Positioning

Few people share this mix of work, and nobody else can claim it: kahiok works at the systems layer (Linux kernel, Android modem userspace, and Modem BSP firmware for Pixel at Google), builds Neovim and CLI tooling used by other developers, co-authored quantum-circuit synthesis research (qsyn), and maintains TaigiKeyboard, an open-source Taiwanese input method. The Taiwanese identity is real, not decoration: the name is Taiwanese (莊加旭, romanized Tsng Kahiok), and kahiok maintains tooling for the Taiwanese language.

## Operating Context

- Visitors usually arrive from GitHub, a README, a plugin listing, or a search for the name, often on desktop with a terminal and editor open. Mobile visits also happen through shared links.
- Visitors leave mostly to GitHub repos, external project sites/videos, the résumé PDF, and email.

## Capabilities and Constraints

Confirmed content areas:

- **About / identity**: name, short bio, contact and profile links.
- **Projects / work**, featured:
  - Neovim/CLI tooling: loglit (Go CLI log highlighter), fff-snacks.nvim, unclash.nvim (3-way merge conflict manager), and upstream contributions to fff, snacks.nvim, and blink.pairs.
  - qsyn: C++20 quantum circuit synthesis framework (DVLab-NTU/qsyn); co-authored IEEE QCE '24 paper (arXiv:2405.07197).
  - Light Dance Editor/Simulator: led a 10-member team; Three.js 3D stage simulator with GLSL (NTUEELightDance/LightDance-Editor).
  - TaigiKeyboard: open-source Taiwanese IME for iOS, Android, macOS, Windows, and Linux (POJ / Tâi-lô / TPS input, Hanji or mixed output); kahiok recently joined as a maintainer (github.com/taigikeyboard/taigikeyboard).
  - Guess the Lyrics is no longer featured.
- **Blog / writing**: a content collection with an index and article pages. It starts empty, with no existing posts to migrate.
- **Résumé / experience**: work history on the site itself, plus the downloadable PDF.

Language:

- English first. The site chrome and most content are in English.
- Some blog posts may be written in Taiwanese (台語). Posts need a per-post language, and pages must handle Taiwanese text in both Hanji and romanization.
- No Mandarin content is planned.

Constraints:

- Romanization preference is Tâi-lô (TL) over Pe̍h-ōe-jī (POJ). Use TL for romanized Taiwanese unless quoting a source that uses POJ.
- Text must render Taiwanese correctly: Hanji (莊加旭) and TL/POJ diacritics, including stacked and combining tone marks (e.g. ê̍, o̍, POJ's o͘), wherever names, project content, or posts need them. Many system fonts get these wrong.
- Fully static build. Any interactivity must work without a server.
- Open decision: whether a skills list remains its own section.

## Brand Commitments

- **Name**: the handle comes first. "kahiok" is the primary mark, shown with 莊加旭 / Tsng Kahiok. Previous site title: "kahiok | 莊加旭". "Max" / Max Chuang is retired and does not appear on the site; `madmaxieee` survives only as the GitHub handle.
- **Handles and links**: email tsng@kahiok.com; GitHub github.com/madmaxieee; LinkedIn linkedin.com/in/kahiok (per the current résumé; the old site linked /in/chuangjiaxu).
- **Fonts**: TASA is an optional choice for reliable Taiwanese romanization diacritics, not a fixed typeface or visual-identity requirement. Explore other families when they suit the design; the requirement is correct Hanji and romanization rendering, including stacked and combining marks.
- **Monospace font**: MonoLisa 3.000, which kahiok holds a personal licence for. The webfont build includes Combining Diacritical Marks, and kahiok finds v3's diacritics better than earlier versions. Still check how romanized Taiwanese renders before setting it in MonoLisa.
- **MonoLisa licence**: the EULA allows embedding the webfont on kahiok.com but forbids redistribution. The repo is public, so the font files are gitignored and must never be committed. Builds without them must still work by falling back to a free monospace font. Setup details are in `README.md`.
- No other visual identity is binding. The old site's look (particle "kahiok" text, parallax, Mantine dark, red buttons) is not a commitment.

## Evidence on Hand

- `public/files/Tsng_Kahiok_Resume.pdf`: the current résumé. Its source of truth is the Typst source at `/Users/madmax/Repos/resume/main.typ`, built to `main.pdf` there and copied in. `public/_redirects` 301s the old `/files/Max_Chuang_Resume.pdf` URL. The résumé is the source of truth for experience facts: Google Firmware/System Software Engineer (Aug 2024–present), Appier frontend intern (Nov 2023–Mar 2024), NTU BSc EE (2020–2024).
- `public/assets/images/avatar.png`: an illustrated avatar of kahiok.
- `public/assets/images/LightDanceLogo.png`: the NTUEE Light Dance logo.
- `public/assets/images/guess-the-lyrics-logo.png`: kept on disk, but the project is no longer featured.
- `public/madmax-og.png`: the old OG image, 1200×630. It may be out of date with the handle-first identity.
- Favicons and `site.webmanifest`. The manifest name fields are empty.
- Light Dance performance video: https://youtu.be/rN6hMTVfCt4
- Star counts appear on the résumé (e.g. loglit 49, fff-snacks.nvim 39, unclash.nvim 22, qsyn 198). They are point-in-time, so restate them as of a date or fetch them live; never inflate them.
- **Absent, do not fabricate**: blog posts, testimonials, screenshots or demos of the CLI/Neovim tools, TaigiKeyboard screenshots, and any metrics beyond what the résumé states. The old bio ("over the past year and a half…", "motivated to pursue opportunities") is stale. Do not reuse it without kahiok's confirmation.

## Product Principles

1. **Lead to the work.** Every section should route a peer to something real, such as a repo, a post, or a demo. The site exists to connect them, not to stand in for them.
2. **Substance over self-promotion.** The audience is developers. Concrete facts, links, and specifics beat adjectives and pitch language.
3. **Keep the identity real.** The Taiwanese name and the Taiwanese-language work belong to the person. Present them accurately, with correct orthography.
4. **Built to grow.** Posts and projects will be added over time. Structure must take new entries without redesign.
5. **Fast and static.** The site should load instantly from a static host, and nothing should depend on a server.

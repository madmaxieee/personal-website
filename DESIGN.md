---
name: kahiok.com
description: A type specimen sheet, sized in the Chinese 號 system, for a systems engineer who writes Taiwanese.
colors:
  proofing-blue: "#1f4fd1"
  proofing-blue-soft: "#1f4fd159"
  paper: "#ffffff"
  ink: "#141414"
  lead: "#5b5f65"
  hairline: "#e3e3e0"
typography:
  display:
    fontFamily: "Gentium Book Plus, Gentium Plus, Charis SIL, Georgia, serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Noto Serif TC Subset, Noto Serif TC, Source Han Serif TC, Songti TC, serif"
    fontSize: "2.7857rem"
    fontWeight: 900
    lineHeight: 1.5
    letterSpacing: "0.04em"
  title:
    fontFamily: "Gentium Book Plus, Gentium Plus, Charis SIL, Georgia, serif"
    fontSize: "1.7143rem"
    fontWeight: 700
    lineHeight: 1.3
  title-roman:
    fontFamily: "Gentium Book Plus, Gentium Plus, Charis SIL, Georgia, serif"
    fontSize: "1.7143rem"
    fontWeight: 400
    lineHeight: 1.3
  entry-title:
    fontFamily: "Gentium Book Plus, Gentium Plus, Charis SIL, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Gentium Book Plus, Gentium Plus, Charis SIL, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6667
  label:
    fontFamily: "MonoLisaCode, Noto Serif TC Subset, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.8036rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.02em"
    fontFeature: "tnum"
rounded:
  none: "0px"
spacing:
  rule: "1.5px"
  gutter: "1rem"
  gutter-wide: "2rem"
  margin: "3.75rem"
  margin-wide: "7rem"
  number-column: "4.5rem"
  number-column-narrow: "2.5rem"
  entry-top: "1rem"
  entry-bottom: "1.125rem"
  section: "4.5rem"
components:
  margin-label:
    textColor: "{colors.proofing-blue}"
    typography: "{typography.label}"
  margin-label-points:
    textColor: "{colors.lead}"
    typography: "{typography.label}"
  section-number:
    textColor: "{colors.proofing-blue}"
    typography: "{typography.label}"
    width: "{spacing.number-column}"
  entry:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1rem 0 1.125rem"
  entry-number:
    textColor: "{colors.lead}"
    typography: "{typography.label}"
    width: "{spacing.number-column}"
  entry-number-hover:
    textColor: "{colors.proofing-blue}"
  entry-meta:
    textColor: "{colors.lead}"
    typography: "{typography.label}"
  text-link:
    textColor: "{colors.proofing-blue}"
    typography: "{typography.body}"
  entry-title-link:
    textColor: "{colors.ink}"
    typography: "{typography.entry-title}"
  entry-title-link-hover:
    textColor: "{colors.proofing-blue}"
  nav-item:
    textColor: "{colors.ink}"
  nav-item-hover:
    textColor: "{colors.proofing-blue}"
---

# Design System: kahiok.com

## Overview

**Creative North Star: "The Specimen Sheet"**

The site is a type foundry's specimen sheet. A white sheet, near-black ink, one vertical margin rule, and in that margin the size of each opener, written in the Chinese 號 system the way a proof is marked up. The sizes are true: the scale is computed in points from 五號 (10.5pt) set at the 18px body, so a label that says 27.5pt sits beside type that is 27.5pt at that ratio. The only enlargement is the name ladder's, and its label says so.

The world is quiet and precise. Density is that of a well-set printed page: generous section breaks, tight entry rhythm, metadata set small in mono. Colour is used as a proofreader uses it: non-repro blue marks what a proof would mark (sizes, § numbers) and what a reader can follow (links). There are no boxes, no shadows, no icons, no dark mode, and nothing animates.

Correct Taiwanese is part of the material. Gentium Book Plus sets all Latin because it stacks Tâi-lô and Pe̍h-ōe-jī combining marks correctly (e̍, o͘, ǹ, a̋); Noto Serif TC sets Hanji, including the heavy 一號 莊加旭; MonoLisa sets the margin.

**Key Characteristics:**
- Every type size is a 號 step in points; the margin states it.
- One 1.5px ink margin rule from top to bottom of the sheet; 1px hairlines between entries.
- Proofing blue only on labels, § numbers, links and their states.
- Light only (`color-scheme: light`).
- States snap; nothing tweens.

## Colors

A printed sheet: paper, ink, a lead grey for metadata, and one proofing blue.

### Primary
- **Proofing Blue**: the non-repro blue of a proof mark-up. Size labels in the margin, § numbers in the head nav and section openers, links, entry numbers on hover, the focus ring and text selection. Nothing else.
- **Proofing Blue, Soft** (35% alpha): the resting underline of a blue link; on hover it becomes solid and 2px.

### Neutral
- **Paper**: the sheet and the page behind it. The only background.
- **Ink**: all reading text, headings, the name ladder, and the margin rule.
- **Lead**: metadata. Point sizes under 號 names, entry numbers at rest, stack · role · years, roles, the set date, Hanji section glosses, the empty state, the colophon, nav counts.
- **Hairline**: 1px rules between entries and above each section's closing action; the resting underline of entry-title links.

### Named Rules
**The Proofing Blue Rule.** Blue marks only what a proofreader would mark (size labels, § numbers) or what a reader can follow (links, and the focus and hover states of links and entries). It never fills an area, colours a heading, or decorates.

**The White Sheet Rule.** Light only. There is no dark theme and no tinted surface; the sheet is `paper` edge to edge.

## Typography

**Display Font:** Gentium Book Plus (with Gentium Plus, Charis SIL, Georgia)
**Hanji Font:** Noto Serif TC, self-hosted as a subset at 400 and 900 (with Source Han Serif TC, Songti TC); applied to every `lang="nan-Hant"` run
**Body Font:** Gentium Book Plus
**Label/Mono Font:** MonoLisa 3 (MonoLisaCode), falling back to Noto Serif TC Subset for 號 and then to system monospace. The licensed files are gitignored; builds without them fall back cleanly.

**Character:** A SIL book serif with reliable stacked diacritics against a heavy Song-style Hanji serif, annotated by a mono. Gentium is chosen for correctness of Tâi-lô/POJ, not for display flourish; TASA is not used.

### The 號 scale
`--pt` is `body / 10.5`, so 1pt = 1.714px at an 18px body. Steps in use: 初號 42pt, 一號 27.5pt, 三號 15.75pt, 四號 13.75pt, 五號 10.5pt, 六號 7.875pt. `--x` enlarges only the name ladder: 1 on phones, 1.25 from 45em, 1.5 from 70em.

### Hierarchy
- **Display** (初號 42pt × `--x`, Gentium 700, line-height 1.05, -0.02em): the handle "kahiok" only. 72px, 90px or 108px by breakpoint.
- **Headline** (一號 27.5pt × `--x`, Noto Serif TC 900, line-height 1.5, +0.04em): 莊加旭 in the name ladder only.
- **Title-roman** (三號 15.75pt × `--x`, Gentium 400, line-height 1.3): the romanized name, Tsng Kahiok.
- **Title** (三號 15.75pt, Gentium 700, line-height 1.3): section openers ("Work", "Experience"), followed by the Hanji gloss at body size in lead. Not enlarged.
- **Entry title** (四號 13.75pt, Gentium 700, line-height 1.3): the name of each work or experience entry.
- **Body** (五號 10.5pt = 18px, Gentium 400, line-height 1.6667): bio, summaries, actions. Measure capped at 34–40rem (bio 34rem, entry text 36rem).
- **Label** (六號 7.875pt, MonoLisa 400, line-height 1.4, +0.02em, tabular numerals): margin size labels, § and entry numbers, entry metadata, nav counts.

### Named Rules
**The True Label Rule.** A margin label names the 號 step and the point size of the line beside it. If a size is enlarged, the label states the factor (放大 ×1.25, 放大 ×1.5); if not, there is no factor. A label never names a size the type is not set at.

**The Name-Only Enlargement Rule.** `--x` multiplies the three name-ladder lines and nothing else. Section openers, entries and the colophon specimen stay at their nominal 號 size at every width.

**The Correct Marks Rule.** Any Latin that may carry Tâi-lô or POJ tone marks is set in Gentium Book Plus and tagged `lang="nan-Latn"`; Hanji is tagged `lang="nan-Hant"` so it takes the Hanji stack. Do not set romanized Taiwanese in a face that has not been checked for stacked marks.

## Layout

The sheet is a grid with a fixed margin column and a text column, capped at 90rem and inset by a fluid edge (`clamp(1rem, 4vw, 4.5rem)`). The margin column is 3.75rem on phones and 7rem from 45em; the gutter between rule and text is 1rem, then 2rem. Head, name ladder, sections and colophon are subgrids of the sheet, so every margin label aligns to the same column and right-aligns against the rule (0.875rem inside it, 0.5rem on phones).

Within a section, a 4.5rem number column (2.5rem on phones) holds § and entry numbers; entry text, closing actions and the empty state hang from the same indent. Entries sit 1rem below their hairline and 1.125rem above the next. Sections are separated by 4.5rem (3rem on phones); the colophon by 6rem.

From 70em the sheet becomes margin + two columns (1.05fr / 1fr). The name ladder and §1 Work share the first viewport side by side; Writing and Experience flow down the left column under the ladder, Contact under Work on the right. Each column flows independently.

On phones the margin keeps its 號 names and drops the point sizes and the enlargement label (there is no enlargement at ×1). Entry metadata moves under the entry title and left-aligns.

## Elevation & Depth

Flat. There are no shadows, no layered surfaces and no tonal containers. Structure is conveyed only by the margin rule, hairlines, the type scale and alignment.

### Named Rules
**The One Governing Line Rule.** The sheet has exactly one heavy line: a 1.5px ink rule on the margin edge, running the full height of the sheet. Every other divider is a 1px hairline. No boxes, cards or outlines enclose content.

## Shapes

Square and unboxed. Nothing has a radius; the focus ring's 1px rounding is the only exception. The recurring geometry is the vertical margin rule and horizontal hairlines that open each entry and each section's closing action.

## Components

### Margin Label
The signature device. A right-aligned mono 六號 label in the margin column: the 號 name in proofing blue, its point size on a line below in lead, and on the name ladder an enlargement factor below that. The same column holds the sheet's two region marks, 字樣 at the head and 排印 at the colophon, in the same style.

### Section Opener
A § number in blue mono with its 三號 size name in lead beneath it, in the number column, then the section title (三號, bold) and its Hanji gloss in lead at body size. Below it, entries. Each populated section ends in one action: a single body-size link above a hairline, hung from the text indent.

### Entry
- **Structure:** hairline above; number column (`1.1`, `3.2`) in lead mono; title (四號 bold) with mono metadata right-aligned on the same baseline; summary below in body, then optional "Also …" links in lead.
- **Hover / Focus-within:** the number snaps to proofing blue and its size, 四號 13.75pt, appears beneath it. No transition.
- **Title link:** ink with a hairline underline; on hover it snaps to blue with a solid underline.

### Links
- **Style:** proofing blue, 1px underline at 35% alpha, offset 0.2em.
- **Hover:** underline becomes solid and 2px. Snaps.
- **Focus:** 2px solid proofing-blue outline, 3px offset.

### Navigation
A wrapped row in the head: blue mono § number, the section name in ink at 16px, and a lead mono count of entries (omitted for Contact). Hover turns the item blue. No underline, no active indicator.

### Contact List
A definition list on the section grid: labels (Email, GitHub, LinkedIn) in lead in a 6rem column, values as blue links.

### Colophon
Small lead text naming the faces and the scale, then a 三號 specimen line of Tâi-lô and POJ tone marks in ink, labelled 三號 15.75pt in the margin, proving the type.

## Do's and Don'ts

### Do:
- **Do** compute every new size from `--pt` as a 號 step and label it in the margin with its true point size.
- **Do** confine `--x` enlargement to the name ladder and state the factor in its margin label.
- **Do** keep proofing blue to labels, § numbers, links and their focus/hover states.
- **Do** separate entries with 1px hairlines and keep the 1.5px margin rule the only heavy line.
- **Do** tag Hanji `lang="nan-Hant"` and romanized Taiwanese `lang="nan-Latn"`, set in Gentium Book Plus.
- **Do** let states snap: colour and visibility change instantly on hover and focus.
- **Do** end each populated section with exactly one action.

### Don't:
- **Don't** add a dark theme or tinted surfaces; the sheet is white.
- **Don't** add boxes, cards, shadows, rounded corners or icons.
- **Don't** add transitions, tweens or animation.
- **Don't** use blue for headings, fills, or emphasis that is not a link or a proof mark.
- **Don't** enlarge section openers, entries or body with `--x`, or let a margin label state a size the type is not set at.
- **Don't** add a second vertical rule or a heavier divider.

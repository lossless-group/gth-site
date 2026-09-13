---
title: "Three Directions for a Practitioner-Led Testing and Content Site"
lede: "One clinician, one diagnostic kit, three tiers, a library of articles — and a homepage that has to orient a stranger before it uses a single term of art."
publish: true
date_created: 2026-09-11
date_modified: 2026-09-11
date_authored_initial_draft: 2026-09-11
date_authored_current_draft: 2026-09-11
date_authored_final_draft: "[]"
authors:
  - Michael Staton
augmented_with:
  - Claude Code on Claude Opus 5
at_semantic_version: 0.1.0.0
status: Draft
category: Specs
site_uuid: 353d3089-036f-4ab9-a8e1-ac43312c14e4
hex_code: 9rhxdd
tags:
  - Astro-Knots
  - Design-Directions
  - Information-Hierarchy
  - Commerce
  - Content-Collections
  - Thought-Leadership
---

# Three Directions for a Practitioner-Led Testing and Content Site

**Codename: Threshold.** Client is a practising clinician in a US metro who
co-fronts a documentary series and sells an at-home diagnostic kit. Real names,
domain, and product marks stay out of this document and out of the changelog;
they live only in the site repo, which is private.

## Why Care?

The existing site is a hosted-storefront template carrying a 2008 information
architecture: condensed all-caps headlines, a green call-to-action button, a
value-stack offer page ending in *"WAIT, THAT'S NOT ALL!!"*, and — in production
today — two blocks of unreplaced Lorem ipsum on the About page where the team
bios belong.

The commercial problem is not that the site is ugly. It is that the site
**introduces its own coined product name and three clinical terms of art before
it has told a stranger what the thing is or what to do next**, and that its one
purchase decision is a single take-it-or-leave-it price with no ladder. The
client is also mid-transition from *practitioner* to *thought leader* and is,
by her own account, shy about it — so the design has to build authority out of
the work rather than out of personality.

## The three problems any direction must solve

### 1. Orient before you educate

The current homepage's first substantive sentence describes the permeability of
a single-cell-thick membrane. Its primary product is a coined word.

**The contract:** on every direction, above the fold and in words a stranger
already owns — *what this is*, *what you do*, *what you get back*. A term of art
may appear only after the everyday symptom it explains. Symptom you recognise →
the thing we measure → what you receive.

This is enforced in the data model, not left to template authors. The `articles`
collection carries a required-in-practice `plain_question` field — the jargon-free
question the piece answers — and every index card leads with it, above the
clinical title. `term_of_art` / `term_in_plain_english` pair on the same entry so
a term never renders on a card without its translation within a few pixels.

### 2. Make the ladder clickable

Three tiers, each a **strict superset** of the one below. That constraint is what
makes one-click upgrade honest: upgrading never removes anything, so the cart can
show the *delta* — the two or five lines you are adding and the price difference —
rather than swapping in a whole new cart and making the reader re-read it.

The `bundles` collection stores the **full** include list per tier, not the delta.
The renderer diffs adjacent tiers itself, so nobody maintains two lists by hand and
the "what's new at this tier" copy can never drift from the tier contents.

### 3. Build authority for someone who won't self-promote

The answer is a **byline system**, not a personal brand. Persistent author identity
and credential on every article, a standing author surface, taxonomy that reads as a
body of work rather than a blog. The clinician's name appears constantly and never
loudly. Let the corpus do the asserting.

## Shared substrate

All three directions run the identical content — same collections, same entries,
same prices — so a side-by-side comparison is about form, not copy.

| Layer | Shared? | Notes |
|---|---|---|
| `articles`, `series`, `bundles` collections | Yes | One source, three renderings |
| Tier 1 named tokens (`--color__*`, `--font__*`) | Yes | `src/styles/global.css` |
| Tier 2 semantic tokens (`--color-primary`, …) | **No** | One file per direction under `src/styles/themes/` |
| `BundleLadder.svelte` (the upgrade cart) | Yes, one component | Three `layout` presentations, zero hard-coded colour |
| Section components | **No** | `src/components/<direction>/` per direction |

Per the theme-system skill: components read kebab-case semantic tokens only.
No component in any direction reads a `__` token. Each direction ships light,
dark, and vibrant; vibrant is dark-based and sets ground, surface, text and
border explicitly.

## The three directions

**A — Journal (`/journal`).** The site as a clinical publication. Serif display,
generous measure, article system foremost, the kit presented as the instrument the
research is built on rather than as an offer. Bone and ink with a deep clinical
green. The cart is a **ledger**: rows fill in as you climb.

**B — Atlas (`/atlas`).** The science is the hero. An SVG mouth-to-gut axis runs
down the page as a structural spine and every section docks to it; the reader can
see the argument's geometry before reading a word. Petrol and bone, one living
green for anything biological. The cart is a **comparison** with a sliding
you-are-here band.

**C — Practice (`/practice`).** The warmest, closest to how a person actually
arrives: with a symptom. First person, symptom-led entry, testimonials as pull
quotes, the kit as the obvious next step rather than a pitch. Warm sand,
terracotta, sage. The cart is a **stepped conversation** — start here, most people
add this, go all the way.

## Out of scope

No checkout. The cart is a configurator that resolves to a single call-to-action;
payment stays on the client's existing platform.

## Known fabrication, flagged

The live site publishes exactly one price. The **three-tier price ladder in this
build is illustrative** — tier contents are all real line items lifted from the
client's own offer page, but the per-tier prices are invented to demonstrate the
upgrade mechanic. Do not present them to the client as recommended pricing without
saying so.

## References

- [[Maintain-Themes-Mode-Across-CSS-Tailwind]] — two-tier tokens, three-mode contract
- [[Maintain-Design-System-and-Brandkit-Motions]] — the two required reference pages
- [[Fetch-Brand-and-Tokens-from-Site]] — the brand-extraction pass that seeded Tier 1
- [[New-Site-Quickstart-Guide]] — scaffold phases

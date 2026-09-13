# GTH — Practitioner-Led Testing &amp; Content Site

<p align="center">
  <span style="font-size: 18px; font-weight: 500; color: #374151;">A design spike built with</span>
  <span style="font-size: 20px; color: #ef4444; margin: 0 4px;">❤️</span>
  <span style="font-size: 18px; font-weight: 500; color: #374151;">by</span>
  <br/>
  <a href="https://lossless.group" target="_blank" rel="noopener" style="text-decoration: none; display: inline-flex; align-items: center; margin: 8px 0;">
    <img src="https://ik.imagekit.io/xvpgfijuw/uploads/lossless/trademarks/trademark__The-Lossless-Group.svg?updatedAt=1758016855404" alt="The Lossless Group" height="24" style="margin-right: 8px;" />
    <span style="font-size: 22px; font-weight: 600; color: #1f2937;">The Lossless Group</span>
  </a>
  <br/>
  <span style="font-size: 14px; color: #6b7280; margin-top: 12px; display: block;">
    Part of
    <a href="https://lossless-group.github.io/astro-knots/" style="color: #7c3aed; text-decoration: none; font-weight: 500;">Astro Knots</a>
    · built with
    <a href="https://astro.build" style="color: #7c3aed; text-decoration: none; font-weight: 500;">Astro</a>,
    <a href="https://svelte.dev" style="color: #ff3e00; text-decoration: none; font-weight: 500;">Svelte 5</a>
    and
    <a href="https://tailwindcss.com" style="color: #0ea5e9; text-decoration: none; font-weight: 500;">Tailwind CSS v4</a>
  </span>
</p>

***

## First — what is Astro Knots?

**[Astro Knots](https://lossless-group.github.io/astro-knots/)** is The Lossless
Group's *pseudomonorepo*: a small lattice of independent Astro sites — client
work, personal sites, and one published package — developed side by side in a
single workspace so patterns can be compared and shared deliberately.

It is **not** a true monorepo. Every site is its own git repository with its own
lockfile, and deploys on its own from its own repo. Nothing here requires a
client to adopt our infrastructure, our build server, or our umbrella project.
What the sites share is not runtime code — it is a set of **conventions**:

| Shared convention | What it buys |
|---|---|
| **Two-tier design tokens** | Re-brand by adding one named token and re-pointing one semantic token. Components never change. |
| **Three-mode contract** (light · dark · vibrant) | Every surface is verified in all three modes, every time. |
| **`context-v/`** | Specs, blueprints, reminders and prompts live next to the code that implements them. |
| **`@lossless-group/lfm`** | Lossless Flavored Markdown — the one genuinely shared, published package. |
| **`/brand-kit` + `/design-system`** | Every site ships its own living catalogue. No Storybook, no drift. |

The workspace-level story — what worked, what didn't, and why we stopped
pretending everything should be a shared package — is on the
[Astro Knots splash page](https://lossless-group.github.io/astro-knots/).

## Why this repo exists

This is a **speculative pitch**, not commissioned work. It was built for a
prospective client to demonstrate something specific:

> Give a coding agent good rails, and it will get genuinely *creative* — while
> still handing you something a team can maintain and iterate on afterward.

The rails are our agent skills — **`pseudomonorepos`**, **`context-vigilance`**,
and **`astro-knots`** — loaded into Claude Code at the start of the session.
They encode the token architecture, the three-mode contract, the documentation
conventions, and the hard prohibitions (no React, no JSX, no MDX, no UI
libraries, pnpm only).

This is the most demanding of the three spikes in the set, because the site has
real work to do: a twelve-article library, an eight-episode series, a three-tier
product ladder, and a cart — rendered **three different ways** off one content
layer. Same twelve articles, same eight episodes, same three bundles, same cart
component. Only the argument changes.

You pick one. The other two are deleted. Nothing else changes.

> **This is a prototype.** There is no checkout, and the three-tier price ladder
> is illustrative — the tier *contents* are real line items from the client's own
> offer page, but the per-tier prices are invented to demonstrate the upgrade
> mechanic. Do not quote them to the client as recommended pricing.

## The three directions

| Route | Direction | Premise | Cart layout |
|---|---|---|---|
| `/` | — | The chooser. Start here. | — |
| `/journal` | **Journal** | A clinical publication that happens to sell the instrument its research is built on. | `ledger` |
| `/atlas` | **Atlas** | An anatomical axis runs down the page; every section docks to a point on it. | `compare` |
| `/practice` | **Practice** | Opens on the symptom, in her voice. A consultation, not a keynote. | `steps` |
| `/articles` | — | The corpus, plus a detail page per piece. | — |
| `/brand-kit` | — | Stakeholder-facing: colour, type, mark, imagery. | — |
| `/design-system` | — | Developer-facing catalogue. Direction *and* mode switchable at runtime. | all three |

## The three problems the redesign is solving

1. **Orient before you educate.** The live site's first substantive sentence is
   about the permeability of a single-cell-thick membrane, and its product is a
   coined word introduced before anyone knows what it is. Every direction here
   answers *what this is → what you do → what you get* in plain words first.
   Enforced in the data model: `articles` carries `plain_question`, and every
   index card renders it **above** the clinical title. The plain-language spine
   lives in code as `ORIENTATION` in `src/lib/site.ts`, not as a note in a doc.
   Generalised as a reusable rule in
   [`context-v/reminders/Orient-Before-You-Introduce-a-Term-of-Art.md`](https://github.com/lossless-group/astro-knots/blob/master/context-v/reminders/Orient-Before-You-Introduce-a-Term-of-Art.md).
2. **A ladder you can climb.** One take-it-or-leave-it price became three tiers,
   each a **strict superset** of the one below. That constraint is what lets the
   cart show a *delta* instead of swapping in a whole new cart. Written up as
   [`context-v/blueprints/Build-an-Upgrade-Ladder-Cart-from-Superset-Tiers.md`](https://github.com/lossless-group/astro-knots/blob/master/context-v/blueprints/Build-an-Upgrade-Ladder-Cart-from-Superset-Tiers.md).
3. **Authority without volume.** A byline system rather than a personal brand,
   for a clinician who is shy about thought leadership.

Note what happened to problems 1 and 2: solving them for this client produced a
**reminder** and a **blueprint** in the shared `context-v/`. That is the
`context-vigilance` skill doing its job — a one-off client fix becomes a reusable
pattern for the next site, without anyone remembering to write it down later.

## Why it stays maintainable after the pitch

- **One content layer.** All three directions read the same collections. The
  client edits YAML frontmatter and markdown — never a component.
- **Re-brand in one line.** Two-tier tokens mean a colour change is a new named
  token plus one re-pointed semantic token.
- **Retiring a direction is a delete.** Per-direction components never
  cross-import, so removing two folders and two routes removes two directions.
- **One cart, three layouts.** `BundleLadder.svelte` is a single island with a
  `layout` prop, not three forked carts.
- **The catalogue ships with the site.** `/design-system` is generated from the
  same components the site uses, so it cannot drift.

## Stack

Astro 7 · Tailwind 4 (via `@tailwindcss/vite`) · Svelte 5 (one island) · pnpm.
No React, no JSX, no MDX — per the `astro-knots` skill.

```bash
pnpm install --ignore-workspace
pnpm dev
pnpm build
pnpm exec astro check
```

This site is **not** a member of the astro-knots pnpm workspace; it installs
standalone with its own lockfile so it can deploy independently.

To run this alongside the two sibling spikes on auto-assigned ports — from an
[astro-knots](https://github.com/lossless-group/astro-knots) workspace checkout,
where all three are present:

```bash
../../scripts/dev-sites.sh
```

## Architecture

```
src/
  content/{articles,series,bundles}/   # the shared content layer — all 3 read this
  content.config.ts                    # permissive schemas; document shape, don't gatekeep
  lib/site.ts                          # practitioners, testimonials, ORIENTATION spine
  styles/
    global.css                         # Tier 1 named tokens (--color__*) + resets
    themes/{journal,atlas,practice}.css# Tier 2 semantic tokens, one file per direction
  layouts/                             # BoilerPlateHTML + BaseThemeLayout
  components/
    basics/     Plate, Wordmark        # shared
    ui/         ModeToggle             # shared
    cart/       BundleLadder.svelte    # shared — the upgrade cart, 3 layouts
    journal/ atlas/ practice/          # per-direction sections, no cross-imports
  pages/
```

### Two-tier tokens

Tier 1 (`--color__bone`, `--font__newsreader`) are raw values in `global.css`, and
may be referenced **only** from `src/styles/themes/*.css`. Tier 2 (`--color-primary`,
`--font-body`) are what components and Tailwind utilities read. The full contract
is documented at the top of `src/styles/themes/journal.css`.

To change a colour for the client: add one named token, re-point one semantic
token. No component changes.

### Three modes, per direction

Light, dark and vibrant, for all three directions — nine combinations. Vibrant is
**dark-based** and each theme file sets its ground, surface, text and border
explicitly rather than inheriting from light. Direction is determined by the
**route** and is deliberately not restored from `localStorage`; mode is a viewer
preference and is. `/design-system` is the one page where direction is switchable
at runtime.

### Imagery

Seven ink-on-paper plates in `public/img/`, generated as one family off a single
locked seed. There is no light set and no dark set: `Plate.astro` dissolves the
ground with a blend mode (`multiply` in light, `invert` + `screen` in dark and
vibrant) and tints toward the active `--color-primary`. One family, nine
appearances. Raw candidates are archived in `.ideogram-candidates/`, outside
`public/` so the build never ships them.

## Known gaps

- **No LFM.** Article bodies render through Astro's native markdown pipeline, not
  `@lossless-group/lfm`. Fine for a spike; wiring LFM in is the first follow-up if
  this goes anywhere, since the rest of the estate uses it.
- **No checkout.** The cart is a configurator resolving to a single CTA.
- **No photography.** Practice's portrait slot is a CSS/SVG treatment with a
  labelled space where a real portrait goes.

## Status

Speculative. Not commissioned, not deployed, not endorsed by the practitioners
named in `src/lib/site.ts`, whose details and disclaimer are transcribed verbatim
from the public live site. Prices are illustrative. Medical claims are the
client's own, reproduced, not authored here.

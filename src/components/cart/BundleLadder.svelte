<script lang="ts">
  /* ==========================================================================
   * BundleLadder — the upgrade cart.
   *
   * The mechanic the old site lacked: three tiers where each is a strict
   * SUPERSET of the one below, so upgrading never removes anything and the
   * cart can therefore show a DELTA instead of swapping in a whole new cart
   * the reader has to re-read.
   *
   * The list rendered is the UNION of every line item across all tiers, in
   * tier order, always present in the DOM. Changing tier only changes each
   * row's state class. Two things fall out of that:
   *   - upgrading reads as the ledger filling in, not as a list replacement
   *   - a locked row is a real, clickable affordance: click any line item you
   *     want and you are moved to the cheapest tier that contains it
   *
   * Zero hard-coded colour. Every value below is a Tier 2 semantic token, so
   * the same component reads as native in all three directions and all three
   * modes. `layout` changes composition only.
   * ====================================================================== */

  type Item = {
    label: string;
    detail?: string;
    list_value?: number;
    kind?: string;
  };
  type Tier = {
    tier_id: string;
    name: string;
    plain_name?: string;
    one_liner?: string;
    best_for?: string;
    price: number;
    list_value?: number;
    most_popular?: boolean;
    upgrade_hook?: string;
    includes?: Item[];
  };

  let {
    tiers = [] as Tier[],
    layout = 'ledger' as 'ledger' | 'compare' | 'steps',
    initial = '' as string,
    cta = 'Continue',
    /* Plain-language framing shown above the control. Kept a prop so each
     * direction can orient the reader in its own voice before the word
     * "tier" or any product name appears. */
    orientation = '',
  } = $props();

  const startIndex = (() => {
    const byId = tiers.findIndex((t) => t.tier_id === initial);
    if (byId >= 0) return byId;
    const popular = tiers.findIndex((t) => t.most_popular);
    return popular >= 0 ? popular : 0;
  })();

  let selectedIndex = $state(startIndex);
  /* Rows the reader has just gained, so the newest addition can be announced
   * once rather than re-announced on every render. */
  let lastDirection = $state<'up' | 'down' | null>(null);

  const selected = $derived(tiers[selectedIndex] ?? tiers[0]);

  /* The union, in tier order. Each row remembers the cheapest tier that
   * contains it — that index IS the upgrade target when the row is clicked. */
  const rows = $derived.by(() => {
    const seen = new Map<string, { item: Item; firstTier: number }>();
    tiers.forEach((tier, ti) => {
      (tier.includes ?? []).forEach((item) => {
        if (!seen.has(item.label)) seen.set(item.label, { item, firstTier: ti });
      });
    });
    return [...seen.values()];
  });

  const nextTier = $derived(tiers[selectedIndex + 1] ?? null);

  /* What upgrading one step actually buys, in rows and in dollars. */
  const nextDelta = $derived.by(() => {
    if (!nextTier) return null;
    const gained = rows.filter((r) => r.firstTier === selectedIndex + 1);
    return {
      tier: nextTier,
      count: gained.length,
      headline: gained[0]?.item.label ?? '',
      rest: Math.max(0, gained.length - 1),
      cost: nextTier.price - (selected?.price ?? 0),
    };
  });

  const savings = $derived(
    Math.max(0, (selected?.list_value ?? 0) - (selected?.price ?? 0))
  );

  const money = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n);

  function select(i: number) {
    if (i < 0 || i >= tiers.length || i === selectedIndex) return;
    lastDirection = i > selectedIndex ? 'up' : 'down';
    selectedIndex = i;
  }

  /* Clicking a locked row is the shortcut: "I want that one" moves you to the
   * cheapest tier that has it, rather than making you work out which tier. */
  function claim(firstTier: number) {
    if (firstTier > selectedIndex) select(firstTier);
  }

  /* A locked row's accessible name must state the CONSEQUENCE, not just repeat
   * the line item. Read on its own out of context, "At-home collection kit,
   * +$300" does not tell a screen-reader user that activating it changes which
   * package they have selected. This does. */
  function claimLabel(label: string, firstTier: number) {
    const target = tiers[firstTier];
    const delta = (target?.price ?? 0) - (selected?.price ?? 0);
    return `Add ${label}. Upgrades to ${target?.plain_name ?? target?.name}, ${money(delta)} more.`;
  }

  function onTierKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      select(Math.min(selectedIndex + 1, tiers.length - 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      select(Math.max(selectedIndex - 1, 0));
    } else if (e.key === 'Home') {
      e.preventDefault();
      select(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      select(tiers.length - 1);
    }
  }
</script>

<section class={`ladder ladder--${layout}`} aria-label="Choose what you want included">
  {#if orientation}
    <p class="orient">{orientation}</p>
  {/if}

  <!-- ------------------------------------------------------ tier control -->
  <div
    class="tiers"
    role="radiogroup"
    aria-label="Package"
    tabindex="-1"
    onkeydown={onTierKey}
  >
    {#each tiers as tier, i}
      <button
        type="button"
        role="radio"
        aria-checked={i === selectedIndex}
        tabindex={i === selectedIndex ? 0 : -1}
        class="tier"
        class:is-active={i === selectedIndex}
        class:is-owned={i < selectedIndex}
        onclick={() => select(i)}
      >
        <span class="tier-step tabular">{i + 1}</span>
        <span class="tier-text">
          <!-- Plain name leads. The product name is the subtitle, not the
               headline: a stranger should know what they are buying before
               they have to learn what we call it. -->
          <span class="tier-plain">{tier.plain_name ?? tier.name}</span>
          <span class="tier-name">{tier.name}</span>
        </span>
        <span class="tier-price tabular">{money(tier.price)}</span>
        {#if tier.most_popular}
          <span class="tier-flag">Most people</span>
        {/if}
      </button>
    {/each}
  </div>

  <!-- ------------------------------------------------------------ summary -->
  <div class="summary">
    <div class="summary-copy">
      <p class="summary-line">{selected?.one_liner}</p>
      {#if selected?.best_for}
        <p class="summary-for"><span>Right for you if</span> {selected.best_for}</p>
      {/if}
    </div>
    <div class="summary-money">
      <p class="total tabular" aria-live="polite">
        {money(selected?.price ?? 0)}
      </p>
      {#if savings > 0}
        <p class="strike tabular">
          <s>{money(selected?.list_value ?? 0)}</s>
          <span class="save">Save {money(savings)}</span>
        </p>
      {/if}
    </div>
  </div>

  <!-- -------------------------------------------------------------- rows -->
  <ul class="rows">
    {#each rows as row (row.item.label)}
      {@const included = row.firstTier <= selectedIndex}
      {@const justAdded = row.firstTier === selectedIndex && selectedIndex > 0}
      <li
        class="row"
        class:is-included={included}
        class:is-locked={!included}
        class:is-new={justAdded && lastDirection === 'up'}
      >
        {#if included}
          <span class="mark" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M3 8.5l3.2 3.2L13 5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="row-body">
            <span class="row-label">{row.item.label}</span>
            {#if row.item.detail}<span class="row-detail">{row.item.detail}</span>{/if}
          </span>
          <span class="row-tail tabular">
            {#if justAdded && lastDirection === 'up'}
              <span class="row-added">Added</span>
            {:else if row.item.list_value}
              {money(row.item.list_value)}
            {/if}
          </span>
        {:else}
          <button
            type="button"
            class="row-claim"
            aria-label={claimLabel(row.item.label, row.firstTier)}
            onclick={() => claim(row.firstTier)}
          >
            <span class="mark mark--add" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M8 3.5v9M3.5 8h9" stroke-linecap="round" />
              </svg>
            </span>
            <span class="row-body">
              <span class="row-label">{row.item.label}</span>
              {#if row.item.detail}<span class="row-detail">{row.item.detail}</span>{/if}
            </span>
            <span class="row-tail tabular">
              <span class="row-add-cost">
                +{money((tiers[row.firstTier]?.price ?? 0) - (selected?.price ?? 0))}
              </span>
            </span>
          </button>
        {/if}
      </li>
    {/each}
  </ul>

  <!-- ------------------------------------------------------------ actions -->
  <div class="actions">
    <a class="go" href="#start">{cta} &mdash; {money(selected?.price ?? 0)}</a>

    {#if nextDelta}
      <button
        type="button"
        class="bump"
        aria-label={`Upgrade to ${nextDelta.tier.plain_name ?? nextDelta.tier.name}: adds ${nextDelta.count} item${nextDelta.count === 1 ? '' : 's'} for ${money(nextDelta.cost)} more.`}
        onclick={() => select(selectedIndex + 1)}
      >
        <span class="bump-lead">
          Add {nextDelta.headline}{#if nextDelta.rest > 0}
            <span class="bump-rest"> and {nextDelta.rest} more</span>
          {/if}
        </span>
        <span class="bump-cost tabular">+{money(nextDelta.cost)}</span>
      </button>
      {#if selected?.upgrade_hook}
        <p class="bump-why">{selected.upgrade_hook}</p>
      {/if}
    {:else}
      <p class="bump-why">Everything we offer, in one box. Nothing above this.</p>
    {/if}
  </div>
</section>

<style>
  /* Every value below resolves through Tier 2 semantic tokens. No hex, ever. */
  .ladder {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    container-type: inline-size;
  }

  .orient {
    margin: 0;
    max-width: 46ch;
    font-size: 1.0625rem;
    line-height: 1.6;
    color: var(--color-text-muted);
  }

  /* ------------------------------------------------------------- tiers -- */
  .tiers {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  @container (min-width: 40rem) {
    .tiers { grid-template-columns: repeat(3, 1fr); }
  }

  .tier {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.75rem;
    padding: 0.9rem 1rem;
    text-align: left;
    cursor: pointer;
    background: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-control, 0.5rem);
    transition: border-color 160ms ease, background-color 160ms ease,
      transform 160ms ease;
  }
  .tier:hover { border-color: var(--color-primary); }
  .tier.is-active {
    border-color: var(--color-primary);
    background: var(--color-surface-raised);
    box-shadow: inset 0 0 0 1px var(--color-primary);
  }
  .tier.is-owned .tier-price { color: var(--color-text-faint); }

  .tier-step {
    display: grid;
    place-items: center;
    width: 1.5rem; height: 1.5rem;
    font-size: 0.75rem;
    border-radius: 999px;
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
  }
  .tier.is-active .tier-step,
  .tier.is-owned .tier-step {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-background);
  }

  .tier-text { display: flex; flex-direction: column; gap: 0.1rem; min-width: 0; }
  .tier-plain {
    font-family: var(--font-display);
    font-size: 1rem;
    line-height: 1.25;
  }
  .tier-name {
    font-family: var(--font-eyebrow, var(--font-data));
    font-size: 0.6875rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }
  .tier-price { font-size: 0.9375rem; color: var(--color-text); }

  .tier-flag {
    position: absolute;
    top: -0.55rem; right: 0.75rem;
    padding: 0.1rem 0.45rem;
    font-family: var(--font-eyebrow, var(--font-data));
    font-size: 0.625rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-background);
    background: var(--color-accent);
    border-radius: 999px;
  }

  /* ----------------------------------------------------------- summary -- */
  .summary {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1.25rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--color-rule, var(--color-border));
  }
  .summary-copy { flex: 1 1 22rem; min-width: 0; }
  .summary-line {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.125rem, 2.2vw, 1.4rem);
    line-height: 1.4;
    max-width: 44ch;
  }
  .summary-for {
    margin: 0.6rem 0 0;
    font-size: 0.9375rem;
    line-height: 1.55;
    color: var(--color-text-muted);
    max-width: 48ch;
  }
  .summary-for span {
    font-family: var(--font-eyebrow, var(--font-data));
    font-size: 0.6875rem;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--color-primary);
    margin-right: 0.4rem;
  }

  .summary-money { text-align: right; flex: 0 0 auto; }
  .total {
    margin: 0;
    font-size: clamp(2rem, 5vw, 2.75rem);
    line-height: 1;
    color: var(--color-text);
  }
  .strike {
    margin: 0.4rem 0 0;
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    display: flex; gap: 0.6rem; justify-content: flex-end; align-items: baseline;
  }
  .save { color: var(--color-accent); }

  /* -------------------------------------------------------------- rows -- */
  .rows { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }

  .row {
    border-bottom: 1px solid var(--color-grid, var(--color-border));
  }
  .row:last-child { border-bottom: 0; }

  .row-claim,
  .row > .mark {
    /* the included row lays itself out; the locked row wraps a button */
  }

  .row.is-included,
  .row-claim {
    display: grid;
    grid-template-columns: 1.5rem 1fr auto;
    align-items: start;
    gap: 0.85rem;
    width: 100%;
    padding: 0.85rem 0.25rem;
    text-align: left;
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
  }

  .row-claim { cursor: pointer; transition: background-color 150ms ease; }
  .row-claim:hover { background: var(--color-surface); }
  .row-claim:hover .mark--add {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
  .row-claim:hover .row-add-cost { color: var(--color-primary); }

  .mark {
    display: grid; place-items: center;
    width: 1.5rem; height: 1.5rem;
    border-radius: 999px;
    margin-top: 0.05rem;
    background: var(--color-primary);
    color: var(--color-background);
    transition: background-color 180ms ease, color 180ms ease, border-color 180ms ease;
  }
  .mark svg { width: 0.875rem; height: 0.875rem; }
  .mark--add {
    background: transparent;
    border: 1px dashed var(--color-border);
    color: var(--color-text-faint);
  }

  .row-body { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
  .row-label { font-size: 1rem; line-height: 1.4; }
  .row-detail {
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--color-text-muted);
    max-width: 58ch;
  }

  .row.is-locked .row-label { color: var(--color-text-muted); }
  .row.is-locked .row-detail { color: var(--color-text-faint); }

  .row-tail {
    font-size: 0.8125rem;
    color: var(--color-text-faint);
    white-space: nowrap;
    padding-top: 0.15rem;
  }
  .row-add-cost { color: var(--color-text-muted); }
  .row-added {
    color: var(--color-accent);
    font-family: var(--font-eyebrow, var(--font-data));
    font-size: 0.6875rem;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  /* The ledger filling in. Rows are never inserted or removed — only their
     state changes — so this reads as acquisition, not as a list redraw. */
  .row.is-new {
    animation: fill-in 420ms cubic-bezier(0.2, 0.7, 0.3, 1) both;
  }
  @keyframes fill-in {
    from { opacity: 0.35; transform: translateX(-0.5rem); }
    to   { opacity: 1;    transform: none; }
  }

  /* ----------------------------------------------------------- actions -- */
  .actions { display: flex; flex-direction: column; gap: 0.85rem; align-items: flex-start; }

  .go {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.9rem 1.6rem;
    font-family: var(--font-display);
    font-size: 1.0625rem;
    text-decoration: none;
    color: var(--color-background);
    background: var(--color-primary);
    border-radius: var(--radius-control, 0.5rem);
    transition: transform 150ms ease, filter 150ms ease;
  }
  .go:hover { filter: brightness(1.08); transform: translateY(-1px); }

  .bump {
    display: inline-flex; align-items: baseline; gap: 0.75rem;
    padding: 0.7rem 1rem;
    cursor: pointer;
    text-align: left;
    color: var(--color-text);
    background: transparent;
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-control, 0.5rem);
    font: inherit;
    font-size: 0.9375rem;
    transition: border-color 150ms ease, color 150ms ease;
  }
  .bump:hover { border-color: var(--color-primary); color: var(--color-primary); }
  .bump-rest { color: var(--color-text-muted); }
  .bump-cost { color: var(--color-accent); }
  .bump-why {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.55;
    color: var(--color-text-muted);
    max-width: 46ch;
  }

  /* ======================================================================
   * LAYOUT VARIANTS — composition only. No direction-specific colour here;
   * that arrives through the tokens the surrounding page has already set.
   * ==================================================================== */

  /* compare (Atlas) — the control becomes a column header row, and rows sit
     on a tint so the whole thing reads as a table of the same measurements. */
  .ladder--compare .tiers { gap: 0; }
  .ladder--compare .tier { border-radius: 0; }
  @container (min-width: 40rem) {
    .ladder--compare .tier + .tier { border-left: 0; }
    .ladder--compare .tier:first-child { border-radius: var(--radius-control, 0.5rem) 0 0 0; }
    .ladder--compare .tier:last-child { border-radius: 0 var(--radius-control, 0.5rem) 0 0; }
  }
  .ladder--compare .rows {
    border: 1px solid var(--color-border);
    border-top: 0;
    background: var(--color-surface);
  }
  .ladder--compare .row.is-included,
  .ladder--compare .row-claim { padding-inline: 1rem; }
  .ladder--compare .summary { order: -1; border-bottom: 0; padding-bottom: 0; }

  /* steps (Practice) — a vertical staircase. Each tier is a rung, indented
     one step further, so the ladder is legible as a ladder. */
  .ladder--steps .tiers { grid-template-columns: 1fr; gap: 0.4rem; }
  @container (min-width: 40rem) {
    .ladder--steps .tiers { grid-template-columns: 1fr; }
    .ladder--steps .tier:nth-child(2) { margin-left: 1.75rem; }
    .ladder--steps .tier:nth-child(3) { margin-left: 3.5rem; }
  }
  .ladder--steps .tier { border-radius: 999px; }
  .ladder--steps .mark { border-radius: 999px; }
  .ladder--steps .go { border-radius: 999px; }
  .ladder--steps .bump { border-radius: 999px; }

  /* ledger (Journal) — hairline rules, no fill, everything on the baseline. */
  .ladder--ledger .tier { border-radius: 0; border-width: 0 0 2px 0; background: none; }
  .ladder--ledger .tier.is-active { box-shadow: none; background: none; border-bottom-color: var(--color-primary); }
  .ladder--ledger .go { border-radius: 0; }
  .ladder--ledger .bump { border-radius: 0; }
</style>

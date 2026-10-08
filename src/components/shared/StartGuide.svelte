<script lang="ts">
  /* ==========================================================================
   * StartGuide — her "Find your starting point" guide, as one island.
   *
   * Four questions, one recommendation. Every prompt, choice and result
   * sentence is hers (src/lib/site.ts → START_GUIDE). Two deliberate
   * departures from her build:
   *
   *   - no optional email step. There is no list behind this prototype to
   *     send an address to, and a field that silently discards what you type
   *     is worse than no field
   *   - answers stay on the page as a running summary, each one editable in
   *     place, rather than disappearing behind "Previous question"
   *
   * Routing for MIXED answers is our inference, not hers — see the note on
   * START_GUIDE in site.ts.
   *
   * Tier 2 semantic tokens only. `variant` changes composition, never colour.
   * ====================================================================== */
  import { START_GUIDE, type StartFocus, type StartPath } from '../../lib/site';

  let { variant = 'journal' as 'journal' | 'atlas' | 'practice' } = $props();

  const Q = START_GUIDE.questions;

  let answers = $state<string[]>([]);
  let step = $state(0);

  const done = $derived(answers.length === Q.length && step >= Q.length);

  /* Most-chosen path across Q1–Q3; a tie goes to the Q2 answer. */
  const path = $derived.by((): StartPath => {
    const picks = answers.slice(0, 3) as StartPath[];
    const tally = new Map<StartPath, number>();
    picks.forEach((p) => tally.set(p, (tally.get(p) ?? 0) + 1));
    const top = Math.max(...tally.values());
    const leaders = [...tally.entries()].filter(([, n]) => n === top).map(([p]) => p);
    return leaders.length === 1 ? leaders[0] : (picks[1] ?? picks[0] ?? 'data');
  });
  const focus = $derived((answers[3] ?? 'connection') as StartFocus);

  const result = $derived.by(() => {
    if (path === 'data') return { ...START_GUIDE.results.data[focus], focusNote: '' };
    const r = START_GUIDE.results[path];
    return { ...r, focusNote: `Your stated focus is ${START_GUIDE.focusLabel[focus]}.` };
  });

  function choose(qi: number, value: string) {
    answers = [...answers.slice(0, qi), value];
    step = qi + 1;
  }

  function back() {
    if (step > 0) step -= 1;
  }

  function restart() {
    answers = [];
    step = 0;
  }

  const labelFor = (qi: number, v: string) =>
    Q[qi].choices.find((c) => c.value === v)?.label ?? v;
</script>

<section class={`guide guide--${variant}`} aria-labelledby="guide-step-title">
  <!-- --------------------------------------------------------- progress -->
  <ol class="progress" aria-label="Progress">
    {#each Q as q, i}
      <li
        class="pip"
        class:is-done={i < answers.length && (i < step || done)}
        class:is-now={i === step && !done}
      >
        <span class="pip-n tabular">{String(i + 1).padStart(2, '0')}</span>
        {#if answers[i] && (i < step || done)}
          <button type="button" class="pip-answer" onclick={() => (step = i)}>
            {labelFor(i, answers[i])}
          </button>
        {/if}
      </li>
    {/each}
  </ol>

  {#if !done}
    {@const q = Q[step]}
    <div class="step">
      <p class="step-k">Step {String(step + 1).padStart(2, '0')} / {String(Q.length).padStart(2, '0')} · Choose what feels closest</p>
      <h2 class="step-title" id="guide-step-title">{q.prompt}</h2>
      <p class="step-help">{q.help}</p>

      <div class="choices" role="group" aria-labelledby="guide-step-title">
        {#each q.choices as c}
          <button
            type="button"
            class="choice"
            class:is-picked={answers[step] === c.value}
            onclick={() => choose(step, c.value)}
          >
            <span class="choice-label">{c.label}</span>
            <span class="choice-detail">{c.detail}</span>
          </button>
        {/each}
      </div>

      <div class="step-foot">
        {#if step > 0}
          <button type="button" class="link" onclick={back}>&larr; Previous question</button>
        {:else}
          <span></span>
        {/if}
        <span class="foot-note">{START_GUIDE.intro.note}</span>
      </div>
    </div>
  {:else}
    <div class="result" aria-live="polite">
      <p class="step-k">Your route is ready · Your starting point</p>
      <h2 class="step-title" id="guide-step-title">{result.title}</h2>
      <p class="result-body">
        {result.body}
        {#if result.focusNote}<span class="focus-note"> {result.focusNote}</span>{/if}
      </p>

      <div class="why">
        <p class="why-k">Why this may fit</p>
        <p class="why-v">{result.why}</p>
      </div>

      <div class="result-actions">
        <a class="go" href={result.href} rel="noopener">{result.cta} &rarr;</a>
        <button type="button" class="link" onclick={restart}>Retake the guide</button>
      </div>

      <p class="disclaimer">{START_GUIDE.disclaimer}</p>
    </div>
  {/if}
</section>

<style>
  .guide {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    container-type: inline-size;
  }

  /* ---------------------------------------------------------- progress -- */
  .progress {
    list-style: none;
    margin: 0;
    padding: 0 0 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.25rem;
    border-bottom: 1px solid var(--color-rule, var(--color-border));
  }
  .pip { display: flex; align-items: center; gap: 0.5rem; min-width: 0; }
  .pip-n {
    display: grid;
    place-items: center;
    width: 1.75rem;
    height: 1.75rem;
    font-family: var(--font-data);
    font-size: 0.6875rem;
    border-radius: 999px;
    border: 1px solid var(--color-border);
    color: var(--color-text-faint);
  }
  .pip.is-now .pip-n { border-color: var(--color-primary); color: var(--color-primary); }
  .pip.is-done .pip-n {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-background);
  }
  .pip-answer {
    font: inherit;
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    background: none;
    border: 0;
    border-bottom: 1px dashed var(--color-border);
    padding: 0;
    cursor: pointer;
  }
  .pip-answer:hover { color: var(--color-primary); border-color: var(--color-primary); }

  /* -------------------------------------------------------------- step -- */
  .step-k {
    margin: 0 0 0.75rem;
    font-family: var(--font-eyebrow, var(--font-data));
    font-size: 0.6875rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-primary);
  }
  .step-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    line-height: 1.12;
    letter-spacing: -0.02em;
    color: var(--color-text);
    max-width: 26ch;
  }
  .step-help {
    margin: 0.75rem 0 0;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-text-muted);
    max-width: 56ch;
  }

  .choices { display: grid; gap: 0.75rem; margin-top: 1.75rem; }
  @container (min-width: 44rem) {
    .choices { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  .choice {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 1.1rem 1.2rem;
    text-align: left;
    font: inherit;
    cursor: pointer;
    color: var(--color-text);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-control, 0.5rem);
    transition: border-color 150ms ease, transform 150ms ease, background-color 150ms ease;
  }
  .choice:hover { border-color: var(--color-primary); transform: translateY(-1px); }
  .choice:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
  .choice.is-picked {
    border-color: var(--color-primary);
    box-shadow: inset 0 0 0 1px var(--color-primary);
    background: var(--color-surface-raised);
  }
  .choice-label { font-family: var(--font-display); font-size: 1.125rem; line-height: 1.25; }
  .choice-detail { font-size: 0.9rem; line-height: 1.55; color: var(--color-text-muted); }

  .step-foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .foot-note {
    font-family: var(--font-eyebrow, var(--font-data));
    font-size: 0.625rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-text-faint);
  }

  .link {
    font: inherit;
    font-size: 0.875rem;
    color: var(--color-text-muted);
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
    border-bottom: 1px solid transparent;
  }
  .link:hover { color: var(--color-primary); border-bottom-color: var(--color-primary); }

  /* ------------------------------------------------------------ result -- */
  .result-body {
    margin: 1rem 0 0;
    font-size: clamp(1.05rem, 2vw, 1.2rem);
    line-height: 1.6;
    color: var(--color-text);
    max-width: 58ch;
  }
  .focus-note { color: var(--color-text-muted); }

  .why {
    margin-top: 1.75rem;
    padding: 1rem 1.2rem;
    border-left: 3px solid var(--color-primary);
    background: var(--color-surface);
    max-width: 60ch;
  }
  .why-k {
    margin: 0;
    font-family: var(--font-eyebrow, var(--font-data));
    font-size: 0.625rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-primary);
  }
  .why-v { margin: 0.4rem 0 0; font-size: 0.9375rem; line-height: 1.6; color: var(--color-text-muted); }

  .result-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.5rem; margin-top: 1.75rem; }
  .go {
    display: inline-flex;
    padding: 0.85rem 1.5rem;
    font-family: var(--font-display);
    font-size: 1.0625rem;
    text-decoration: none;
    color: var(--color-background);
    background: var(--color-primary);
    border-radius: var(--radius-control, 0.5rem);
    transition: filter 150ms ease, transform 150ms ease;
  }
  .go:hover { filter: brightness(1.08); transform: translateY(-1px); }

  .disclaimer {
    margin: 2rem 0 0;
    padding-top: 1rem;
    border-top: 1px solid var(--color-grid, var(--color-border));
    font-size: 0.8125rem;
    line-height: 1.6;
    color: var(--color-text-faint);
    max-width: 64ch;
  }

  /* ---------------------------------------------------- variant tweaks -- */
  .guide--journal .choice { background: none; border-radius: 0; border-width: 0 0 1px; padding-inline: 0; }
  .guide--journal .choice.is-picked { box-shadow: none; border-bottom: 2px solid var(--color-primary); background: none; }
  .guide--journal .go { border-radius: 0; }
  .guide--atlas .choice { border-radius: 0; }
  .guide--atlas .go { border-radius: 0; }
  .guide--practice .choice { border-radius: 1.25rem; }
  .guide--practice .go { border-radius: 999px; }
</style>

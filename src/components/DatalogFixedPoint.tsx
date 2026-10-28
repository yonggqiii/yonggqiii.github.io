import { createSignal, For, Show } from "solid-js";
import { deriveFacts, formatFact, inputFacts, type Fact } from "../data/datalog";
import Icon from "./Icon";

type Iteration = { round: number; facts: Fact[]; added: string[]; stable: boolean };
const initialState = (): Iteration => ({ round: 0, facts: [], added: [], stable: false });

export default function DatalogFixedPoint() {
  const [iteration, setIteration] = createSignal(initialState());

  const advance = () => {
    const previous = iteration();
    const facts = deriveFacts(previous.facts);
    const known = new Set(previous.facts.map(formatFact));
    const added = facts.map(formatFact).filter(fact => !known.has(fact));
    setIteration({ round: previous.round + 1, facts, added, stable: added.length === 0 });
  };

  const description = () => {
    if (iteration().stable) return "No new facts. The fixed point is complete.";
    if (iteration().round === 0) return "Start with an empty set of facts.";
    if (iteration().round === 1) return "The program contributes its three edge facts.";
    if (iteration().round === 2) return "Every edge gives us a direct path.";
    return "Extend the known paths by one more edge.";
  };

  return (
    <figure class="fixed-point datalog-figure" aria-label="Datalog computes the least fixed point of a reachability program">
      <div class="figure-top"><span class="eyebrow">From rules to results</span><span class="figure-index">FIG. 02</span></div>
      <div class="datalog-program" aria-label="Datalog program">
        <p class="datalog-label">The program</p>
        <pre><code>
          <span class="datalog-rule" classList={{ "rule-active": iteration().round === 1 }}><For each={inputFacts}>{(fact, index) => <>{index() > 0 ? " " : ""}{formatFact(fact)}.</>}</For></span>{"\n\n"}
          <span class="datalog-rule" classList={{ "rule-active": iteration().round === 2 }}>{"path(X, Y) :- edge(X, Y)."}</span>{"\n"}
          <span class="datalog-rule" classList={{ "rule-active": iteration().round > 2 && !iteration().stable }}>{"path(X, Z) :- path(X, Y),\n              edge(Y, Z)."}</span>
        </code></pre>
      </div>
      <div class="datalog-results">
        <div class="datalog-results-heading">
          <span class="datalog-label">All known facts · I<sub>{iteration().round}</sub></span>
          <span class="datalog-count">{iteration().facts.length} facts</span>
        </div>
        <div class="datalog-fact-area">
          <Show when={iteration().facts.length > 0} fallback={<p class="datalog-empty" aria-label="The set of known facts is empty">∅</p>}>
            <ul class="datalog-facts">
              <For each={iteration().facts}>{fact => (
                <li class="datalog-fact" classList={{ "is-new": iteration().added.includes(formatFact(fact)) }}>
                  <code>{formatFact(fact)}</code>
                  <Show when={iteration().added.includes(formatFact(fact))}><span class="visually-hidden"> — new this round</span></Show>
                </li>
              )}</For>
            </ul>
          </Show>
        </div>
        <p class="datalog-legend"><span aria-hidden="true" />Highlighted facts are new this round.</p>
      </div>
      <figcaption class="figure-caption">Each round applies the rules to the previous round’s facts.</figcaption>
      <div class="figure-controls datalog-controls">
        <div class="datalog-status" role="status" aria-live="polite" aria-atomic="true">
          <span class="figure-state">{iteration().stable ? "Fixed point" : `Round ${String(iteration().round).padStart(2, "0")}`} · {iteration().added.length} new</span>
          <span class="datalog-explanation">{description()}</span>
          <Show when={iteration().added.length > 0}><span class="visually-hidden">Added: {iteration().added.join("; ")}.</span></Show>
        </div>
        <button class="figure-button" type="button" onClick={() => iteration().stable ? setIteration(initialState()) : advance()}>
          {iteration().stable ? "Reset" : "Iterate"}<Icon name={iteration().stable ? "reset" : "arrow"} />
        </button>
      </div>
    </figure>
  );
}

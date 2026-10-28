import { createSignal, For, Show } from "solid-js";
import Icon from "./Icon";

const nodes = [
  { label: "∅", horizontal: 190, vertical: 265, step: 0 },
  { label: "{a}", horizontal: 80, vertical: 190, step: 1 },
  { label: "{b}", horizontal: 190, vertical: 190, step: -1 },
  { label: "{c}", horizontal: 300, vertical: 190, step: -1 },
  { label: "{a,b}", horizontal: 80, vertical: 105, step: 2 },
  { label: "{a,c}", horizontal: 190, vertical: 105, step: -1 },
  { label: "{b,c}", horizontal: 300, vertical: 105, step: -1 },
  { label: "{a,b,c}", horizontal: 190, vertical: 30, step: 3 },
];
const edges = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 4], [2, 6], [3, 5], [3, 6], [4, 7], [5, 7], [6, 7]];
const states = ["Start with an empty set", "Add a", "a implies b; add b", "b implies c; add c", "No change. A fixed point!"];

export default function FixedPoint() {
  const [step, setStep] = createSignal(0);
  const visited = (nodeIndex: number) => nodes[nodeIndex].step >= 0 && nodes[nodeIndex].step <= step();

  return (
    <figure class="fixed-point" aria-label="Interactive fixed-point iteration on the subsets of a, b, and c">
      <div class="figure-top"><span class="eyebrow">A small exploration</span><span class="figure-index">FIG. 01</span></div>
      <svg class="lattice" viewBox="0 0 380 300" aria-hidden="true">
        <For each={edges}>{([source, target]) => (
          <line x1={nodes[source].horizontal} y1={nodes[source].vertical} x2={nodes[target].horizontal} y2={nodes[target].vertical} class="lattice-edge" classList={{ visited: visited(source) && visited(target) }} />
        )}</For>
        <For each={nodes}>{(node, index) => (
          <g>
            <Show when={node.step === Math.min(step(), 3)}><circle class="lattice-halo" cx={node.horizontal} cy={node.vertical} r="14" /></Show>
            <circle class="lattice-node" classList={{ visited: visited(index()) }} cx={node.horizontal} cy={node.vertical} r="5" />
            <text class="lattice-label" classList={{ visited: visited(index()) }} x={node.horizontal} y={node.vertical + (node.step === 0 ? 25 : -17)}>{node.label}</text>
          </g>
        )}</For>
      </svg>
      <div class="figure-equation" aria-hidden="true">f(x*) = x*</div>
      <figcaption class="figure-caption">Keep applying a rule. Find what stays the same.</figcaption>
      <div class="figure-controls">
        <span class="figure-state" role="status" aria-live="polite" aria-atomic="true">{String(step()).padStart(2, "0")} / {states[step()]}</span>
        <button class="figure-button" type="button" onClick={() => setStep(step() === 4 ? 0 : step() + 1)}>
          {step() === 4 ? "Reset" : "Iterate"}<Icon name={step() === 4 ? "reset" : "arrow"} />
        </button>
      </div>
      <span class="visually-hidden">The rule always includes a, adds b when a is present, and adds c when b is present. Each iteration keeps the elements already found. Starting from the empty set, the process reaches the fixed point containing a, b, and c.</span>
    </figure>
  );
}

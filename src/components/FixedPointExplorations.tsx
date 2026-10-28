import { createSignal } from "solid-js";
import DatalogFixedPoint from "./DatalogFixedPoint";
import FixedPoint from "./FixedPoint";

export default function FixedPointExplorations() {
  const [figure, setFigure] = createSignal(1);

  return (
    <div class="fixed-point-explorations">
      <div id="figure-one" class="figure-panel" hidden={figure() !== 1}><FixedPoint /></div>
      <div id="figure-two" class="figure-panel" hidden={figure() !== 2}><DatalogFixedPoint /></div>
      <div class="figure-selector" role="group" aria-label="Choose a fixed-point demonstration">
        <button type="button" aria-pressed={figure() === 1} aria-controls="figure-one" onClick={() => setFigure(1)}><span>01</span>The idea</button>
        <button type="button" aria-pressed={figure() === 2} aria-controls="figure-two" onClick={() => setFigure(2)}><span>02</span>In Datalog</button>
      </div>
    </div>
  );
}

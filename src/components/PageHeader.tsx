import type { JSX } from "solid-js";

export default function PageHeader(props: { number: string; label: string; title: string; children: JSX.Element }) {
  return (
    <header class="page-heading">
      <p class="eyebrow"><span class="section-number">{props.number}</span> {props.label}</p>
      <h1>{props.title}<span class="accent">.</span></h1>
      <div class="page-intro">{props.children}</div>
    </header>
  );
}

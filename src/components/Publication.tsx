import { For, Show } from "solid-js";
import { A } from "solid-start";
import type { ResearchWork } from "../data/research";
import Icon from "./Icon";

export default function Publication(props: { work: ResearchWork; compact?: boolean }) {
  return (
    <article class="publication" id={props.work.id}>
      <div class="publication-meta">
        <span class="venue">{props.work.venue}</span>
        <Show when={props.work.year}><span class="publication-year">{props.work.year}</span></Show>
      </div>
      <div>
        <h3><Show when={props.compact} fallback={props.work.title}><A href={`/research#${props.work.id}`}>{props.work.title}</A></Show></h3>
        <Show when={props.work.authors}>
          <p class="publication-authors"><For each={props.work.authors}>{(author, index) => <>{index() > 0 ? ", " : ""}<Show when={author === "Yong Qi Foo"} fallback={author}><strong>{author}</strong></Show></>}</For></p>
        </Show>
        <p class="publication-summary">{props.work.summary}</p>
        <Show when={!props.compact}>
          <div class="tags"><For each={props.work.topics}>{topic => <span class="tag">{topic}</span>}</For></div>
          <details class="paper-details"><summary>Read abstract</summary><p>{props.work.abstract}</p></details>
        </Show>
        <Show when={props.work.links.length > 0}>
          <div class="publication-links"><For each={props.work.links}>{link => <a href={link.href}>{link.label}<Icon name="external" /></a>}</For></div>
        </Show>
      </div>
    </article>
  );
}

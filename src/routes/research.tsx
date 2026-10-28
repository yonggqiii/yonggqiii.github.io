import { createMemo, createSignal, For } from "solid-js";
import { Meta, Title } from "solid-start";
import PageHeader from "../components/PageHeader";
import Publication from "../components/Publication";
import { research } from "../data/research";

const filters = [{ value: "all", label: "All work" }, { value: "publication", label: "Publications" }, { value: "project", label: "Projects" }] as const;

export default function Research() {
  const [filter, setFilter] = createSignal<string>("all");
  const filteredWork = createMemo(() => research.filter(work => filter() === "all" || work.category === filter()));

  return (
    <main id="main-content" class="container page-content">
      <Title>Research — Foo Yong Qi</Title>
      <Meta name="description" content="Research in programming languages, fixed-point-oriented programming, compiler optimizations, and type systems by Foo Yong Qi." />
      <PageHeader number="01" label="Research & projects" title="Expressiveness and efficiency">
        <p>I work on programming languages and the tools that make them useful: better abstractions, efficient implementations, and ways to reason about programs. My PhD advisor at NUS is Michael D. Adams.</p>
      </PageHeader>
      <div class="research-context">
        <div><h2>Programming with fixed points</h2><p>Languages that make iterative, cyclic computations easier to express and optimize.</p></div>
        <div><h2>Abstraction without the overhead</h2><p>Compiler techniques that bring expressive functional programs closer to hand-written performance.</p></div>
        <div><h2>Programs, types & proofs</h2><p>Using type systems and interactive theorem proving to build and understand software.</p></div>
      </div>
      <div class="filter-bar" role="group" aria-label="Filter research">
        <For each={filters}>{item => <button class="filter-button" type="button" aria-pressed={filter() === item.value} aria-controls="research-results" onClick={() => setFilter(item.value)}>{item.label}</button>}</For>
        <span class="filter-count" role="status" aria-live="polite">{filteredWork().length} works</span>
      </div>
      <div class="research-list" id="research-results"><For each={filteredWork()}>{work => <Publication work={work} />}</For></div>
    </main>
  );
}

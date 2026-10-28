import { For } from "solid-js";
import { Title } from "solid-start";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";

const resources = [
  { number: "01", title: "Typed functional programming", description: "Course notes for IT5100A, exploring the ideas and techniques behind typed functional programming.", href: "https://yongqi.foo/it5100a-notes" },
  { number: "02", title: "Functors, monads & category theory", description: "An article connecting familiar programming constructs to their mathematical definitions in category theory.", href: "/papers/fun/Monads.pdf" },
  { number: "03", title: "Teaching templates", description: "LaTeX templates for exam booklets, assignments, solutions, and the documents that accompany a course.", href: "https://github.com/yonggqiii/teaching_templates" },
  { number: "04", title: "Article template", description: "A LaTeX starting point for typesetting articles.", href: "https://github.com/yonggqiii/article_template" },
  { number: "05", title: "The blog", description: "More writing, notes, and things I’m thinking about.", href: "https://yongqi.foo/blog/" },
];

export default function Resources() {
  return (
    <main id="main-content" class="container page-content">
      <Title>Notes & Resources — Foo Yong Qi</Title>
      <PageHeader number="05" label="Notes & resources" title="A few useful things"><p>Course notes, mathematical detours, and templates from my research and teaching.</p></PageHeader>
      <div class="resource-list"><For each={resources}>{resource => (
        <a class="resource" href={resource.href}><span class="eyebrow">{resource.number}</span><div><h2>{resource.title}</h2><p>{resource.description}</p></div><Icon name="external" /></a>
      )}</For></div>
    </main>
  );
}

import { For } from "solid-js";
import { Title } from "solid-start";
import NewsItem from "../components/NewsItem";
import PageHeader from "../components/PageHeader";
import { news } from "../data/news";

export default function News() {
  const years = [...new Set(news.map(entry => entry.date.slice(0, 4)))];

  return (
    <main id="main-content" class="container page-content">
      <Title>News — Foo Yong Qi</Title>
      <PageHeader number="04" label="The archive" title="Along the way"><p>Papers, talks, teaching, and occasional milestones. A record of what I’ve been up to.</p></PageHeader>
      <For each={years}>{year => (
        <section class="archive-year" aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`}>{year}</h2>
          <div><For each={news.filter(entry => entry.date.startsWith(year))}>{entry => <NewsItem entry={entry} />}</For></div>
        </section>
      )}</For>
    </main>
  );
}

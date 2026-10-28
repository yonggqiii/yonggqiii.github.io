import { For } from "solid-js";
import { A, Title } from "solid-start";
import FixedPointExplorations from "../components/FixedPointExplorations";
import Icon from "../components/Icon";
import NewsItem from "../components/NewsItem";
import Publication from "../components/Publication";
import { news } from "../data/news";
import { research } from "../data/research";

export default function Home() {
  return (
    <main id="main-content" class="container">
      <Title>Foo Yong Qi — Research & Teaching</Title>
      <section class="hero" aria-labelledby="introduction">
        <div class="hero-copy">
          <p class="eyebrow"><span class="status-dot" />Computer scientist · Singapore</p>
          <h1 id="introduction">Foo Yong Qi<span class="accent">.</span></h1>
          <p class="hero-description">I study programming languages, and how to make them more expressive, efficient, and a little more elegant.</p>
          <p class="hero-affiliation">Instructor & PhD candidate in Computer Science<br /><a href="https://www.comp.nus.edu.sg/">National University of Singapore</a></p>
          <div class="hero-actions">
            <A href="/research" class="button">Explore my research <Icon /></A>
            <A href="/cv" class="text-link">Curriculum vitae <Icon name="external" /></A>
          </div>
        </div>
        <FixedPointExplorations />
      </section>

      <div class="research-areas" aria-label="Research interests">
        <span class="eyebrow">A few things I think about</span>
        <span><span class="area-symbol" aria-hidden="true">λ</span>Programming languages</span>
        <span><span class="area-symbol" aria-hidden="true">↻</span>Fixed-point programming</span>
        <span><span class="area-symbol" aria-hidden="true">↗</span>Compiler optimizations</span>
      </div>

      <section class="home-section" aria-labelledby="selected-research">
        <div class="section-heading">
          <div><p class="eyebrow"><span class="section-number">01</span>Ideas into papers</p><h2 id="selected-research">Selected research</h2></div>
          <A href="/research" class="text-link">All research & projects <Icon /></A>
        </div>
        <For each={research.filter(work => work.category === "publication")}>{work => <Publication work={work} compact />}</For>
      </section>

      <div class="home-split">
        <section class="home-news" aria-labelledby="latest-news">
          <div class="section-heading"><div><p class="eyebrow"><span class="section-number">02</span>Along the way</p><h2 id="latest-news">Recently</h2></div></div>
          <For each={news.slice(0, 4)}>{entry => <NewsItem entry={entry} includeYear />}</For>
          <A href="/news" class="text-link">The news archive <Icon /></A>
        </section>
        <section aria-labelledby="teaching-preview-title">
          <div class="teaching-preview">
            <p class="eyebrow"><span class="section-number">03</span>In the classroom</p>
            <h3 id="teaching-preview-title">Making the abstract<br /><em>make sense.</em></h3>
            <p>I teach programming, systems, and the mathematics behind them, connecting foundational ideas to the practice of building software.</p>
            <A href="/teaching#it5100a" class="mini-course"><span>IT5100A</span>Typed Functional Programming</A>
            <A href="/teaching#it5100b" class="mini-course"><span>IT5100B</span>Stream Processing</A>
            <A href="/teaching#it5100e" class="mini-course"><span>IT5100E</span>Security Best Practices</A>
            <A href="/teaching" class="text-link">Teaching & course materials <Icon /></A>
          </div>
          <p class="personal-note"><span aria-hidden="true">✧</span><span>Recipient of the NUS Faculty Teaching Excellence Award, 2025.</span></p>
        </section>
      </div>
    </main>
  );
}

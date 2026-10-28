import { For, Show } from "solid-js";
import { A, Meta, Title } from "solid-start";
import Icon from "../../components/Icon";
import PageHeader from "../../components/PageHeader";
import { awards, education, employment, projects, type CVEntry } from "../../data/cv";

function CVSection(props: { title: string; entries: CVEntry[] }) {
  return (
    <section class="cv-section" aria-label={props.title}>
      <h2>{props.title}</h2>
      <div><For each={props.entries}>{entry => (
        <article class="cv-entry">
          <div class="cv-entry-heading"><h3>{entry.title}</h3><span class="cv-date">{entry.date}</span></div>
          <p class="cv-place">{entry.place}</p>
          <Show when={entry.description}><p class="cv-description">{entry.description}</p></Show>
        </article>
      )}</For></div>
    </section>
  );
}

export default function CV() {
  return (
    <main id="main-content" class="container page-content">
      <Title>Curriculum Vitae — Foo Yong Qi</Title>
      <Meta name="description" content="Foo Yong Qi’s education, academic appointments, publications, projects, and awards." />
      <PageHeader number="03" label="Curriculum vitae" title="Foo Yong Qi">
        <p>Instructor & PhD candidate in Computer Science<br />National University of Singapore<br /><a href="mailto:knockknock@yongqi.foo">knockknock@yongqi.foo</a></p>
        <div class="cv-actions"><button class="button" type="button" onClick={() => window.print()}>Print / save as PDF <Icon name="external" /></button><A href="/research" class="button secondary">Research & publications <Icon /></A></div>
      </PageHeader>
      <CVSection title="Education" entries={education} />
      <CVSection title="Appointments" entries={employment} />
      <CVSection title="Recognition" entries={awards} />
      <CVSection title="Projects" entries={projects} />
      <section class="cv-section" aria-labelledby="skills-title">
        <h2 id="skills-title">Skills & languages</h2>
        <div class="cv-skills">
          <div><h3>Programming</h3><p>Haskell, Lean, ML, Scala, Java, Python, C/C++, Rust, Go, JavaScript, TypeScript, R.</p></div>
          <div><h3>Development & tools</h3><p>Solid, Vue, Nuxt, React, Quasar, Node.js, Firebase, PyTorch, OpenCV, Google Cloud Platform, HTML, CSS, LaTeX, Markdown.</p></div>
          <div><h3>Languages</h3><p>English and Mandarin.</p></div>
          <div><h3>Other software</h3><p>Microsoft Office, Tableau, Stella Architect, AutoMod Simulation.</p></div>
        </div>
      </section>
    </main>
  );
}

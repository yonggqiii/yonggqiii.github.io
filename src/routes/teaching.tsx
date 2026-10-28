import { For, Show } from "solid-js";
import { Meta, Title } from "solid-start";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import { courses, pastCourses } from "../data/courses";

export default function Teaching() {
  return (
    <main id="main-content" class="container page-content">
      <Title>Teaching — Foo Yong Qi</Title>
      <Meta name="description" content="Courses and materials by Foo Yong Qi at NUS: functional programming, stream processing, security, and computing foundations." />
      <PageHeader number="02" label="Teaching & learning" title="Making ideas click">
        <p>From a first program to a first proof, I enjoy helping students connect abstract ideas with things they can build. I teach at the NUS School of Computing, with a focus on the foundations and practice of software development.</p>
      </PageHeader>
      <aside class="callout"><p>Faculty Teaching Excellence Award · National University of Singapore, 2025</p><p>Previously recognized with the Full-Time Teaching Assistant Award (2022) and the Honour List of Student Tutors (2019, 2021).</p></aside>
      <section aria-labelledby="selected-courses">
        <div class="subsection-heading"><h2 id="selected-courses">Selected courses</h2><p>Teaching history and scheduled offerings</p></div>
        <div class="course-grid"><For each={courses}>{course => (
          <article class="course" id={course.code.toLowerCase()}>
            <div class="course-top"><span class="course-code">{course.code}</span><span class="course-category">{course.category}</span></div>
            <h3>{course.title}</h3>
            <p class="course-description">{course.description}</p>
            <div class="tags"><For each={course.topics}>{topic => <span class="tag">{topic}</span>}</For></div>
            <Show when={course.notes}><a class="text-link" href={course.notes}>Read the course notes <Icon name="external" /></a></Show>
            <details><summary>Course offerings</summary><p>{course.semesters}</p></details>
          </article>
        )}</For></div>
      </section>
      <section aria-labelledby="past-courses">
        <div class="subsection-heading"><h2 id="past-courses">Previously taught</h2><p>Lecturing and tutoring</p></div>
        <For each={pastCourses}>{course => (
          <article class="past-course">
            <span class="course-code">{course.code}</span>
            <div><h3>{course.title}</h3><p>{course.description}</p><p class="course-semesters">{course.semesters}</p></div>
          </article>
        )}</For>
      </section>
    </main>
  );
}

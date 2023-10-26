import { Title } from "solid-start";
import Card from "../components/Card";

export default function Fun() {
  return (
    <main>
      <Title>Fun - Foo Yong Qi</Title>
      <h1>Fun</h1>
      <Card border="mauve" header_color="green" header="LaTeX Templates">
        <p>
          Templates for typesetting a bunch of documents I frequently create can be found in my <a href="https://github.com/yonggqiii/">GitHub</a>.
        </p>
        <ul>
        <li>
          Exam question booklets, answer booklets, solutions manuals and assignments (questions and solutions): <a href="https://github.com/yonggqiii/teaching_templates">Teaching Templates</a>
        </li>
        </ul>
    
      </Card>
    </main>

  );
}

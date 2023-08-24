import { Title } from "solid-start";
import { HttpStatusCode } from "solid-start/server";

export default function Fun() {
  return (
    <main>
      <Title>Fun - Foo Yong Qi</Title>
      <HttpStatusCode code={404} />
      <h1>Page Not Found</h1>
      <p class="red">Page coming soon...</p>
    </main>
  );
}

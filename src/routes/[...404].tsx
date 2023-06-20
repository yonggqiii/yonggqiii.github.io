import { Title } from "solid-start";
import { HttpStatusCode } from "solid-start/server";

export default function NotFound() {
  return (
    <main>
      <Title>Page Not Found</Title>
      <HttpStatusCode code={404} />
      <h1>Page Not Found</h1>
      <p class="red">Where are you going?</p>
    </main>
  );
}

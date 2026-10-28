import { A, Title } from "solid-start";
import { HttpStatusCode } from "solid-start/server";
import Icon from "../components/Icon";

export default function NotFound() {
  return (
    <main id="main-content" class="container not-found">
      <Title>Page Not Found — Foo Yong Qi</Title>
      <HttpStatusCode code={404} />
      <span class="eyebrow">404 / A small detour</span>
      <h1>Nothing here<span class="accent">.</span></h1>
      <p>This page may have moved, or the address may be a little off.</p>
      <A href="/" class="button">Back to the homepage <Icon /></A>
    </main>
  );
}

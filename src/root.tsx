// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { themeInitialization } from "./components/ThemeToggle";
import "./root.css";


export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Foo Yong Qi</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="theme-color" content="#f9f8f4" />
        <script innerHTML={themeInitialization} />
        <Meta name="description" content="Foo Yong Qi is an instructor and PhD candidate in Computer Science at the National University of Singapore, researching programming languages and compiler optimizations." />
        <Meta property="og:site_name" content="Foo Yong Qi" />
        <Meta property="og:type" content="website" />
        <Meta property="og:title" content="Foo Yong Qi — Programming languages, research & teaching" />
        <Meta property="og:description" content="Exploring expressive languages and efficient programs. Research and teaching at the National University of Singapore." />
        <Link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <Body id="top">
        <a class="skip-link" href="#main-content">Skip to content</a>
        <Suspense>
          <ErrorBoundary>
            <NavBar />
            <Routes>
              <FileRoutes />
            </Routes>
            <Footer />
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}

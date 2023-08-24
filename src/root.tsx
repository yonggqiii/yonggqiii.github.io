// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import NavBar from "./components/NavBar";
import "./fonts/Iosevka/iosevka-regular.woff2";
import "./fonts/Iosevka/iosevka-bold.woff2";
import "./fonts/Iosevka/iosevka-italic.woff2";
import "./root.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Foo Yong Qi</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <NavBar />
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}

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
import "./fonts/Geist/Geist-Regular.woff2";
import "./fonts/Geist/Geist-Black.woff2";
import "./fonts/Geist/Geist-Light.woff2";
import "./fonts/Geist/Geist-Bold.woff2";
import "./fonts/Geist/Geist-Medium.woff2";
import "./fonts/Geist/Geist-SemiBold.woff2";
import "./fonts/Geist/Geist-Thin.woff2";
import "./fonts/Geist/Geist-UltraBlack.woff2";
import "./fonts/Geist/Geist-UltraLight.woff2";
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

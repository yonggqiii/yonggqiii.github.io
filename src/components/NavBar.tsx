import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { A, useLocation } from "solid-start";
import Icon from "./Icon";
import ThemeToggle from "./ThemeToggle";
import "./NavBar.css";

export default function NavBar() {
  const [open, setOpen] = createSignal(false);
  const location = useLocation();
  let menuButton: HTMLButtonElement | undefined;

  createEffect(() => {
    location.pathname;
    setOpen(false);
  });

  onMount(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open()) {
        setOpen(false);
        menuButton?.focus();
      }
    };
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Element && !event.target.closest(".site-header")) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("click", closeOnOutsideClick);
    onCleanup(() => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("click", closeOnOutsideClick);
    });
  });

  return (
    <header class="site-header">
      <div class="container header-inner">
        <A href="/" class="wordmark" aria-label="Foo Yong Qi — home">
          <span class="monogram" aria-hidden="true">f.</span>
          <span>Foo Yong Qi<span class="wordmark-detail">Computer science · NUS</span></span>
        </A>
        <nav id="primary-navigation" class="primary-navigation" classList={{ "is-open": open() }} aria-label="Main navigation">
          <A href="/" end>About</A>
          <A href="/research">Research</A>
          <A href="/teaching">Teaching</A>
          <a href="https://yongqi.foo/blog/">Blog <Icon name="external" /></a>
          <A href="/cv">CV</A>
          <a class="nav-contact" href="mailto:knockknock@yongqi.foo">Get in touch <Icon name="external" /></a>
        </nav>
        <div class="header-controls">
          <ThemeToggle />
          <button ref={menuButton} type="button" class="menu-toggle" aria-label={open() ? "Close navigation" : "Open navigation"} aria-expanded={open()} aria-controls="primary-navigation" onClick={() => setOpen(!open())}>
            <Icon name={open() ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}

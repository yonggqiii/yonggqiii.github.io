import { A } from "solid-start";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer class="site-footer">
      <div class="container footer-top">
        <div>
          <p class="eyebrow">Good conversations start somewhere.</p>
          <a class="footer-email" href="mailto:knockknock@yongqi.foo">Say hello.<Icon name="external" /></a>
          <p class="footer-address">COM2-02-27 · National University of Singapore<br />15 Computing Drive, Singapore 117418</p>
        </div>
        <div class="footer-links">
          <a href="mailto:knockknock@yongqi.foo">Email <Icon name="external" /></a>
          <a href="https://github.com/yonggqiii">GitHub <Icon name="external" /></a>
          <a href="https://yongqi.foo/blog/">Blog <Icon name="external" /></a>
          <A href="/fun">Notes & resources <Icon /></A>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© {new Date().getFullYear()} Foo Yong Qi</span>
        <span class="footer-aside">
          <svg viewBox="0 0 32 24" width="25" height="19" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 11c3 2 5 2 8 1l1-5a5 5 0 0 1 10 0v2l5 2-6 2c-1 6-5 8-11 7-5-1-7-4-7-9Z" /><circle cx="20" cy="6" r=".8" fill="currentColor" stroke="none" /><path d="M9 14c2 3 5 3 7 1" /></svg>
          Partial to good abstractions. And ducks.
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}

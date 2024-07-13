import { A } from "solid-start";
import "./NavBar.css";
export default function NavBar() {
  return (
    <nav>
      <div class="nav-bar">
        <A href="/">
          <button class="btn home">
  <svg class="home-svg" fill="currentColor" viewBox="0 0 75 65"><path d="M37.59.25l36.95 64H.64l36.95-64z"></path></svg>
          </button>
        </A>
        <div class="nav-grp">
          <A href="/cv">
            <button class="btn">
              CV
            </button>
          </A>
          <A href="/teaching">
            <button class="btn">
              Teaching
            </button>
          </A>
          <A href="/research">
            <button class="btn">
              Research
            </button>
          </A>
          <A href="/fun">
            <button class="btn">
              Fun
            </button>
          </A>
        </div>
      </div>
      <div id="menuToggle">
        <input id="checkbox" type="checkbox" />
        <label class="toggle" for="checkbox">
          <div class="bar bar--top"></div>
          <div class="bar bar--middle"></div>
          <div class="bar bar--bottom"></div>
          <div id="nav-pane">
            <A class="navitem" href="/">
              Home
            </A>
            <A class="navitem" href="/cv">
              CV
            </A>
            <A class="navitem" href="/teaching">
              Teaching
            </A>
            <A class="navitem" href="/research">
              Research
            </A>
            <A class="navitem" href="/fun">
              Fun
            </A>
          </div>
        </label>
      </div>
    </nav>
  );
}

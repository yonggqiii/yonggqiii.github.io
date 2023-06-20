import { A } from "solid-start";
import "./NavBar.css";
export default function NavBar() {
  return (
    <nav>
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
    </nav>
  );
}

import { Title } from "solid-start";
import Card from "../components/Card";

export default function Home() {
  return (
    <main>
      <Title>Foo Yong Qi</Title>
      <div class="big-name">
      <p class="big-name-name">
        <strong>Foo</strong> Yong Qi<span class="blinking">.</span>
      </p>
      <p>
        Keep it simple, stupid.
      </p>
      </div>

      <div class="flex-row">
      <div class="box left-box" id="about-box">
          <h2>About</h2>
          <p><strong>Instructor</strong> and <strong>PhD in Computer Science candidate</strong> at the Department of Computer Science, School of Computing, <strong>National University of Singapore</strong>.</p>
          <p>Likes ducks and programming languages.</p>
      </div>
      <div class="box">
          <h2>Contact</h2>
          <p><strong>Email</strong>: yongqi@nus.edu.sg<br/><strong>DID</strong>: +6516 7960<br/><strong>Office</strong>: COM2-02-27, 15 Computing Drive, Singapore 117418</p>
      </div>
      </div>
    </main>
  );
}

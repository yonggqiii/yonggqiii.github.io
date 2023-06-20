import { Title } from "solid-start";
import Card from "../components/Card";

export default function Home() {
  return (
    <main>
      <Title>Foo Yong Qi</Title>
      <img class="circle profile-pic" src="../yongqi.jpg" />
      <h1>
        <strong class="red">Foo</strong> Yong Qi
      </h1>
      <div>
        <em>Keep it simple, stupid.</em>
      </div>
      <Card border="mauve" header_color="green" header="About">
        <p>
          <em class="teal">Instructor</em> and{" "}
          <em class="flamingo">PhD in Computer Science candidate</em> at the
          Department of Computer Science, School of Computing,{" "}
          <em class="sky">National University of Singapore</em>.
        </p>
        <p>
          I like <em class="yellow">ducks</em>,{" "}
          <em class="red">type systems</em>, and{" "}
          <em class="lavender">programming languages</em>
        </p>
      </Card>
      <Card border="flamingo" header_color="teal" header="Contact">
        <div>
          <strong>Email</strong>: <em class="sapphire">yongqi@nus.edu.sg</em>
        </div>
        <div>
          <strong>DID</strong>: <em class="rosewater">+65 6516 7960</em>
        </div>
        <div>
          <strong>Office</strong>:{" "}
          <em class="peach">
            COM2-02-27, 15 Computing Drive, Singapore 117418
          </em>
        </div>
      </Card>
    </main>
  );
}

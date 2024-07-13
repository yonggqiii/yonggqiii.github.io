import { Title } from "solid-start";
import Card from "../components/Card";
export default function Teaching() {
  return (
    <main>
      <Title>Research - Foo Yong Qi</Title>
      <div class="box solo">
        <h2>Reconstruction of Incomplete Polymorphic Programs</h2>
        <p>
The ability to reconstruct the dependencies of incomplete programs to form complete and well-typed ones provides several benefits, including allowing static analysis tools to analyse incomplete programs where their surrounding dependencies are unavailable, and supporting stub generation and testing tools to work on snippets. However, earlier efforts to do so are unable to work with incomplete programs containing parametrically polymorphic types. 
</p><p>
In this paper, we present a technique that receives an incomplete Java program that may contain parametrically polymorphic types, and reconstructs its surrounding dependencies to form a complete and well-typed program. We then present empirical results from our prototype implementation of this algorithm, JavaCIP, which outperforms prior works in this area.
        </p>
        <p>
        <a href="../papers/javacip/Reconstruction of Incomplete Polymorphic Programs.pdf">Submitted Author's Copy (Under Review) </a> | <a href="../papers/javacip/Poster.pdf">Poster</a>
        </p>
      </div>
    </main>
  );
}

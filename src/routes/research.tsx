import { Title } from "solid-start";
import Card from "../components/Card";
export default function Teaching() {
  return (
    <main>
      <Title>Research - Foo Yong Qi</Title>
      <h1>Research</h1>
      <Card header="Type-Safe Auto-Completion of Incomplete Polymorphic Programs" header_color="yellow" border="peach">
        <h3>Abstract</h3>
        <p>
        Incomplete programs are ubiquitous in both web repositories and evolving software projects.  The ability to perform auto-completion on these incomplete programs provides several benefits, including allowing static analysis tools to analyse incomplete programs and boosting developer productivity. However, earlier efforts to do so (1) are unable to work with incomplete programs containing parametrically polymorphic types and (2) may not respect the type safety of the incomplete program.
</p><p>
In this paper we present an algorithm that receives an incomplete Java program that may contain parametrically polymorphic types, and reconstructs its surrounding dependencies to form a complete and well-typed program. As this algorithm does so in a type-safe manner, it can also find non-trivial type errors in incomplete programs. Finally, we present results from a prototype implementation of this algorithm, <span style="font-variant: small-caps">JavaCIP</span>.
        </p>
        <a href="../papers/javacip/Type-Safe Auto-Completion of Incomplete Polymorphic Programs.pdf">Submitted Author's Copy (Under Review) </a> | <a href="../papers/javacip/Poster.pdf">Poster</a>
      </Card>
    </main>
  );
}

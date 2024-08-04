import { Title } from "solid-start";
import Tags from "../components/Tags.tsx"
import Tag from "../components/Tag.tsx"
export default function Teaching() {
  return (
    <main>
      <Title>Research - Foo Yong Qi</Title>
      <div class="flex-row">
        <div class="box left-box">
          <h2>Reconstruction of Incomplete Polymorphic Programs</h2>
          <p>
  The ability to reconstruct the dependencies of incomplete programs to form complete and well-typed ones provides several benefits, including allowing static analysis tools to analyse incomplete programs where their surrounding dependencies are unavailable, and supporting stub generation and testing tools to work on snippets. However, earlier efforts to do so are unable to work with incomplete programs containing parametrically polymorphic types. 
  </p><p>
  In this paper, we present a technique that receives an incomplete Java program that may contain parametrically polymorphic types, and reconstructs its surrounding dependencies to form a complete and well-typed program. We then present empirical results from our prototype implementation of this algorithm, JavaCIP, which outperforms prior works in this area.
          </p>
          <p>
          <a href="../papers/javacip/Reconstruction of Incomplete Polymorphic Programs.pdf">Submitted Author's Copy (Under Review) </a> | <a href="../papers/javacip/Poster.pdf">Poster</a>
          </p>
          <Tags>
            <Tag>Type Systems</Tag>
            <Tag>Polymorphism</Tag>
            <Tag>Program Analysis</Tag>
            <Tag>Java</Tag>
            <Tag>Submitted</Tag>
          </Tags>
        </div>
        <div class="box">
          <h2>Motivating Mathematics Study in Prospective Computer Scientists with Interactive Theorem Provers</h2>
          <p>
            The Curry-Howard correspondence shows that terms, types, programs and program evaluation correspond to witnesses, propositions, proofs and proof normalization in (intuitionistic) logic. This has spawned a large body of work in the literature known as <em>proof assistants</em> or <em>interactive theorem provers</em> that exploit this correspondence via a programming language with a type system that supports proof checking.
          </p>
          <p>On the other hand, the need to study mathematics may not be immediately apparent to budding software engineers, particularly those aiming to enter industry post-study. Our aim is motivate students to study mathematics by showing that the art of writing programs is the same as the art of writing a proof. We do so by writing both proofs and programs in Lean 4.</p>
          <Tags>
            <Tag>Education</Tag>
            <Tag>In Progress (early)</Tag>
          </Tags>
        </div>
      </div>
      <div class="box solo">
        <h2>Optimizing SYB Traversals via Specialization</h2>
        <p>
          Scrap Your Boilerplate (SYB) supports generic traversals to eliminate boilerplate code, but suffers from poor performance. While there have been attempts to optimize uses of SYB, some require a rewrite of code, or the optimizations themselves run slowly.
        </p>
            <p>We show that with new forms of specialization, we are able to optimize SYB traversals quickly and effectively.</p>
          <Tags>
            <Tag>Generic Programming</Tag>
            <Tag>Scrap Your Boilerplate</Tag>
            <Tag>Haskell</Tag>
            <Tag>Polymorphism</Tag>
            <Tag>In Progress (early)</Tag>
          </Tags>
      </div>

    </main>
  );
}

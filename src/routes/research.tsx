import { Title } from "solid-start";
import Tags from "../components/Tags.tsx"
import Tag from "../components/Tag.tsx"
export default function Teaching() {
  return (
    <main>
      <Title>Research - Foo Yong Qi</Title>
      <div class="flex-row">
        <div class="box left-box">

          <h2>Pushing the Information-Theoretic Limits of Random Access Lists</h2>
          <p>Edward Peters, <strong>Yong Qi Foo</strong>, Michael D. Adams</p>
          <p>
            Published at ICFP 2025.
          </p>

          <a href="../papers/myers.pdf">Pre-print </a> | <a href="https://doi.org/10.1145/3747536">DOI</a>

          <h4>Abstract</h4>
          <p>
            Accessing an arbitrary element of a traditional singly linked list
            or <tt>cons</tt> list requires traversing up to a linear number of
            pointers. A random-access list is a data structure that behaves like
            a <tt>cons</tt> list except that accessing an arbitrary element requires
            traversing only a logarithmic number of pointers. Specifically, in
            a list of length n, an arbitrary element can be accessed by traversing
            at most <tt>3 * ceil(log(n)) - 5</tt> pointers.
          </p>
          <p>
            In this paper, we present a simple variation on Myers lists that improves
            this bound and requires traversing at most <tt>2 * ceil(log(n + 1)) - 1</tt> pointers. We then present a more complicated variation that improves
            this bound to <tt>(1 + 1 / s) * ceil(log(n)) + s + 9</tt> for any <tt>s &gt;= 2</tt>. This shows that it is possible to get asymptotically
            close to the information-theoretically optimal bound of <tt>ceil(log(n + 1)) - 1</tt>.
          </p>
          <Tags>
            <Tag>Data Structures</Tag>
            <Tag>Functional Programming</Tag>
            <Tag>Published</Tag>
          </Tags>


        </div>
        <div class="box">
          <h2>Scrap your Rank-2 Polymorphic Functions</h2>
          <p>
            <em>Scrap Your Boilerplate</em> (SYB) is one of the most widely used generic programming libraries in Haskell, enabling concise and reusable traversals over complex data structures. Its influence extends beyond Haskell, with successful adaptations in languages such as Java, Scala and OCaml. Over time, the SYB approach has been extended to support more modular and expressive traversals. Yet, SYB-style traversals&mdash;including both the original and its variants&mdash;are notoriously slow, often an order of magnitude slower than handwritten traversals. Prior efforts to improve their performance using general-purpose optimizations have yielded only moderate success, while prior domain-specific optimizations tend to be overly specific to SYB, fail to address SYB extensions and are brittle against the evolution of its dependencies and the SYB library itself.
          </p>
          <p> In this paper, we distill the essence of SYB-style traversals and present a new general-purpose optimization based on the partial evaluation of rank-2 polymorphic functions. Our approach synthesizes standard optimizing compiler techniques, is not tied to SYB-specific details, and is straightforward to implement, making it more amenable to direct integration into optimizing compilers than previous, more specialized techniques. We demonstrate that our approach is both efficient and broadly applicable, eliminating most (if not all) of the overhead associated with using SYB and its variants.
          </p>
          <Tags>
            <Tag>Optimization</Tag>
            <Tag>Generic Programming</Tag>
            <Tag>Haskell</Tag>
            <Tag>Partial Evaluation</Tag>
            <Tag>In Progress (nearing completion)</Tag>
          </Tags>
        </div>
      </div>
      <div class="flex-row">
        <div class="box left-box">
          <h2>A Fixed-Point-Oriented Programming Language with User-Specified Optimization Strategies</h2>
          <p>
            There are a wide range of problems that are easily solved using a fixed-point algorithm instead of the more common programming strategies of loops and recursions. Examples of these include parsing, static analysis, type-checking, graph algorithms, and automata manipulation.  Existing language paradigms, such as the imperative and functional paradigms, support loops and recursions well but support fixed-point algorithms rather poorly.
          </p>
          <p>
            In this project, we will develop a programming language providing such support. In addition, by specifying problems at the abstraction-level of fixed points, our language can include mechanisms for the programmer to influence and optimize the solution strategy used by the implementation without the programmer having to modify the problem specification. This will allow users of the language to rapidly prototype and test a problem specification and to later specify optimizations while making only minimal changes to existing code, a task particularly difficult for fixed-point problems in existing languages.
          </p>
          <Tags>
            <Tag>Programming Paradigms</Tag>
            <Tag>Declarative Programming</Tag>
            <Tag>Fixed-Point-Oriented Programming</Tag>
            <Tag>Optimization</Tag>
            <Tag>In Progress (nearing completion)</Tag>
          </Tags>
        </div>
        <div class="box">
          <h2>Optimization Tactics (Functional Pearl)</h2>
          <p>
            Program optimizations are frequently done by the compiler. These optimizations are general purpose, so as to extract the best performance out of as many programs as possible. However, general-purpose optimizations may not be well-suited for some specific programs.
          </p>
          <p>Thus, we present <strong>optimization tactics</strong>, a new construct that allows users to define their own optimization strategies and to apply optimizations at specific program points. The library for supporting optimization tactics is implemented with Lean 4's powerful metaprogramming and theorem proving facilities, which allows users to:
          </p>
          <ul>
            <li>Easily define provably correctness-preserving optimization tactics as expression-to-expression transformation functions.</li>
            <li>Apply an optimization wherever a program term occurs</li>
            <li>Leverage Lean 4's interactive view to observe every step of the optimization</li>
            <li>Separate algorithm from optimization.</li>
          </ul>
          <p>
            Optimization tactics thus allows library authors to define domain-specific optimizations, and for library users to incorporate, extend and adapt optimization tactics to their specific use-case. We also propose that the interactivity of optimization tactics in Lean 4 allows researchers to explore new optimization techniques that can be applied to other functional programming languages.
          </p>
          <Tags>
            <Tag>Optimization</Tag>
            <Tag>Metaprogramming</Tag>
            <Tag>Lean 4</Tag>
            <Tag>In Progress (early)</Tag>
          </Tags>
        </div>
      </div>

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
    </main>
  );
}

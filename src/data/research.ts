export type ResearchWork = {
  id: string;
  title: string;
  authors?: string[];
  venue: string;
  year?: string;
  category: "publication" | "project";
  summary: string;
  abstract: string;
  topics: string[];
  links: { label: string; href: string }[];
};

export const research: ResearchWork[] = [
  {
    id: "class-dictionary-specialization",
    title: "Class-Dictionary Specialization with Rank-2 Polymorphic Functions",
    authors: ["Yong Qi Foo", "Michael D. Adams"],
    venue: "OOPSLA",
    year: "2026",
    category: "publication",
    summary: "Making expressive Haskell abstractions efficient: a partial evaluator that unlocks specialization for recursive rank-2 polymorphic functions.",
    abstract: "Rank-2 polymorphism and type-class constraints enable powerful abstractions, but recursive functions can prevent GHC from specializing their polymorphic arguments. Our technique combines inlining, β-reduction, and memoization to expose concrete types and dictionaries to the compiler. Type-constant folding then evaluates type-equality tests statically. Implemented as a GHC plugin, the technique achieves average speedups of 43× for Scrap Your Boilerplate (up to 155×), 6.1× for SYB With Class (up to 9.5×), and 1.6× for the affected fragment of the lens library (up to 2.1×).",
    topics: ["Haskell", "Partial evaluation", "Compiler optimization"],
    links: [
      { label: "Preprint", href: "/papers/syb.pdf" },
      { label: "DOI", href: "https://doi.org/10.1145/3798227" },
    ],
  },
  {
    id: "random-access-lists",
    title: "Pushing the Information-Theoretic Limits of Random Access Lists",
    authors: ["Edward Peters", "Yong Qi Foo", "Michael D. Adams"],
    venue: "ICFP",
    year: "2025",
    category: "publication",
    summary: "How close can a functional list get to optimal random access? New variations on Myers lists approach the information-theoretic lower bound.",
    abstract: "A random-access list behaves like a traditional singly linked list while supporting access to arbitrary elements through a logarithmic number of pointers. We present a simple variation on Myers lists that reduces the upper bound to 2 × ceil(log(n + 1)) − 1 pointer traversals. A second variation achieves (1 + 1/s) × ceil(log(n)) + s + 9 traversals for any s ≥ 2, asymptotically approaching the information-theoretically optimal bound of ceil(log(n + 1)) − 1.",
    topics: ["Data structures", "Functional programming"],
    links: [
      { label: "Preprint", href: "/papers/myers.pdf" },
      { label: "DOI", href: "https://doi.org/10.1145/3747536" },
      { label: "Watch talk", href: "https://youtu.be/-hHzYDa95Lg?si=JAvXLfY6ITUTxP0A" },
    ],
  },
  {
    id: "fpop-wp",
    title: "Fixed-Point-Oriented Programming: A Concise and Elegant Paradigm",
    authors: ["Yong Qi Foo", "Brian Sze-Kai Cheong", "Michael D. Adams"],
    venue: "arXiv",
    year: "2025",
    category: "publication",
    summary: "A paradigm for expressing work-list algorithms correctly and concisely.",
    abstract: "Fixed-Point-Oriented Programming (FPOP) is an emerging paradigm designed to streamline the implementation of problems involving self-referential computations. These include graph algorithms, static analysis, parsing, and distributed computing-domains that traditionally require complex and tricky-to-implement work-queue algorithms. Existing programming paradigms lack direct support for these inherently fixed-point computations, leading to inefficient and error-prone implementations. This white paper explores the potential of the FPOP paradigm, which offers a high-level abstraction that enables concise and expressive problem formulations. By leveraging structured inference rules and user-directed optimizations, FPOP allows developers to write declarative specifications while the compiler ensures efficient execution. It not only reduces implementation complexity for programmers but also enhances adaptability, making it easier for programmers to explore alternative solutions and optimizations without modifying the core logic of their program. We demonstrate how FPOP simplifies algorithm implementation, improves maintainability, and enables rapid prototyping by allowing problems to be clearly and concisely expressed. For example, the graph distance problem can be expressed in only two executable lines of code with FPOP, while it takes an order of magnitude more code in other paradigms. By bridging the gap between theoretical fixed-point formulations and practical implementations, we aim to foster further research and adoption of this paradigm.",
    topics: ["Logic Programming", "Functional programming", "Fixed-Point-Oriented Programming"],
    links: [
      { label: "Preprint", href: "https://arxiv.org/abs/2507.21439" },
      { label: "DOI", href: "https://doi.org/10.48550/arXiv.2507.21439" },
    ],
  },
  {
    id: "lr-ai-ll",
    title: "LR Parsing Is An Abstract Interpretation of LL Parsing",
    venue: "Under review",
    category: "project",
    summary: "We show that LR parsing (not recognition) is an abstract interpretation of LL parsing, and use these results to show the correspondence of (deterministic) LR parse traces and LL parse traces.",
    abstract: "    LR and LL parsing are traditionally presented as opposing strategies: LR parsers proceed bottom-up by shifting terminals and reducing completed right-hand sides, while LL parsers proceed top-down by predicting productions. This operational distinction obscures a deeper relationship between the two. We show that LR parsing is an abstract interpretation of LL parsing. LL parser configurations can be abstracted to LR parser configurations by forgetting the explicit top-down call structure and retaining the viable prefix tracked by LR parsing. Conversely, LR parser configurations can be concretized to the set of LL configurations that abstract to it. Lifting these functions to sets of configurations yields a Galois connection, making precise how LR configurations are abstractions of LL configurations. We further show that LL and LR parse traces correspond: LL calls are accounted for by LR closure, LL matches correspond to LR shifts, and LL returns (an operation in LL parsing and not LL recognition) correspond to LR reductions. This explains how LR parsers can defer production choices that LL parsers must make eagerly, while also recovering the top-down context hidden inside LR states. Besides clarifying the semantic relationship between LL and LR parsing, our framework provides a procedure for reconstructing LL-style explanations from LR parser states, which has applications to parser debugging and syntax-error reporting.",
    topics: ["Parsing", "Abstract Interpretation"],
    links: [],
  },
  {
    id: "fixen",
    title: "Fixen: A Fixed-Point-Oriented Programming Language with Subsumption, Priorities and Phases",
    venue: "Under review",
    category: "project",
    summary: "A language for expressing work-list algorithms concisely, with explicit control over redundant facts, evaluation order, and phases of computation.",
    abstract: "Fixed-point-oriented programming simplifies the work-queue algorithms that appear in graph algorithms, static analysis, parsing, and distributed systems. Fixen introduces generalized fact subsumption, rule-instance priorities, and phases of execution. We demonstrate these features through graph-distance algorithms and the composition of static analyses via a reduced product. A formal semantics specifies the language, and benchmarks of the implementation, which compiles to Haskell, show that priorities improve performance by 7× on average, and up to 30×.",
    topics: ["Fixed-point programming", "Language design", "Declarative programming"],
    links: [
      { label: "FPOP white paper", href: "https://arxiv.org/abs/2507.21439" },
      { label: "ACM SRC paper", href: "https://src.acm.org/binaries/content/assets/src/2026/new-icfp_-g_.pdf" },
    ],
  },
  {
    id: "optimization-tactics",
    title: "Optimization Tactics (Functional Pearl)",
    venue: "In progress",
    category: "project",
    summary: "User-defined, correctness-preserving optimization strategies, built with Lean 4’s metaprogramming and theorem-proving facilities.",
    abstract: "General-purpose compiler optimizations cannot always exploit the structure of a particular program. Optimization tactics let library authors define domain-specific transformations, and let users apply, extend, and adapt them at specific program points. The Lean 4 library supports provably correctness-preserving expression transformations and an interactive view of each optimization step, separating the description of an algorithm from its optimization strategy.",
    topics: ["Lean 4", "Metaprogramming", "Compiler optimization"],
    links: [],
  },
  {
    id: "javacip",
    title: "Reconstruction of Incomplete Polymorphic Programs",
    venue: "Under review",
    category: "project",
    summary: "Reconstructing missing dependencies so that incomplete Java programs with generic types can be compiled and analyzed safely.",
    abstract: "Static analysis, stub generation, and testing tools often need to work with code fragments whose dependencies are unavailable. Existing reconstruction techniques struggle with parametrically polymorphic types. Our technique reconstructs the surrounding dependencies of an incomplete Java program to produce a complete, well-typed program. The prototype implementation, JavaCIP, outperforms prior approaches in our empirical evaluation.",
    topics: ["Type systems", "Program analysis", "Java"],
    links: [
      { label: "Author’s copy", href: "/papers/javacip/Reconstruction%20of%20Incomplete%20Polymorphic%20Programs.pdf" },
      { label: "Poster", href: "/papers/javacip/Poster.pdf" },
    ],
  },
  {
    id: "mathematics-and-proofs",
    title: "Motivating Mathematics Study in Prospective Computer Scientists with Interactive Theorem Provers",
    venue: "In progress",
    category: "project",
    summary: "Using Lean 4 to show students the connection between writing a program and constructing a mathematical proof.",
    abstract: "The Curry–Howard correspondence connects terms with witnesses, types with propositions, programs with proofs, and evaluation with proof normalization. This project uses interactive theorem proving to make that connection tangible for students who may not yet see the relevance of mathematics to software development. By writing both proofs and programs in Lean 4, students can explore the shared foundations of the two disciplines.",
    topics: ["Computing education", "Lean 4", "Interactive theorem proving"],
    links: [],
  },
];

export type Course = {
  code: string;
  title: string;
  category: string;
  description: string;
  semesters: string;
  topics: string[];
  notes?: string;
};

export const courses: Course[] = [
  {
    code: "IT5100A",
    title: "Typed Functional Programming",
    category: "Industry readiness",
    description: "Building robust, reusable software with the ideas behind Haskell, OCaml, and Scala: strong types, composition, abstraction, effect handlers, and safe asynchronous and concurrent programming.",
    semesters: "AY24/25 Semester 1 · AY25/26 Semester 1 · AY26/27 Semester 2",
    topics: ["Functional programming", "Haskell", "Type systems"],
    notes: "https://yongqi.foo/it5100a-notes",
  },
  {
    code: "IT5100B",
    title: "Stream Processing",
    category: "Industry readiness",
    description: "Working with data as it arrives. We explore the basics of streams/iterables, ReactiveX, Apache Kafka and high-performance stateful stream processing with Bytewax/Apache Flink.",
    semesters: "AY23/24 Semester 2 · AY24/25 Semester 2 · AY25/26 Semester 1 · AY25/26 Semester 2 · AY26/27 Semester 2",
    topics: ["Data streaming", "ReactiveX", "Apache Kafka"],
  },
  {
    code: "IT5100E",
    title: "Security Best Practices",
    category: "Industry readiness",
    description: "Practical security for web applications: encryption, authentication, authorization, secure coding, threat modelling, and deployment. Students work with common threats, defensive techniques, and industry practices including OWASP.",
    semesters: "AY23/24 Semester 1 · AY24/25 Semester 2 · AY25/26 Semester 2 · AY26/27 Semester 1 · AY26/27 Semester 2",
    topics: ["Cybersecurity", "Web application security"],
  },
  {
    code: "IT5000",
    title: "Introduction to Computing Foundations",
    category: "Graduate bootcamp",
    description: "I teach the mathematics and discrete structures portion of this bootcamp. We move from numbers, sets, and logical reasoning to proofs, the Curry–Howard correspondence, and interactive theorem proving in Lean 4—showing how mathematics and programming fit together.",
    semesters: "AY23/24 Semester 2 · AY24/25 Semester 1 · AY24/25 Semester 2 · AY25/26 Semester 1 · AY26/27 Semester 1",
    topics: ["Discrete structures", "Mathematics", "Lean 4"],
  },
];

export const pastCourses: Course[] = [
  {
    code: "IT5001",
    title: "Software Development Fundamentals",
    category: "Foundations",
    description: "An accelerated introduction to programming for students from non-computing backgrounds, covering abstraction, recursion, data structures, testing, and the software development process.",
    semesters: "AY20/21 Semester 2 · AY21/22 Semesters 1 & 2 · AY22/23 Semesters 1 & 2 · AY23/24 Semester 2",
    topics: ["Programming", "Python"],
  },
  {
    code: "CS1010E",
    title: "Programming Methodology",
    category: "Foundations",
    description: "Computational thinking and problem solving, from basic programming constructs and data structures to algorithms, testing, debugging, and recursion.",
    semesters: "AY18/19 Semesters 1 & 2 · AY19/20 Semesters 1 & 2, Special Term 2 · AY20/21 Semester 1",
    topics: ["Programming", "C", "Python"],
  },
  {
    code: "CS2030/S",
    title: "Programming Methodology 2",
    category: "Foundations",
    description: "Object-oriented and functional programming: composition, inheritance, polymorphism, lambdas, closures, continuations, and monads, applied to the design of medium-scale programs.",
    semesters: "AY18/19 Semester 2 · AY19/20 Semesters 1 & 2, Special Term 1 · AY20/21 Semester 1",
    topics: ["Object-oriented programming", "Functional programming"],
  },
  {
    code: "IT5003",
    title: "Data Structures & Algorithms",
    category: "Foundations",
    description: "Efficient computational problem solving with lists, hash tables, heaps, trees, and graphs; algorithm design, complexity analysis, correctness, and the limits of computation.",
    semesters: "AY20/21 Semester 2",
    topics: ["Data structures", "Algorithms"],
  },
  {
    code: "IT5004",
    title: "Enterprise Systems Architecture",
    category: "Systems",
    description: "Architecting scalable enterprise systems, with an introduction to software architecture, object-oriented analysis and design, and the Unified Modelling Language.",
    semesters: "AY20/21 Semester 2",
    topics: ["Software architecture"],
  },
];

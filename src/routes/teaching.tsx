import { Title } from "solid-start";
import Tags from "../components/Tags.tsx"
import Tag from "../components/Tag.tsx"
export default function Teaching() {
  return (
    <main>
      <Title>Teaching - Foo Yong Qi</Title>
      <div class="flex-row">
        <div class="box left-box">
          <h2>IT5100A</h2>
          <p><strong>Industry Readiness: Typed Functional Programming</strong></p>
          <p>Typed functional programming are becoming more widely adopted in industry, as can be seen in the success of a number of advanced programming languages, such as OCaml, Haskell and Scala 3. These advanced languages offer a range of expressive features to allow robust, reusable and high-performing software codes to be safely and rapidly developed. This course will cover key programming techniques of typed functional programming that are becoming widely adopted, such as strong typing, code composition and abstraction, effect handlers, and safe techniques for asynchronous and concurrent programming.</p>
          <p><strong>Semesters taught</strong>: AY24/25 Semester 1</p>
          <p>Course notes available <a href="https://yongqi.foo/it5100a-notes">here</a>.</p>
        <Tags>
          <Tag>Programming Languages</Tag>
          <Tag>Functional Programming</Tag>
          <Tag>Haskell</Tag>
          <Tag>Python</Tag>
        </Tags>
        </div>
        <div class="box">
          <h2>IT5100B</h2>
          <p><strong>Industry Readiness: Stream Processing</strong></p>
          <p>The global availability of data has reached a level where aggregating data into generic, general-purpose “stores” is no longer feasible. Having data collections statically available for querying by interested parties on demand is increasingly becoming the way of the past. Instead, a new paradigm, called Data Streaming, has emerged recently. In this paradigm, data is bundled into high-throughput "streams" that are sharded efficiently across a large number of network nodes. Consumers, sometimes counted in hundreds of thousands, or millions, "subscribe" to data subsets and are notified when new data becomes available, being under the obligation to process it immediately, or lose it. Consequently, data storage is no longer centralized, but rather distributed into many smaller-sized abstract collections. This new approach to "Big Data" requires a new set of tools, platforms, and solution patterns. In this course we propose to explore several facets of this new paradigm:</p>
        <ul>
          <li>The Stream paradigm introduced in Java 8.</li>
          <li>
            Platforms that implement Data Streaming, such as Kafka, and the Java
            bindings in the library KafkaConnect.
          </li>
          <li>
            Computing paradigms for stream processing, such as Reactive
            Programming, and the library RxJava.
          </li>
          <li>High-performance stream computing platforms, such as Flink.</li>
        </ul>
        <p>The course will be using Java as the main vehicle for introducing concepts and showcasing examples.</p>
          <p><strong>Semesters taught</strong>: AY23/24 Semester 2, AY24/25 Semester 2</p>
        <Tags>
          <Tag>Data Streaming</Tag>
          <Tag>Apache Kafka</Tag>
          <Tag>Apache Flink</Tag>
        </Tags>
        </div>
      </div>

      <div class="flex-row">
        <div class="box left-box">
          <h2>IT5100E</h2>
          <p><strong>Industry Readiness: Security Best Practices</strong></p>
          <p>Malicious exploitation of vulnerable applications running on the web can have disastrous consequences. This module aims to introduce application security considerations and provide practical experience on secure coding practices, focusing on web-based applications. Topics covered include fundamental security concepts (e.g., encryption, authentication, authorization), secure coding practices (e.g., handling of cookies, passwords, errors), secure design and deployment principles (e.g., threat modelling, vulnerability scanning), along with industry standards (e.g., OWASP), tools, common threats and defense against them.</p>
          <p><strong>Semesters taught</strong>: AY23/24 Semester 1, AY24/25 Semester 2</p>
          <Tags>
            <Tag>Cybersecurity</Tag>
            <Tag>Web Application Security</Tag>
          </Tags>
        </div>
        <div class="box">
          <h2>IT5000</h2>
          <p><strong>Introduction to Computing Foundations</strong></p>
          <p>IT5000 Introduction to Computing Foundations is a bootcamp-style course that aims to provide the prerequisite knowledge and skills for students to embark on their studies in computing foundations, and ease new students into the academic and computing environments they will be immersed in at the NUS School of Computing.</p>

          <p>Broadly, the bootcamp introduces 3 areas:</p>

          <ol>
            <li>Computational thinking (the basis of programming)</li>
            <li>Discrete structures (mathematical foundation of computer science)</li>
            <li>Linear algebra and probability (mathematical foundation of artificial intelligence and machine learning, which are pervasive in today's computing)</li>
          </ol>

          <p><strong>Pure Mathematics &amp; Discrete Structures</strong></p>

          <p>We begin discussing some fundamental mathematical structures and the relationships between them. Particularly, numbers and arithmetic (which is unsurprisingly important), shapes (geometry and its extensions have wide applications including graphics, game design and AI), and sets (the foundations of mathematics). Then, we will learn how to perform logical reasoning on propositions of all kinds (propositions on numbers, shapes etc.). We then discuss what it means to do mathematics and how to write proofs, before finally introducing the Curry-Howard Correspondence and the BHK (Brouwer-Heyting-Kolmogorov) interpretation of propositional intuitionistic logic with a demonstration of Interactive Theorem Proving with Lean 4.</p>

          <p>While on the surface, the purpose of this session is to introduce students to fundamental mathematics concepts, we hope to inspire further mathematics study by showing that the art of mathematics and the art of programming are, really, one and the same.</p>

          <p><strong>Semesters taught</strong>: AY23/24 Semester 2, AY24/25 Semester 1</p>
          <Tags>
            <Tag>Pure Mathematics</Tag>
            <Tag>Discrete Structures</Tag>
          </Tags>
        </div>
      </div>

      <div class="flex-row">
        <div class="box left-box">
          <h2>CS1010E</h2>
          <p><strong>Programming Methodology</strong></p>
          <p>This module introduces the fundamental concepts of problem solving by computing and programming using an imperative programming language. It is the first and foremost introductory course to computing. Topics covered include computational thinking and computational problem solving, designing and specifying an algorithm, basic problem formulation and problem solving approaches, program development, coding, testing and debugging, fundamental programming constructs (variables, types, expressions, assignments, functions, control structures, etc.), fundamental data structures (arrays, strings, composite data types), basic sorting, and recursion.</p>
          <p><strong>Semesters taught</strong>: AY18/19 Semester 1, AY18/19 Semester 2, AY19/20 Semester 1, AY19/20 Semester 2, AY19/20 Special Term 2, AY20/21 Semester 1</p>
          <Tags>
            <Tag>Programming</Tag>
            <Tag>C</Tag>
            <Tag>Python</Tag>
          </Tags>
        </div>
        <div class="box">
          <h2>CS2030/S</h2>
          <p><strong>Programming Methodology 2</strong></p>
          <p>This module is a follow up to CS1010. It explores two modern programming paradigms, object-oriented programming and functional programming. Through a series of integrated assignments, students will learn to develop medium-scale software programs in the order of thousands of lines of code and tens of classes using objectoriented design principles and advanced programming constructs available in the two paradigms. Topics include objects and classes, composition, association, inheritance, interface, polymorphism, abstract classes, dynamic binding, lambda expression, effect-free programming, first class functions, closures, continuations, monad, etc.</p>
          <p><strong>Semesters taught</strong>: AY18/19 Semester 2, AY19/20 Semester 1, AY19/20 Semester 2, AY19/20 Special Term 1, AY20/21 Semester 1</p>
          <Tags>
            <Tag>Programming</Tag>
            <Tag>Object-Oriented Programming</Tag>
            <Tag>Functional Programming</Tag>
          </Tags>
        </div>
      </div>

      <div class="flex-row">
        <div class="box left-box">
          <h2>IT5003</h2>
          <p><strong>Data Structures & Algorithms</strong></p>
          <p>This module introduces non-computing students to efficient computational problem solving in an accelerated pace. Students will learn to formulate a computational problem, identify the data required and come up with appropriate data structures to represent them, and apply known strategies to design an algorithm to solve the problem. Students will also learn to quantify the space and time complexity of an algorithm, prove the correctness of an algorithm, and the limits of computation. Topics include common data structures and their algorithms (lists, hash tables, heap, trees, graphs), algorithmic problem solving paradigms (greedy, divide and conquer, dynamic programming), and NP-completeness.</p>
          <p><strong>Semesters taught</strong>: AY20/21 Semester 2</p>
          <Tags>
            <Tag>Data Structures and Algorithms</Tag>
          </Tags>
        </div>
        <div class="box">
          <h2>IT5004</h2>
          <p><strong>Enterprise Systems Architecture</strong></p>
          <p>This module aims to equip non-computing students with fundamental knowledge in architecting and designing modern Enterprise Systems in organisations that can be reasonably complex, scalable, distributed, component-based and missioncritical. Students will develop an understanding of high-level concepts such as enterprise architecture and software architecture. They will them move on to acquire fundamental systems analysis and design techniques such as object-oriented requirements analysis and design using the Unified Modelling Language.</p>
          <p><strong>Semesters taught</strong>: AY20/21 Semester 2</p>
          <Tags>
            <Tag>Architecture</Tag>
          </Tags>
        </div>
      </div>
      <div class="box solo">
        <h2>IT5001</h2>
        <p><strong>Software Development Fundamentals</strong></p>
        <p>This module aims to introduce non-computing students to the principles and concepts of software development at an accelerated pace. Students will be introduced to the basics of programming (control flow, code and data abstraction, recursion, types, OO), development methodology (ensuring correctness, testing, debugging), simple data structures and algorithms (lists, maps, sorting), and software engineering principles. Through hands on assignments and projects, students will learn good software development practices (documentation, style) and experience a typical software engineering cycle.</p>
        <p><strong>Semesters taught</strong>: AY20/21 Semester 2, AY21/22 Semester 1, AY21/22 Semester 2, AY22/23 Semester 1, AY22/23 Semester 2, AY23/24 Semester 2</p>
        <Tags>
          <Tag>Programming</Tag>
          <Tag>Python</Tag>
        </Tags>
      </div>
    </main>
  );
}

import{g as ne,a as t,i as n,c as e,T as oe,t as re}from"./entry-client-3df871e0.js";import{T as i,a as o}from"./Tag-cd8d0905.js";const ae=re(`<main><!$><!/><div class=flex-row><div class="box left-box"><h2>Reconstruction of Incomplete Polymorphic Programs</h2><p>The ability to reconstruct the dependencies of incomplete programs to form complete and well-typed ones provides several benefits, including allowing static analysis tools to analyse incomplete programs where their surrounding dependencies are unavailable, and supporting stub generation and testing tools to work on snippets. However, earlier efforts to do so are unable to work with incomplete programs containing parametrically polymorphic types. </p><p>In this paper, we present a technique that receives an incomplete Java program that may contain parametrically polymorphic types, and reconstructs its surrounding dependencies to form a complete and well-typed program. We then present empirical results from our prototype implementation of this algorithm, JavaCIP, which outperforms prior works in this area.</p><p><a href="../papers/javacip/Reconstruction of Incomplete Polymorphic Programs.pdf">Submitted Author's Copy (Under Review) </a> | <a href=../papers/javacip/Poster.pdf>Poster</a></p><!$><!/></div><div class=box><h2>Partial Evaluation of Rank-2 Polymorphic Functions</h2><p>Rank-2 polymorphic functions are used in a variety of programs and libraries. However, such functions may be difficult to optimize by general-purpose optimizers, especially if they are recursive. General-purpose optimizers thus avoid optimizing these functions, leaving many missed opportunities for further program optimization. </p><p> Thus, we propose a new optimization pass, PEPSA, that performs a partial evaluation of partially static applications of rank-2 polymorphic functions to reveal further avenues of optimization. Preliminary benchmarks show that PEPSA, in conjunction with other standard optimization passes, achieves a 3 to 75 times speedup on generic programming systems.</p><!$><!/></div></div><div class=flex-row><div class="box left-box"><h2>A Fixed-Point-Oriented Programming Language with User-Specified Optimization Strategies</h2><p>There are a wide range of problems that are easily solved using a fixed-point algorithm instead of the more common programming strategies of loops and recursions. Examples of these include parsing, static analysis, type-checking, graph algorithms, and automata manipulation. Existing language paradigms, such as the imperative and functional paradigms, support loops and recursions well but support fixed-point algorithms rather poorly.</p><p>In this project, we will develop a programming language providing such support. In addition, by specifying problems at the abstraction-level of fixed points, our language can include mechanisms for the programmer to influence and optimize the solution strategy used by the implementation without the programmer having to modify the problem specification. This will allow users of the language to rapidly prototype and test a problem specification and to later specify optimizations while making only minimal changes to existing code, a task particularly difficult for fixed-point problems in existing languages. </p><!$><!/></div><div class=box><h2>Optimization Tactics (Functional Pearl)</h2><p>Program optimizations are frequently done by the compiler. These optimizations are general purpose, so as to extract the best performance out of as many programs as possible. However, general-purpose optimizations may not be well-suited for some specific programs.</p><p>Thus, we present <strong>optimization tactics</strong>, a new construct that allows users to define their own optimization strategies and to apply optimizations at specific program points. The library for supporting optimization tactics is implemented with Lean 4's powerful metaprogramming and theorem proving facilities, which allows users to:</p><ul><li>Easily define provably correctness-preserving optimization tactics as expression-to-expression transformation functions.</li><li>Apply an optimization wherever a program term occurs</li><li>Leverage Lean 4's interactive view to observe every step of the optimization</li><li>Separate algorithm from optimization.</li></ul><p>Optimization tactics thus allows library authors to define domain-specific optimizations, and for library users to incorporate, extend and adapt optimization tactics to their specific use-case. We also propose that the interactivity of optimization tactics in Lean 4 allows researchers to explore new optimization techniques that can be applied to other functional programming languages.</p><!$><!/></div></div><div class=flex-row><div class="box left-box"><h2>Improving the Bounds on Random-Access Lists</h2><p>Accessing an arbitrary element of a traditional singly linked list or <tt>cons</tt> list requires traversing up to a linear number of pointers. A random-access list is a data structure that behaves like a <tt>cons</tt> list except that accessing an arbitrary element requires traversing only a logarithmic number of pointers. Specifically, in a list of length n, an arbitrary element can be accessed by traversing at most <tt>3 * ceil(log(n)) - 5</tt> pointers.</p><p>In this paper, we present a simple variation on Myers lists that improves this bound and requires traversing at most <tt>2 * ceil(log(n + 1)) - 1</tt> pointers. We then present a more complicated variation that improves this bound to <tt>(1 + 1 / s) * ceil(log(n)) + s + 9</tt> for any <tt>s &gt;= 2</tt>. This shows that it is possible to get asymptotically close to the information-theoretically optimal bound of <tt>ceil(log(n + 1)) - 1</tt>.</p><!$><!/></div><div class=box><h2>Motivating Mathematics Study in Prospective Computer Scientists with Interactive Theorem Provers</h2><p>The Curry-Howard correspondence shows that terms, types, programs and program evaluation correspond to witnesses, propositions, proofs and proof normalization in (intuitionistic) logic. This has spawned a large body of work in the literature known as <em>proof assistants</em> or <em>interactive theorem provers</em> that exploit this correspondence via a programming language with a type system that supports proof checking.</p><p>On the other hand, the need to study mathematics may not be immediately apparent to budding software engineers, particularly those aiming to enter industry post-study. Our aim is motivate students to study mathematics by showing that the art of writing programs is the same as the art of writing a proof. We do so by writing both proofs and programs in Lean 4.</p><!$><!/>`);function pe(){return(()=>{const r=ne(ae),u=r.firstChild,[p,f]=t(u.nextSibling),c=p.nextSibling,a=c.firstChild,b=a.firstChild,y=b.nextSibling,v=y.nextSibling,x=v.nextSibling,$=x.nextSibling,[w,_]=t($.nextSibling),m=a.nextSibling,S=m.firstChild,P=S.nextSibling,z=P.nextSibling,T=z.nextSibling,[k,C]=t(T.nextSibling),h=c.nextSibling,s=h.firstChild,I=s.firstChild,O=I.nextSibling,A=O.nextSibling,E=A.nextSibling,[L,R]=t(E.nextSibling),g=s.nextSibling,q=g.firstChild,F=q.nextSibling,H=F.nextSibling,M=H.nextSibling,j=M.nextSibling,W=j.nextSibling,[J,D]=t(W.nextSibling),G=h.nextSibling,l=G.firstChild,N=l.firstChild,U=N.nextSibling,B=U.nextSibling,Q=B.nextSibling,[Y,K]=t(Q.nextSibling),d=l.nextSibling,V=d.firstChild,X=V.nextSibling,Z=X.nextSibling,ee=Z.nextSibling,[ie,te]=t(ee.nextSibling);return n(r,e(oe,{children:"Research - Foo Yong Qi"}),p,f),n(a,e(o,{get children(){return[e(i,{children:"Type Systems"}),e(i,{children:"Polymorphism"}),e(i,{children:"Program Analysis"}),e(i,{children:"Java"}),e(i,{children:"Submitted"})]}}),w,_),n(m,e(o,{get children(){return[e(i,{children:"Optimization"}),e(i,{children:"Generic Programming"}),e(i,{children:"Haskell"}),e(i,{children:"Polymorphism"}),e(i,{children:"In Progress (nearing completion)"})]}}),k,C),n(s,e(o,{get children(){return[e(i,{children:"Programming Paradigms"}),e(i,{children:"Declarative Programming"}),e(i,{children:"Fixed-Point-Oriented Programming"}),e(i,{children:"Optimization"}),e(i,{children:"In Progress (early)"})]}}),L,R),n(g,e(o,{get children(){return[e(i,{children:"Optimization"}),e(i,{children:"Metaprogramming"}),e(i,{children:"Lean 4"}),e(i,{children:"In Progress (early)"})]}}),J,D),n(l,e(o,{get children(){return[e(i,{children:"Data Structures"}),e(i,{children:"Functional Programming"}),e(i,{children:"In Progress (nearing completion)"})]}}),Y,K),n(d,e(o,{get children(){return[e(i,{children:"Education"}),e(i,{children:"In Progress (early)"})]}}),ie,te),r})()}export{pe as default};

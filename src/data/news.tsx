import type { JSX } from "solid-js";

export type NewsEntry = { date: string; content: () => JSX.Element };

export const news: NewsEntry[] = [
  {
    date: "2026-10-06",
    content: () => <>I presented our work on "Class-Dictionary Specialization with Rank-2 Polymorphic Functions" at SPLASH/ISSTA 2026!</>,
  },
  {
    date: "2026-08-11",
    content: () => <>[NUS] IT5100E&mdash;Industry Readiness: Security Best Practices starts today. See you there!</>,
  },
  {
    date: "2026-08-04",
    content: () => <>[NUS] IT5000&mdash;Introduction to Computing Foundations starts today. I will be teaching the Discrete Structures portion (Day 1, 4 Aug). See you there!</>,
  },
  {
    date: "2026-05-26",
    content: () => <>I am a ACM SRC grand finals candidate. Didn't win though. My paper is <a href="https://src.acm.org/binaries/content/assets/src/2026/new-icfp_-g_.pdf">here</a>.</>,
  },
  {
    date: "2026-03-11",
    content: () => <>[NUS] I will be speaking on cybersecurity and AI with NUS SoC Research Partnership today.</>,
  },
  {
    date: "2026-02-21",
    content: () => <>[NUS] IT5100E&mdash;Industry Readiness: Security Best Practices starts next week. See you there!</>,
  },
  {
    date: "2026-02-17",
    content: () => <>Our paper on <a href="https://doi.org/10.1145/3798227">Class-Dictionary Specialization With Rank-2 Polymorphic Functions</a> has been accepted for publication at OOPSLA 2026.</>,
  },
  {
    date: "2026-01-08",
    content: () => <>[NUS] IT5100B&mdash;Industry Readiness: Stream Processing starts next week. See you there!</>,
  },
  {
    date: "2026-01-01",
    content: () => <>Happy New Year! Do I really turn 30 this year?</>,
  },
  {
    date: "2025-11-24",
    content: () => <>I will be speaking on "Exploring Fixed-Point-Oriented Programming" at the <a href="https://sg-pl-summit.github.io/">SG PL Summit 2025</a>!</>,
  },
  {
    date: "2025-10-14",
    content: () => <>My presentation on "Fixed-Point-Oriented Programming with Orders" received the <a href="https://www.youtube.com/watch?v=jeqcNJA1qbI">first prize at the Student Research Competition at ICFP'25</a>!</>,
  },
  {
    date: "2025-10-13",
    content: () => <>I presented our paper on <a href="https://youtu.be/-hHzYDa95Lg?si=JAvXLfY6ITUTxP0A">"Pushing the Information Theoretic Limits of Random Access Lists"</a> at ICFP'25!</>,
  },
  {
    date: "2025-09-30",
    content: () => <>[NUS] IT5100B&mdash;Industry Readiness: Stream Processing starts today. See you there!</>,
  },
  {
    date: "2025-08-12",
    content: () => <>[NUS] IT5100A&mdash;Industry Readiness: Typed Functional Programming has started! Course notes are available <a href="https://yongqi.foo/it5100a-notes">here</a>. The notes are in the midst of a (visual) revamp; expect regular updates!</>,
  },
  {
    date: "2025-08-05",
    content: () => <>[NUS] IT5000&mdash;Introduction to Computing Foundations starts today. I will be teaching the Discrete Structures portion (Day 1, 5 Aug). See you there!</>,
  },
  {
    date: "2025-07-29",
    content: () => <>We published our <a href="https://arxiv.org/abs/2507.21439">white paper on Fixed-Point-Oriented Programming</a>.</>,
  },
  {
    date: "2025-06-27",
    content: () => <>Our paper <a href="https://dl.acm.org/doi/10.1145/3747536">"Pushing the Information-Theoretic Limits of Random Access Lists"</a> was accepted for publication at the International Conference on Functional Programming (ICFP) 2025.</>,
  },
  {
    date: "2025-06-22",
    content: () => <>I am attending OPLSS 2025 at the University of Oregon!</>,
  },
  {
    date: "2025-05-01",
    content: () => <>I will be advising Divakar Rajesh Selvam on his project on a web-based agentic video editing and repurposing tool.</>,
  },
  {
    date: "2025-03-06",
    content: () => <>[NUS] IT5100E&mdash;Industry Readiness: Security Best Practices starts today. Please contact me if you wish to audit this course. See you!</>,
  },
  {
    date: "2025-02-28",
    content: () => <>[NUS] I have received the Faculty Teaching Excellence Awards!</>,
  },
  {
    date: "2025-01-12",
    content: () => <>[NUS] IT5100B&mdash;Industry Readiness: Stream Processing starts tomorrow. Please contact me if you wish to audit this course. See you tomorrow!</>,
  },
  {
    date: "2025-01-06",
    content: () => <>[NUS] IT5000&mdash;Introduction to Computing Foundations starts tomorrow. I will be teaching the Discrete Structures portion (Day 1, 7 Jan). See you there!</>,
  },
  {
    date: "2025-01-01",
    content: () => <>Happy New Year to everyone!</>,
  },
  {
    date: "2024-12-01",
    content: () => <>[NUS] Teaching Assistantship positions for IT5100B and IT5100E have closed. Thank you to all applicants!</>,
  },
  {
    date: "2024-10-30",
    content: () => <>I have completed my PhD Qualifying Exams!</>,
  },
  {
    date: "2024-09-30",
    content: () => <>[NUS] IT5100A&mdash;Industry Readiness: Typed Functional Programming has started! Course notes are available <a href="https://yongqi.foo/it5100a-notes">here</a>.</>,
  },
  {
    date: "2024-08-04",
    content: () => <>[NUS] IT5000&mdash;Introduction to Computing Foundations starts tomorrow. I will be teaching the Pure Mathematics and Discrete Structures portion (Day 1, 5 Aug). See you there!</>,
  },
  {
    date: "2024-07-15",
    content: () => <>I will be trialing <em>Motivating Mathematics Study in Prospective Computer Scientists with Interactive Theorem Proving</em> during IT5000&mdash;Introduction to Computing Foundations.</>,
  },
  {
    date: "2024-07-01",
    content: () => <>[NUS] SoC Postgraduate department has launched a new initiative for prospective M.Comp. (General Track) and M.Sc. Digital Financial Technology students to be able to replace IT5001 with another course based on their performance in a proficiency test. More information can be found in the email you received. Email it5001pt@comp.nus.edu.sg for queries.</>,
  },
  {
    date: "2024-06-18",
    content: () => <>[NUS] Teaching Assistantship positions for IT5100A have been filled. IT5100B and IT5100E are still recruiting.</>,
  },
  {
    date: "2024-06-12",
    content: () => <>[NUS] I will be teaching Pure Mathematics and Discrete Mathematics at the upcoming SoC Graduate Bootcamp held in early August. Graduate Certificate in Computing Foundations, M.Comp. (General Track) (among some others) students may look forward to this bootcamp in early August 2024.</>,
  },
  {
    date: "2024-06-01",
    content: () => <>[NUS] Applications for Teaching Assistantship positions for IT5100A, IT5100B and IT5100E are now open. Undergraduate and Postgraduate applicants are welcome. Please email your CV to me if interested.</>,
  },
  {
    date: "2024-05-01",
    content: () => <>[NUS] I will be teaching IT5100A in AY24/25 Semester 1, and IT5100B & IT5100E in AY24/25 Semester 2. M.Comp. (General Track) students can email me if interested in being a guest student in these courses.</>,
  },
  {
    date: "2023-12-12",
    content: () => <>[NUS] SoC Postgraduate department has launched a new initiative&mdash;the SoC Graduate Bootcamp&mdash;to help prospective students with mathematical foundations they may not have learnt during their undergraduate studies. I will be teaching the Pure Mathematics and Set Theory portions this upcoming session. Graduate Certificate in Computing Foundations, M.Comp. (General Track) (among some others) students may look forward to this bootcamp in early January 2024.</>,
  },
  {
    date: "2023-11-26",
    content: () => <>[APLAS '23] I have won 2nd place at the APLAS '23 Student Research Competition in Academia Sinica, Taiwan.</>,
  },
  {
    date: "2023-09-30",
    content: () => <>[APLAS '23] My submission to the APLAS '23 Student Research Competition in Academia Sinica has been accepted.</>,
  },
  {
    date: "2023-08-13",
    content: () => <>I have started my Ph.D. under the advice of A/P Michael D. Adams!</>,
  },
  {
    date: "2023-06-30",
    content: () => <>I have just completed my M.Sc. in Computer Science!</>,
  },
  {
    date: "2023-04-30",
    content: () => <>[NUS] I will be teaching IT5100E in AY23/24 Semester 1, and IT5001 & IT5100B in AY23/24 Semester 2.</>,
  },
];

export function formatNewsDate(date: string, includeYear = false) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    ...(includeYear ? { year: "numeric" as const } : {}),
    timeZone: "Asia/Singapore",
  }).format(new Date(date + "T12:00:00+08:00"));
}

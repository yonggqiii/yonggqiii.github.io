export type CVEntry = { title: string; date: string; place: string; description?: string };

export const education: CVEntry[] = [
  { title: "PhD in Computer Science", date: "Aug 2023 – present", place: "National University of Singapore", description: "Advisor: Michael D. Adams" },
  { title: "MSc in Computer Science (by Research)", date: "Jan 2021 – Jun 2023", place: "National University of Singapore", description: "Advisor: Khoo Siau Cheng" },
  { title: "BEng (Hons) in Industrial & Systems Engineering", date: "Aug 2017 – Dec 2020", place: "National University of Singapore", description: "Advisor: Andrew Lim" },
];

export const employment: CVEntry[] = [
  { title: "Instructor", date: "Jan 2023 – present", place: "National University of Singapore", description: "Course coordinator and lecturer for IT5001, IT5100A, IT5100B, and IT5100E." },
  { title: "Teaching Assistant", date: "Aug 2018 – Dec 2022", place: "National University of Singapore", description: "Lecturer for IT5001; tutor for CS1010E, CS2030, CS2030S, IT5001, IT5003, and IT5004." },
  { title: "PWA Developer", date: "Aug 2019 – Aug 2020", place: "National University of Singapore", description: "Developed a Nuxt.js progressive web application for the NUS Smart Dining initiative." },
  { title: "Business Development", date: "May 2018 – Jul 2020", place: "Sqkii", description: "Pitched projects to prospective clients." },
  { title: "Co-founder & President", date: "Apr 2018 – Apr 2020", place: "Uncage", description: "Liaised with NGOs and official partners. The organization is no longer in service." },
];

export const projects: CVEntry[] = [
  { title: "Optimization Tactics", date: "Ongoing", place: "NUS · Michael D. Adams", description: "A Lean 4 library for user-defined, correctness-preserving program optimizations." },
  { title: "Fixed-Point-Oriented Programming", date: "Ongoing", place: "NUS · Michael D. Adams", description: "Developing a programming language for fixed-point algorithms with user-specified optimization strategies." },
  { title: "Optimizing Rank-2 Polymorphic Functions", date: "OOPSLA 2026", place: "NUS · Michael D. Adams", description: "A compiler optimization technique for specializing recursive rank-2 polymorphic functions." },
  { title: "Compiling Incomplete Java Programs with Generics", date: "Jan 2021 – Jun 2023", place: "NUS · Khoo Siau Cheng", description: "Developed JavaCIP, a prototype for reconstructing and compiling incomplete Java programs in a type-safe manner." },
  { title: "Regional Multi-Person Pose Estimation", date: "Aug 2020 – Dec 2020", place: "NUS · Andrew Lim", description: "Combined AlphaPose with a novel LSTM network for action recognition in basketball analysis." },
  { title: "Fedora-SoC", date: "Aug 2020 – Dec 2020", place: "NUS · Henry Chia", description: "Developed a Fedora Linux fork for NUS School of Computing exam-takers during the COVID-19 pandemic." },
  { title: "NUS Smart Dining", date: "Aug 2019 – May 2020", place: "National University of Singapore", description: "Used the MMDetection computer vision framework to recognize drinks orders from a top-down camera at Frontier Food Court." },
  { title: "Live Firing Systems Optimization", date: "Feb 2017", place: "Singapore Armed Forces", description: "Developed a scheduling system for the Multi-Mission Range Complex, resulting in S$75,000 in annual cost savings." },
];

export const awards: CVEntry[] = [
  { title: "ACM Student Research Competition Grand Finals Candidate", date: "May 2026", place: "ACM" },
  { title: "First Prize, Student Research Competition", date: "Oct 2025", place: "ICFP 2025", description: "Fixed-Point-Oriented Programming with Orders" },
  { title: "Faculty Teaching Excellence Award", date: "Feb 2025", place: "National University of Singapore" },
  { title: "Second Place, Student Research Competition", date: "Nov 2023", place: "APLAS 2023 · Academia Sinica, Taiwan" },
  { title: "Full-Time Teaching Assistant Award", date: "May 2022", place: "National University of Singapore" },
  { title: "Honour List of Student Tutors", date: "May 2021 · May 2019", place: "National University of Singapore" },
  { title: "Dean’s List", date: "Jan 2019", place: "National University of Singapore" },
  { title: "3AMB Base Sergeant Major’s Coin", date: "Nov 2016", place: "Singapore Armed Forces" },
  { title: "Letter of Commendation", date: "Oct 2016", place: "Singapore Armed Forces" },
  { title: "3AMB Commanding Officer’s Coin", date: "Sep 2016", place: "Singapore Armed Forces" },
  { title: "SCS L Coy Platoon Best Soldier", date: "Sep 2015", place: "Singapore Armed Forces" },
  { title: "BMTC 2 Coy Platoon Best Recruit", date: "Jul 2015", place: "Singapore Armed Forces" },
];

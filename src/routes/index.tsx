import { Title } from "solid-start";
import NewsItem from "../components/NewsItem"
import MyTable from "../components/MyTable"
export default function Home() {
  return (
    <main>
      <Title>Foo Yong Qi</Title>
      <div class="big-name">
        <p class="big-name-name">
          <strong>Foo</strong> Yong Qi<span class="blinking">.</span>
        </p>
        <p>
          Keep it simple, stupid.
        </p>
      </div>

      <div class="flex-row">
        <div class="box left-box" id="about-box">
          <h2>About</h2>
          <p><strong>Instructor</strong> and <strong>PhD in Computer Science candidate</strong> at the Department of Computer Science, School of Computing, <strong>National University of Singapore</strong>.</p>
          <p>Likes ducks and programming languages.</p>
        </div>
        <div class="box">
          <h2>Contact</h2>
          <p><strong>Email</strong>: yongqi@nus.edu.sg<br /><strong>DID</strong>: +6516 7960<br /><strong>Office</strong>: COM2-02-27, 15 Computing Drive, Singapore 117418</p>
        </div>
      </div>
      <div class="box solo">
        <h2>News</h2>
        <h3>2025</h3>
        <MyTable>
          <NewsItem date={Date.parse('12 Aug 2025 23:59:00 GMT+8')}>
            [NUS] IT5100A&mdash;Industry Readiness: Typed Functional Programming has started! Course notes are available <a href="https://yongqi.foo/it5100a-notes">here</a>. The notes are in the midst of a (visual) revamp; expect regular updates!
          </NewsItem>
          <NewsItem date={Date.parse('5 Aug 2025 23:59:00 GMT+8')}>
            [NUS] IT5000&mdash;Introduction to Computing Foundations starts today. I will be teaching the Discrete Structures portion (Day 1, 5 Aug). See you there!
          </NewsItem>
          <NewsItem date={Date.parse('27 Jun 2025 23:59:00 GMT+8')}>
            Our paper "Pushing the Information-Theoretic Limits of Random Access Lists" was accepted for publication at the International Conference on Functional Programming (ICFP) 2025.
          </NewsItem>
          <NewsItem date={Date.parse('22 Jun 2025 23:59:00 GMT+8')}>
            I am attending OPLSS 2025 at the University of Oregon!
          </NewsItem>
          <NewsItem date={Date.parse('1 May 2025 23:59:00 GMT+8')}>
            I will be advising Divakar Rajesh Selvam on his project on a web-based agentic video editing and repurposing tool.
          </NewsItem>
          <NewsItem date={Date.parse('6 Mar 2025 23:59:00 GMT+8')}>
            [NUS] IT5100E&mdash;Industry Readiness: Security Best Practices starts today. Please contact me if you wish to audit this course. See you!
          </NewsItem>
          <NewsItem date={Date.parse('28 Feb 2025 23:59:00 GMT+8')}>
            [NUS] I have received the Faculty Teaching Excellence Awards!
          </NewsItem>
          <NewsItem date={Date.parse('12 Jan 2025 23:59:00 GMT+8')}>
            [NUS] IT5100B&mdash;Industry Readiness: Stream Processing starts tomorrow. Please contact me if you wish to audit this course. See you tomorrow!
          </NewsItem>

          <NewsItem date={Date.parse('06 Jan 2025 23:59:00 GMT+8')}>
            [NUS] IT5000&mdash;Introduction to Computing Foundations starts tomorrow. I will be teaching the Discrete Structures portion (Day 1, 7 Jan). See you there!
          </NewsItem>
          <NewsItem date={Date.parse('1 Jan 2025 23:59:00 GMT+8')}>
            Happy New Year to everyone!
          </NewsItem>
        </MyTable>
        <h3>2024</h3>
        <MyTable>
          <NewsItem date={Date.parse('1 Dec 2024 23:59:00 GMT+8')}>
            [NUS] Teaching Assistantship positions for IT5100B and IT5100E have closed. Thank you to all applicants!
          </NewsItem>
          <NewsItem date={Date.parse('30 Oct 2024 23:59:00 GMT+8')}>
            I have completed my PhD Qualifying Exams!
          </NewsItem>
          <NewsItem date={Date.parse('30 Sep 2024 23:59:00 GMT+8')}>
            [NUS] IT5100A&mdash;Industry Readiness: Typed Functional Programming has started! Course notes are available <a href="https://yongqi.foo/it5100a-notes">here</a>.
          </NewsItem>
          <NewsItem date={Date.parse('04 Aug 2024 23:59:00 GMT+8')}>
            [NUS] IT5000&mdash;Introduction to Computing Foundations starts tomorrow. I will be teaching the Pure Mathematics and Discrete Structures portion (Day 1, 5 Aug). See you there!
          </NewsItem>
          <NewsItem date={Date.parse('15 Jul 2024 23:59:00 GMT+8')}>
            I will be trialing <em>Motivating Mathematics Study in Prospective Computer Scientists with Interactive Theorem Proving</em> during IT5000&mdash;Introduction to Computing Foundations.
          </NewsItem>
          <NewsItem date={Date.parse('01 Jul 2024 23:59:00 GMT+8')}>
            [NUS] SoC Postgraduate department has launched a new initiative for prospective M.Comp. (General Track) and M.Sc. Digital Financial Technology students to be able to replace IT5001 with another course based on their performance in a proficiency test. More information can be found in the email you received. Email it5001pt@comp.nus.edu.sg for queries.
          </NewsItem>
          <NewsItem date={Date.parse('18 Jun 2024 23:59:00 GMT+8')}>
            [NUS] Teaching Assistantship positions for IT5100A have been filled. IT5100B and IT5100E are still recruiting.
          </NewsItem>
          <NewsItem date={Date.parse('12 Jun 2024 23:59:00 GMT+8')}>
            [NUS] I will be teaching Pure Mathematics and Discrete Mathematics at the upcoming SoC Graduate Bootcamp held in early August. Graduate Certificate in Computing Foundations, M.Comp. (General Track) (among some others) students may look forward to this bootcamp in early August 2024.
          </NewsItem>
          <NewsItem date={Date.parse('01 Jun 2024 23:59:00 GMT+8')}>
            [NUS] Applications for Teaching Assistantship positions for IT5100A, IT5100B and IT5100E are now open. Undergraduate and Postgraduate applicants are welcome. Please email your CV to me if interested.
          </NewsItem>
          <NewsItem date={Date.parse('01 May 2024 23:59:00 GMT+8')}>
            [NUS] I will be teaching IT5100A in AY24/25 Semester 1, and IT5100B & IT5100E in AY24/25 Semester 2. M.Comp. (General Track) students can email me if interested in being a guest student in these courses.
          </NewsItem>
        </MyTable>
        <h3>2023</h3>
        <MyTable>
          <NewsItem date={Date.parse('12 Dec 2023 23:59:00 GMT+8')}>
            [NUS] SoC Postgraduate department has launched a new initiative&mdash;the SoC Graduate Bootcamp&mdash;to help prospective students with mathematical foundations they may not have learnt during their undergraduate studies. I will be teaching the Pure Mathematics and Set Theory portions this upcoming session. Graduate Certificate in Computing Foundations, M.Comp. (General Track) (among some others) students may look forward to this bootcamp in early January 2024.
          </NewsItem>
          <NewsItem date={Date.parse('27 Nov 2023 00:00:00 GMT+8')}>
            [APLAS '23] I have won 2nd place at the APLAS '23 Student Research Competition in Academia Sinica, Taiwan.
          </NewsItem>
          <NewsItem date={Date.parse('1 Oct 2023 00:00:00 GMT+8')}>
            [APLAS '23] My submission to the APLAS '23 Student Research Competition in Academia Sinica has been accepted.
          </NewsItem>
          <NewsItem date={Date.parse('14 Aug 2023 00:00:00 GMT+8')}>
            I have started my Ph.D. under the advice of A/P Michael D. Adams!
          </NewsItem>
          <NewsItem date={Date.parse('1 Jul 2023 00:00:00 GMT+8')}>
            I have just completed my M.Sc. in Computer Science!
          </NewsItem>
          <NewsItem date={Date.parse('1 May 2023 00:00:00 GMT+8')}>
            [NUS] I will be teaching IT5100E in AY23/24 Semester 1, and IT5001 & IT5100B in AY23/24 Semester 2.
          </NewsItem>
        </MyTable>
      </div>
    </main>
  );
}

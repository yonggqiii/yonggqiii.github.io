import { Title } from "solid-start";
import Card from "../../components/Card";
import "./CV.css";
export default function CV() {
  return (
    <main>
      <Title>CV - Foo Yong Qi</Title>
      <h1>CV</h1>
      <Card header="education" header_color="mauve" border="red">
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name green">Ph.D. in Computer Science</div>
            <div class="cv-item-date green">Aug 2023 to Present</div>
          </div>
          <div class="cv-item-place green">
            National University of Singapore
          </div>
        </div>
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name pink">
              M.Sc. in Computer Science (by Research)
            </div>
            <div class="cv-item-date pink">Jan 2021 to Jun 2023</div>
          </div>
          <div class="cv-item-place pink">National University of Singapore</div>
          <p class="description">
            <strong>Key modules</strong>: Program Analysis, Robotics, Algorithms
            <br />
            <strong>CAP</strong>: 4.5/5.0
            <br />
            <strong>Thesis</strong>: Compiling and Detecting Type Errors in
            Incomplete Java Programs with Generics
            <br />
            <strong>Supervisor</strong>: Associate Professor Khoo Siau Cheng,
            Ph.D.
          </p>
        </div>
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name yellow">
              B.Eng. (Hons) in Industrial & Systems Engineering
            </div>
            <div class="cv-item-date yellow">Aug 2017 to Dec 2020</div>
          </div>
          <div class="cv-item-place yellow">
            National University of Singapore
          </div>
          <p class="description">
            <strong>Key modules</strong>: Programming Methodology, Algorithms,
            Software Engineering
            <br />
            <strong>CAP</strong>: 4.28/5.0
            <br />
            <strong>Dissertation</strong>: Regional Multi-Person Pose Estimation
            for Sports Analytics
            <br />
            <strong>Supervisor</strong>: Professor Andrew Lim, Ph.D.
          </p>
        </div>
      </Card>
      <Card header="Employment" header_color="red" border="sky">
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name green">Instructor</div>
            <div class="cv-item-date green">Jan 2023 to Present</div>
          </div>
          <div class="cv-item-place green">
            National University of Singapore
          </div>
          <p class="description">Modules taught: IT5001, IT5100B, IT5100E</p>
        </div>
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name lavender">Teaching Assistant</div>
            <div class="cv-item-date lavender">Aug 2018 to Dec 2022</div>
          </div>
          <div class="cv-item-place lavender">
            National University of Singapore
          </div>
          <p class="description">
            Modules taught: CS1010E, CS2030/S, IT5001, IT5003, IT5004
          </p>
        </div>
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name sapphire">PWA Developer</div>
            <div class="cv-item-date sapphire">Aug 2019 to Aug 2020</div>
          </div>
          <div class="cv-item-place sapphire">
            National University of Singapore
          </div>
          <p class="description">
            Developed a Nuxt.js PWA for NUS Smart Dining Initiative
          </p>
        </div>
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name peach">Business Development</div>
            <div class="cv-item-date peach">May 2018 to Jul 2020</div>
          </div>
          <div class="cv-item-place peach">Sqkii</div>
          <p class="description">
            Liaised with corporate partners for business ventures and pitched
            projects to clients
          </p>
        </div>
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name teal">Co-Founder, President</div>
            <div class="cv-item-date teal">Apr 2018 to Apr 2020</div>
          </div>
          <div class="cv-item-place teal">Uncage</div>
          <p class="description">
            Started a Non-Profit Organization aimed at harnessing the power of
            community to rehabilitate people with Substance Use Disorders
          </p>
        </div>
      </Card>
      <Card header="Projects" header_color="teal" border="peach">
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name mauve">
              Compiling & Detecting Type Errors in Incomplete Java Programs with
              Generics
            </div>
            <div class="cv-item-date mauve">Jan 2021 to May 2023</div>
          </div>
          <div class="cv-item-header">
            <div class="cv-item-place">Master's Thesis</div>
            <div class="cv-item-date">
              Supervisor: Associate Professor Khoo Siau Cheng, Ph.D.
            </div>
          </div>
          <div class="cv-item-place">National University of Singapore</div>
          <p class="description">
            Proposed a novel constraint-based algorithm that compiles incomplete
            Java programs in a typesafe manner and developed a prototype of this
            algorithm, JavaCIP
          </p>
        </div>
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name yellow">
              Regional Multi-Person Pose Estimation for Sports Analytics
            </div>
            <div class="cv-item-date yellow">Aug 2020 to Dec 2020</div>
          </div>
          <div class="cv-item-header">
            <div class="cv-item-place">Bachelor's Thesis</div>
            <div class="cv-item-date">
              Supervisor: Professor Andrew Lim, Ph.D.
            </div>
          </div>
          <div class="cv-item-place">National University of Singapore</div>
          <p class="description">
            Used AlphaPose and a novel LSTM network for Action Recognition in
            Basketball analysis
          </p>
        </div>
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name pink">Fedora-SoC</div>
            <div class="cv-item-date pink">Aug 2020 to Dec 2020</div>
          </div>
          <div class="cv-item-place">National University of Singapore</div>
          <p class="description">
            Developed a fork of Fedora (Linux Workstation) for exam-takers in
            NUS SoC during COVID-19 pandemic
          </p>
        </div>
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name maroon">NUS Smart Dining</div>
            <div class="cv-item-date maroon">Aug 2019 to May 2020</div>
          </div>
          <div class="cv-item-place">National University of Singapore</div>
          <p class="description">
            Used mmdetection computer vision framework to recognize orders from
            top-down camera view at Frontier Food Court’s Drink Stall
          </p>
        </div>
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name flamingo">
              Live Firing Systems Optimization
            </div>
            <div class="cv-item-date flamingo">Feb 2017</div>
          </div>
          <div class="cv-item-place">Singapore Armed Forces</div>
          <p class="description">
            Developed Live Firing scheduling system for use in the Multi-Mission
            Range Complex (MMRC), resulting in S$75,000 annual cost savings
          </p>
        </div>
      </Card>
      <Card header="Awards" header_color="rosewater" border="green">
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name red">
              Full-Time Teaching Assistant Award
            </div>
            <div class="cv-item-date red">May 2022</div>
          </div>
          <div class="cv-item-place red">National University of Singapore</div>
        </div>
        <div class="cv-item sapphire">
          <div class="cv-item-header">
            <div class="cv-item-name">Honour List of Student Tutors</div>
            <div class="cv-item-date">May 2021</div>
          </div>
          <div class="cv-item-place">National University of Singapore</div>
        </div>
        <div class="cv-item lavender">
          <div class="cv-item-header">
            <div class="cv-item-name">Honour List of Student Tutors</div>
            <div class="cv-item-date">May 2019</div>
          </div>
          <div class="cv-item-place">National University of Singapore</div>
        </div>
        <div class="cv-item peach">
          <div class="cv-item-header">
            <div class="cv-item-name">Dean's List</div>
            <div class="cv-item-date">Jan 2019</div>
          </div>
          <div class="cv-item-place">National University of Singapore</div>
        </div>
        <div class="cv-item pink">
          <div class="cv-item-header">
            <div class="cv-item-name">3AMB Base Sergeant Major's Coin</div>
            <div class="cv-item-date">Nov 2016</div>
          </div>
          <div class="cv-item-place">Singapore Armed Forces</div>
        </div>
        <div class="cv-item sky">
          <div class="cv-item-header">
            <div class="cv-item-name">Letter of Commendation</div>
            <div class="cv-item-date">Oct 2016</div>
          </div>
          <div class="cv-item-place">Singapore Armed Forces</div>
        </div>
        <div class="cv-item flamingo">
          <div class="cv-item-header">
            <div class="cv-item-name">3AMB Commanding Officer's Coin</div>
            <div class="cv-item-date">Sep 2016</div>
          </div>
          <div class="cv-item-place">Singapore Armed Forces</div>
        </div>
        <div class="cv-item yellow">
          <div class="cv-item-header">
            <div class="cv-item-name">SCS L Coy Platoon Best Soldier</div>
            <div class="cv-item-date">Sep 2015</div>
          </div>
          <div class="cv-item-place">Singapore Armed Forces</div>
        </div>
        <div class="cv-item maroon">
          <div class="cv-item-header">
            <div class="cv-item-name">BMTC 2 Coy Platoon Best Recruit</div>
            <div class="cv-item-date">Jul 2015</div>
          </div>
          <div class="cv-item-place">Singapore Armed Forces</div>
        </div>
      </Card>
      <Card header="Superpowers" header_color="maroon" border="yellow">
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name teal">Languages</div>
            <div class="cv-item-date"></div>
          </div>
          <p class="description">English, Mandarin</p>
        </div>
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name yellow">Office</div>
            <div class="cv-item-date"></div>
          </div>
          <p class="description">
            Microsoft Office Suite (PowerPoint, Excel, Word)
          </p>
        </div>
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name green">Development</div>
            <div class="cv-item-date"></div>
          </div>
          <p class="description">
            Java, Python, Scala, C/C++, JavaScript, TypeScript, Solid.js,
            Nuxt.js, Vue.js, React.js, Quasar, Node.js, ML, Haskell, Rust, Go,
            R, Firebase, PyTorch, OpenCV, Google Cloud Platform, LaTeX,
            Markdown, HTML, CSS
          </p>
        </div>
        <div class="cv-item">
          <div class="cv-item-header">
            <div class="cv-item-name rosewater">Systems</div>
            <div class="cv-item-date"></div>
          </div>
          <p class="description">
            Tableau, Stella Architect, Automod Simulation
          </p>
        </div>
      </Card>
    </main>
  );
}

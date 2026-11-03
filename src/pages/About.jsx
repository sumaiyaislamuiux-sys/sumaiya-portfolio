import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageIntro from "../components/PageIntro.jsx";
export default function About() {
  return (
    <main className="inner-page about-page">
      <PageIntro
        eyebrow="A LITTLE ABOUT ME"
        title="Curious by nature,"
        accent="human by design."
        description="I'm Sumaiya Islam — a Social Work graduate building a career across visual design, digital products, and frontend development."
      />
      <div className="about-feature botanical-bg">
        <img
          className="about-feature-portrait"
          src="/me.jpg"
          alt="Sumaiya, portrait"
          loading="lazy"
        />
        <div className="about-monogram">
          SI<span>.</span>
        </div>
        <div>
          <p className="eyebrow">MY PERSPECTIVE</p>
          <h2>
            People first.
            <br />
            <em>Always.</em>
          </h2>
          <p>
            My background in Social Work shaped how I look at people,
            communities, and the problems worth solving. Design gives me another
            way to turn that perspective into clear, useful experiences.
          </p>
        </div>
      </div>
      <div className="about-two-col">
        <section>
          <p className="eyebrow">WHAT I'M BUILDING</p>
          <h2>A practice that connects creativity and purpose.</h2>
        </section>
        <section className="body-copy">
          <p>
            I'm developing my skills in graphic design, UI/UX, and frontend
            development, focusing on thoughtful visual systems and easy-to-use
            digital experiences.
          </p>
          <p>
            I enjoy learning by making: creating concepts, documenting the
            process, getting feedback, and improving the work through iteration.
          </p>
          <p>
            This portfolio is a living record of that process—not a claim that
            every skill is finished.
          </p>
          <Link className="text-cta" to="/work">
            Explore selected projects <ArrowUpRight size={15} />
          </Link>
        </section>
      </div>
      <section className="timeline-section">
        <p className="eyebrow">BACKGROUND</p>
        <h2>Experience that shapes my work.</h2>
        <div className="timeline-item">
          <span>EDUCATION</span>
          <div>
            <h3>BSS in Social Work</h3>
            <p>Eden Mohila College · Affiliated University of Dhaka</p>
          </div>
        </div>
        <div className="timeline-item">
          <span>COMMUNITY</span>
          <div>
            <h3>Volunteering & youth engagement</h3>
            <p>
              Community work, collaboration, event support, and communication.
            </p>
          </div>
        </div>
        <div className="timeline-item">
          <span>NOW</span>
          <div>
            <h3>Design & development</h3>
            <p>
              Building portfolio projects across visual design, UI/UX, and
              frontend.
            </p>
          </div>
        </div>
      </section>
      <section className="home-contact compact-contact">
        <p className="eyebrow">LET'S CONNECT</p>
        <h2>
          Good work starts
          <br />
          <em>with a conversation.</em>
        </h2>
        <Link className="button button-light" to="/contact">
          Contact me <ArrowUpRight size={15} />
        </Link>
      </section>
    </main>
  );
}

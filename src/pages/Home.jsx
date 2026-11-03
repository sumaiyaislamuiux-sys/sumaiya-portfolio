import {
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Palette,
} from "lucide-react";

import { Link } from "react-router-dom";
import { profile, projects } from "../data.js";
import ProjectCard from "../components/ProjectCard.jsx";
export default function Home() {
  return (
    <>
      <section className="hero botanical-bg" id="home">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" /> DESIGNER · CREATIVE THINKER ·
            DEVELOPER IN PROGRESS
          </p>
          <h1>
            Thoughtful design.
            <br />
            <em>Meaningful impact.</em>
          </h1>
          <p className="hero-lede">
            Hi, I'm Sumaiya. I create thoughtful visual identities and digital
            experiences, combining creativity, technology, and human-centered
            thinking.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/work">
              Explore my work <ArrowUpRight size={15} />
            </Link>
            <Link className="text-cta" to="/contact">
              Get in touch <ArrowUpRight size={14} />
            </Link>
          </div>
          <p className="availability">
            <span className="availability-dot" /> Open to job and freelance
            opportunities
          </p>
          <div className="hero-socials">
            <a href={profile.links.behance} target="_blank" rel="noreferrer">
              <Palette size={15} /> Behance
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              <Github size={15} /> GitHub
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={15} /> LinkedIn
            </a>
          </div>
        </div>
        <div className="hero-portrait-wrap">
          <div className="portrait-frame">
            <img
              src="/avatar-eyes.webp"
              srcSet="/avatar-eyes-640.webp 640w, /avatar-eyes.webp 1254w"
              sizes="(max-width: 700px) 80vw, 520px"
              alt="Illustrated portrait of Sumaiya wearing a blue hijab"
              width={1254}
              height={1254}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.classList.add(
                  "portrait-fallback",
                );
              }}
            />
            <div className="portrait-fallback-content">
              <span>SI</span>
              <small>YOUR PORTRAIT</small>
              <p>
                Add your portrait as <code>avatar-eyes.png</code> in{" "}
                <code>public/images</code>.
              </p>
            </div>
          </div>
          <div className="portrait-caption">
            <span>01 — A little about me</span>
            <ArrowDownRight size={17} />
          </div>
        </div>
        <div className="hero-side-note">DESIGN / PEOPLE / TECHNOLOGY</div>
      </section>
      <div className="ticker">
        <span>DESIGN</span>
        <i>✳</i>
        <span>TECHNOLOGY</span>
        <i>✳</i>
        <span>PEOPLE</span>
        <i>✳</i>
        <span>IMPACT</span>
      </div>
      <section className="section section-work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SELECTED WORK / 2025—26</p>
            <h2>
              A few things I've
              <br />
              <em>been working on.</em>
            </h2>
          </div>
          <Link className="text-cta" to="/work">
            View all projects <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="project-grid">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
      <section className="statement-section">
        <p className="eyebrow">MY POINT OF VIEW</p>
        <p className="statement">
          Good design makes things <em>clearer, kinder,</em> and easier to use.
        </p>
        <Link className="text-cta" to="/about">
          A little more about me <ArrowUpRight size={15} />
        </Link>
      </section>
      <section className="services-preview">
        <div>
          <p className="eyebrow">WAYS I CAN HELP</p>
          <h2>
            Creative thinking,
            <br />
            <em>made practical.</em>
          </h2>
        </div>
        <div className="service-list">
          <Link to="/skills">
            <span>01</span>
            <strong>Visual identity & graphic design</strong>
            <ArrowUpRight size={17} />
          </Link>
          <Link to="/skills">
            <span>02</span>
            <strong>UI/UX & digital product design</strong>
            <ArrowUpRight size={17} />
          </Link>
          <Link to="/skills">
            <span>03</span>
            <strong>Frontend & portfolio websites</strong>
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="home-contact">
        <p className="eyebrow">HAVE A PROJECT OR OPPORTUNITY?</p>
        <h2>
          Let's make something
          <br />
          <em>meaningful.</em>
        </h2>
        <Link className="button button-light" to="/contact">
          Let's talk <ArrowUpRight size={15} />
        </Link>
      </section>
    </>
  );
}

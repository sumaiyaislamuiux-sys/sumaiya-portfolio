import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import { getImageDimensions, profile, projects } from "./data.js";
import HiCharacter from "./components/HiCharacter.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import "./style.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function Navbar() {
  const links = [
    { label: "Projects", to: "/work" },
    { label: "About", to: "/about" },
    { label: "Skills", to: "/skills" },
    { label: "Experience", to: "/experience" },
  ];

  return (
    <header className="navbar" id="top">
      <Link className="logo" to="/">
        {profile.name}
        <span>.</span>
      </Link>
      <nav aria-label="Main navigation">
        {links.map(({ label, to }) => (
          <NavLink key={to} to={to} end>
            {label}
          </NavLink>
        ))}
        <NavLink className="contact-link" to="/contact">
          Contact ↗
        </NavLink>
      </nav>
    </header>
  );
}

function InteractivePortrait() {
  const stageRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const head = headRef.current;
    const eyeContainer = stage?.querySelector(".eye-layer");
    if (!stage || !left || !right || !head || !eyeContainer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    let frame = 0;
    let activeTouchPointer = null;
    let touchX = 0;
    let touchY = 0;
    const hero = stage.closest(".hero-banner") || stage;

    function move(event) {
      if (event.pointerType === "touch") return;
      const rect = stage.getBoundingClientRect();
      const x = Math.max(
        -1,
        Math.min(
          1,
          (event.clientX - (rect.left + rect.width * 0.5)) /
            (rect.width * 0.34),
        ),
      );
      const y = Math.max(
        -1,
        Math.min(
          1,
          (event.clientY - (rect.top + rect.height * 0.3)) /
            (rect.height * 0.18),
        ),
      );
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const transform = `translate(${x * 13} ${y * 7})`;
        left.setAttribute("transform", transform);
        right.setAttribute("transform", transform);
        head.style.transform = `rotate(${x * 0.5}deg)`;
      });
    }

    function reset() {
      if (activeTouchPointer !== null) return;
      left.setAttribute("transform", "translate(0 0)");
      right.setAttribute("transform", "translate(0 0)");
      head.style.transform = "rotate(0deg)";
    }

    function moveTouch(event) {
      const rect = eyeContainer.getBoundingClientRect();
      touchX = Math.max(
        -1,
        Math.min(
          1,
          (event.clientX - (rect.left + rect.width * 0.5)) /
            (rect.width * 0.34),
        ),
      );
      touchY = Math.max(
        -1,
        Math.min(
          1,
          (event.clientY - (rect.top + rect.height * 0.3)) /
            (rect.height * 0.18),
        ),
      );
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const transform = `translate(${touchX * 13} ${touchY * 7})`;
        left.setAttribute("transform", transform);
        right.setAttribute("transform", transform);
        head.style.transform = `rotate(${touchX * 0.5}deg)`;
      });
    }

    function finishTouch(event) {
      if (event.pointerId !== activeTouchPointer) return;
      activeTouchPointer = null;
      cancelAnimationFrame(frame);

      const startX = touchX;
      const startY = touchY;
      const startTime = performance.now();
      const returnToCenter = (time) => {
        const progress = Math.min(1, (time - startTime) / 220);
        const eased = 1 - (1 - progress) ** 3;
        touchX = startX * (1 - eased);
        touchY = startY * (1 - eased);
        const transform = `translate(${touchX * 13} ${touchY * 7})`;
        left.setAttribute("transform", transform);
        right.setAttribute("transform", transform);
        head.style.transform = `rotate(${touchX * 0.5}deg)`;

        if (progress < 1) {
          frame = requestAnimationFrame(returnToCenter);
        } else {
          touchX = 0;
          touchY = 0;
        }
      };
      frame = requestAnimationFrame(returnToCenter);
    }

    function startTouch(event) {
      if (event.pointerType !== "touch" || activeTouchPointer !== null) return;
      activeTouchPointer = event.pointerId;
      moveTouch(event);
    }

    function trackTouch(event) {
      if (event.pointerId === activeTouchPointer) moveTouch(event);
    }

    if (supportsFinePointer) {
      hero.addEventListener("pointermove", move, { passive: true });
      hero.addEventListener("pointerleave", reset);
    }
    hero.addEventListener("pointerdown", startTouch, { passive: true });
    window.addEventListener("pointermove", trackTouch, { passive: true });
    window.addEventListener("pointerup", finishTouch, { passive: true });
    window.addEventListener("pointercancel", finishTouch, { passive: true });
    return () => {
      if (supportsFinePointer) {
        hero.removeEventListener("pointermove", move);
        hero.removeEventListener("pointerleave", reset);
      }
      hero.removeEventListener("pointerdown", startTouch);
      window.removeEventListener("pointermove", trackTouch);
      window.removeEventListener("pointerup", finishTouch);
      window.removeEventListener("pointercancel", finishTouch);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hero-illustration">
      <div className="window-frame" aria-hidden="true" />
      <div className="portrait-stage" ref={stageRef}>
        <img
          className="portrait-art"
          src="/avatar-eyes.webp"
          srcSet="/avatar-eyes-640.webp 640w, /avatar-eyes.webp 1254w"
          sizes="(max-width: 700px) 80vw, 520px"
          alt="Illustrated portrait of Sumaiya wearing a blue hijab"
          width={1254}
          height={1254}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <svg className="eye-layer" viewBox="0 0 1240 1250" aria-hidden="true">
          <defs>
            <clipPath id="eyeLeftClip">
              <path d="M462 449 Q482 389 511 390 Q539 390 554 407 Q535 426 502 430 Q478 455 462 409Z" />
            </clipPath>
            <clipPath id="eyeRightClip">
              <path d="M661 370 Q680 359 700 348 Q735 345 745 355 Q737 386 705 387 Q679 396 661 370Z" />
            </clipPath>
          </defs>
          <g clipPath="url(#eyeLeftClip)">
            <g ref={leftRef}>
              <ellipse cx="508" cy="408" rx="22" ry="24" fill="#805039" />
              <ellipse cx="508" cy="408" rx="15" ry="20" fill="#291b14" />
              <ellipse cx="508" cy="408" rx="8" ry="13" fill="#120e0b" />
              <circle cx="515" cy="400" r="6.5" fill="#fffaf2" />
              <circle cx="502" cy="414" r="2.5" fill="#fffaf2" />
            </g>
          </g>
          <g clipPath="url(#eyeRightClip)">
            <g ref={rightRef}>
              <ellipse cx="706" cy="369" rx="22" ry="24" fill="#805039" />
              <ellipse cx="706" cy="369" rx="15" ry="20" fill="#291b14" />
              <ellipse cx="706" cy="369" rx="8" ry="13" fill="#120e0b" />
              <circle cx="713" cy="361" r="6.5" fill="#fffaf2" />
              <circle cx="700" cy="375" r="2.5" fill="#fffaf2" />
            </g>
          </g>
        </svg>
        <div className="head-motion" ref={headRef} aria-hidden="true" />
      </div>
      <div className="portrait-ground" aria-hidden="true" />
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="hero hero-banner" id="home">
        <div className="hero-content">
          <p className="eyebrow">
            DESIGNER · CREATIVE THINKER · DEVELOPER IN PROGRESS
          </p>
          <h1>
            Thoughtful design.
            <br />
            <span>Meaningful impact.</span>
          </h1>
          <p className="hero-description">
            Hi, I'm Sumaiya. I create thoughtful visual identities and digital
            experiences, combining creativity, technology, and human-centered
            thinking.
          </p>
          <div className="hero-buttons">
            <Link className="button button-dark" to="/work">
              Explore my work ↗
            </Link>
            <Link className="text-link" to="/contact">
              Get in touch
            </Link>
          </div>
          <p className="availability">
            <span className="status-dot" />
            Open to job and freelance opportunities
          </p>
        </div>
        <div className="hero-visual">
          <InteractivePortrait />
        </div>
      </section>
      <div className="intro-strip">
        DESIGN <span>·</span> TECHNOLOGY <span>·</span> PEOPLE
      </div>
      <section className="section container">
        <div className="section-heading">
          <div>
            {" "}
            <p className="eyebrow">SELECTED WORK</p>
            <h2>
              Projects & explorations<span>.</span>
            </h2>
          </div>
          <p className="section-description">
            A selection of current identity artwork and portfolio explorations.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <p className="note">
          Some case-study details are still in progress. Each project page
          describes what is currently available.
        </p>
      </section>
      <ContactSection compact />
    </>
  );
}

function ProjectCard({ project }) {
  const imageRef = useRef(null);
  const [imageVisible, setImageVisible] = useState(
    () => typeof window === "undefined" || !("IntersectionObserver" in window),
  );
  const { width, height } = getImageDimensions(project.image);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setImageVisible(true);
        observer.disconnect();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(image);

    return () => observer.disconnect();
  }, []);

  return (
    <article className="project-card">
      <div className="project-thumbnail-frame">
        <img
          ref={imageRef}
          className="project-thumbnail"
          src={imageVisible ? project.image : undefined}
          srcSet={imageVisible ? project.imageSrcSet : undefined}
          sizes="(max-width: 600px) 88vw, 42vw"
          alt={`${project.title} artwork`}
          loading="lazy"
          fetchPriority="low"
          decoding="async"
          width={width}
          height={height}
        />
        <span className="project-number">{project.number}</span>
      </div>
      <p className="project-category">{project.category}</p>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <Link
        className="project-detail-link"
        to={`/work/${project.slug}`}
        aria-label={`View ${project.title} project details`}
      >
        Project details ↗
      </Link>
    </article>
  );
}

function Work() {
  return (
    <section className="section container page-section">
      <p className="eyebrow">PORTFOLIO / SELECTED WORK</p>
      <h1 className="page-title">
        Projects & explorations<span>.</span>
      </h1>
      <p className="page-lede">
        A selection of visual identity artwork and portfolio explorations.
        Project details are clearly marked where they are still in progress.
      </p>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function About() {
  const aboutIntroRef = useRef(null);
  const personalThemes = [
    {
      title: "Debate & Public Speaking",
      description:
        "My experience in debating has helped me develop communication, confidence, and critical thinking.",
    },
    {
      title: "Creative Exploration",
      description:
        "I enjoy experimenting with visual ideas, layouts, typography, and digital experiences.",
    },
    {
      title: "Social Engagement",
      description:
        "My Social Work background and volunteering experiences have shaped my interest in people and meaningful impact.",
    },
    {
      title: "Continuous Learning",
      description:
        "I enjoy learning new technologies, exploring creative possibilities, and improving my work.",
    },
  ];

  useEffect(() => {
    const intro = aboutIntroRef.current;
    if (!intro) return;

    const revealItems = intro.querySelectorAll(".about-reveal");
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    intro.classList.add("about-motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  function handlePortraitPointerMove(event) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty(
      "--about-tilt-x",
      `${-offsetY * 8}deg`,
    );
    event.currentTarget.style.setProperty(
      "--about-tilt-y",
      `${offsetX * 8}deg`,
    );
  }

  function resetPortraitTilt(event) {
    event.currentTarget.style.setProperty("--about-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--about-tilt-y", "0deg");
  }

  return (
    <div className="about-page">
      <section
        className="about-intro container"
        aria-labelledby="about-title"
        ref={aboutIntroRef}
      >
        <figure className="about-portrait">
          <div
            className="about-portrait-frame about-reveal"
            onPointerMove={handlePortraitPointerMove}
            onPointerLeave={resetPortraitTilt}
          >
            <img
              src="/me.webp"
              alt="Sumaiya, portrait"
              width={1122}
              height={1402}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="about-reveal">A little about me.</figcaption>
        </figure>
        <div className="about-intro-copy">
          <p className="eyebrow about-reveal">ABOUT ME</p>
          <h1 className="page-title" id="about-title">
            <span className="about-heading-line about-reveal">
              People first.
            </span>
            <span className="about-heading-line about-heading-accent about-reveal">
              Design with purpose.
            </span>
          </h1>
          <div className="about-copy">
            <p className="about-reveal">
              I'm Sumaiya Islam, a Social Work graduate from the University of
              Dhaka with a growing passion for visual design, digital
              experiences, and technology.
            </p>
            <p className="about-reveal">
              My journey brings together two different perspectives:
              understanding people and creating meaningful visual solutions. My
              academic background has shaped how I think about human needs,
              communication, and social impact, while my creative journey allows
              me to translate those ideas into design.
            </p>
            <p className="about-reveal">
              I enjoy exploring new ideas, learning new technologies, and
              continuously improving the way I approach creative challenges.
            </p>
          </div>
          <Link className="about-experience-link about-reveal" to="/experience">
            A little more about my background{" "}
            <span className="about-experience-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </section>

      <section className="about-journey" aria-labelledby="about-journey-title">
        <div className="container">
          <div className="about-section-heading">
            <p className="eyebrow">A FEW THINGS THAT SHAPE ME</p>
            <h2 id="about-journey-title">Beyond the pixels.</h2>
          </div>
          <div className="about-themes">
            {personalThemes.map(({ title, description }, index) => (
              <article className="about-theme" key={title}>
                <span className="about-theme-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="about-philosophy"
        aria-labelledby="about-philosophy-title"
      >
        <div className="container about-philosophy-inner">
          <p className="eyebrow" id="about-philosophy-title">
            A THOUGHT I RETURN TO
          </p>
          <blockquote>
            I believe good design begins with understanding people. It's not
            just about how something looks, but how clearly it communicates and
            how thoughtfully it works.
          </blockquote>
        </div>
      </section>

      <section
        className="about-details container"
        aria-labelledby="about-details-title"
      >
        <div className="about-details-heading">
          <p className="eyebrow">A LITTLE CONTEXT</p>
          <h2 id="about-details-title">Where I’m coming from.</h2>
        </div>
        <dl className="about-details-list">
          <div>
            <dt>Based in</dt>
            <dd>Bangladesh</dd>
          </div>
          <div>
            <dt>Background</dt>
            <dd>Social Work graduate, Eden Mohila College · Affiliated University of Dhaka</dd>
          </div>
          <div>
            <dt>Curious about</dt>
            <dd>Creative technology and meaningful digital experiences</dd>
          </div>
          <div>
            <dt>Open to</dt>
            <dd>Professional collaborations and opportunities</dd>
          </div>
        </dl>
      </section>

      <section className="about-cta" aria-labelledby="about-cta-title">
        <div className="container about-cta-inner">
          <p className="eyebrow">WHAT’S NEXT</p>
          <h2 id="about-cta-title">
            Every creative journey
            <br />
            starts with curiosity.
          </h2>
          <p>
            I'm always interested in meaningful conversations, creative
            collaborations, and opportunities to grow.
          </p>
          <div className="about-cta-links">
            <Link className="button button-dark" to="/work">
              Explore My Work
            </Link>
            <Link className="about-connect-link" to="/contact">
              Let's Connect <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Skills() {
  const skillsSectionRef = useRef(null);
  const skills = [
    {
      number: "01",
      title: "Brand & Graphic Design",
      category: "Visual identity",
      stage: "Design practice",
      description:
        "Develop visual identities through considered typography, logo design, and graphic composition.",
      visual: "identity",
      image: "/bitebox.webp",
      link: "https://www.behance.net/sumaiyaislam501265",
      linkLabel: "Visit Sumaiya's Behance profile (opens in a new tab)",
      skills: [
        "Visual identity",
        "Logo design",
        "Typography",
        "Graphic design",
      ],
    },
    {
      number: "02",
      title: "UI/UX Design",
      category: "Digital experience",
      stage: "Developing practice",
      description:
        "Shape clear digital journeys with user flows, wireframes, prototypes, and responsive interfaces.",
      visual: "interface",
      image: "/finora.webp",
      link: "https://www.behance.net/gallery/244245817/Modern-Athletic-Landing-Page-UIUX-Design-Case-Study",
      linkLabel: "View UI/UX Design case study on Behance (opens in a new tab)",
      skills: [
        "Figma",
        "Wireframes",
        "User flows",
        "Prototyping",
        "Responsive UI",
      ],
    },
    {
      number: "03",
      title: "Frontend Development",
      category: "Web foundations",
      stage: "Learning and building",
      description:
        "Bring interface ideas to life through hands-on practice with modern web technologies.",
      visual: "development",
      image: "/webdevelopment.webp",
      link: "https://github.com/sumaiyaislamuiux-sys",
      linkLabel: "Visit Sumaiya's GitHub profile (opens in a new tab)",
      skills: ["HTML", "CSS", "JavaScript fundamentals", "React", "Bootstrap"],
    },
    {
      number: "04",
      title: "Creative Digital Work",
      category: "Visual communication",
      stage: "Creative practice",
      description:
        "Communicate ideas through digital content, presentation design, and visual research.",
      visual: "creative",
      image: "/creative-digital.webp",
      link: "https://www.behance.net/sumaiyaislam501265",
      linkLabel: "Visit Sumaiya's Behance profile (opens in a new tab)",
      skills: [
        "Digital content",
        "Presentation design",
        "Visual communication",
        "Research",
      ],
    },
  ];

  useEffect(() => {
    const section = skillsSectionRef.current;
    if (!section) return;

    const revealItems = section.querySelectorAll(".skills-reveal");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="skills-motion-ready skills-experience-page"
      ref={skillsSectionRef}
    >
      <section className="section container page-section skills-page">
        <p className="eyebrow skills-reveal">
          SKILLS &amp; CREATIVE SERVICES
        </p>
        <h1 className="page-title skills-title">
          <span className="skills-title-line skills-reveal">
            Ideas into visuals.
          </span>
          <span className="skills-title-line skills-title-accent skills-reveal">
            Design into experiences.
          </span>
        </h1>
        <span className="skills-title-rule skills-reveal" aria-hidden="true" />
        <p className="page-lede skills-reveal">
          I combine visual storytelling, thoughtful design, and emerging
          technology to create meaningful digital experiences and brand
          identities.
        </p>
        <div className="skills-grid">
          {skills.map((service, index) => {
            const {
              number,
              title,
              category,
              stage,
              description,
              visual,
              image,
              link,
              linkLabel,
              skills: items,
            } = service;
            const imageDimensions = image ? getImageDimensions(image) : null;
            const ServiceCard = link ? "a" : "article";

            return (
              <ServiceCard
                className={`skill-card skills-service-card skills-reveal skills-visual-${visual}`}
                key={number}
                style={{ "--service-index": index }}
                {...(link
                  ? {
                      href: link,
                      target: "_blank",
                      rel: "noreferrer",
                      "aria-label": linkLabel,
                    }
                  : {})}
              >
                <div className="skills-card-topline">
                  <span className="skills-card-number">{number}</span>
                  <span className="skills-card-category">{category}</span>
                </div>
                <div
                  className={`skills-card-visual${image ? " has-image" : ""}`}
                >
                  {image ? (
                    <img
                      className="skills-card-visual-image"
                      src={image}
                      alt="Bitebox brand identity, packaging, and color palette"
                      loading="lazy"
                      decoding="async"
                      width={imageDimensions.width}
                      height={imageDimensions.height}
                    />
                  ) : (
                    <>
                      <span className="skills-visual-shape skills-visual-shape-one" />
                      <span className="skills-visual-shape skills-visual-shape-two" />
                      <span className="skills-visual-shape skills-visual-shape-three" />
                    </>
                  )}
                </div>
                <div className="skills-card-heading">
                  <h2>{title}</h2>
                  <span className="skill-card-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <p className="skills-card-description">{description}</p>
                <p className="skills-card-stage">{stage}</p>
                <ul className="skill-tags">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </ServiceCard>
            );
          })}
        </div>
      </section>
      <section
        className="skills-approach"
        aria-labelledby="skills-approach-title"
      >
        <div className="container skills-approach-inner">
          <p className="eyebrow skills-reveal">A CREATIVE APPROACH</p>
          <h2 className="skills-reveal" id="skills-approach-title">
            Every meaningful design begins with a better question.
          </h2>
          <p className="skills-reveal">
            I bring together human-centered thinking, visual storytelling, and
            digital creativity to turn ideas into purposeful designs that
            communicate, connect, and make an impact.
          </p>
        </div>
      </section>
      <section className="skills-cta container" aria-labelledby="skills-cta-title">
        <div className="skills-cta-copy skills-reveal">
          <p className="eyebrow">LET&apos;S MAKE SOMETHING MEANINGFUL</p>
          <h2 id="skills-cta-title">Have a creative project in mind?</h2>
          <p>Let&apos;s turn your idea into something meaningful.</p>
        </div>
        <Link className="button button-dark skills-cta-button skills-reveal" to="/contact">
          Let&apos;s collaborate <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}

function CareerTimelineEntry({ label, title, organization, date, children }) {
  return (
    <li className="career-timeline-item">
      <article className="career-timeline-entry">
        <p className="career-entry-label">{label}</p>
        <div className="career-entry-content">
          <div className="career-entry-heading">
            <div>
              <h3>{title}</h3>
              <p className="career-organization">{organization}</p>
            </div>
            {date && <span className="career-date">{date}</span>}
          </div>
          {children}
        </div>
      </article>
    </li>
  );
}

function GalleryImage({ item, onMissing }) {
  const [failed, setFailed] = useState(false);
  const dimensions = item.image ? getImageDimensions(item.image) : null;

  if (!item.image) {
    return (
      <span className="gallery-image-placeholder">
        {item.placeholder || "Image will be added later"}
      </span>
    );
  }

  if (failed && onMissing) return null;

  return failed ? (
    <span className="gallery-image-placeholder">
      {item.placeholder || "Image will be added later"}
    </span>
  ) : (
    <img
      src={item.image}
      alt={item.imageAlt}
      loading="lazy"
      decoding="async"
      width={dimensions.width}
      height={dimensions.height}
      onError={() => {
        setFailed(true);
        onMissing?.();
      }}
    />
  );
}

function GalleryCard({
  item,
  number,
  actionLabel,
  onPreview,
}) {
  const [imageMissing, setImageMissing] = useState(!item.image);

  return (
    <article className="gallery-card">
      <button
        className="gallery-image-button"
        type="button"
        disabled={imageMissing}
        onClick={() => onPreview(item)}
        aria-label={`${actionLabel}: ${item.title}`}
      >
        <span className="gallery-image-frame">
          <GalleryImage
            item={item}
            onMissing={() => setImageMissing(true)}
          />
        </span>
      </button>
      <div className="gallery-card-copy">
        {number && (
          <span className="certification-number" aria-hidden="true">
            {number}
          </span>
        )}
        <h3>{item.title}</h3>
        {item.description && <p className="gallery-description">{item.description}</p>}
        {item.detail && <p className="gallery-detail">{item.detail}</p>}
        <p className="gallery-organization">{item.organization}</p>
        {item.date && <p className="gallery-date">{item.date}</p>}
        <button
          className="gallery-view-link"
          type="button"
          disabled={imageMissing}
          onClick={() => onPreview(item)}
        >
          {imageMissing ? "Image unavailable" : actionLabel}
          {!imageMissing && <span aria-hidden="true">↗</span>}
        </button>
      </div>
    </article>
  );
}

function RecognitionCard({ item, number, onPreview }) {
  const [imageAvailable, setImageAvailable] = useState(Boolean(item.image));
  const dimensions = item.image ? getImageDimensions(item.image) : null;

  return (
    <article className="recognition-card">
      <button
        className="recognition-image-button"
        type="button"
        disabled={!imageAvailable}
        onClick={() => onPreview(item)}
        aria-label={`View recognition: ${item.title}`}
      >
        <span className="recognition-image-frame">
          {imageAvailable ? (
            <img
              src={item.image}
              alt={item.imageAlt}
              loading="lazy"
              decoding="async"
              width={dimensions.width}
              height={dimensions.height}
              onError={() => setImageAvailable(false)}
            />
          ) : (
            <span className="gallery-image-placeholder">
              {item.placeholder || "Image will be added later"}
            </span>
          )}
        </span>
      </button>
      <div className="recognition-card-copy">
        <span className="recognition-number" aria-hidden="true">
          {number}
        </span>
        <h3>{item.title}</h3>
        <p className="recognition-organization">{item.organization}</p>
        {item.description && (
          <p className="recognition-description">{item.description}</p>
        )}
        {item.detail && <p className="recognition-detail">{item.detail}</p>}
        {item.date && <p className="recognition-date">{item.date}</p>}
        <button
          className="recognition-view-link"
          type="button"
          disabled={!imageAvailable}
          onClick={() => onPreview(item)}
        >
          View recognition <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  );
}

function LeadershipBadgeImage({ item, onPreview }) {
  const [available, setAvailable] = useState(true);
  if (!available) return null;

  return (
    <button
      className="leadership-badge-image"
      type="button"
      onClick={() => onPreview(item)}
      aria-label={`View badge for ${item.title}`}
    >
      <GalleryImage item={item} onMissing={() => setAvailable(false)} />
    </button>
  );
}

function ImagePreviewDialog({ image, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (image && dialog && !dialog.open) dialog.showModal();
  }, [image]);

  if (!image) return null;

  return (
    <dialog
      ref={dialogRef}
      className="gallery-lightbox"
      aria-label={`Image preview: ${image.title}`}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        dialogRef.current?.close();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          dialogRef.current?.close();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      <button
        className="gallery-lightbox-close"
        type="button"
        onClick={() => dialogRef.current?.close()}
        aria-label="Close image preview"
        autoFocus
      >
        <span aria-hidden="true">×</span>
      </button>
      <figure>
        <img
          src={image.image}
          alt={image.imageAlt}
          width={getImageDimensions(image.image).width}
          height={getImageDimensions(image.image).height}
          decoding="async"
        />
        <figcaption>{image.title}</figcaption>
      </figure>
    </dialog>
  );
}

function Experience() {
  const [previewImage, setPreviewImage] = useState(null);

  const education = [
    {
      label: "UNDERGRADUATE",
      title: "BSS in Social Work",
      organization: "Eden Mohila College · University of Dhaka",
      date: "",
    },
    {
      label: "POSTGRADUATE",
      title: "MSS in Social Work",
      organization: "Eden Mohila College",
      date: "Ongoing",
      placeholder: true,
    },
  ];

  const positions = [
    {
      label: "PROFESSIONAL EXPERIENCE",
      title: "Campus Ambassador",
      organization: "Creative IT Institute (CIT)",
      date: "July 2023 – August 2026",
      responsibilities: [
        "Supported institutional knowledge management by creating and maintaining documentation for workshops, training events, and outreach campaigns.",
        "Coordinated with cross-functional teams to compile and disseminate information to diverse audiences.",
      ],
      recognition:
        "The Most Dynamic Ambassador Award for outstanding performance and initiative.",
    },
    {
      label: "PROFESSIONAL EXPERIENCE",
      title: "Social Work Intern",
      organization: "Bangladesh Medical University (BMU)",
      date: "2025",
      responsibilities: [
        "Supported institutional coordination, documentation, and knowledge-sharing activities across departments.",
        "Assisted in data collection, case documentation, and professional reporting in a multi-stakeholder environment.",
      ],
      recognition: "Probationary Social Worker certification.",
    },
    {
      label: "PROFESSIONAL EXPERIENCE",
      title: "Social Work Intern",
      organization: "BIRDEM General Hospital",
      date: "2026",
      responsibilities: [
        "Supported institutional coordination, documentation, and knowledge-sharing activities across departments.",
        "Assisted in data collection, case documentation, and professional reporting in a multi-stakeholder environment.",
      ],
      recognition: "Probationary Social Worker certification.",
    },
  ];

  const leadership = [
    {
      title: "Office Secretary",
      date: "2025–2026",
      organization: "Eden Mohila College Debating Club",
      image: "/emcdc%20secratary%20batch.webp",
      imageAlt: "Office Secretary badge for the 2025–2026 term",
    },
    {
      title: "Education & Session Secretary",
      date: "2024–2025",
      organization: "Eden Mohila College Debating Club",
      image: "/emcdc%20session%20secratary%20batch.webp",
      imageAlt: "Education and Session Secretary badge for the 2024–2025 term",
    },
  ];

  const certifications = [
    {
      title: "Professional Graphic Design",
      organization: "Creative IT Institute",
      date: "2024",
      image: "/professional-graphic%20-design.webp",
      imageAlt: "Professional Graphic Design certificate from Creative IT Institute",
      placeholder: "Certificate image will be added later",
    },
    {
      title: "NSDA National Skills Certificate",
      organization: "Bangladesh",
      detail: "Graphics Design Level 3 · 360 hours",
      image: "/nsda-graphic-design.webp",
      imageAlt: "NSDA National Skills Certificate for Graphics Design Level 3",
      placeholder: "Certificate image will be added later",
    },
    {
      title: "Mastering UI/UX Design Course",
      organization: "Freelancing Factory Program, GP Academy",
      date: "February 2026",
      image: "/uiux-designer-gp-academy.webp",
      imageAlt: "Mastering UI/UX Design Course certificate",
      placeholder: "Certificate image will be added later",
    },
    {
      title: "NSDA National Skills Certificate",
      organization: "Bangladesh",
      detail: "Web Design Level 3 · 360 hours",
      image: "/nsda-web-design.webp",
      imageAlt: "NSDA National Skills Certificate for Web Design Level 3",
      placeholder: "Certificate image will be added later",
    },
    {
      title: "Graphic Design Certificate",
      organization: "WorkWave, Futurenation, Grameenphone & UNDP",
      detail: "Co-hosted programme",
      image: "/graphic-design-certificate.webp",
      imageAlt: "Graphic Design Certificate from the co-hosted programme",
      placeholder: "Certificate image will be added later",
    },
    {
      title: "EAGLE Fellowship Mentorship Programme",
      organization: "Pcycle & Malala Fund",
      date: "2025",
      image: "/eagle-certificate%20.webp",
      imageAlt: "EAGLE Fellowship Mentorship Programme certificate",
      placeholder: "Certificate image will be added later",
    },
    {
      title: "Red Cross / Red Crescent Basic & First Aid Training Course",
      organization: "BDRCS, Dhaka City Unit",
      date: "May 2025",
      image: "/bd-red-creascent.webp",
      imageAlt: "Red Cross and Red Crescent Basic and First Aid Training certificate",
      placeholder: "Certificate image will be added later",
    },
    {
      title: "Figma Design System Course",
      organization: "Grameenphone Academy",
      date: "March 2026",
      image: "/certificate-figma-design-system.webp",
      imageAlt: "Figma Design System Course certificate from Grameenphone Academy",
      placeholder: "Certificate image will be added later",
    },
  ];

  const recognitions = [
    {
      title: "The Most Dynamic Ambassador Award",
      organization: "Creative IT Institute",
      date: "2024",
      description:
        "Recognized for outstanding performance and initiative as a Campus Ambassador.",
      image: "/campus-ambassador-trophy.webp",
      imageAlt: "Most Dynamic Ambassador Award trophy",
      imageFit: "cover",
    },
    {
      title: "Probationary Social Worker Recognition",
      organization: "Bangladesh Medical University",
      date: "2025",
      image: "/bangladesh-medical-university-certificate.webp",
      imageAlt: "Probationary Social Worker recognition from Bangladesh Medical University",
    },
    {
      title: "Certificate of Experience",
      organization: "Creative IT Institute",
      description:
        "Recognition of my contribution and participation in the Campus Ambassador Programme.",
      image: "/cit-certificate-of-experience.webp",
      imageAlt: "Framed Certificate of Experience mockup from Creative IT Institute",

       
    },
    {
      title: "Probationary Social Worker Recognition",
      organization: "BIRDEM General Hospital",
      date: "2026",
      image: "/birdem-certificate.webp",
      imageAlt: "Probationary Social Worker certificate from BIRDEM General Hospital",
    },
  ];

  return (
    <div className="career-page">
      <header className="career-header section container page-section">
        <p className="eyebrow">BACKGROUND & RECOGNITION</p>
        <h1 className="page-title">
          Education & experience<span>.</span>
        </h1>
        <p className="page-lede">
          A record of the education, work, leadership, and training that have
          shaped my professional journey.
        </p>
      </header>

      <section
        className="career-section container career-education"
        aria-labelledby="career-education-title"
      >
        <div className="career-section-heading">
          <p className="eyebrow">01 / EDUCATION</p>
          <h2 id="career-education-title">Education</h2>
        </div>
        <ol className="career-timeline">
          {education.map((item) => (
            <CareerTimelineEntry key={item.label} {...item}>
              {item.placeholder && (
                <p className="career-editable-note">
                  
                </p>
              )}
            </CareerTimelineEntry>
          ))}
        </ol>
      </section>

      <section
        className="career-section container career-experience"
        aria-labelledby="career-experience-title"
      >
        <div className="career-section-heading">
          <p className="eyebrow">02 / PROFESSIONAL EXPERIENCE</p>
          <h2 id="career-experience-title">Professional experience</h2>
        </div>
        <ol className="career-timeline">
          {positions.map((position) => (
            <CareerTimelineEntry
              key={`${position.organization}-${position.title}`}
              {...position}
            >
              <ul className="career-responsibilities">
                {position.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
              <p className="career-recognition-note">
                <span>Recognition</span>
                <span className="career-recognition-copy">
                  {position.recognition}
                </span>
              </p>
            </CareerTimelineEntry>
          ))}
        </ol>
      </section>

      <section
        className="career-section container"
        aria-labelledby="career-leadership-title"
      >
        <div className="career-section-heading">
          <p className="eyebrow">03 / LEADERSHIP & VOLUNTEERING</p>
          <h2 id="career-leadership-title">Leadership & community</h2>
        </div>
        <article className="leadership-card">
          <div>
            <p className="career-entry-label">EMCDC</p>
            <h3>Eden Mohila College Debating Club</h3>
          </div>
          <ul className="leadership-roles">
            {leadership.map((item) => (
              <li key={item.title}>
                <div className="leadership-role-copy">
                  <span>{item.title}</span>
                  <span>{item.date}</span>
                </div>
                <LeadershipBadgeImage
                  item={item}
                  onPreview={setPreviewImage}
                />
              </li>
            ))}
          </ul>
        </article>
        <p className="career-community-note">
          
        </p>
      </section>

      <section
        className="career-section container"
        aria-labelledby="career-certifications-title"
      >
        <div className="career-section-heading">
          <p className="eyebrow">04 / CERTIFICATIONS & TRAINING</p>
          <h2 id="career-certifications-title">
            Certifications & professional training
          </h2>
        </div>
        <div className="certification-grid">
          {certifications.map((item, index) => (
            <GalleryCard
              key={item.title + item.image}
              item={item}
              number={String(index + 1).padStart(2, "0")}
              actionLabel="View certificate"
              onPreview={setPreviewImage}
            />
          ))}
        </div>
      </section>

      <section
        className="career-recognitions"
        aria-labelledby="career-recognitions-title"
      >
        <div className="container">
          <div className="career-section-heading">
            <p className="eyebrow">05 / RECOGNITION</p>
            <h2 id="career-recognitions-title">Recognition & achievements</h2>
            <p className="recognition-intro">
              Every milestone represents an opportunity to learn, contribute,
              and grow. These recognitions reflect my journey across creative
              work, professional development, and social engagement.
            </p>
          </div>
          <div className="recognition-grid">
            {recognitions.map((item, index) => (
              <RecognitionCard
                key={`${item.organization}-${item.title}`}
                item={item}
                number={String(index + 1).padStart(2, "0")}
                onPreview={setPreviewImage}
              />
            ))}
          </div>
        </div>
      </section>
      <ImagePreviewDialog
        image={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </div>
  );
}

function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="section container page-section">
        <p className="eyebrow">PROJECT</p>
        <h1 className="page-title">
          Project not found<span>.</span>
        </h1>
        <Link className="text-link" to="/work">
          Back to projects
        </Link>
      </section>
    );
  }

  return (
    <article
      className={`section container page-section project-detail project-detail-${project.slug}`}
    >
      <Link className="text-link" to="/work">
        ← All projects
      </Link>
      <p className="eyebrow">
        {project.number} / {project.category}
      </p>
      <h1 className="page-title">
        {project.title}
        <span>.</span>
      </h1>
      <p className="page-lede">{project.description}</p>
      <img
        className="project-detail-image"
        src={project.detailImage || project.image}
        alt={`${project.title} artwork`}
        width={getImageDimensions(project.detailImage || project.image).width}
        height={getImageDimensions(project.detailImage || project.image).height}
        decoding="async"
      />
      {project.status && <p className="project-status">{project.status}</p>}
      <Link className="button button-dark" to="/contact">
        Get in touch ↗
      </Link>
    </article>
  );
}

function ContactSection({ compact = false }) {
  return (
    <section
      className={`contact-section${compact ? " compact-contact" : " page-section contact-page-motion"}`}
    >
      {compact ? (
        <div className="container contact-section-inner">
          <p className="eyebrow">CONTACT / COLLABORATION</p>
          <h2>
            Let's create something
            <br />
            meaningful<span>.</span>
          </h2>
          <p>
            For employers, freelance clients, or a thoughtful conversation, I'd
            love to hear from you.
          </p>
          <a className="button button-light" href={`mailto:${profile.email}`}>
            Get in touch ↗
          </a>
        </div>
      ) : (
        <ContactExperience />
      )}
    </section>
  );
}

function ContactExperience() {
  const interactionRef = useRef(null);
  const characterRef = useRef(null);
  const touchHideTimeoutRef = useRef(null);
  const [characterVisible, setCharacterVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 640px), (hover: none)").matches,
  );
  const [helloActive, setHelloActive] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia(
      "(max-width: 640px), (hover: none)",
    );
    const updateMobile = () => {
      setIsMobile(mobileQuery.matches);
    };

    updateMobile();
    mobileQuery.addEventListener("change", updateMobile);
    return () => {
      mobileQuery.removeEventListener("change", updateMobile);
      window.clearTimeout(touchHideTimeoutRef.current);
    };
  }, []);

  function handlePointerEnter(event) {
    if (event.pointerType === "mouse" && !isMobile) {
      setCharacterVisible(true);
    } else if (event.pointerType === "touch") {
      window.clearTimeout(touchHideTimeoutRef.current);
      setCharacterVisible(true);
    }
  }

  function handlePointerMove(event) {
    if (event.pointerType !== "mouse" || !interactionRef.current) return;

    const bounds = interactionRef.current.getBoundingClientRect();
    const offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 4;
    const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 3;
    characterRef.current?.style.setProperty(
      "--character-pointer-x",
      `${offsetX}px`,
    );
    characterRef.current?.style.setProperty(
      "--character-pointer-y",
      `${offsetY}px`,
    );
  }

  function handlePointerLeave(event) {
    if (event.pointerType !== "touch" && !isMobile) {
      setCharacterVisible(false);
    }
    characterRef.current?.style.setProperty("--character-pointer-x", "0px");
    characterRef.current?.style.setProperty("--character-pointer-y", "0px");
  }

  function handleHeadlineClick(event) {
    if (event.detail === 0 || isMobile) {
      setCharacterVisible(true);
      if (isMobile) {
        window.clearTimeout(touchHideTimeoutRef.current);
        touchHideTimeoutRef.current = window.setTimeout(() => {
          setCharacterVisible(false);
        }, 2600);
      }
    }
  }

  function handlePointerUp(event) {
    if (event.pointerType === "touch") {
      window.clearTimeout(touchHideTimeoutRef.current);
      touchHideTimeoutRef.current = window.setTimeout(() => {
        setCharacterVisible(false);
      }, 2600);
    }
  }

  function scrollToContact(event) {
    event.preventDefault();
    setHelloActive(false);
    event.currentTarget.blur();
    document.getElementById("contact-details")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
  }

  return (
    <>
      <div
        className="container contact-section-inner contact-experience"
      >
        <p className="eyebrow">CONTACT / COLLABORATION</p>
        <a
          className="say-hi-link"
          href="#contact-details"
          onMouseEnter={() => setHelloActive(true)}
          onMouseLeave={() => setHelloActive(false)}
          onFocus={() => setHelloActive(true)}
          onBlur={() => setHelloActive(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setHelloActive(false);
              event.currentTarget.blur();
            }
          }}
          onClick={scrollToContact}
        >
          SAY HI
        </a>
        <div
          className="contact-interaction-stage"
          ref={interactionRef}
        >
          <h1
            className="contact-heading"
            aria-label="THIS COULD BE THE START OF SOMETHING."
          >
            <button
              type="button"
              className="contact-heading-toggle"
              aria-expanded={characterVisible}
              onClick={handleHeadlineClick}
              onPointerEnter={handlePointerEnter}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <span className="contact-headline-first">
                THIS COULD BE THE
              </span>{" "}
              <span className="contact-headline-rest">
                <HiCharacter
                  visible={characterVisible}
                  characterRef={characterRef}
                />{" "}
                START OF SOMETHING.
              </span>
            </button>
          </h1>
        </div>
        <div className="contact-services">
          <div
            className="services-marquee"
            role="group"
            aria-label="Brand identity, UI/UX design, graphic design, web design, creative collaboration"
          >
            <div className="services-marquee-track" aria-hidden="true">
              <span className="services-marquee-group">
                BRAND IDENTITY ✳ UI/UX DESIGN ✳ GRAPHIC DESIGN ✳ WEB DESIGN ✳
                CREATIVE COLLABORATION ✳
              </span>
              <span className="services-marquee-group">
                BRAND IDENTITY ✳ UI/UX DESIGN ✳ GRAPHIC DESIGN ✳ WEB DESIGN ✳
                CREATIVE COLLABORATION ✳
              </span>
            </div>
          </div>
          <p className="contact-availability">
            <span className="status-dot" aria-hidden="true" />
            Open to freelance projects &amp; creative collaborations.
          </p>
        </div>
        <div className="contact-details" id="contact-details">
          <p>
            For employers, freelance clients, or a thoughtful conversation, I'd
            love to hear from you.
          </p>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            
          </a>
          <a className="button button-dark contact-button" href={`mailto:${profile.email}`}>
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      {createPortal(
        <div
          className={`contact-hello-overlay${helloActive ? " is-active" : ""}`}
          aria-hidden="true"
        >
          <div className="contact-hello-content">
            <div className="contact-hello-word">
              {"HELLO".split("").map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  style={{ "--letter-index": index }}
                >
                  {letter}
                </span>
              ))}
              <span className="contact-hello-period">.</span>
            </div>
            <p className="contact-hello-caption">
              Share your worries, ideas, or just say hello.
            </p>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

function Contact() {
  return <ContactSection />;
}

function formatDhakaDateTime(date) {
  const dateParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).formatToParts(date);
  const timeParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).formatToParts(date);
  const datePart = (type) => dateParts.find((part) => part.type === type)?.value;
  const timePart = (type) => timeParts.find((part) => part.type === type)?.value;

  return {
    date: `${datePart("day")} ${datePart("month")?.toUpperCase()} ${datePart("year")}`,
    time: `${timePart("hour")}:${timePart("minute")}:${timePart("second")} ${timePart("dayPeriod")?.toUpperCase()}`,
    year: datePart("year"),
  };
}

function SiteFooter() {
  const [dhakaDateTime, setDhakaDateTime] = useState(() =>
    formatDhakaDateTime(new Date()),
  );

  useEffect(() => {
    const updateTime = () => setDhakaDateTime(formatDhakaDateTime(new Date()));
    const intervalId = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <footer className="footer editorial-footer">
      <div className="editorial-footer-inner">
        <div className="footer-columns">
          <nav className="footer-column" aria-label="Explore">
            <h2>Explore</h2>
            <Link to="/work">Projects</Link>
            <Link to="/about">About me</Link>
            <Link to="/skills">Skills &amp; Services</Link>
            <Link to="/experience">Experience</Link>
          </nav>
          <nav className="footer-column footer-socials" aria-label="Connect">
            <h2>Connect</h2>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={profile.links.behance} target="_blank" rel="noreferrer">
              Behance
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.links.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={profile.links.pinterest} target="_blank" rel="noreferrer">
              Pinterest
            </a>
            <a href={profile.links.x} target="_blank" rel="noreferrer">
              X
            </a>
          </nav>
          <div className="footer-column footer-contact">
            <h2>Get in touch</h2>
            <p>Dhaka, Bangladesh</p>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <p>Available for creative collaborations.</p>
            <Link className="footer-talk-link" to="/contact">
              Let&apos;s talk <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {dhakaDateTime.year} {profile.name}. All rights reserved.
          </p>
          <div className="footer-clock" aria-label="Current time in Dhaka">
            <div className="footer-clock-location">
              <span>DHAKA, BANGLADESH · GMT+6</span>
              <span className="footer-live">
                <span className="footer-live-dot" aria-hidden="true" />
                LIVE
              </span>
            </div>
            <time className="footer-clock-time">{dhakaDateTime.time}</time>
            <time className="footer-clock-date">{dhakaDateTime.date}</time>
          </div>
          <a className="footer-back-to-top" href="#top">
            Back to top <span className="footer-back-arrow" aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function PortfolioLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <section className="section container page-section">
                <h1 className="page-title">
                  Page not found<span>.</span>
                </h1>
                <Link className="button button-dark" to="/">
                  Return home
                </Link>
              </section>
            }
          />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <PortfolioLayout />
    </BrowserRouter>
  );
}

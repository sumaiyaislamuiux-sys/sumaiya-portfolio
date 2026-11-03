import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageIntro from "../components/PageIntro.jsx";
const groups = [
  {
    no: "01",
    title: "Visual design",
    level: "Design practice",
    desc: "Creating cohesive, thoughtful visual systems for brands and communication.",
    tags: [
      "Brand identity",
      "Logo design",
      "Typography",
      "Social media design",
      "Mockups",
      "Presentation design",
    ],
  },
  {
    no: "02",
    title: "UI/UX design",
    level: "Product design practice",
    desc: "Planning digital experiences with clear user flows and usable interfaces.",
    tags: [
      "Figma",
      "Wireframes",
      "Prototyping",
      "User flows",
      "UX case studies",
      "Responsive UI",
    ],
  },
  {
    no: "03",
    title: "Frontend development",
    level: "Learning & building",
    desc: "Turning visual layouts into responsive pages and gradually adding interactivity.",
    tags: [
      "HTML",
      "CSS",
      "Bootstrap",
      "JavaScript fundamentals",
      "React",
      "GitHub",
    ],
  },
  {
    no: "04",
    title: "Research & communication",
    level: "Academic and practical background",
    desc: "Combining social understanding, documentation, coordination, and communication.",
    tags: [
      "Social Work",
      "Research",
      "Documentation",
      "Public speaking",
      "Teamwork",
      "Community engagement",
    ],
  },
];
export default function Skills() {
  return (
    <main className="inner-page">
      <PageIntro
        eyebrow="CAPABILITIES / CURRENT PRACTICE"
        title="What I can"
        accent="bring to the table."
        description="A practical overview of the disciplines I'm working across. I keep learning in public and describe my proficiency honestly."
      />
      <div className="skills-page-list">
        {groups.map((g) => (
          <article className="skills-row" key={g.no}>
            <div className="skills-row-top">
              <span>{g.no}</span>
              <span>{g.level}</span>
            </div>
            <div className="skills-row-body">
              <div>
                <h2>{g.title}</h2>
                <p>{g.desc}</p>
              </div>
              <div className="tag-list">
                {g.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <section className="service-callout">
        <div>
          <p className="eyebrow">NEED A CREATIVE PARTNER?</p>
          <h2>
            Let's find the right
            <br />
            <em>way to work together.</em>
          </h2>
        </div>
        <Link className="button button-dark" to="/contact">
          Start a conversation <ArrowUpRight size={15} />
        </Link>
      </section>
    </main>
  );
}

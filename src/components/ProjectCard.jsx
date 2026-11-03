import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <Link
        to={`/work/${project.slug}`}
        className={`project-cover cover-${project.color}`}
        aria-label={`View ${project.title} project`}
      >
        <span className="cover-number">{project.number} / 04</span>
        <div className="cover-art">
          <span className="cover-orbit orbit-one" />
          <span className="cover-orbit orbit-two" />
          <span className="cover-word">{project.title}</span>
          <span className="cover-subtitle">{project.category}</span>
        </div>
        <span className="cover-arrow">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <div className="project-meta">
        <div>
          <p className="eyebrow">{project.category}</p>
          <h3>
            <Link to={`/work/${project.slug}`}>{project.title}</Link>
          </h3>
        </div>
        <span className="project-year">{project.year}</span>
      </div>
      <p className="project-description">{project.description}</p>
    </article>
  );
}

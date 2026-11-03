import { useState } from "react";
import { projects } from "../data.js";
import PageIntro from "../components/PageIntro.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
export default function Work() {
  const [filter, setFilter] = useState("All work");
  const filters = ["All work", "Graphic Design", "UI/UX", "Product Design"];
  const visible = projects.filter(
    (p) => filter === "All work" || p.type === filter,
  );
  return (
    <main className="inner-page">
      <PageIntro
        eyebrow="PORTFOLIO / SELECTED WORK"
        title="Ideas made"
        accent="visible."
        description="A selection of visual identities, digital product explorations, and concepts. Add final assets and process notes as projects are ready."
      />
      <div className="filter-row">
        {filters.map((item) => (
          <button
            key={item}
            className={filter === item ? "filter-chip selected" : "filter-chip"}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      <p className="small-note">
        Concepts are labelled as concepts. Only include work and outcomes you
        can accurately describe.
      </p>
    </main>
  );
}

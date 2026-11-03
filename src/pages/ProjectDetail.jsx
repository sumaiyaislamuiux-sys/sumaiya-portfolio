import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { projects } from "../data.js";
export default function ProjectDetail() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  useEffect(() => window.scrollTo(0, 0), [slug]);
  if (!p)
    return (
      <main className="inner-page">
        <h1>Project not found.</h1>
        <Link to="/work">Back to work</Link>
      </main>
    );
  return (
    <main className="inner-page project-detail">
      <Link className="back-link" to="/work">
        <ArrowLeft size={15} /> Back to all work
      </Link>
      <p className="eyebrow">
        {p.number} / {p.category}
      </p>
      <h1>
        {p.title}
        <span>.</span>
      </h1>
      <p className="detail-lede">{p.description}</p>
      <div className={`detail-cover cover-${p.color}`}>
        <div className="cover-art">
          <span className="cover-orbit orbit-one" />
          <span className="cover-orbit orbit-two" />
          <span className="cover-word">{p.title}</span>
          <span className="cover-subtitle">{p.category}</span>
        </div>
      </div>
      <div className="detail-columns">
        <section>
          <p className="eyebrow">THE BRIEF</p>
          <h2>What was the idea?</h2>
          <p>{p.brief}</p>
        </section>
        <section>
          <p className="eyebrow">THE APPROACH</p>
          <h2>How I approached it.</h2>
          <p>{p.approach}</p>
        </section>
      </div>
      <section className="deliverables">
        <p className="eyebrow">PROJECT SCOPE</p>
        <div>
          {p.deliverables.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </section>
      <p className="small-note">{p.status}</p>
      <Link className="button button-dark" to="/contact">
        Discuss a similar project <ArrowUpRight size={15} />
      </Link>
    </main>
  );
}

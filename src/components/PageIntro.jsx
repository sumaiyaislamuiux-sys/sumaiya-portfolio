export default function PageIntro({ eyebrow, title, accent, description }) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>
        {title} <span>{accent}</span>
      </h1>
      {description && <p className="page-lede">{description}</p>}
    </section>
  );
}

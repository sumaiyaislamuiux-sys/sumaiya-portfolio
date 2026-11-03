import {
  ArrowUpRight,
  Mail,
  Linkedin,
  Github,
  Palette,
  MapPin,
} from "lucide-react";
import PageIntro from "../components/PageIntro.jsx";
import { profile } from "../data.js";
export default function Contact() {
  return (
    <main className="inner-page contact-page">
      <PageIntro
        eyebrow="CONTACT / COLLABORATION"
        title="Have something"
        accent="in mind?"
        description="For job opportunities, freelance projects, collaborations, or a thoughtful conversation—I'd love to hear from you."
      />
      <div className="contact-layout">
        <div className="contact-panel botanical-bg">
          <p className="eyebrow">LET'S START HERE</p>
          <h2>
            Tell me what
            <br />
            <em>you're imagining.</em>
          </h2>
          <p>
            Share a little about the role, project, or idea, and I'll get back
            to you.
          </p>
          <a className="button button-dark" href={`mailto:${profile.email}`}>
            Email me <ArrowUpRight size={15} />
          </a>
          <p className="contact-location">
            <MapPin size={15} /> {profile.location}
          </p>
        </div>
        <div className="contact-options">
          <a href={`mailto:${profile.email}`}>
            <span>
              <Mail size={19} />
            </span>
            <div>
              <small>EMAIL</small>
              <strong>{profile.email}</strong>
            </div>
            <ArrowUpRight size={16} />
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
            <span>
              <Linkedin size={19} />
            </span>
            <div>
              <small>LINKEDIN</small>
              <strong>Connect professionally</strong>
            </div>
            <ArrowUpRight size={16} />
          </a>
          <a href={profile.links.behance} target="_blank" rel="noreferrer">
            <span>
              <Palette size={19} />
            </span>
            <div>
              <small>BEHANCE</small>
              <strong>Explore visual work</strong>
            </div>
            <ArrowUpRight size={16} />
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            <span>
              <Github size={19} />
            </span>
            <div>
              <small>GITHUB</small>
              <strong>Explore code projects</strong>
            </div>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <p className="small-note">
        Update the sample email and social profile URLs in{" "}
        <code>src/data.js</code> before publishing.
      </p>
    </main>
  );
}

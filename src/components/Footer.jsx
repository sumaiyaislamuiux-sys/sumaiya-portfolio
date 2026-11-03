import { ArrowUpRight, Github, Linkedin, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "../data.js";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Link className="wordmark" to="/">
            {profile.name}
            <span>.</span>
          </Link>
          <p>Thoughtful design. Meaningful impact.</p>
        </div>
        <div className="footer-links">
          <Link to="/work">Work</Link>
          <Link to="/about">About</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/contact">
            Contact <ArrowUpRight size={13} />
          </Link>
        </div>
        <div className="social-links">
          <a
            href={profile.links.behance}
            target="_blank"
            rel="noreferrer"
            aria-label="Behance"
          >
            <Palette size={17} />
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={17} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Sumaiya Islam</span>
        <span>Designed with care · Built with React</span>
      </div>
    </footer>
  );
}

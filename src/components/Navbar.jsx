import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { profile } from "../data.js";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Work", to: "/work" },
    { label: "About", to: "/about" },
    { label: "Skills", to: "/skills" },
  ];
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link className="wordmark" to="/" onClick={() => setOpen(false)}>
          {profile.name}
          <span>.</span>
        </Link>
        <button
          className="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav
          className={open ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            className="nav-cta"
            to="/contact"
            onClick={() => setOpen(false)}
          >
            Let's talk <ArrowUpRight size={14} />
          </Link>
        </nav>
      </div>
    </header>
  );
}

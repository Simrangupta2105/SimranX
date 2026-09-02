import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import "./portfolio.css";

const projects = [
  { number: "01", name: "ResolveIt", description: "An online complaint and grievance redressal platform for submitting, tracking, and escalating issues through a secure, role-based system.", tags: ["Java", "MySQL", "RBAC"], metric: "Evidence-backed tracking", href: "https://github.com/Simrangupta2105/ResolveIt" },
  { number: "02", name: "GDGoist ATS Leaderboard", description: "An ATS employability platform that scores resumes, validates skills, and ranks developers on a privacy-first leaderboard.", tags: ["JavaScript", "ATS Scoring", "Gamification"], metric: "Data-driven scoring", href: "https://github.com/Google-Developers-Group-on-campus-OIST/GDGoist-ATS-Leaderboard" },
];
const experience = [
  ["01 / 02", "Jun - Jul 2025", "AI/ML Techniques Internship", "IBM SkillsBuild · Edunet Foundation (AICTE)", "Trained models across multiple algorithms and performed data preprocessing: missing value treatment, categorical encoding, and feature scaling.", "Hands-on model training pipeline"],
  ["02 / 02", "Nov - Dec 2025", "Software Developer Internship", "Infosys Springboard", "Worked across Core Java, OOP, and Collections, building applications with a focus on clean code and problem-solving.", "Java stack, OOP-first design"],
];
const skills = { Programming: ["C++", "Java", "JavaScript", "Python", "HTML", "CSS"], "ML & Data": ["Pandas", "NumPy", "Scikit-Learn", "Matplotlib"], "Tools & Platforms": ["Git", "GitHub", "VS Code", "Google Colab", "Jupyter Notebook", "MySQL"], Collaboration: ["Team Leadership", "Public Speaking", "Critical Thinking", "People Management", "Time Management"] };
const honors = [
  ["2025", "Smart India Hackathon", "Finalist", "Built SignSense, a hardware-based glove for real-time Indian Sign Language recognition."],
  ["2026", "Policy Hackathon, IIT Kanpur", "2nd Runner-Up", "Recognized for developing an impactful, feasible policy solution under national competition constraints."],
];
const pipeline = [["parse", "Parse Resume", "parse.resume", "92ms"], ["extract", "Extract Skills", "extract.skills", "140ms"], ["score", "Score", "score.compute", "61ms"], ["rank", "Rank", "rank.leaderboard", "queued"]];

function useReveal() {
  const ref = useRef(null); const [visible, setVisible] = useState(false);
  useEffect(() => { const element = ref.current; if (!element) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.15 }); observer.observe(element); return () => observer.disconnect(); }, []);
  return [ref, visible];
}
function Reveal({ children, delay = 0 }) { const [ref, visible] = useReveal(); return <div ref={ref} className={`reveal ${visible ? "visible" : ""}`} style={{ "--delay": `${delay}s` }}>{children}</div>; }
function Count({ target, active, duration = 1200 }) {
  return active ? target : 0;
}
function SectionHead({ kicker, title, description }) { return <div className="section-head"><div className="kicker">{kicker}</div><h2>{title}</h2><p>{description}</p></div>; }

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false); const [tab, setTab] = useState("Programming"); const [stage, setStage] = useState(0); const [heroRef, heroVisible] = useReveal();
  const go = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; const interval = setInterval(() => setStage((current) => (current + 1) % pipeline.length), 1600); return () => clearInterval(interval); }, []);
  const nav = [["Work", "projects"], ["Experience", "experience"], ["Skills", "skills"], ["Honors", "honors"]];
  return <div className="portfolio"><div className="background-glow" /><div className="background-grid" />
    <header><div className="nav"><button className="logo" onClick={() => go("hero")}>Simran<span>.</span></button><nav>{nav.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</nav><button className="nav-cta" onClick={() => go("contact")}>Let's talk</button><button className="burger" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>{menuOpen && <div className="mobile-nav">{[...nav, ["Let's talk", "contact"]].map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</div>}</header>
    <main>
      <section className="hero" id="hero" ref={heroRef}><div><div className="eyebrow">SOFTWARE DEVELOPER / ML ENTHUSIAST</div><h1>Building intelligent systems that solve real problems.</h1><p className="hero-copy">B.Tech CS student with a 9.17 CGPA, shipping ML-driven and full-stack platforms - from resume-scoring engines to grievance redressal systems built for real users, not just demos.</p><div className="hero-actions"><button className="primary" onClick={() => go("projects")}>View projects <ArrowUpRight size={16} /></button><button className="secondary" onClick={() => go("contact")}>Get in touch</button></div><div className="stats"><div><strong><Count target={9.17} active={heroVisible} /></strong><small>CGPA, B.Tech CS</small></div><div><strong><Count target={2} active={heroVisible} /></strong><small>Hackathon finals, 2025-26</small></div><div><strong><Count target={3} active={heroVisible} /></strong><small>Internships shipped</small></div></div></div>
        <div className="engine"><div className="engine-head"><span>ATS scoring engine / sample run</span><b><i /> Live</b></div><div className="flow">{pipeline.map(([key, label], index) => <span key={key}><em className={stage === index ? "active" : ""}>{label}</em>{index < 3 && <small>→</small>}</span>)}</div><div className="metrics"><div><strong><Count target={87} active={heroVisible} />%</strong><small>Match score</small></div><div><strong><Count target={140} active={heroVisible} />ms</strong><small>Parse time</small></div><div><strong><Count target={12} active={heroVisible} /></strong><small>Skills matched</small></div></div><div className="logs">{pipeline.map(([key, , log, time], index) => <div className={index === stage ? "current" : ""} key={key}><span>{log}</span><span>{time}</span></div>)}</div></div>
      </section>
      <section id="projects"><Reveal><SectionHead kicker="Featured Work" title="Selected systems." description="Two platforms built end-to-end - one for public accountability, one for developer employability." /></Reveal><div className="project-list">{projects.map((project, index) => <Reveal delay={index * 0.1} key={project.name}><article className="project"><span className="index">{project.number}</span><div><h3>{project.name}</h3><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="project-right"><b>{project.metric}</b><a href={project.href} target="_blank" rel="noreferrer">Open project <ArrowUpRight size={14} /></a></div></article></Reveal>)}</div><div className="more"><a href="https://github.com/Simrangupta2105" target="_blank" rel="noreferrer">View more projects on GitHub</a></div></section>
      <section id="education"><Reveal><div className="education"><div><h3>Oriental Institute of Science &amp; Technology, Bhopal</h3><p>Bachelor of Technology, Computer Science / Aug 2024 - Present</p></div><strong>9.17<small>CGPA</small></strong></div></Reveal></section>
      <section id="experience"><Reveal><SectionHead kicker="Experience" title="Shipped through internships." description="Two internships spanning applied ML and enterprise Java development." /></Reveal>{experience.map((item, index) => <Reveal delay={index * 0.1} key={item[2]}><article className="experience"><span className="index">{item[0]}</span><time>{item[1]}</time><div><h3>{item[2]}</h3><b>{item[3]}</b><p>{item[4]}</p><small>{item[5]}</small></div></article></Reveal>)}</section>
      <section id="skills"><Reveal><SectionHead kicker="Technical Arsenal" title="Tools & languages." description="From ML experimentation to full-stack delivery." /></Reveal><Reveal><div className="tabs">{Object.keys(skills).map((name) => <button className={tab === name ? "active" : ""} onClick={() => setTab(name)} key={name}>{name}</button>)}</div><div className="skill-list">{skills[tab].map((skill) => <span key={skill}>{skill}</span>)}</div></Reveal></section>
      <section id="honors"><Reveal><SectionHead kicker="Honors and Awards" title="Recognition under real build pressure." description="Two competitive finishes at national scale, built against the clock." /></Reveal><div className="honors">{honors.map((honor, index) => <Reveal delay={index * 0.1} key={honor[1]}><article><small>{honor[0]}</small><h3>{honor[1]}</h3><b>{honor[2]}</b><p>{honor[3]}</p></article></Reveal>)}</div></section>
      <section id="contact" className="contact"><Reveal><h2>Let's build<br />something real.</h2><a className="primary" href="mailto:simrangupta21007@gmail.com"><Mail size={16} /> Get in touch</a><p>simrangupta21007@gmail.com</p><div><a href="https://github.com/Simrangupta2105" target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a><a href="https://www.linkedin.com/in/simran-gupta12" target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn</a></div></Reveal></section>
    </main><footer>© 2026 Simran Gupta. All rights reserved.</footer>
  </div>;
}
import { useState, useEffect, useRef } from "react";
import "./App.css";
import ProjectDetail from "./ProjectDetail.jsx";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = [
  {
    icon: "💻",
    title: "Languages & Frameworks",
    items: ["PHP", "Laravel Livewire", "CodeIgniter", "Javascript", "Python"],
  },
  {
    icon: "🗄️",
    title: "Database & Tools",
    items: ["MySQL", "Query Optimization", "Database Design", "API", "API Testing"],
  },
  {
    icon: "🧪",
    title: "QA & Methodology",
    items: ["Bug Reporting", "Manual Testing", "SDLC", "RAD Methodology"],
  },
  {
    icon: "🤖",
    title: "AI & Prompt Engineering",
    items: ["Chatbot Integration", "AI-Assisted Debugging", "Prompt Design", "Error Analysis"],
  },
];

const PROJECTS = [
  {
    id: "larizza",
    title: "E-Commerce Toko Larizza",
    type: "Full-Stack & AI-Assisted",
    desc: "Online shop untuk UMKM di Bekasi Selatan — lengkap dengan payment gateway Midtrans real-time, integrasi chatbot, dan manajemen stok otomatis.",
    features: [
      "Midtrans Payment Gateway — transaksi real-time yang aman",
      "AI Chatbot — otomatisasi customer support",
      "Katalog, keranjang, dan alur checkout lengkap",
    ],
    tech: ["Framework Laravel", "MySQL", "Midtrans", "PHP", "Chatbot"],
    github: "https://github.com/raihanFritz19",
    color: "#00f5d4",
    image: "/foto-image-larizza.png",
  },
  {
    id: "bimbel",
    title: "Sistem Informasi Bimbel Abuwafa",
    type: "Fullstack & QA Testing",
    desc: "Sistem manajemen lembaga bimbingan belajar — mencakup penjadwalan, kalkulasi gaji otomatis, dan dokumentasi bug testing sebelum deployment ke production.",
    features: [
      "Database Testing — validasi relasi MySQL &amp; optimasi query",
      "Penjadwalan otomatis &amp; kalkulasi gaji pengajar",
      "Manajemen bug (Actual vs Expected reports)",
    ],
    tech: ["CodeIgniter", "MySQL", "JavaScript", "Manual Testing"],
    github: "https://github.com/raihanFritz19/bimbel-sekolah",
    color: "#7c3aed",
    image: "/bimbel222.png",
  },
];

const TIMELINE = [
  {
    period: "May 2025 – Sep 2025",
    role: "E-Commerce System Developer",
    place: "Toko Larizza (UMKM) — Bekasi Selatan",
    desc: "Membangun sistem belanja online dengan integrasi payment gateway real-time dan komunikasi pelanggan via AI chatbot.",
    isWork: true,
  },
  {
    period: "Oct 2024 – Jan 2025",
    role: "Web Developer & QA Tester",
    place: "Bimbel Abuwafa — Bekasi Selatan",
    desc: "Membangun aplikasi manajemen berbasis CodeIgniter, mendokumentasikan bug secara sistematis, dan melakukan pengujian manual sebelum hosting.",
    isWork: true,
  },
  {
    period: "2021 – 2025",
    role: "Bachelor of Information Systems",
    place: "Universitas Gunadarma",
    desc: "Fokus pada pengembangan aplikasi web, manajemen database, dan analisis sistem. Lulus dengan IPK 3.56.",
    isWork: false,
  },
];

const CERTS = [
  { label: "Oracle for Beginner", icon: "🏅", url: "https://e-sert.gunadarma.ac.id/detail/11121066" },
  { label: "Oracle for Intermediate", icon: "🏅", url: "https://e-sert.gunadarma.ac.id/detail/11121066" },
  { label: "Data Preparation", icon: "📊", url: "https://e-sert.gunadarma.ac.id/detail/11121066" },
];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useScrollSpy() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS.map((n) => document.getElementById(n.toLowerCase()));
      let current = "home";
      sections.forEach((s) => {
        if (s && window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function useFadeIn(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );
    const els = ref.current.querySelectorAll(".fade-in");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */

/* Navbar */
function Navbar({ onLogoClick }) {
  const active = useScrollSpy();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
    if (onLogoClick) onLogoClick();
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <button className="logo" onClick={() => { scrollTo("home"); }} aria-label="Go to top">
        Raihan<span className="logo-dot">.</span>
      </button>

      <ul className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
        {NAV_LINKS.map((n) => (
          <li key={n}>
            <button
              className={`nav-btn ${active === n.toLowerCase() ? "nav-btn--active" : ""}`}
              onClick={() => scrollTo(n.toLowerCase())}
            >
              {n}
            </button>
          </li>
        ))}
      </ul>

      <button
        className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
        onClick={() => setMenuOpen((p) => !p)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}

/* Hero */
function Hero() {
  const [typed, setTyped] = useState("");
  const fullName = "Raihan Zhillan";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(fullName.slice(0, ++i));
      if (i >= fullName.length) clearInterval(t);
    }, 70);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-tags" aria-label="Roles">
            {["Web Developer", "QA Manual"].map((t) => (
              <span key={t} className="hero-tag">{t}</span>
            ))}
          </div>

          <h1 className="hero-heading">
            {"Hi, I'm "}
            <span className="hero-name">
              {typed}
              <span className="cursor" aria-hidden="true">|</span>
            </span>
          </h1>

          <p className="hero-subtitle">
            Information Systems graduate specializing in <strong>PHP web development</strong>,{" "}
            <strong>Software Quality Assurance</strong>, and leveraging{" "}
            <strong>AI prompt engineering</strong> to build cleaner, faster, and more reliable software.
          </p>

          <div className="hero-actions">
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Projects <span aria-hidden="true">{"→"}</span>
            </a>
            <a
              href="#contact"
              className="btn btn-ghost"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="avatar-ring">
            <div className="avatar-placeholder">RZ</div>
          </div>
          <div className="float-badge float-badge--1">
            <span className="badge-icon">🐛</span>
            <div>
              <strong>QA Manual</strong>
              <small>Bug Reporting &amp; Testing</small>
            </div>
          </div>
          <div className="float-badge float-badge--2">
            <span className="badge-icon">⚡</span>
            <div>
              <strong>Web Dev</strong>
              <small>PHP &amp; CodeIgniter</small>
            </div>
          </div>
          <div className="float-badge float-badge--3">
            <span className="badge-icon">🤖</span>
            <div>
              <strong>AI Tools</strong>
              <small>Prompt Engineering</small>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span>scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

/* About */
function About() {
  const ref = useRef(null);
  useFadeIn(ref);
  return (
    <section id="about" ref={ref}>
      <SectionHeader
        label="About"
        title={<>About <span className="accent">Me</span></>}
        sub="Menggabungkan keahlian pengembangan sistem dengan pengujian software yang komprehensif."
      />
      <div className="about-grid">
        <div className="about-text fade-in">
          <p>
            Saya adalah lulusan <strong>Sistem Informasi</strong> dari Universitas Gunadarma (IPK 3.56),
            dengan spesialisasi di pengembangan aplikasi web PHP dan Software Quality Assurance.
          </p>
          <p>
            Saya mengelola siklus pengembangan software (SDLC) secara menyeluruh, melakukan functional testing,
            melaporkan bug secara sistematis, dan mengoptimasi database SQL untuk memastikan fungsionalitas
            dan integritas di setiap lapisan. Saya juga memanfaatkan <strong>AI tools dan prompt engineering</strong>{" "}
            untuk mempercepat development, mengotomasi tugas berulang, dan mendeteksi error lebih cepat.
          </p>
          <div className="stat-strip">
            {[
              { v: "3.56", l: "IPK" },
              { v: "3+", l: "Projects" },
              { v: "SDLC", l: "Metodologi" },
              { v: "AI", l: "Enhanced Dev" },
            ].map(({ v, l }) => (
              <div key={l} className="stat">
                <strong>{v}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cert-panel fade-in">
          <h3 className="panel-title">🏅 Sertifikasi</h3>
          <p className="panel-note">Klik kartu untuk melihat e-sertifikat.</p>
          <div className="cert-list">
            {CERTS.map(({ label, icon, url }) => (
              <a key={label} href={url} target="_blank" rel="noreferrer" className="cert-card">
                <span>{icon}</span>
                <span>{label}</span>
                <span className="cert-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Skills */
function Skills() {
  const ref = useRef(null);
  useFadeIn(ref);
  return (
    <section id="skills" className="section-alt" ref={ref}>
      <SectionHeader
        label="Skills"
        title={<>Technical <span className="accent">Skills</span></>}
        sub="Teknologi dan tools yang saya gunakan dalam development dan testing."
      />
      <div className="skills-grid-outer">
        {SKILLS.map(({ icon, title, items }, i) => (
          <div
            key={title}
            className="skill-card fade-in"
            style={{ "--delay": `${i * 0.1}s` }}
          >
            <div className="skill-card-icon">{icon}</div>
            <h3 className="skill-card-title">{title}</h3>
            <ul className="skill-items">
              {items.map((item) => (
                <li key={item} className="skill-pill">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Projects */
function Projects({ onOpenDetail }) {
  const ref = useRef(null);
  useFadeIn(ref);

  return (
    <section id="projects" ref={ref}>
      <SectionHeader
        label="Work"
        title={<>Featured <span className="accent">Projects</span></>}
        sub="Sistem nyata yang dibangun dengan PHP, disiplin QA, dan AI-assisted development."
      />
      <div className="projects-list">
        {PROJECTS.map((project, i) => {
          const { title, type, desc, features, tech, github, color, image } = project;
          return (
            <article
              key={title}
              className="project-card fade-in"
              style={{ "--accent": color, "--delay": `${i * 0.12}s` }}
            >
              {/* Gambar project — klik untuk buka halaman detail */}
              <div
                className="project-image-wrap"
                onClick={() => onOpenDetail(project)}
                role="button"
                tabIndex={0}
                aria-label={`Lihat detail project ${title}`}
                onKeyDown={(e) => e.key === "Enter" && onOpenDetail(project)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={image}
                  alt={`Screenshot of ${title}`}
                  className="project-img"
                  loading="lazy"
                />
                <div className="project-img-overlay">
                  <span className="overlay-detail-btn">Lihat Detail ↗</span>
                </div>
                <div className="project-img-bar" />
              </div>

              <div className="project-body">
                <span className="project-type">{type}</span>
                <h3 className="project-title">{title}</h3>
                <p className="project-desc">{desc}</p>
                <ul className="project-features">
                  {features.map((f) => (
                    <li key={f} dangerouslySetInnerHTML={{ __html: f }} />
                  ))}
                </ul>
                <div className="project-footer">
                  <div className="project-tech">
                    {tech.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <button
                    className="project-link"
                    onClick={() => onOpenDetail(project)}
                    aria-label={`Detail ${title}`}
                  >
                    Detail →
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* Experience */
function Experience() {
  const ref = useRef(null);
  useFadeIn(ref);
  return (
    <section id="experience" className="section-alt" ref={ref}>
      <SectionHeader
        label="Journey"
        title={<>Education &amp; <span className="accent">Experience</span></>}
        sub="Perjalanan akademik dan pekerjaan pengembangan nyata."
      />
      <div className="timeline">
        {TIMELINE.map(({ period, role, place, desc, isWork }, i) => (
          <div
            key={role}
            className="timeline-item fade-in"
            style={{ "--delay": `${i * 0.15}s` }}
          >
            <div className="timeline-dot" data-work={isWork ? "true" : "false"} />
            <div className="timeline-content">
              <span className="timeline-period">{period}</span>
              <h3 className="timeline-role">{role}</h3>
              <span className="timeline-place">{place}</span>
              <p className="timeline-desc">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Contact */
function Contact() {
  const ref = useRef(null);
  useFadeIn(ref);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", msg: "" });
    }, 1200);
  };

  return (
    <section id="contact" ref={ref}>
      <SectionHeader
        label="Contact"
        title={<>{"Let's"} <span className="accent">Connect</span></>}
        sub="Terbuka untuk peluang karier di Web Development dan Quality Assurance."
      />
      <div className="contact-grid">
        <div className="contact-info fade-in">
          <h3>Informasi Kontak</h3>
          <p>Hubungi saya via email, WhatsApp, atau terhubung di LinkedIn.</p>
          <div className="contact-links">
            {[
              { href: "mailto:raihanzhillan19@gmail.com", icon: "✉️", label: "raihanzhillan19@gmail.com" },
              { href: "https://wa.me/6282111851631", icon: "💬", label: "+62 821-1185-1631" },
              { href: "#", icon: "📍", label: "Jakarta, Indonesia" },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="contact-link"
              >
                <span className="cl-icon">{icon}</span>
                <span>{label}</span>
              </a>
            ))}
          </div>
          <div className="social-row">
            <a href="https://github.com/raihanFritz19" target="_blank" rel="noreferrer" className="social-btn">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/raihan-zhillan-806858346" target="_blank" rel="noreferrer" className="social-btn">
              LinkedIn
            </a>
          </div>
        </div>

        <form className="contact-form fade-in" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="cf-name">Nama Lengkap</label>
            <input
              id="cf-name"
              type="text"
              placeholder="Nama kamu"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cf-email">Email</label>
            <input
              id="cf-email"
              type="email"
              placeholder="kamu@email.com"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cf-msg">Pesan</label>
            <textarea
              id="cf-msg"
              placeholder="Tulis pesanmu di sini..."
              rows={5}
              value={form.msg}
              onChange={(e) => setForm((p) => ({ ...p, msg: e.target.value }))}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Mengirim…" : status === "sent" ? "✅ Pesan Terkirim!" : "Kirim Pesan →"}
          </button>
        </form>
      </div>
    </section>
  );
}

/* Footer */
function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} <span className="accent">Raihan Zhillan</span>. All rights reserved.</p>
      <p className="footer-sub">Built with React · Crafted with AI tools</p>
    </footer>
  );
}

/* Section Header helper */
function SectionHeader({ label, title, sub }) {
  return (
    <header className="section-header">
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </header>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT — page-based navigation
   currentPage: "portfolio" | project object
───────────────────────────────────────────── */
export default function App() {
  const [currentPage, setCurrentPage] = useState("portfolio");

  // Kembali ke portfolio dan scroll ke section projects
  const handleBack = () => {
    setCurrentPage("portfolio");
    setTimeout(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Buka halaman detail project
  const handleOpenDetail = (project) => {
    setCurrentPage(project);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Kalau sedang di halaman detail project
  if (currentPage !== "portfolio") {
    return (
      <>
        <Navbar onLogoClick={handleBack} />
        <ProjectDetail project={currentPage} onBack={handleBack} />
        <Footer />
      </>
    );
  }

  // Halaman utama portfolio
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects onOpenDetail={handleOpenDetail} />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

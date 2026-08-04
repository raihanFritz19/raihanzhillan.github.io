// ============================================================
// ProjectDetail.jsx
// Halaman penuh detail project — bukan modal
// Muncul saat user klik project card di section Projects
// ============================================================

import { useEffect } from "react";
import "./ProjectDetail.css";

/* ─────────────────────────────────────────────
   DATA DETAIL PER PROJECT
   Tambah foto di array "photos" sesuai nama file
   Letakkan semua foto di folder public/
───────────────────────────────────────────── */
const PROJECT_DETAILS = {
  larizza: {
    subtitle: "Sistem E-Commerce UMKM Berbasis Web",
    category: "Web Development",
    duration: "Januari 2025 – September 2025",
    role: "Full-Stack Developer",
    client: "Toko Larizza — Bekasi Selatan",
    status: "Production",
    overview:
      "Toko Larizza adalah proyek e-commerce untuk UMKM Makanan Ringan di Bekasi Selatan. Saya membangun sistem belanja online lengkap dari nol — mulai dari desain database, backend Framework Laravael (PHP) DAN MYSQL, integrasi payment gateway Midtrans, hingga chatbot WhatsApp berbasis AI untuk customer service otomatis.",
    photos: [
      { src: "/foto-image-larizza.png", caption: "Tampilan Halaman Utama Toko Larizza" },
      { src: "/larizza-login.jpg", caption: "Halaman login" },
      { src: "/larizza-produk.jpg", caption: "Dashboard Admin" },
      // { src: "/larizza-mobile.png", caption: "Tampilan Mobile" },
    ],
    whatIDid: [
      {
        icon: "🛒",
        title: "Sistem Belanja Online",
        desc: "Membangun fitur katalog produk, keranjang belanja, dan alur checkout lengkap dengan validasi stok real-time.",
      },
      {
        icon: "💳",
        title: "Integrasi Midtrans Payment Gateway",
        desc: "Mengintegrasikan Midtrans untuk menerima pembayaran via transfer bank, e-wallet (GoPay, OVO), dan QRIS secara real-time.",
      },
      {
        icon: "🤖",
        title: "AI Chatbot",
        desc: "Mengimplementasikan chatbot otomatis untuk menjawab pertanyaan pelanggan seputar produk, stok, dan status pesanan.",
      },
      {
        icon: "📦",
        title: "Manajemen Stok Otomatis",
        desc: "Sistem stok terhubung langsung dengan transaksi — stok berkurang otomatis saat order dikonfirmasi.",
      },
      {
        icon: "🗄️",
        title: "Database Design",
        desc: "Merancang struktur database MySQL dengan relasi antar tabel produk, order, user, dan transaksi yang optimal.",
      },
    ],
    tech: ["Framework Laravel", "PHP 7", "MySQL", "Midtrans API"],
    github: "https://github.com/raihanFritz19",
    color: "#00f5d4",
  },

  bimbel: {
    subtitle: "Sistem Manajemen Lembaga Bimbingan Belajar",
    category: "Web Development & QA Testing",
    duration: "Oktober 2024 – Januari 2025",
    role: "Full-Stack Developer & QA Tester",
    client: "Bimbel Abuwafa — Bekasi Selatan",
    status: "Production",
    overview:
      "Sistem informasi manajemen untuk lembaga bimbingan belajar Abuwafa. Proyek mencakup pengelolaan jadwal siswa, perhitungan gaji pengajar otomatis, serta dokumentasi pengujian QA yang komprehensif sebelum deployment ke production.",
    photos: [
      { src: "/bimbel222.png", caption: "Tampilan Dashboard Sistem Bimbel Abuwafa" },
      // Tambah foto lain di sini:
      // { src: "/bimbel-jadwal.png", caption: "Modul Penjadwalan" },
      // { src: "/bimbel-gaji.png", caption: "Laporan Gaji Pengajar" },
      // { src: "/bimbel-siswa.png", caption: "Manajemen Data Siswa" },
    ],
    whatIDid: [
      {
        icon: "📅",
        title: "Manajemen Jadwal",
        desc: "Membangun modul penjadwalan sesi belajar antara siswa dan pengajar dengan deteksi konflik jadwal otomatis.",
      },
      {
        icon: "💰",
        title: "Perhitungan Gaji Otomatis",
        desc: "Sistem kalkulasi gaji pengajar berdasarkan jumlah sesi yang diajarkan, dengan laporan bulanan yang bisa diekspor.",
      },
      {
        icon: "🧪",
        title: "QA Testing & Bug Reporting",
        desc: "Melakukan pengujian manual menyeluruh, mendokumentasikan bug dalam format Actual vs Expected Result, dan memverifikasi perbaikan sebelum go-live.",
      },
      {
        icon: "🗄️",
        title: "Database Testing & Optimasi",
        desc: "Memvalidasi relasi antar tabel MySQL, mengoptimasi query yang lambat, dan memastikan integritas data di seluruh modul.",
      },
      {
        icon: "🚀",
        title: "Deployment & Hosting",
        desc: "Menyiapkan environment production, konfigurasi server, dan memastikan aplikasi berjalan stabil setelah go-live.",
      },
    ],
    tech: ["CodeIgniter 3", "PHP 7", "MySQL", "Bootstrap", "jQuery", "Manual Testing"],
    github: "https://github.com/raihanFritz19/bimbel-sekolah",
    color: "#7c3aed",
  },
};

/* ─────────────────────────────────────────────
   COMPONENT — Halaman penuh project detail
   Props:
     project — object dari PROJECTS array di App.jsx
     onBack  — fungsi untuk kembali ke portfolio
───────────────────────────────────────────── */
export default function ProjectDetail({ project, onBack }) {
  const detail = PROJECT_DETAILS[project.id];

  // Scroll ke atas saat halaman dibuka
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!detail) return null;

  const accentColor = detail.color;

  return (
    <div className="pd-page">

      {/* ── Breadcrumb / Back navigation ── */}
      <div className="pd-nav">
        <div className="pd-nav-inner">
          <button className="pd-back-btn" onClick={onBack} aria-label="Kembali ke portfolio">
            <span className="pd-back-arrow">←</span>
            <span>Kembali ke Portfolio</span>
          </button>
          <div className="pd-breadcrumb">
            <span>Portfolio</span>
            <span className="pd-breadcrumb-sep">/</span>
            <span className="pd-breadcrumb-current">{project.title}</span>
          </div>
        </div>
      </div>

      {/* ── Hero / Header section ── */}
      <div className="pd-hero" style={{ "--accent": accentColor }}>
        <div className="pd-hero-inner">
          <div className="pd-hero-meta">
            <span className="pd-category-badge" style={{ color: accentColor, borderColor: accentColor + "55", background: accentColor + "15" }}>
              {detail.category}
            </span>
            <span className="pd-status-badge">
              ● {detail.status}
            </span>
          </div>
          <h1 className="pd-page-title">{project.title}</h1>
          <p className="pd-page-subtitle">{detail.subtitle}</p>

          <div className="pd-info-strip">
            <div className="pd-info-item">
              <span className="pd-info-label">Periode</span>
              <span className="pd-info-value">📅 {detail.duration}</span>
            </div>
            <div className="pd-info-item">
              <span className="pd-info-label">Peran</span>
              <span className="pd-info-value">👤 {detail.role}</span>
            </div>
            <div className="pd-info-item">
              <span className="pd-info-label">Klien</span>
              <span className="pd-info-value">🏢 {detail.client}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Konten utama ── */}
      <div className="pd-main">
        <div className="pd-main-inner">

          {/* ── Gallery Foto ── */}
          <section className="pd-section">
            <h2 className="pd-section-title" style={{ "--accent": accentColor }}>
              📸 Screenshot Project
            </h2>
            <div className="pd-gallery">
              {detail.photos.map(({ src, caption }, idx) => (
                <figure key={idx} className="pd-gallery-item">
                  <div className="pd-gallery-img-wrap">
                    <img
                      src={src}
                      alt={caption}
                      className="pd-gallery-img"
                      loading="lazy"
                    />
                    <div className="pd-gallery-overlay">
                      <span className="pd-gallery-num">0{idx + 1}</span>
                    </div>
                  </div>
                  <figcaption className="pd-gallery-caption">{caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* ── Overview ── */}
          <section className="pd-section">
            <h2 className="pd-section-title" style={{ "--accent": accentColor }}>
              📋 Tentang Project
            </h2>
            <p className="pd-overview">{detail.overview}</p>
          </section>

          {/* ── Yang saya kerjakan ── */}
          <section className="pd-section">
            <h2 className="pd-section-title" style={{ "--accent": accentColor }}>
              🛠️ Yang Saya Kerjakan
            </h2>
            <div className="pd-tasks">
              {detail.whatIDid.map(({ icon, title, desc }, idx) => (
                <div
                  key={title}
                  className="pd-task-card"
                  style={{ "--accent": accentColor, animationDelay: `${idx * 0.08}s` }}
                >
                  <div className="pd-task-icon-wrap" style={{ background: accentColor + "20", borderColor: accentColor + "40" }}>
                    <span className="pd-task-icon">{icon}</span>
                  </div>
                  <div className="pd-task-body">
                    <strong className="pd-task-title">{title}</strong>
                    <p className="pd-task-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Tech Stack ── */}
          <section className="pd-section">
            <h2 className="pd-section-title" style={{ "--accent": accentColor }}>
              ⚙️ Tech Stack
            </h2>
            <div className="pd-tech-row">
              {detail.tech.map((t) => (
                <span
                  key={t}
                  className="pd-tech-pill"
                  style={{ color: accentColor, borderColor: accentColor + "40", background: accentColor + "12" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* ── CTA Footer ── */}
          <section className="pd-cta">
            <a
              href={detail.github}
              target="_blank"
              rel="noreferrer"
              className="pd-github-btn"
              style={{ background: accentColor, color: accentColor === "#00f5d4" ? "#060b14" : "#fff" }}
            >
              <span>Lihat di GitHub</span>
              <span>↗</span>
            </a>
            <button className="pd-back-btn-secondary" onClick={onBack}>
              ← Kembali ke Portfolio
            </button>
          </section>

        </div>
      </div>

    </div>
  );
}

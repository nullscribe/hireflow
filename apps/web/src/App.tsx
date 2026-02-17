import "./App.css";
import screenshot from "./assets/screenshot.jpeg";

const features = [
  {
    icon: "⚡",
    title: "Instant Job Matching",
    desc: "Smart filters surface roles that actually fit your skills and location — no endless scrolling.",
  },
  {
    icon: "📄",
    title: "One-Tap Apply",
    desc: "Save your profile once. Apply to any job with a single tap, no repetitive form-filling.",
  },
  {
    icon: "🔔",
    title: "Real-Time Alerts",
    desc: "Get notified the moment a job matching your criteria is posted. Never miss an opportunity.",
  },
  {
    icon: "🔖",
    title: "Save & Organize",
    desc: "Bookmark jobs, track your applications, and manage everything from one clean dashboard.",
  },
  {
    icon: "🏢",
    title: "Company Profiles",
    desc: "Explore employer pages, culture insights, and all open roles before you apply.",
  },
  {
    icon: "📊",
    title: "Application Tracker",
    desc: "See where every application stands — applied, viewed, shortlisted, or rejected.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your profile",
    desc: "Add your skills, experience, and job preferences in minutes.",
  },
  {
    number: "02",
    title: "Browse or get matched",
    desc: "Search thousands of listings or let HireFlow surface the best fits for you.",
  },
  {
    number: "03",
    title: "Apply & track",
    desc: "Apply instantly and monitor every application from one place.",
  },
];

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function App() {
  return (
    <div className="app">
      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-logo">HireFlow</span>
          <a
            href="https://github.com/nullscribe/hireflow/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta">
            Download App
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">Now Available on Android &amp; iOS</div>
            <h1 className="hero-title">
              Your next job
              <br />
              <span className="hero-title-accent">is one tap away.</span>
            </h1>
            <p className="hero-sub">
              HireFlow is a comprehensive mobile job board — built for job seekers who value speed,
              clarity, and control over their job hunt.
            </p>
            <div className="hero-actions">
              <a
                href="https://github.com/nullscribe/hireflow/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary">
                <GithubIcon size={18} />
                Download on GitHub
              </a>
              <a href="#features" className="btn-secondary">
                Explore Features
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-num">10k+</span>
                <span className="stat-label">Active Listings</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num">Free</span>
                <span className="stat-label">Always</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num">Open</span>
                <span className="stat-label">Source</span>
              </div>
            </div>
          </div>

          {/* Screenshot */}
          <div className="hero-phone" aria-hidden="true">
            <img src={screenshot} alt="HireFlow app screenshot" className="phone-screenshot" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="section-inner">
          <div className="section-label">Features</div>
          <h2 className="section-title">Everything you need to land the job</h2>
          <p className="section-sub">
            HireFlow brings together powerful job search tools in a clean, distraction-free mobile
            experience.
          </p>
          <div className="features-grid">
            {features.map((f) => (
              <div className="feature-card" key={f.title}>
                <span className="feature-icon">{f.icon}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="howto">
        <div className="section-inner">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">Simple. Fast. Effective.</h2>
          <div className="steps">
            {steps.map((s) => (
              <div className="step" key={s.number}>
                <div className="step-number">{s.number}</div>
                <div className="step-body">
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-glow" aria-hidden="true" />
        <div className="section-inner cta-inner">
          <h2 className="cta-title">Ready to find your next role?</h2>
          <p className="cta-sub">
            Download HireFlow free from GitHub. Open source, no ads, no tracking.
          </p>
          <a
            href="https://github.com/nullscribe/hireflow/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-large">
            <GithubIcon size={20} />
            Get HireFlow — It's Free
          </a>
          <p className="cta-note">
            View source &amp; releases on{" "}
            <a
              href="https://github.com/nullscribe/hireflow"
              target="_blank"
              rel="noopener noreferrer">
              github.com/nullscribe/hireflow
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="nav-logo">HireFlow</span>
          <span className="footer-copy">Open source · Built with Expo &amp; React Native</span>
          <a
            href="https://github.com/nullscribe/hireflow"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-gh"
            aria-label="GitHub">
            <GithubIcon size={20} />
          </a>
        </div>
      </footer>
    </div>
  );
}

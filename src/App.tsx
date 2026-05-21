import { useEffect, useMemo, useState } from 'react';
import { skills } from './data/skills';

const GITHUB_USERNAME = 'Muhammad-Naveed342';
const EMAIL_ADDRESS = 'mohamad.navied.mostafa.669@gmail.com';
const MAILTO_LINK = `mailto:${EMAIL_ADDRESS}?subject=Portfolio%20Inquiry`;

const services = [
  {
    title: 'AI Web Applications',
    description:
      'Build intelligent frontends with React, TypeScript, and rich conversational interfaces that delight users.',
  },
  {
    title: 'Backend Systems',
    description:
      'Develop scalable Python APIs, RAG pipelines, and data-driven services that power secure production products.',
  },
  {
    title: 'Launch & Growth',
    description:
      'Deploy reliable apps with modern CI/CD, cloud infrastructure, and performance optimization for rapid client adoption.',
  },
];

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopyStatus('Email address copied to clipboard.');
    } catch {
      setCopyStatus('Could not copy automatically — please copy the email manually.');
    }
    window.setTimeout(() => setCopyStatus(''), 3000);
  };

  useEffect(() => {
    const controller = new AbortController();

    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        signal: controller.signal,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`GitHub API returned ${response.status}`);
        }
        return response.json();
      })
      .then((data: Repo[]) => setRepos(data))
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') {
          setError('Unable to load GitHub projects.');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const topRepos = useMemo(() => {
    return [...repos]
      .filter((repo) => !repo.fork)
      .sort((a, b) => {
        const stars = b.stargazers_count - a.stargazers_count;
        if (stars !== 0) return stars;
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });
  }, [repos]);

  return (
    <div className="app-shell">
      <header className="hero-section" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Generative AI Engineer & Python Full Stack Developer</p>
          <h1>Hi, I&rsquo;m Mohammad Naveed</h1>
          <p className="hero-text">
            I help businesses turn AI ideas into customer-ready products with clean user experience,
            reliable Python backend systems, and fast deployment workflows. My work focuses on
            practical generative AI, retrieval-augmented solutions, and strong full-stack engineering.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#services">
              View Services
            </a>
            <a className="btn btn-outline" href="#contact">
              Contact Me
            </a>
          </div>
        </div>
        <div className="hero-panel">
          <div className="stats-grid">
            <div className="stats-card">
              <p className="stat-label">Trusted Delivery</p>
              <p className="stat-value">AI products built for performance and durability</p>
            </div>
            <div className="stats-card">
              <p className="stat-label">Engineering Focus</p>
              <p className="stat-value">React interfaces, FastAPI backends, and deploy-ready systems</p>
            </div>
          </div>
          <div className="hero-details">
            <div>
              <h2>Strong architecture, polished UI, and AI-enabled workflows that support business growth.</h2>
              <p>Let&rsquo;s design and build a digital product that meets your users’ needs and scales reliably.</p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="section about-section" id="about">
          <div className="section-header">
            <span className="section-tag">About Me</span>
            <h2>Building AI-powered Systems with Strong Full Stack Engineering.</h2>
          </div>
          <div className="about-grid">
            <div>
              <p>
                I create production-ready applications that combine Python backend services with polished user
                interfaces. My work spans generative AI applications, RAG pipelines, and multi-agent automation.
              </p>
              <p>
                I am passionate about reliable deployments, scalable architecture, and performance-driven solutions
                that bridge AI research with practical business value.
              </p>
            </div>
            <div className="about-stats">
              <div>
                <strong>Python</strong>
                <span>FastAPI, Django, Flask, Pydantic</span>
              </div>
              <div>
                <strong>AI Systems</strong>
                <span>LLM Apps, RAG, Agent, Agentic</span>
              </div>
              <div>
                <strong>Frontend</strong>
                <span>React, TypeScript, Next.js</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="section-header">
            <span className="section-tag">Services</span>
            <h2>How I help clients launch better products.</h2>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="section-header">
            <span className="section-tag">Expertise</span>
            <h2>Tools and technologies I use to deliver results.</h2>
          </div>
          <div className="skills-grid">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className="skill-card">
                <h3>{skillGroup.category}</h3>
                <ul>
                  {skillGroup.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-header projects-header">
            <div>
              <span className="section-tag">Projects</span>
              <h2>All GitHub Repositories.</h2>
            </div>
            <a
              className="btn btn-secondary"
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
            >
              View More Projects
            </a>
          </div>
          {loading ? (
            <p className="status-message">Loading repositories...</p>
          ) : error ? (
            <p className="status-message error-message">{error}</p>
          ) : (
            <div className="repo-grid">
              {topRepos.map((repo) => (
                <article key={repo.id} className="repo-card">
                  <div className="repo-card-header">
                    <h3>{repo.name}</h3>
                    <span>{repo.language || 'Web'}</span>
                  </div>
                  <p>{repo.description || 'A polished repository ready for web deployment.'}</p>
                  <div className="repo-meta">
                    <span>★ {repo.stargazers_count}</span>
                    <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                  </div>
                  <div className="repo-actions">
                    <a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-link">
                      GitHub
                    </a>
                    {repo.homepage ? (
                      <a href={repo.homepage} target="_blank" rel="noreferrer" className="repo-link">
                        Live Demo
                      </a>
                    ) : (
                      <span className="repo-link disabled">Live Demo</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-header">
            <span className="section-tag">Contact</span>
            <h2>Let&rsquo;s build something exceptional together.</h2>
          </div>
          <div className="contact-panel">
            <div>
              <p>
                I deliver end-to-end engineering for web applications, AI services, and backend systems. If you need a dependable partner
                to launch a high-quality product fast, I&rsquo;m ready to help.
              </p>
            </div>
            <div className="contact-links">
              <a href="https://github.com/Muhammad-Naveed342" target="_blank" rel="noreferrer">
                GitHub Profile
              </a>
              <a href={MAILTO_LINK}>{EMAIL_ADDRESS}</a>
              <button type="button" onClick={copyEmailToClipboard}>
                Copy Email
              </button>
              <a href="tel:+923021557069">+92 302 155 7069</a>
            </div>
            {copyStatus && <p className="contact-status">{copyStatus}</p>}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

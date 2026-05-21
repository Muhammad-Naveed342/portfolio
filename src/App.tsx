import { useEffect, useMemo, useState } from 'react';
import { skills } from './data/skills';

const GITHUB_USERNAME = 'Muhammad-Naveed342';
const EMAIL_ADDRESS = 'mohamad.navied.mostafa.669@gmail.com';
const MAILTO_LINK = `mailto:${EMAIL_ADDRESS}?subject=Portfolio%20Inquiry`;

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
            I build AI-powered web applications and scalable backend systems with Python, React, and modern deployment workflows.
            My focus is on generative AI solutions, retrieval-augmented systems, agent orchestration, and production-grade APIs.
            I deliver dependable, performance-driven technology that powers real-world business results.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View Projects
            </a>
            <a className="btn btn-outline" href="#contact">
              Contact Me
            </a>
          </div>
        </div>
        <div className="hero-panel">
          <div className="stats-card">
            <p className="stat-label">GitHub Stars</p>
            <p className="stat-value">Top Repositories by Impact</p>
          </div>
          <div className="hero-details">
            <div>
              <h2>LLM Apps • RAG Pipelines • Production APIs. AI Agent System. AI Chatbot </h2>
              <p>Building reliable, scalable AI-first applications and full-stack systems for real business impact.</p>
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

        <section className="section skills-section" id="skills">
          <div className="section-header">
            <span className="section-tag">Skills</span>
            <h2>Tools and Technologies I use daily.</h2>
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
          <div className="section-header">
            <span className="section-tag">Projects</span>
            <h2>All GitHub Repositories.</h2>
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
                 I am Available for build AI-powered web applications and scalable backend systems with Python, React, and modern deployment workflows. My focus is on generative AI solutions, retrieval-augmented systems, agent orchestration, and production-grade APIs
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

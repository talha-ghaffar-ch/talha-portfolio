import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  CheckCircle,
  Cloud,
  Code,
  Database,
  ExternalLink,
  FolderGit2,
  GraduationCap,
  Lock,
  Shield,
  Sparkles,
  Star,
  TerminalSquare,
} from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';

const useTypewriter = (words, speed = 70, hold = 1800) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    const timer = setTimeout(() => {
      if (deleting) {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setText(current.slice(0, text.length + 1));
        if (text.length === current.length) {
          setTimeout(() => setDeleting(true), hold);
        }
      }
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [text, index, deleting, words, speed, hold]);

  return text;
};

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0px)' : 'translateY(20px)',
        transition: `all 700ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const Section = ({ title, subtitle, icon: Icon, children }) => (
  <section className="space-y-6">
    <div className="flex items-end justify-between gap-4 border-b border-slate-200/70 pb-3 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-slate-300 bg-white p-2 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          <Icon size={18} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
      </div>
    </div>
    {children}
  </section>
);

const Hero = ({ onNavigate }) => {
  const roles = useTypewriter([
    'Cloud Solutions Architect',
    'Certified Ethical Hacker',
    'Security Analyst',
    'Network & IT Administrator',
  ]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
      <FadeIn className="space-y-6 lg:col-span-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-100/70 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-700/60 dark:bg-emerald-900/30 dark:text-emerald-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Available for Security and Cloud Projects
        </div>

        <div className="space-y-3">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl">
            Talha Ghaffar
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Building secure, reliable, and scalable systems for modern teams.
          </p>
          <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
            {roles}
            <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-emerald-500" />
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.linkedin.com/in/talha-ghaffar/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Contact Me
            <ArrowRight size={14} />
          </a>
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-500"
          >
            View Projects
            <Sparkles size={14} />
          </button>
          <a
            href="https://github.com/talha-ghaffar-ch"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <FaGithub size={14} /> GitHub
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ['Projects', 'Live from GitHub'],
            ['Certifications', 'Verified Links'],
            ['Specialty', 'Cybersecurity'],
            ['Mode', 'Remote + Onsite'],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[11px] uppercase tracking-wider text-slate-500">{k}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{v}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={120} className="lg:col-span-5">
        <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="absolute -right-10 -top-10 h-28 w-28 animate-[float_6s_ease-in-out_infinite] rounded-full bg-cyan-300/30 blur-2xl dark:bg-cyan-700/30" />
          <div className="absolute -bottom-10 -left-10 h-28 w-28 animate-[float_7.5s_ease-in-out_infinite] rounded-full bg-emerald-300/30 blur-2xl dark:bg-emerald-700/30" />
          <div className="relative">
            <img
              src="/photo.png"
              alt="Talha Ghaffar"
              className="h-80 w-full rounded-xl object-cover transition duration-500 hover:scale-[1.02]"
            />
            <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Security-first engineer with a practical approach to cloud architecture, system hardening, and automation.
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

const AboutView = () => (
  <Section title="About" subtitle="Experience and education at a glance" icon={TerminalSquare}>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <FadeIn className="lg:col-span-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">Professional Summary</h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            I am focused on cybersecurity, cloud architecture, and IT operations. I enjoy improving reliability,
            finding vulnerabilities before attackers do, and creating secure systems that scale.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>- Penetration testing and security analysis</li>
            <li>- AWS and cloud fundamentals</li>
            <li>- Network and system administration</li>
            <li>- Python-based automation</li>
          </ul>
        </div>
      </FadeIn>

      <FadeIn delay={80} className="space-y-4 lg:col-span-7">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-2 flex items-center gap-2">
            <Briefcase size={16} className="text-emerald-500" />
            <h4 className="font-semibold text-slate-900 dark:text-white">Information Technology Specialist</h4>
          </div>
          <p className="text-sm text-slate-500">Pagri Studio - Freelance - Oct 2023 - Present</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Managing daily IT operations, troubleshooting systems, supporting network reliability, and improving operational stability.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-2 flex items-center gap-2">
            <GraduationCap size={16} className="text-cyan-500" />
            <h4 className="font-semibold text-slate-900 dark:text-white">BS Computer Science</h4>
          </div>
          <p className="text-sm text-slate-500">University of Management and Technology - 2023 - 2027</p>
        </div>
      </FadeIn>
    </div>
  </Section>
);

const ProjectsView = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const iconForRepo = (repo) => {
      const text = `${repo.name || ''} ${repo.description || ''} ${(repo.language || '')}`.toLowerCase();
      if (text.includes('security') || text.includes('pentest') || text.includes('cyber')) return Shield;
      if (text.includes('cloud') || text.includes('aws') || text.includes('docker')) return Cloud;
      if (text.includes('database') || text.includes('sql') || text.includes('mongo')) return Database;
      if (text.includes('encrypt') || text.includes('auth')) return Lock;
      if (text.includes('react') || text.includes('web') || text.includes('frontend')) return Code;
      return FolderGit2;
    };

    const run = async () => {
      try {
        const response = await fetch('https://api.github.com/users/talha-ghaffar-ch/repos?per_page=100&sort=updated');
        if (!response.ok) throw new Error('Failed');
        const repos = await response.json();

        const mapped = repos
          .filter((r) => !r.fork)
          .map((r) => ({
            title: r.name,
            description: r.description || 'No description available.',
            link: r.html_url,
            stars: r.stargazers_count || 0,
            updatedAt: r.updated_at,
            language: r.language || 'General',
            icon: iconForRepo(r),
          }))
          .sort((a, b) => b.stars - a.stars);

        if (mounted) {
          setProjects(mapped);
          setError('');
        }
      } catch {
        if (mounted) setError('Could not load projects from GitHub right now.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, []);

  const featured = useMemo(() => projects.slice(0, 2), [projects]);
  const rest = useMemo(() => projects.slice(2), [projects]);

  return (
    <Section title="Projects" subtitle="Automatically synced from GitHub" icon={FolderGit2}>
      {loading && <p className="text-sm text-slate-500">Loading repositories...</p>}
      {error && <p className="text-sm text-rose-500">{error}</p>}

      {featured.length > 0 && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {featured.map((project, idx) => {
            const Icon = project.icon;
            return (
              <FadeIn key={project.link} delay={idx * 90}>
                <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/60 bg-cyan-100/70 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:border-cyan-700/60 dark:bg-cyan-900/30 dark:text-cyan-300">
                      Featured
                    </div>
                    <Icon size={18} className="text-slate-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><Star size={12} /> {project.stars}</span>
                    <span className="inline-flex items-center gap-1"><CalendarDays size={12} /> {new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900"
                  >
                    Open Repository <ExternalLink size={12} />
                  </a>
                </div>
              </FadeIn>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rest.map((project, idx) => {
          const Icon = project.icon;
          return (
            <FadeIn key={project.link} delay={idx * 60}>
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{project.title}</h4>
                    <p className="text-xs text-slate-500">{project.language}</p>
                  </div>
                  <Icon size={16} className="text-slate-500" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
                >
                  View Project <ExternalLink size={12} />
                </a>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
};

const CertificationsView = () => {
  const certs = [
    {
      title: 'PenTest Cyber Specialist Program',
      issuer: 'NITSEP',
      date: 'Issued Mar 2026',
      id: 'EAE9749217',
      verifyLink: 'https://nitsep.pk/course-certificate/EAE9749217',
      icon: Shield,
    },
    {
      title: 'AWS Cloud Foundations',
      issuer: 'Amazon Web Services',
      date: 'Issued Nov 2025',
      id: 'Listed on LinkedIn',
      verifyLink: 'https://www.linkedin.com/in/talha-ghaffar',
      icon: Cloud,
    },
    {
      title: 'English Immersion (SD-100)',
      issuer: 'UMT',
      date: 'Issued Feb 2026',
      id: 'F2023266045',
      verifyLink: '',
      icon: Code,
    },
  ];

  return (
    <Section title="Certifications" subtitle="Verification links included where available" icon={Database}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {certs.map((cert, idx) => {
          const Icon = cert.icon;
          return (
            <FadeIn key={cert.title} delay={idx * 80}>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-2 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    <Icon size={16} />
                    <h3 className="font-semibold">{cert.title}</h3>
                  </div>
                  {cert.verifyLink ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                      <CheckCircle size={12} /> Verified Link
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{cert.issuer}</p>
                <p className="mt-1 text-xs text-slate-500">{cert.date} - ID: {cert.id}</p>

                <div className="mt-4">
                  {cert.verifyLink ? (
                    <a
                      href={cert.verifyLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
                    >
                      Verify Certificate <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="inline-flex rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800">
                      Verification link not added
                    </span>
                  )}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
};

export default function App() {
  const [activeView, setActiveView] = useState('home');

  const nav = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'certs', label: 'Certifications' },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-[#07090d] dark:text-slate-100">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-800/20" />
        <div className="absolute right-[-10%] top-[20%] h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-800/20" />
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-[#07090d]/80">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <button onClick={() => setActiveView('home')} className="inline-flex items-center gap-2 text-sm font-semibold">
            <span className="rounded-md bg-slate-900 px-2 py-1 text-xs text-white dark:bg-white dark:text-slate-900">TG</span>
            Talha Ghaffar
          </button>

          <nav className="hidden items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  activeView === item.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a
            href="https://www.linkedin.com/in/talha-ghaffar/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900"
          >
            <FaLinkedinIn size={13} /> Connect
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl space-y-14 px-6 pb-20 pt-10">
        {activeView === 'home' && <Hero onNavigate={setActiveView} />}
        {activeView === 'about' && <AboutView />}
        {activeView === 'projects' && <ProjectsView />}
        {activeView === 'certs' && <CertificationsView />}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Let&apos;s build something meaningful</p>
              <h3 className="mt-1 text-xl font-semibold">Security-first systems. Clear communication. Reliable delivery.</h3>
            </div>
            <a
              href="https://www.linkedin.com/in/talha-ghaffar/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900"
            >
              Start Conversation
              <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 p-2 backdrop-blur dark:border-slate-800 dark:bg-[#07090d]/90 md:hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-4 gap-1">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`rounded-lg px-2 py-2 text-xs ${
                activeView === item.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

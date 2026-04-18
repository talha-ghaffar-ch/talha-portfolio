import React, { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowRight,
  CheckCircle,
  Cloud,
  Code,
  Database,
  ExternalLink,
  FolderGit2,
  Lock,
  Shield,
  Sparkles,
  Terminal,
  TerminalSquare,
} from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';

const useTypewriter = (words, speed = 80, delay = 1800, enabled = true) => {
  const [text, setText] = useState(enabled ? '' : words[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;

    const currentWord = words[wordIndex];
    let timeoutId;

    if (isDeleting) {
      timeoutId = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((previous) => (previous + 1) % words.length);
        }
      }, speed / 2);
    } else {
      timeoutId = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), delay);
        }
      }, speed);
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, wordIndex, words, speed, delay, enabled]);

  return text;
};

const FadeIn = ({ children, delay = 0, className = '', direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0) scale(1)';

    switch (direction) {
      case 'down':
        return 'translateY(-24px)';
      case 'left':
        return 'translateX(24px)';
      case 'right':
        return 'translateX(-24px)';
      case 'scale':
        return 'scale(0.97)';
      default:
        return 'translateY(24px)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="relative flex items-center gap-3 pb-4 mb-6">
    <Icon className="text-emerald-400" size={26} />
    <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
      {title} <span className="text-slate-600">// {subtitle}</span>
    </h2>
    <div className="absolute bottom-0 left-0 h-px w-full bg-slate-800/80 overflow-hidden">
      <div className="h-full w-1/4 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-[scanLine_2.5s_ease-in-out_infinite]" />
    </div>
  </div>
);

const cvData = {
  profile: {
    name: 'Talha Ghaffar',
    summary:
      'Final year Computer Science student at UMT focused on Cloud Computing, Infrastructure, Cybersecurity, and practical Web and Mobile App Development.',
    headline: 'Cloud Computing | Cybersecurity | Infrastructure | Web & Mobile App Development',
  },
  focusAreas: ['Cloud Computing', 'Infrastructure', 'Cybersecurity', 'Web & Mobile App Development'],
  skills: [
    {
      title: 'Cloud Computing',
      icon: Cloud,
      description: 'Cloud concepts, cloud security, AWS fundamentals, and virtualization with VMware and Hyper-V.',
    },
    {
      title: 'Cybersecurity',
      icon: Shield,
      description: 'Network security, ethical hacking, penetration testing, and operating systems.',
    },
    {
      title: 'Development',
      icon: Activity,
      description: 'Mobile app development, advanced web development, project management, and Crypto & Web3.',
    },
  ],
  experience: [
    {
      title: 'Information Technology Specialist',
      organization: 'Pagri Studio',
      location: 'Liaquatpur, Pakistan',
      period: 'Oct 2023 - Present',
      details:
        'Managed IT operations, handled hardware, software, and network support, troubleshot technical issues, and supported smooth day-to-day workflows with hands-on system administration.',
    },
    {
      title: 'Creative Media Manager - Design, Editing & Client Acquisition',
      organization: 'Pagri Studio',
      location: 'Liaquatpur, Pakistan',
      period: 'Oct 2023 - Present',
      details: 'Graphic design, video editing, animation creation, client acquisition, and project management.',
    },
  ],
  education: [
    {
      title: 'BS Computer Science',
      organization: 'University of Management and Technology, Lahore',
      period: 'Oct 2023 - Current',
      details: 'Field of study: Information and Communication Technologies. Level: EQF level 6.',
    },
    {
      title: 'Higher Secondary School Certificate (HSSC) - FSc Pre-Engineering',
      organization: 'SWOT Boys Higher Secondary School, Liaquat Pur',
      period: '2021 - 2023',
      details: 'Field of study: Natural sciences, mathematics and statistics. Level: EQF level 4.',
    },
    {
      title: 'Secondary School Certificate (SSC) - Matriculation (Science)',
      organization: 'SWOT Boys Higher Secondary School, Liaquat Pur',
      period: '2019 - 2021',
      details: 'Field of study: Natural sciences, mathematics and statistics. Level: EQF level 2.',
    },
  ],
  languages: [
    { name: 'Urdu', level: 'Mother tongue' },
    { name: 'English', level: 'C1' },
  ],
  certifications: [
    {
      title: 'AWS Cloud Foundations',
      issuer: 'Amazon Web Services (AWS)',
      description:
        'Core cloud concepts, AWS services, pricing and billing, global infrastructure, security, networking, compute, storage, databases, architecture best practices, and monitoring.',
      link: 'https://www.credly.com/go/VqsTYK4x',
      icon: Cloud,
      color: 'text-orange-400',
    },
    {
      title: 'AWS Foundations Workshop',
      issuer: 'ICFCS - UMT',
      description: 'Core AWS services, cloud computing concepts, IAM fundamentals, and cloud architecture basics.',
      link: '',
      icon: Database,
      color: 'text-cyan-400',
    },
    {
      title: 'Docker Foundations Professional',
      issuer: 'Docker, Inc.',
      description:
        'Docker architecture, image creation with Dockerfiles, container lifecycle, Compose, volumes, networking, and image management.',
      link: 'https://www.linkedin.com/learning/certificates/8232a906dfa6432d85978be4e66d2e6c8b461c73f7cf42f80a847abc5ecb2e1e',
      icon: Terminal,
      color: 'text-sky-400',
    },
    {
      title: 'PenTest Cyber Specialist Program',
      issuer: 'Nationwide IT Skillsets Expansion Program - NITSEP',
      description:
        'Network security fundamentals, monitoring, ethical hacking, web and WiFi penetration testing, bug bounty, and reconnaissance.',
      link: 'https://nitsep.pk/course-certificate/EAE9749217',
      icon: Shield,
      color: 'text-rose-400',
    },
    {
      title: 'Ethical Hacking & Resilient Defence Workshop',
      issuer: 'ICFCS - UMT',
      description: 'Cyber threats, penetration testing basics, network security practices, and resilient defence strategies.',
      link: '',
      icon: Lock,
      color: 'text-emerald-400',
    },
    {
      title: 'English Immersion (SD-100)',
      issuer: 'University of Management and Technology - UMT',
      description:
        'Verbal and written fluency, public speaking, presentation skills, technical writing, active listening, and professional networking.',
      link: '',
      icon: Code,
      color: 'text-cyan-300',
    },
  ],
  projects: [
    {
      title: 'Python Tkinter Encryption App',
      description:
        'Desktop Python Tkinter encryption and decryption app using Fernet symmetric encryption with login, text encryption, file encryption, and secure decryption.',
      link: 'https://github.com/talha-ghaffar-ch/Python-Tkinter-Encryption-App',
      icon: Shield,
      accent: 'from-emerald-500/20 to-teal-500/20',
    },
    {
      title: 'Pagri Studio App',
      description:
        'Mobile-first React and Vite digital agency app packaged for Android with Capacitor, including an AI business assistant, service modules, client workflows, legal pages, and PWA support.',
      link: 'https://github.com/talha-ghaffar-ch/Pagri-Studio-App-PUBLIC',
      icon: Activity,
      accent: 'from-cyan-500/20 to-blue-500/20',
    },
  ],

  links: {
    github: 'https://github.com/talha-ghaffar-ch',
    linkedin: 'https://www.linkedin.com/in/talha-ghaffar/',
  },
};

const SkillStrip = () => {
  const skills = [
    'Cloud Computing',
    'Cloud Security',
    'AWS Cloud Foundations',
    'VMware',
    'Hyper-V',
    'Network Security',
    'Ethical Hacking',
    'Penetration Testing',
    'Mobile App Development',
    'Advanced Web Development',
    'Project Management',
    'Crypto & Web3',
  ];

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/35 py-3 backdrop-blur-sm">
      <div className="flex gap-4 whitespace-nowrap animate-[marquee_28s_linear_infinite] px-4">
        {[...skills, ...skills].map((skill, index) => (
          <span key={`${skill}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/60 px-3 py-1.5 text-[11px] font-mono text-slate-300">
            <Sparkles size={11} className="text-emerald-400/70" />
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const HomeView = ({ onNavigate, isMobile }) => {
  const currentFocus = useTypewriter(cvData.focusAreas, 60, 1800, !isMobile);

  return (
    <div className="min-h-[80vh] flex flex-col justify-center pt-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="md:col-span-7 space-y-6 lg:space-y-8">
          <FadeIn delay={100}>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-100 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-[pulseGlow_1.6s_ease-in-out_infinite]" />
              Final year Computer Science student at UMT
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight relative">
              <span className="absolute -inset-x-8 -inset-y-6 -z-10 bg-[radial-gradient(circle_at_40%_50%,rgba(6,182,212,0.18),transparent_52%)] animate-[heroGlow_6s_ease-in-out_infinite]" />
              <span className="block text-slate-100">TALHA</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-300">GHAFFAR.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={300} className="h-10 md:h-12">
            <p className="text-base sm:text-lg md:text-xl font-mono text-slate-300 flex items-center gap-2">
              <span className="text-emerald-500">Focus:</span>
              <span className="text-slate-100">{currentFocus}</span>
              <span className="w-2 h-5 bg-emerald-500 animate-[pulse_1s_infinite]" />
            </p>
          </FadeIn>

          <FadeIn delay={400}>
            <p className="text-slate-200 max-w-2xl leading-relaxed text-base sm:text-lg border-l-2 border-cyan-500/30 pl-4">
              {cvData.profile.summary}
            </p>
          </FadeIn>

          <FadeIn delay={500} className="pt-2 flex flex-wrap gap-3 items-center">
            <div className="flex w-full sm:w-auto flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 items-stretch sm:items-center">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-md border border-emerald-400/70 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-100 hover:bg-emerald-500/25 transition-all"
              >
                View Profile & Experience
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => onNavigate('projects')}
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-md border border-slate-600 bg-slate-900/85 px-4 py-2.5 text-sm text-slate-100 hover:text-white hover:border-cyan-300 transition-all"
              >
                View Skills & Projects
                <Sparkles size={14} className="text-cyan-400" />
              </button>
            </div>

            <div className="flex gap-3 ml-0 sm:ml-2">
              <a href={cvData.links.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile" className="p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 transition-all hover:scale-110 hover:border-cyan-300 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70">
                <FaLinkedinIn size={20} />
              </a>
              <a href={cvData.links.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile" className="p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 transition-all hover:scale-110 hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200/70">
                <FaGithub size={20} />
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="md:col-span-5 relative flex flex-col items-center gap-8 mt-6 md:mt-0">
          <FadeIn delay={600} direction="scale" className="relative z-20 w-full flex justify-center">
            <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full p-2 group">
              <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-emerald-500/50 animate-[spin_6s_linear_infinite] opacity-50 group-hover:opacity-100 group-hover:border-emerald-400 transition-all" />
              <div className="absolute inset-[-10px] rounded-full border-b-2 border-r-2 border-cyan-500/30 animate-[spin_4s_linear_infinite_reverse] opacity-30 group-hover:opacity-80 transition-all" />
              <div className="absolute inset-[-20px] rounded-full border-t-2 border-rose-500/20 animate-[spin_8s_linear_infinite] border-dashed" />

              <div className="absolute -top-4 -right-4 bg-slate-900 border border-emerald-500 p-2 rounded-lg animate-[float_4s_ease-in-out_infinite] shadow-[0_0_10px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
                <Shield size={20} className="text-emerald-400" />
              </div>
              <div className="absolute top-1/2 -left-6 bg-slate-900 border border-cyan-500 p-2 rounded-lg animate-[float_5s_ease-in-out_infinite_reverse] shadow-[0_0_10px_rgba(34,211,238,0.3)] group-hover:scale-110 transition-transform delay-100">
                <Cloud size={20} className="text-cyan-400" />
              </div>
              <div className="absolute -bottom-4 right-8 bg-slate-900 border border-orange-500 p-2 rounded-lg animate-[float_6s_ease-in-out_infinite] shadow-[0_0_10px_rgba(249,115,22,0.3)] group-hover:scale-110 transition-transform delay-200">
                <Terminal size={20} className="text-orange-400" />
              </div>

              <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-900 relative z-10 bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-center">
                <img src="/profile.png" alt="Talha Ghaffar" className="w-full h-full object-cover" />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={700} direction="up" className="w-full flex justify-center z-20">
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">Connect</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <a href={cvData.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-3 text-slate-200 hover:border-sky-500/40 transition-colors">
                  <span>LinkedIn</span>
                  <ArrowRight size={14} className="text-sky-400" />
                </a>
                <a href={cvData.links.github} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-3 text-slate-200 hover:border-white/40 transition-colors">
                  <span>GitHub</span>
                  <ArrowRight size={14} className="text-slate-300" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <FadeIn delay={900}>
        <div className="mt-10">
          <SkillStrip />
        </div>
      </FadeIn>


    </div>
  );
};

const AboutView = () => (
  <div className="py-12 space-y-12">
    <FadeIn>
      <SectionHeader icon={TerminalSquare} title="Profile" subtitle="Experience & Education" />
    </FadeIn>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <FadeIn delay={100} className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-md h-full">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield size={20} className="text-cyan-400" /> About Me
          </h3>
          <p className="text-slate-300 leading-relaxed text-sm">{cvData.profile.summary}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Shield size={20} className="text-cyan-400" /> Quick Facts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Education</p>
              <p className="text-slate-100">Final year CS student at UMT</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Focus</p>
              <p className="text-slate-100">Cloud, Security, Infrastructure</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 sm:col-span-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Experience</p>
              <p className="text-slate-100">IT specialist and creative media manager at Pagri Studio</p>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="lg:col-span-7 space-y-8">
        <FadeIn delay={200}>
          <div className="space-y-4">
            <h3 className="text-sm font-mono text-slate-500 tracking-wider">WORK EXPERIENCE</h3>
            <div className="space-y-4">
              {cvData.experience.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6">
                  <div className="flex flex-wrap justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                      <p className="text-cyan-400 font-mono text-sm">{item.organization} • {item.location}</p>
                    </div>
                    <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">{item.period}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="space-y-4">
            <h3 className="text-sm font-mono text-slate-500 tracking-wider">EDUCATION</h3>
            <div className="space-y-4">
              {cvData.education.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6">
                  <div className="flex flex-wrap justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                      <p className="text-emerald-400 font-mono text-sm">{item.organization}</p>
                    </div>
                    <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">{item.period}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="space-y-4">
            <h3 className="text-sm font-mono text-slate-500 tracking-wider">LANGUAGES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cvData.languages.map((language) => (
                <div key={language.name} className="rounded-2xl border border-slate-800 bg-slate-900/45 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-white">{language.name}</h4>
                    <span className="text-xs font-mono text-cyan-300 border border-cyan-500/30 rounded px-2 py-1">{language.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  </div>
);

const ProjectsView = () => (
  <div className="py-12 space-y-12">
    <FadeIn>
      <SectionHeader icon={FolderGit2} title="Skills & Projects" subtitle="Public work only" />
    </FadeIn>

    <FadeIn delay={100}>
      <SkillStrip />
    </FadeIn>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {cvData.skills.map((skillGroup, index) => {
        const SkillIcon = skillGroup.icon;
        return (
          <FadeIn key={skillGroup.title} delay={index * 120}>
            <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-2">
                  <SkillIcon size={18} className="text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white">{skillGroup.title}</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{skillGroup.description}</p>
            </div>
          </FadeIn>
        );
      })}
    </div>

    <div className="space-y-4">
      <FadeIn>
        <div className="relative flex items-center gap-3 mb-4 pb-4">
          <Activity className="text-emerald-400" size={24} />
          <h3 className="text-xl font-bold text-white">Projects</h3>
        </div>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cvData.projects.map((project, index) => {
          const ProjectIcon = project.icon;
          return (
            <FadeIn key={project.title} delay={index * 120}>
              <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
                <div className={`h-32 bg-gradient-to-br ${project.accent} border-b border-slate-800/50 flex items-center justify-center`}>
                  <ProjectIcon size={44} className="text-white/85" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-xl font-bold text-white">{project.title}</h4>
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-300 transition-colors" aria-label={`Open ${project.title}`}>
                      <FaGithub size={18} />
                    </a>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
                  <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-emerald-500/40 px-3 py-2 text-xs font-mono text-emerald-300 hover:bg-emerald-500/10 transition-all">
                    View on GitHub
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>


  </div>
);

const CertificationsView = () => (
  <div className="py-12 space-y-12">
    <FadeIn>
      <SectionHeader icon={Database} title="Certifications" subtitle="Verified credentials" />
    </FadeIn>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-4">
        <h3 className="text-sm font-mono text-slate-500 mb-1">LICENSES & CERTIFICATIONS</h3>
        <p className="text-xs text-slate-500 mb-4">Verification links are shown only where public proof is available.</p>
        <div className="space-y-4">
          {cvData.certifications.map((cert, index) => {
            const CertIcon = cert.icon;
            return (
              <FadeIn key={cert.title} delay={index * 100}>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 flex gap-4 items-start hover:bg-slate-800/60 transition-all">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 shadow-inner">
                    <CertIcon size={24} className={cert.color} />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-100">{cert.title}</h4>
                    <p className="text-sm text-slate-400">{cert.issuer}</p>
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed">{cert.description}</p>
                    <div className="mt-3">
                      {cert.link ? (
                        <a href={cert.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-emerald-500/50 px-3 py-1.5 text-xs font-mono text-emerald-200 hover:bg-emerald-500/15 hover:text-emerald-100 transition-all">
                          <CheckCircle size={12} />
                          Open proof link
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="inline-flex items-center rounded-md border border-slate-700 px-3 py-1.5 text-xs font-mono text-slate-500">Verification link not added</span>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-4 space-y-4">
        <h3 className="text-sm font-mono text-slate-500 mb-4">CONNECT</h3>
        <FadeIn delay={200}>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="grid gap-3">
              <a href={cvData.links.linkedin} target="_blank" rel="noreferrer" aria-label="Connect on LinkedIn" className="inline-flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-3 text-slate-200 hover:border-sky-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70">
                <span>LinkedIn</span>
                <ArrowRight size={14} className="text-sky-400" />
              </a>
              <a href={cvData.links.github} target="_blank" rel="noreferrer" aria-label="Connect on GitHub" className="inline-flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-3 text-slate-200 hover:border-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200/70">
                <span>GitHub</span>
                <ArrowRight size={14} className="text-slate-300" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  </div>
);

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

  const navItems = [
    { id: 'home', label: 'HOME', icon: Terminal },
    { id: 'about', label: 'ABOUT', icon: TerminalSquare },
    { id: 'projects', label: 'PROJECTS', icon: FolderGit2 },
    { id: 'certs', label: 'CERTS', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200 font-sans relative scroll-smooth">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:z-[60] focus:top-4 focus:left-4 focus:rounded-md focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400">Skip to content</a>
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[90px]" />
        <div className="absolute top-1/3 -right-28 h-80 w-80 rounded-full bg-emerald-500/10 blur-[110px]" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button type="button" onClick={() => setActiveView('home')} className="group flex items-center gap-2.5 cursor-pointer transition-opacity hover:opacity-90 text-left">
            <div className="relative h-7 w-7 rounded-md border border-emerald-400/70 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <span className="absolute inset-1 rounded-sm bg-emerald-400/80 animate-[brandPulse_2.2s_ease-in-out_infinite]" />
              <span className="absolute inset-0 rounded-md border border-cyan-300/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="leading-tight">
              <span className="block text-[13px] sm:text-sm font-semibold tracking-wide text-white">{cvData.profile.name}</span>
              <span className="block text-[10px] font-mono text-cyan-300/85">Portfolio</span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 p-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs transition-all ${activeView === item.id ? 'text-emerald-300 bg-emerald-500/10' : 'text-slate-400 hover:text-emerald-200'}`}
              >
                <item.icon size={14} className={activeView === item.id ? 'text-emerald-500' : 'text-slate-500'} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden flex gap-4 text-xs font-mono text-emerald-500">
            <span className="animate-pulse flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 block" /> SYS_ONLINE
            </span>
          </div>
        </div>
      </nav>

      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-32 min-h-screen flex flex-col">
        <div key={activeView} className="flex-1 animate-[fadeIn_0.5s_ease-out]">
          {activeView === 'home' && <HomeView onNavigate={setActiveView} isMobile={mobile} />}
          {activeView === 'about' && <AboutView />}
          {activeView === 'projects' && <ProjectsView />}
          {activeView === 'certs' && <CertificationsView />}
        </div>

        <section className="mt-8 rounded-2xl border border-slate-800/80 bg-gradient-to-r from-slate-900/80 via-slate-900/70 to-slate-900/80 px-6 py-8 md:px-8 md:py-10 backdrop-blur-md shadow-[0_0_40px_rgba(16,185,129,0.08)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-mono tracking-wider text-emerald-300/90 mb-2">LET'S TALK</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Reach out through LinkedIn or GitHub.</h3>
              <p className="text-slate-400 max-w-2xl">I'm available for opportunities in cloud computing, cybersecurity, infrastructure, and full-stack development.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={cvData.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-emerald-500/60 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70">
                LinkedIn <ArrowRight size={14} />
              </a>
              <a href={cvData.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-4 py-2.5 text-sm text-slate-200 hover:text-white hover:border-cyan-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70">
                GitHub <FaGithub size={14} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-slate-800 p-2 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveView(item.id)}
              className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 rounded-md transition-all duration-300 px-1 ${
                activeView === item.id
                  ? 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  : 'text-slate-500 border border-transparent hover:text-slate-300 hover:bg-slate-900/60'
              }`}
            >
              {activeView === item.id && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-emerald-400 rounded-full" />}
              <span className="relative">
                <item.icon size={20} />
              </span>
              <span className="text-[11px] font-mono leading-none">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 rgba(16,185,129,0.2); opacity: 0.85; }
          50% { box-shadow: 0 0 12px rgba(16,185,129,0.9); opacity: 1; }
        }
        @keyframes heroGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        @keyframes brandPulse {
          0%, 100% { transform: scale(0.82); opacity: 0.7; }
          50% { transform: scale(1); opacity: 1; }
        }
        @keyframes scanLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      ` }} />
    </div>
  );
}

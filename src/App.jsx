import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal, Shield, Activity, Cloud,
  Lock, Code, Database,
  Copy, CheckCircle, Briefcase, GraduationCap,
  FolderGit2, TerminalSquare, ExternalLink, Cpu
} from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';

const useTypewriter = (words, speed = 80, delay = 2000) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, speed / 2);
    } else {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), delay);
        }
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, delay]);

  return text;
};

const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
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
      case 'up': return 'translateY(40px)';
      case 'down': return 'translateY(-40px)';
      case 'left': return 'translateX(40px)';
      case 'right': return 'translateX(-40px)';
      case 'scale': return 'scale(0.95)';
      default: return 'translate(0, 0)';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const TiltCard = ({ children, className = '', glowColor = 'rgba(16, 185, 129, 0.15)' }) => {
  const [style, setStyle] = useState({});
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    const rotateX = (y - 0.5) * -15;
    const rotateY = (x - 0.5) * 15;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      boxShadow: `0 20px 40px ${glowColor}`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
      boxShadow: '0 0px 0px rgba(0,0,0,0)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-300 ease-out transform-gpu ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

const GlowingBorder = ({ children, className = '', innerClassName = '', rounding = 'rounded-xl', glowColor = '#10b981' }) => {
  return (
    <div className={`relative p-[1px] overflow-hidden group ${rounding} ${className}`}>
      <div className={`absolute inset-0 bg-slate-800/50 ${rounding}`} />
      <div
        className="absolute inset-[-300%] animate-[spin_4s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 25%, ${glowColor} 50%, transparent 75%, transparent 100%)`
        }}
      />
      <div className={`relative h-full w-full bg-[#050505] ${rounding} ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
};

const GlowingLine = () => (
  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-800/50 overflow-hidden">
    <div className="absolute top-0 left-0 w-[20%] h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-[scanLine_2.5s_ease-in-out_infinite]" />
  </div>
);

const InteractiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(window.innerWidth / 15, 80);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#10b981';

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        if (mouse.x && mouse.y) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.4 * (1 - dist / 200)})`;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseOut);

    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-30" />;
};

const DecryptButton = ({ text, onClick, icon: Icon }) => {
  const [display, setDisplay] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

  useEffect(() => {
    if (!isHovering) {
      setDisplay(text);
      return;
    }
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split('').map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [isHovering, text]);

  return (
    <button
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
      className="relative px-6 py-3 font-mono text-sm font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/50 rounded hover:bg-emerald-500/20 hover:border-emerald-400 transition-all overflow-hidden group flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
      {Icon && <Icon size={18} />}
      {display}
    </button>
  );
};

const ContactTerminal = () => {
  const [copied, setCopied] = useState(false);
  const [linesRevealed, setLinesRevealed] = useState(0);
  const command = 'curl -s https://api.talhaghaffar.dev/contact';

  useEffect(() => {
    const timer = setInterval(() => {
      setLinesRevealed((prev) => (prev < 5 ? prev + 1 : prev));
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('https://www.linkedin.com/in/talha-ghaffar/');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <GlowingBorder rounding="rounded-lg" className="w-full max-w-sm shadow-2xl transition-transform hover:scale-[1.02] duration-500" innerClassName="bg-[#0a0a0a] flex flex-col justify-between">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2 rounded-t-lg">
        <div className="w-3 h-3 rounded-full bg-rose-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-emerald-500" />
        <span className="ml-2 text-xs font-mono text-slate-500 flex items-center gap-2">
          talha@cyber-ops:~
          <Lock size={10} className="text-emerald-500" />
        </span>
      </div>
      <div className="p-4 font-mono text-sm h-[180px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-slate-300 mb-2">
            <span className="text-emerald-500">➜</span>
            <span className="text-cyan-400">~</span>
            <span className="typing-animation whitespace-nowrap overflow-hidden border-r-2 border-emerald-500 pr-1">{command}</span>
          </div>

          <div className="text-slate-400 space-y-1 ml-4 border-l border-slate-800/50 pl-4 py-2">
            {linesRevealed > 0 && <p className="animate-[fadeIn_0.3s_ease-in]">{'{'}</p>}
            {linesRevealed > 1 && <p className="pl-4 animate-[fadeIn_0.3s_ease-in]">"status": <span className="text-emerald-400">"Online"</span>,</p>}
            {linesRevealed > 2 && <p className="pl-4 animate-[fadeIn_0.3s_ease-in]">"network": <span className="text-cyan-400">"LinkedIn"</span>,</p>}
            {linesRevealed > 3 && <p className="pl-4 animate-[fadeIn_0.3s_ease-in]">"action": <span className="text-yellow-400">"Awaiting Connection"</span></p>}
            {linesRevealed > 4 && <p className="animate-[fadeIn_0.3s_ease-in]">{'}'}</p>}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-800/50 pt-3">
          <span className="text-slate-500 animate-pulse">_</span>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded transition-all duration-300 ${
              copied ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
            {copied ? 'LINK COPIED' : 'COPY URL'}
          </button>
        </div>
      </div>
    </GlowingBorder>
  );
};

const SkillsMarquee = () => {
  const skills = [
    'AWS Architecture', 'Penetration Testing', 'Python Automation',
    'Cybersecurity Analysis', 'Network Admin', 'Ethical Hacking',
    'Cloud Security', 'System Administration', 'Vulnerability Assessment'
  ];

  return (
    <div className="w-full overflow-hidden py-3 border-y border-slate-800/50 bg-slate-900/20 backdrop-blur-sm mt-12 relative z-10 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
      <div className="flex gap-8 whitespace-nowrap animate-[marquee_30s_linear_infinite]">
        {[...skills, ...skills, ...skills].map((skill, i) => (
          <span key={i} className="text-xs font-mono text-slate-400 flex items-center gap-3">
            <Shield size={12} className="text-emerald-500/50" />
            <span className="hover:text-emerald-400 transition-colors cursor-default">{skill}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const HomeView = () => {
  const roles = [
    'Cloud Solutions Architect',
    'Certified Ethical Hacker',
    'Network & IT Administrator',
    'Security Analyst'
  ];
  const currentRole = useTypewriter(roles, 60, 2500);

  return (
    <div className="min-h-[85vh] flex flex-col justify-center pt-24 md:pt-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center md:items-start">
        <div className="md:col-span-7 space-y-6 lg:space-y-8">
          <FadeIn delay={100}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-emerald-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[ping_2s_infinite]" />
              <span className="text-xs font-mono text-emerald-100">SYSTEM.ACTIVE // IDENTITY_VERIFIED</span>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-tight relative">
              <span className="block text-slate-100">TALHA</span>
              <span className="relative inline-block glitch-wrapper group">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300 group-hover:opacity-0">
                  GHAFFAR.
                </span>
                <span className="absolute top-0 left-0 text-emerald-400 opacity-0 group-hover:opacity-100 animate-[glitch_0.3s_linear_infinite] before:content-['GHAFFAR.'] before:absolute before:left-[2px] before:text-cyan-500 before:bg-[#050505] before:overflow-hidden after:content-['GHAFFAR.'] after:absolute after:left-[-2px] after:text-rose-500 after:bg-[#050505] after:overflow-hidden">
                  GHAFFAR.
                </span>
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={300} className="h-8 md:h-12">
            <p className="text-lg md:text-xl font-mono text-slate-400 flex items-center gap-2">
              <span className="text-emerald-500">root@sys:~#</span>
              <span className="text-slate-200">{currentRole}</span>
              <span className="w-2 h-5 bg-emerald-500 animate-[pulse_1s_infinite]" />
            </p>
          </FadeIn>

          <FadeIn delay={400}>
            <p className="text-slate-400 max-w-lg leading-relaxed text-lg border-l-2 border-slate-800 pl-4">
              Building Secure, Scalable, and High-Performing IT Solutions. Specialized in finding vulnerabilities before they become problems and designing robust cloud architectures.
            </p>
          </FadeIn>

          <FadeIn delay={500} className="pt-2 flex flex-wrap gap-4 items-center">
            <div className="flex gap-4 ml-2">
              <a href="https://github.com/talha-ghaffar-ch" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-white hover:text-white text-slate-400 transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/talha-ghaffar/" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-cyan-400 text-slate-400 transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="md:col-span-5 relative flex flex-col items-center gap-8 mt-12 md:mt-0">
          <FadeIn delay={600} direction="scale" className="relative z-20 w-full flex justify-center">
            <TiltCard glowColor="rgba(16, 185, 129, 0.4)" className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full p-2 group cursor-crosshair">
              <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-emerald-500/50 animate-[spin_6s_linear_infinite] opacity-50 group-hover:opacity-100 group-hover:border-emerald-400 transition-all" />
              <div className="absolute inset-[-10px] rounded-full border-b-2 border-r-2 border-cyan-500/30 animate-[spin_4s_linear_infinite_reverse] opacity-30 group-hover:opacity-80 transition-all" />
              <div className="absolute inset-[-20px] rounded-full border-t-2 border-rose-500/20 animate-[spin_8s_linear_infinite] border-dashed" />

              <div className="absolute -top-4 -right-4 bg-slate-900 border border-emerald-500 p-2 rounded-lg animate-[float_4s_ease-in-out_infinite] shadow-[0_0_10px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
                <Shield size={20} className="text-emerald-400" />
              </div>
              <div className="absolute top-1/2 -left-6 bg-slate-900 border border-cyan-500 p-2 rounded-lg animate-[float_5s_ease-in-out_infinite_reverse] shadow-[0_0_10px_rgba(34,211,238,0.3)] group-hover:scale-110 transition-transform delay-100">
                <Cloud size={20} className="text-cyan-400" />
              </div>
              <div className="absolute -bottom-4 right-8 bg-slate-900 border border-purple-500 p-2 rounded-lg animate-[float_6s_ease-in-out_infinite] shadow-[0_0_10px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform delay-200">
                <Terminal size={20} className="text-purple-400" />
              </div>

              <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-900 relative z-10 bg-slate-800">
                <img
                  src="/photo.png"
                  alt="Talha Ghaffar"
                  className="w-full h-full object-cover filter grayscale-[80%] contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400/50 shadow-[0_0_10px_rgba(16,185,129,1)] opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite]" />
              </div>
            </TiltCard>
          </FadeIn>

          <FadeIn delay={700} direction="up" className="w-full flex justify-center z-20">
            <ContactTerminal />
          </FadeIn>
        </div>
      </div>

      <FadeIn delay={900}>
        <SkillsMarquee />
      </FadeIn>
    </div>
  );
};

const AboutView = () => {
  return (
    <div className="py-12 space-y-12">
      <FadeIn>
        <div className="relative flex items-center gap-3 mb-8 pb-4">
          <TerminalSquare className="text-emerald-500" size={28} />
          <h2 className="text-2xl font-bold font-mono text-white">WHOAMI <span className="text-slate-600">// About & Timeline</span></h2>
          <GlowingLine />
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <FadeIn delay={100} className="lg:col-span-5">
          <TiltCard glowColor="rgba(14, 165, 233, 0.0)" className="h-full">
            <GlowingBorder rounding="rounded-xl" className="h-full" innerClassName="p-8 bg-slate-900/60 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield size={20} className="text-cyan-400" /> Executive Summary
              </h3>
              <div className="space-y-4 text-slate-400 leading-relaxed text-sm">
                <p>
                  I am a Certified Ethical Hacker and Cloud Solutions Architect with hands-on experience in Cybersecurity, Penetration Testing, and Cloud Infrastructure.
                </p>
                <p>
                  Currently pursuing my BS in Computer Science from UMT, I am passionate about building Secure, Scalable, and High-Performing IT Solutions.
                </p>
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <p className="text-slate-300 font-medium mb-2">I specialize in:</p>
                  <ul className="space-y-2 font-mono text-xs">
                    <li className="flex gap-2"><span className="text-emerald-500">▹</span> <span>Ethical Hacking & Pen Testing</span></li>
                    <li className="flex gap-2"><span className="text-emerald-500">▹</span> <span>Cloud Architecture (AWS & GCP)</span></li>
                    <li className="flex gap-2"><span className="text-emerald-500">▹</span> <span>Network & IT Administration</span></li>
                    <li className="flex gap-2"><span className="text-emerald-500">▹</span> <span>Cybersecurity Analysis</span></li>
                  </ul>
                </div>
                <p className="pt-2 italic text-slate-500">
                  "I enjoy solving complex problems, optimizing systems, and turning ideas into impactful solutions."
                </p>
              </div>
            </GlowingBorder>
          </TiltCard>
        </FadeIn>

        <div className="lg:col-span-7 space-y-6">
          <FadeIn delay={200}>
            <div className="relative pl-8 border-l-2 border-slate-800 space-y-8">
              <div className="relative group">
                <div className="absolute -left-[41px] top-1 bg-slate-950 p-1 rounded-full border border-emerald-500 group-hover:scale-125 group-hover:bg-emerald-500 transition-all z-10">
                  <Briefcase size={16} className="text-emerald-400 group-hover:text-black" />
                </div>
                <GlowingBorder rounding="rounded-lg" innerClassName="p-6 bg-slate-900/40">
                  <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-white">Information Technology Specialist</h4>
                      <p className="text-cyan-400 font-mono text-sm">Pagri Studio • Freelance</p>
                    </div>
                    <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">Oct 2023 - Present</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">Liaquatpur, Punjab, Pakistan • Remote</p>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex gap-2 hover:text-slate-300 transition-colors"><span className="text-emerald-600">▹</span> Manage All IT Operations At Pagri Studio</li>
                    <li className="flex gap-2 hover:text-slate-300 transition-colors"><span className="text-emerald-600">▹</span> Handle Hardware, Software, And Network Support</li>
                    <li className="flex gap-2 hover:text-slate-300 transition-colors"><span className="text-emerald-600">▹</span> Troubleshoot Technical Issues And Provide Solutions</li>
                    <li className="flex gap-2 hover:text-slate-300 transition-colors"><span className="text-emerald-600">▹</span> Ensure Smooth Day-To-Day IT Workflow</li>
                    <li className="flex gap-2 hover:text-slate-300 transition-colors"><span className="text-emerald-600">▹</span> Hands-On Experience In System Administration</li>
                  </ul>
                </GlowingBorder>
              </div>

              <div className="relative group">
                <div className="absolute -left-[41px] top-1 bg-slate-950 p-1 rounded-full border border-cyan-500 group-hover:scale-125 group-hover:bg-cyan-500 transition-all z-10">
                  <GraduationCap size={16} className="text-cyan-400 group-hover:text-black" />
                </div>
                <GlowingBorder rounding="rounded-lg" glowColor="#0ea5e9" innerClassName="p-6 bg-slate-900/40">
                  <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-white">Bachelor&apos;s Degree, Computer Science</h4>
                      <p className="text-emerald-400 font-mono text-sm">University of Management and Technology - UMT</p>
                    </div>
                    <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">Oct 2023 - Oct 2027</span>
                  </div>
                </GlowingBorder>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

const ProjectsView = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const colors = [
      { color: 'from-purple-500/20 to-indigo-500/20', glowColor: '#a855f7' },
      { color: 'from-cyan-500/20 to-blue-500/20', glowColor: '#0ea5e9' },
      { color: 'from-emerald-500/20 to-teal-500/20', glowColor: '#10b981' },
      { color: 'from-orange-500/20 to-rose-500/20', glowColor: '#f97316' }
    ];

    const iconForLanguage = (language) => {
      const lang = (language || '').toLowerCase();
      if (lang.includes('python')) return Lock;
      if (lang.includes('javascript') || lang.includes('typescript')) return Activity;
      if (lang.includes('html') || lang.includes('css')) return Code;
      if (lang.includes('shell')) return Terminal;
      if (lang.includes('sql')) return Database;
      if (lang.includes('docker')) return Cloud;
      return FolderGit2;
    };

    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/talha-ghaffar-ch/repos?per_page=100&sort=updated');
        if (!response.ok) throw new Error('Unable to fetch GitHub repositories.');

        const repos = await response.json();
        const mapped = repos
          .filter((repo) => !repo.fork)
          .map((repo, index) => {
            const style = colors[index % colors.length];
            const tech = [repo.language || 'General'];
            if (repo.stargazers_count > 0) tech.push(`${repo.stargazers_count} Stars`);
            tech.push('GitHub');

            return {
              title: repo.name,
              type: `${repo.language || 'General'} / Open Source`,
              description: repo.description || 'No description provided yet.',
              tech,
              icon: iconForLanguage(repo.language),
              link: repo.html_url,
              color: style.color,
              glowColor: style.glowColor
            };
          });

        if (isMounted) {
          setProjects(mapped);
          setLoadError('');
        }
      } catch (error) {
        if (isMounted) {
          setLoadError('Failed to load projects from GitHub. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="py-12 space-y-8">
      <FadeIn>
        <div className="relative flex items-center gap-3 mb-8 pb-4">
          <FolderGit2 className="text-purple-500" size={28} />
          <h2 className="text-2xl font-bold font-mono text-white">PROJECTS <span className="text-slate-600">// Execution</span></h2>
          <GlowingLine />
        </div>
      </FadeIn>

      {isLoading && (
        <p className="text-sm font-mono text-slate-500">Fetching projects from GitHub...</p>
      )}

      {loadError && (
        <p className="text-sm font-mono text-rose-400">{loadError}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <FadeIn key={i} delay={i * 150}>
            <TiltCard glowColor="rgba(0,0,0,0)" className="h-full">
              <GlowingBorder rounding="rounded-xl" glowColor={project.glowColor} className="h-full" innerClassName="flex flex-col bg-slate-900/50 backdrop-blur-sm">
                <div className={`h-32 bg-gradient-to-br ${project.color} border-b border-slate-800/50 relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMWUyOTNiIi8+CjxwYXRoIGQ9Ik0wIDBMNCA0Wk00IDBMMCA0WiIgc3Ryb2tlPSIjMGYxNzJhIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-20" />
                  {(() => {
                    const ProjectIcon = project.icon || FolderGit2;
                    return <ProjectIcon size={48} className="text-white/70 group-hover:scale-110 group-hover:text-white transition-all duration-500 drop-shadow-lg relative z-10" />;
                  })()}
                </div>

                <div className="p-6 flex flex-col justify-between h-[calc(100%-8rem)]">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs font-mono text-slate-500">{project.type}</p>
                      <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-emerald-400 transition-colors">
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-6">
                    {project.tech.map((tech, j) => (
                      <span key={j} className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-[10px] font-mono text-slate-300 group-hover:border-emerald-500/30 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlowingBorder>
            </TiltCard>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

const VaultView = () => {
  const certs = [
    {
      title: 'PenTest Cyber Specialist Program',
      issuer: 'Nationwide IT Skillsets Expansion Program - NITSEP',
      date: 'Issued Mar 2026',
      id: 'Credential ID EAE9749217',
      icon: Shield,
      color: 'text-rose-500',
      bg: 'from-rose-500/10 to-transparent',
      skills: 'Network Security Fundamentals (CCNA), Cybersecurity Monitoring'
    },
    {
      title: 'AWS Cloud Foundations',
      issuer: 'Amazon Web Services (AWS)',
      date: 'Issued Nov 2025',
      id: 'Credential ID 5bd0755e...',
      icon: Cloud,
      color: 'text-orange-500',
      bg: 'from-orange-500/10 to-transparent',
      skills: 'Cloud Computing Concepts, Core Services, Architecture'
    },
    {
      title: 'English Immersion (SD-100)',
      issuer: 'University of Management and Technology - UMT',
      date: 'Issued Feb 2026',
      id: 'Credential ID F2023266045',
      icon: Code,
      color: 'text-cyan-500',
      bg: 'from-cyan-500/10 to-transparent',
      skills: 'Professional Communication, Verbal & Written Fluency'
    }
  ];

  const skillMatrix = [
    'Penetration Testing', 'Cloud Security', 'AWS', 'IT Security Operations',
    'Network Administration', 'Cybersecurity Analysis', 'Cloud Architecture', 'System Administration'
  ];

  return (
    <div className="py-12 space-y-12">
      <FadeIn>
        <div className="relative flex items-center gap-3 mb-8 pb-4">
          <Database className="text-orange-500" size={28} />
          <h2 className="text-2xl font-bold font-mono text-white">THE_VAULT <span className="text-slate-600">// Credentials & Skills</span></h2>
          <GlowingLine />
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-sm font-mono text-slate-500 mb-4">LICENSES & CERTIFICATIONS</h3>
          {certs.map((cert, i) => (
            <FadeIn key={i} delay={i * 100}>
              <GlowingBorder rounding="rounded-lg" glowColor={cert.title.includes('AWS') ? '#f97316' : cert.title.includes('English') ? '#0ea5e9' : '#f43f5e'}>
                <div className="bg-slate-900/40 p-5 flex gap-4 items-start hover:bg-slate-800/80 transition-all relative overflow-hidden group cursor-default">
                  <div className={`absolute top-0 right-0 w-32 h-full bg-gradient-to-l ${cert.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 shadow-inner group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <cert.icon size={24} className={cert.color} />
                  </div>

                  <div className="flex-1 relative z-10">
                    <h4 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">{cert.title}</h4>
                    <p className="text-sm text-slate-400">{cert.issuer}</p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-slate-500">
                      <span>{cert.date}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{cert.id}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-800/50 text-xs text-slate-400 flex items-center gap-2 group-hover:text-emerald-400/80 transition-colors">
                      <CheckCircle size={12} className="text-emerald-500" />
                      <span className="truncate">Skills: {cert.skills}</span>
                    </div>
                  </div>
                </div>
              </GlowingBorder>
            </FadeIn>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-sm font-mono text-slate-500 mb-4">CORE_COMPETENCIES</h3>
          <FadeIn delay={300}>
            <TiltCard glowColor="rgba(16, 185, 129, 0.0)">
              <GlowingBorder rounding="rounded-xl" innerClassName="bg-slate-900/60 p-6">
                <div className="flex flex-wrap gap-2">
                  {skillMatrix.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-2 bg-slate-950 border border-slate-700/50 rounded-md text-xs font-mono text-emerald-400/90 hover:text-emerald-300 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-3 text-slate-300 text-sm mb-4">
                    <Cpu size={16} className="text-rose-500" /> Technical Arsenal
                  </div>
                  <div className="space-y-3">
                    <div className="group">
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-slate-400 group-hover:text-white transition-colors">Offensive Security</span>
                        <span className="text-cyan-400">90%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden relative">
                        <div className="h-full bg-cyan-500 w-[90%] absolute left-0 top-0 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-shadow" />
                      </div>
                    </div>
                    <div className="group">
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-slate-400 group-hover:text-white transition-colors">Cloud Infrastructure</span>
                        <span className="text-orange-400">85%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden relative">
                        <div className="h-full bg-orange-500 w-[85%] absolute left-0 top-0 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.8)] transition-shadow" />
                      </div>
                    </div>
                    <div className="group">
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-slate-400 group-hover:text-white transition-colors">Python / Automation</span>
                        <span className="text-emerald-400">80%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden relative">
                        <div className="h-full bg-emerald-500 w-[80%] absolute left-0 top-0 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-shadow" />
                      </div>
                    </div>
                  </div>
                </div>
              </GlowingBorder>
            </TiltCard>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeView, setActiveView] = useState('home');

  const navItems = [
    { id: 'home', label: 'INIT', icon: Terminal },
    { id: 'about', label: 'WHOAMI', icon: TerminalSquare },
    { id: 'projects', label: 'EXEC', icon: FolderGit2 },
    { id: 'vault', label: 'VAULT', icon: Database }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200 font-sans relative">
      <InteractiveBackground />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            onClick={() => setActiveView('home')}
            className="font-mono font-bold text-xl tracking-tighter text-white flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Shield size={22} className="text-emerald-500" />
            TG<span className="text-emerald-500 -ml-1">.</span>
          </div>

          <GlowingBorder rounding="rounded-lg" className="hidden md:block" innerClassName="bg-slate-900/80">
            <div className="flex gap-1 p-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-md font-mono text-xs transition-all duration-300 ${
                    activeView === item.id
                      ? 'bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)] border border-emerald-500/50'
                      : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <item.icon size={14} className={activeView === item.id ? 'text-emerald-500' : 'text-slate-500'} />
                  {item.label}
                </button>
              ))}
            </div>
          </GlowingBorder>

          <div className="md:hidden flex gap-4 text-xs font-mono text-emerald-500">
            <span className="animate-pulse flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 block" /> SYS_ONLINE
            </span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-32 min-h-screen flex flex-col">
        <div key={activeView} className="flex-1 animate-[fadeIn_0.5s_ease-out]">
          {activeView === 'home' && <HomeView />}
          {activeView === 'about' && <AboutView />}
          {activeView === 'projects' && <ProjectsView />}
          {activeView === 'vault' && <VaultView />}
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-slate-800 p-2 pb-safe">
        <div className="flex justify-around items-center h-14">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                activeView === item.id ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-mono">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes glitch {
          0%, 14% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); transform: translate(0); }
          15% { clip-path: polygon(0 15%, 100% 15%, 100% 30%, 0 30%); transform: translate(-2px, 2px); }
          16%, 100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); transform: translate(0); }
        }
        .typing-animation {
          animation: type 2s steps(40, end);
        }
        @keyframes type {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes scanLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
      ` }} />
    </div>
  );
}

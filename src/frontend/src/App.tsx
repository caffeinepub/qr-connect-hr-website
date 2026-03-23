import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Handshake,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Rocket,
  ShieldCheck,
  Target,
  UserSearch,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitContactForm } from "./hooks/useQueries";

const queryClient = new QueryClient();

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Vision", href: "#vision" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Users,
    title: "HR Management Services",
    desc: "End-to-end HR management including payroll, attendance, employee lifecycle, and policy compliance tailored to your business.",
  },
  {
    icon: FileText,
    title: "PF & ESI Return Filing",
    desc: "Accurate and timely Provident Fund and ESI return filing to keep your organization fully compliant with statutory regulations.",
  },
  {
    icon: UserSearch,
    title: "Recruitment Services",
    desc: "Strategic talent acquisition solutions to help you find, attract, and retain top-tier professionals across industries and roles.",
  },
  {
    icon: ClipboardCheck,
    title: "HR Audit & Gap Analysis",
    desc: "Comprehensive HR audits to identify gaps, mitigate risk, and align your HR practices with industry standards and legal requirements.",
  },
];

const VALUES = [
  {
    icon: Target,
    title: "Client-Centric Innovation",
    desc: "We put our clients first, continuously innovating to deliver solutions that exceed expectations and drive measurable results.",
  },
  {
    icon: Users,
    title: "People & Employee Empowerment",
    desc: "We believe that empowered employees are the backbone of every successful organization — we help you nurture that culture.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Without Compromise",
    desc: "From compliance to consulting, we maintain the highest standards of quality across every service we deliver.",
  },
  {
    icon: Handshake,
    title: "Integrity & Transparency",
    desc: "Honesty and openness form the foundation of every partnership we build — no hidden agendas, just genuine collaboration.",
  },
];

const TEAM = [
  { name: "Rajesh Sharma", role: "Founder & CEO", initials: "RS" },
  { name: "Priya Mehta", role: "Chief Operating Officer", initials: "PM" },
  { name: "Ankit Verma", role: "Business Operations Officer", initials: "AV" },
  { name: "Sunita Kapoor", role: "Chief People Officer", initials: "SK" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const sections = [
        "home",
        "about",
        "services",
        "vision",
        "team",
        "contact",
      ];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-card transition-shadow duration-300 ${
        scrolled
          ? "shadow-card border-b border-border"
          : "border-b border-border/60"
      }`}
      style={{ height: "68px" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group"
          data-ocid="nav.link"
        >
          <img
            src="/assets/uploads/QR-Connect-Logo-1.png"
            alt="QR Connect"
            className="w-10 h-10 object-contain"
          />
          <span className="font-bold text-foreground text-lg tracking-tight">
            QR Connect
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              data-ocid="nav.link"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === link.href.replace("#", "")
                  ? "text-white bg-white/10"
                  : "text-foreground/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <Button
            onClick={() => scrollTo("#contact")}
            data-ocid="nav.primary_button"
            className="rounded-full px-6 bg-white hover:bg-white/90 text-black font-semibold"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5 text-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden absolute top-[68px] left-0 right-0 bg-card border-b border-border shadow-card-hover"
          >
            <nav className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  data-ocid="nav.link"
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-foreground/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={() => scrollTo("#contact")}
                className="mt-2 rounded-full bg-white hover:bg-white/90 text-black font-semibold"
                data-ocid="nav.primary_button"
              >
                Get Started
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="pt-[68px]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)",
            minHeight: "460px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 px-8 md:px-14 py-14">
            {/* Text */}
            <div className="flex-1 text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                <Rocket className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                  AI-Powered HR Solutions
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-5">
                Your Trusted Partner in{" "}
                <span className="text-gray-300">
                  HR Services &amp; Consulting
                </span>
              </h1>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                QR Connect provides comprehensive HR solutions tailored to help
                your business thrive. We manage the complexities so you can
                focus on growth.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => scrollTo("contact")}
                  data-ocid="hero.primary_button"
                  className="rounded-full px-7 py-3 bg-white text-black font-bold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Get Started <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
                <Button
                  onClick={() => scrollTo("contact")}
                  data-ocid="hero.secondary_button"
                  variant="outline"
                  className="rounded-full px-7 py-3 border-white/60 text-white hover:bg-white/10 bg-transparent font-semibold"
                >
                  Contact Us
                </Button>
              </div>
            </div>
            {/* Hero Image */}
            <div className="flex-shrink-0 lg:w-[420px] w-full flex items-center justify-center">
              <img
                src="/assets/generated/hr-team-meeting.dim_1200x700.jpg"
                alt="HR Team Meeting"
                className="w-full max-w-sm lg:max-w-none object-cover rounded-xl opacity-80"
                loading="eager"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "500+", label: "Clients Served" },
            { value: "98%", label: "Compliance Rate" },
            { value: "10+", label: "Years Experience" },
            { value: "24/7", label: "Support Available" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl px-6 py-4 shadow-card text-center border border-border"
            >
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="bg-section-blue py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Text */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                About QR Connect
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              Empowering Businesses Through{" "}
              <span className="text-white/70">Smart HR Solutions</span>
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              QR Connect is a leading provider of HR services, committed to
              helping businesses streamline their operations and achieve
              sustainable growth. With years of experience, we help
              organizations manage HR, compliance, recruitment, and audits
              efficiently.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-6">
              Based in Noida, Uttar Pradesh, we serve businesses across
              industries with customized solutions aligned to their goals and
              budget. Our AI-powered approach ensures data-driven decisions and
              measurable outcomes for every client.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Noida, UP Based",
                "AI-Powered",
                "Pan-India Service",
                "Compliance Experts",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-white/10 text-white text-xs font-semibold px-4 py-1.5 rounded-full border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="flex-shrink-0 lg:w-[420px] w-full">
            <div className="bg-card rounded-2xl shadow-card p-8 space-y-4 border border-border">
              {[
                { label: "HR Compliance & Filing", pct: 98 },
                { label: "Talent Acquisition", pct: 92 },
                { label: "HR Audit Accuracy", pct: 96 },
                { label: "Client Retention", pct: 94 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-foreground/80">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {item.pct}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: 0 }}
                      animate={visible ? { width: `${item.pct}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-border flex items-center gap-3">
                <MapPin className="w-4 h-4 text-white flex-shrink-0" />
                <span className="text-sm text-foreground/70">
                  Noida, Uttar Pradesh, India
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="py-20">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
              What We Offer
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our Core Services
          </h2>
          <p className="text-foreground/60 mt-3 max-w-xl mx-auto">
            Comprehensive HR solutions designed to streamline your business
            operations and ensure full compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 p-6 group hover:-translate-y-1"
              data-ocid={`services.item.${i + 1}`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                <svc.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                {svc.title}
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HRImagesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const images = [
    {
      src: "/assets/generated/hr-recruitment.dim_800x600.jpg",
      label: "Recruitment Excellence",
    },
    {
      src: "/assets/generated/hr-training.dim_800x600.jpg",
      label: "Training & Development",
    },
    {
      src: "/assets/generated/hr-payroll.dim_800x600.jpg",
      label: "Payroll Management",
    },
  ];

  return (
    <section className="bg-section-blue py-20">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
              Our Expertise
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Excellence in Human Resources
          </h2>
          <p className="text-foreground/60 mt-3 max-w-xl mx-auto">
            We bring premium HR expertise to every engagement
          </p>
        </div>

        {/* 3-column image grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6"
        >
          {images.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative overflow-hidden rounded-xl group"
              style={{ height: "300px" }}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-bold text-base">{img.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Leadership full-width banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative overflow-hidden rounded-xl"
          style={{ height: "320px" }}
        >
          <img
            src="/assets/generated/hr-leadership.dim_1200x700.jpg"
            alt="HR Leadership Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-10 max-w-2xl">
              <p className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-3">
                Leadership
              </p>
              <h3 className="text-white text-2xl md:text-3xl font-bold leading-snug">
                Our leadership team brings 10+ years of combined HR expertise
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function VisionMissionValues() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const MISSION_BULLETS = [
    "Provide AI-powered customized HR solutions",
    "Ensure compliance with statutory requirements",
    "Maintain professionalism and data security",
    "Build long-term partnerships with transparency",
  ];

  return (
    <section id="vision" className="py-20">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
              What Drives Us
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Vision, Mission &amp; Values
          </h2>
        </div>

        {/* Vision + Mission */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6 mb-10"
        >
          {/* Vision */}
          <div className="bg-card rounded-xl border border-border shadow-card p-7">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-foreground/70 leading-relaxed text-sm">
              To become the most trusted AI-powered consultancy partner for
              businesses seeking excellence in HR management services. We
              envision a future where organizations leverage intelligent,
              automated, and data-driven solutions to streamline operations and
              enhance decision-making.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-card rounded-xl border border-border shadow-card p-7">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
            <ul className="space-y-2.5">
              {MISSION_BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground/70">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-card rounded-xl border border-border shadow-card p-6 relative overflow-hidden group hover:shadow-card-hover transition-all"
              data-ocid={`values.item.${i + 1}`}
            >
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30 rounded-b-xl" />
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors">
                <val.icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-white text-sm mb-2">{val.title}</h4>
              <p className="text-xs text-foreground/60 leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const BG_COLORS = [
    "from-zinc-600 to-zinc-800",
    "from-neutral-500 to-neutral-700",
    "from-stone-500 to-stone-700",
    "from-slate-500 to-slate-700",
  ];

  return (
    <section id="team" className="bg-section-blue py-20">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
              Our People
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Meet Our Leadership Team
          </h2>
          <p className="text-foreground/60 mt-3 max-w-xl mx-auto">
            Experienced professionals dedicated to delivering exceptional HR
            solutions for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
              data-ocid={`team.item.${i + 1}`}
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${BG_COLORS[i]} flex items-center justify-center mb-4 shadow-md`}
                >
                  <span className="text-white font-bold text-xl">
                    {member.initials}
                  </span>
                </div>
                <h4 className="font-bold text-white text-base">
                  {member.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 mb-4">
                  {member.role}
                </p>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-3 h-3 text-white" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              <div className="h-1 bg-white/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    message: "",
  });
  const { mutate, isPending, isSuccess, isError } = useSubmitContactForm();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        toast.success("Message sent successfully! We'll be in touch shortly.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          companyName: "",
          message: "",
        });
      },
      onError: () => {
        toast.error("Failed to send message. Please try again.");
      },
    });
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
              Get In Touch
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Contact Us
          </h2>
          <p className="text-foreground/60 mt-3 max-w-xl mx-auto">
            Ready to transform your HR operations? Reach out to us and we'll get
            back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 bg-card rounded-2xl border border-border shadow-card p-8">
            <h3 className="text-xl font-bold text-white mb-6">
              Send Us a Message
            </h3>
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              data-ocid="contact.panel"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground/80"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-border focus:ring-white/30 bg-muted text-white placeholder:text-foreground/40"
                    data-ocid="contact.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground/80"
                  >
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-border focus:ring-white/30 bg-muted text-white placeholder:text-foreground/40"
                    data-ocid="contact.input"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-foreground/80"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-border focus:ring-white/30 bg-muted text-white placeholder:text-foreground/40"
                    data-ocid="contact.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="companyName"
                    className="text-sm font-medium text-foreground/80"
                  >
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Your Company Ltd."
                    value={formData.companyName}
                    onChange={handleChange}
                    className="border-border focus:ring-white/30 bg-muted text-white placeholder:text-foreground/40"
                    data-ocid="contact.input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground/80"
                >
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your HR requirements..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="border-border focus:ring-white/30 bg-muted text-white placeholder:text-foreground/40 resize-none"
                  data-ocid="contact.textarea"
                />
              </div>

              {isSuccess && (
                <div
                  className="flex items-center gap-2 p-3 bg-white/10 border border-white/20 rounded-lg"
                  data-ocid="contact.success_state"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span className="text-sm text-white font-medium">
                    Message sent successfully!
                  </span>
                </div>
              )}

              {isError && (
                <div
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                  data-ocid="contact.error_state"
                >
                  <X className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-400 font-medium">
                    Failed to send. Please try again.
                  </span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full rounded-full bg-white hover:bg-white/90 text-black font-bold py-3 text-sm"
                data-ocid="contact.submit_button"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-card rounded-2xl border border-border shadow-card p-6">
              <h3 className="text-lg font-bold text-white mb-5">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Office Address
                    </p>
                    <p className="text-sm text-foreground/60 mt-0.5">
                      Noida, Uttar Pradesh, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Email Us</p>
                    <p className="text-sm text-foreground/60 mt-0.5">
                      info@qrconnect.in
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Call Us</p>
                    <p className="text-sm text-foreground/60 mt-0.5">
                      +91 98765 43210
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working hours */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="font-bold text-white mb-4">Business Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Monday – Friday</span>
                  <span className="font-medium text-white">
                    9:00 AM – 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Saturday</span>
                  <span className="font-medium text-white">
                    10:00 AM – 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Sunday</span>
                  <span className="text-foreground/40">Closed</span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-border">
                <p className="text-xs text-foreground/50">
                  Response time: within 24 business hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-footer text-white">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/assets/uploads/QR-Connect-Logo-1.png"
                alt="QR Connect"
                className="w-10 h-10 object-contain"
              />
              <span className="font-bold text-white text-lg">QR Connect</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              HR Services &amp; Consulting — AI-powered solutions for modern
              businesses.
            </p>
            <p className="text-white/50 text-xs flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Noida, Uttar Pradesh, India
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href.replace("#", ""));
                    }}
                    data-ocid="nav.link"
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((svc) => (
                <li key={svc.title}>
                  <span className="text-white/60 text-sm">{svc.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/50 text-xs text-center">
            &copy; {year} QR Connect – HR Services &amp; Consulting. All Rights
            Reserved.
          </p>
          <p className="text-white/40 text-xs">
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <HRImagesSection />
        <VisionMissionValues />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-right" />
      <AppContent />
    </QueryClientProvider>
  );
}

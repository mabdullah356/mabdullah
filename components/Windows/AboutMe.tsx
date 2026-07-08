"use client";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Twitter, Code2, Globe, Server, Database, Cpu, Search, MapPin, Mail, Phone } from "lucide-react";

const skills = [
  { icon: <Code2 size={18} />, name: "React 19 / Next.js", level: 98 },
  { icon: <Server size={18} />, name: "Node.js / Express v5", level: 95 },
  { icon: <Database size={18} />, name: "MongoDB / PostgreSQL", level: 92 },
  { icon: <Cpu size={18} />, name: "MERN Stack Architecture", level: 96 },
  { icon: <Globe size={18} />, name: "TypeScript / JavaScript", level: 94 },
  { icon: <Search size={18} />, name: "Technical SEO / Performance", level: 88 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutMe() {
  return (
    <motion.div
      className="p-6 h-full overflow-y-auto bg-[#0a0a0f]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-3xl mx-auto space-y-12 py-8">
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-2xl relative group"
              style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}>
              <div className="w-full h-full flex items-center justify-center text-7xl select-none group-hover:scale-110 transition-transform duration-500">👨‍💻</div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-[#0a0a0f] shadow-lg animate-pulse" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <motion.div variants={itemVariants} className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
              Available for new projects
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl font-bold text-white mb-2 tracking-tight">
              Muhammad Abdullah
            </motion.h1>
            <div className="text-xl text-blue-400 font-mono mb-6 h-8">
              <TypeAnimation
                sequence={[
                  "MERN Stack Architect", 2000,
                  "Full-Stack Developer", 2000,
                  "UI/UX Visualist", 2000,
                  "Problem Solver", 2000
                ]}
                repeat={Infinity}
                speed={50}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/50 text-sm mb-8">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin size={16} className="text-blue-500" /> Faisalabad, Pakistan
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail size={16} className="text-purple-500" /> abdullahworld111@gmail.com
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Phone size={16} className="text-green-500" /> +92 315 6215289
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Globe size={16} className="text-yellow-500" /> English, Urdu
              </div>
            </div>

            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl">
              I'm a passionate full-stack developer who transforms ideas into exceptional digital experiences. With expertise in modern web technologies and a keen eye for design, I build scalable, user-centric applications that drive business growth. I combine technical excellence with creative problem-solving, ensuring every project not only meets requirements but exceeds expectations.
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              {[
                { icon: <Github size={20} />, href: "https://github.com/mabdullah356", label: "GitHub" },
                { icon: <Linkedin size={20} />, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: <Twitter size={20} />, href: "https://twitter.com", label: "Twitter" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 text-white/70 hover:text-white transition-all hover:-translate-y-1">
                  {s.icon} <span className="text-xs font-semibold">{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
              Core Competencies
            </h2>
            <div className="space-y-5">
              {skills.map((skill, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between text-sm mb-2 px-1">
                    <span className="text-white/80 group-hover:text-white transition-colors flex items-center gap-2">
                      <span className="text-blue-400">{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className="text-white/40 font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
             <div>
               <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                 <div className="w-1.5 h-6 bg-purple-500 rounded-full" />
                 Design Philosophy
               </h2>
               <p className="text-white/50 text-sm leading-relaxed">
                 I believe that great software is more than just clean code. It's about creating an intuitive journey for the user. My approach blends technical robustness with aesthetic precision, using tools like Tailwind CSS and Framer Motion to bring interfaces to life.
               </p>
             </div>
             <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10">
               <h3 className="text-white font-bold mb-2">Want to collaborate?</h3>
               <p className="text-white/40 text-xs mb-4">I'm currently looking for new opportunities to build impactful digital solutions.</p>
               <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors">
                 Get in Touch
               </button>
             </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Zap, Shield, Rocket, BarChart, Users, Cpu, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-zinc-500/20">
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-100 rounded flex items-center justify-center">
              <Zap className="w-5 h-5 text-zinc-950" />
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-100">SyncSphere</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-500">
            <a href="#features" className="hover:text-zinc-100 transition-colors">Features</a>
            <a href="#engine" className="hover:text-zinc-100 transition-colors">Engine</a>
            <a href="#pricing" className="hover:text-zinc-100 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-32 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-12">
              Operational OS for High-Growth Teams
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.95] mb-8 text-zinc-100 tracking-tighter">
              Ship with <br />
              Absolute Focus.
            </h1>
            <p className="text-lg text-zinc-500 mb-12 max-w-xl mx-auto leading-relaxed">
              SyncSphere is a high-performance workspace for elite engineering teams. 
              Real-time synchronization, advanced metrics, and zero-latency collaboration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="px-10 h-12" onClick={() => navigate('/auth')}>
                Start Building
              </Button>
              <Button variant="outline" size="lg" className="px-10 h-12 bg-transparent text-zinc-400 border-zinc-800">
                Read Documentation
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-24 relative"
          >
            <div className="relative z-10 rounded border border-zinc-900 bg-zinc-900/10 p-2 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=1200" 
                alt="Workspace Preview" 
                className="rounded-sm opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -inset-20 bg-zinc-500/5 blur-[120px] rounded-full z-0" />
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-24 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Zap, title: "Operational Streams", desc: "High-frequency task updates that keep your team in perfect sync." },
              { icon: Shield, title: "Zero Trust Security", desc: "Military-grade encryption and granular access control for sensitive work." },
              { icon: BarChart, title: "Precision Metrics", desc: "Real-time analytics on team velocity, sprint load, and delivery risk." },
            ].map((f, i) => (
              <div key={i} className="group">
                <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:bg-zinc-100 group-hover:text-zinc-950 transition-colors">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-100 mb-4">{f.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-xs font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500 mb-12">Trusted by the next generation of giants</h3>
            <div className="flex flex-wrap items-center justify-center gap-16 opacity-30 grayscale contrast-125">
                 <div className="text-3xl font-black italic">LINEAR</div>
                 <div className="text-3xl font-black">NOTION</div>
                 <div className="text-3xl font-black underline">VERCEL</div>
                 <div className="text-3xl font-black tracking-tighter">FIGMA</div>
                 <div className="text-3xl font-black uppercase tracking-widest">STRIPE</div>
            </div>
        </div>
      </section>
    </div>
  );
}

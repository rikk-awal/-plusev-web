"use client";

import { motion } from "motion/react";
import { ArrowRight, Code, Rocket, Search } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      {/* Block 1: Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-linear-to-br from-cream to-white pt-20">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 leading-tight">
              Next-Gen Software for <br />
              <span className="text-secondary-foreground italic font-serif">Forward-Thinking</span> Businesses.
            </h1>
            <p className="text-xl md:text-2xl text-primary/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Crafting bespoke digital solutions that drive innovation, streamline operations, and fuel sustainable growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all flex items-center gap-2">
                Schedule a Call <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-primary text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/5 transition-all">
                Our Work
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Block 2: Process & Expertise */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">From Concept to Code.</h2>
            <div className="w-20 h-1.5 bg-secondary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-8 h-8 text-primary" />,
                title: "Strategic Discovery",
                desc: "We dive deep into your business logic to identify high-value opportunities."
              },
              {
                icon: <Code className="w-8 h-8 text-primary" />,
                title: "Agile Development",
                desc: "Rapid, iterative building using the latest tech stacks to ensure speed and security."
              },
              {
                icon: <Rocket className="w-8 h-8 text-primary" />,
                title: "Scalable Deployment",
                desc: "Launching robust systems designed to grow alongside your user base."
              }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-cream hover:shadow-xl transition-all border border-primary/5"
              >
                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{pillar.title}</h3>
                <p className="text-primary/70 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 3: Trust & Conversion */}
      <section className="py-24 bg-primary text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="flex-1 max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Build the Future?</h2>
              <p className="text-xl text-white/70 mb-10">
                Join innovators across fintech, logistics, and SaaS who have scaled their vision with PlusEV.
              </p>
              <div className="flex flex-wrap gap-8 opacity-40">
                {/* Placeholder for logos */}
                <div className="text-2xl font-bold">FINTECH</div>
                <div className="text-2xl font-bold">SAAS</div>
                <div className="text-2xl font-bold">LOGISTICS</div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md bg-white p-8 rounded-3xl text-primary">
              <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Name" className="w-full p-4 rounded-xl bg-cream border-none focus:ring-2 focus:ring-secondary outline-none" />
                <input type="email" placeholder="Email" className="w-full p-4 rounded-xl bg-cream border-none focus:ring-2 focus:ring-secondary outline-none" />
                <input type="text" placeholder="Project Type" className="w-full p-4 rounded-xl bg-cream border-none focus:ring-2 focus:ring-secondary outline-none" />
                <textarea placeholder="Message" rows={4} className="w-full p-4 rounded-xl bg-cream border-none focus:ring-2 focus:ring-secondary outline-none" />
                <button className="w-full bg-primary text-white p-4 rounded-xl font-bold hover:bg-primary/90 transition-all">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-primary border-t border-white/10 text-center text-white/40 text-sm">
        <div className="container">
          © 2026 PlusEV. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
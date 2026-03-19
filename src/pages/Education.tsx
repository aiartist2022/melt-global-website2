import { motion } from 'framer-motion';

const Education = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white pt-24">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-start overflow-hidden px-8 md:px-24">
        <div className="absolute inset-0 bg-neutral-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-3xl"
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            Education designed for <br/><span className="italic text-white/80">long-term growth.</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium tracking-wide text-white/70 text-balance">
            Empowering institutions and individuals through structured global education pathways.
          </p>
        </motion.div>
      </section>

      {/* What We Provide */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Curriculum Licensing", desc: "Implementing globally recognized educational blueprints tailored to local context." },
            { title: "Learning Experiences", desc: "Immersive workshops, global excursions, and real-world educational scenarios." },
            { title: "Homestays", desc: "Connecting students cross-culturally with trusted international programs." }
          ].map((service, i) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="px-8 py-16 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 mb-8 flex items-center justify-center font-serif text-2xl font-bold">0{i+1}</div>
              <h3 className="font-serif text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-white/60 font-medium leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8 border-t border-white/20 pt-32">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">Ready to reshape your growth?</h2>
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <a href="https://meltedu.com" target="_blank" rel="noreferrer" className="bg-white text-black px-12 py-5 uppercase tracking-widest text-sm font-bold rounded-full hover:bg-white/80 transition-transform active:scale-95">
              Visit MeltEdu.com
            </a>
            <button className="border border-white/30 text-white px-12 py-5 uppercase tracking-widest text-sm font-bold rounded-full hover:bg-white/10 transition-transform active:scale-95">
              Enquire About Programs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;

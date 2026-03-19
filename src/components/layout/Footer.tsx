import { Link } from 'react-router-dom';
import { ArrowUp, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-white text-black py-20 px-8 relative z-10 w-full mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Column 1: Links & Policy Pages */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Link to="/live" className="hover:opacity-60 transition-opacity uppercase tracking-widest text-sm font-semibold">MELT Live</Link>
            <Link to="/media" className="hover:opacity-60 transition-opacity uppercase tracking-widest text-sm font-semibold">MELT Media</Link>
            <Link to="/edu" className="hover:opacity-60 transition-opacity uppercase tracking-widest text-sm font-semibold">Melt Education</Link>
            <Link to="/about" className="hover:opacity-60 transition-opacity uppercase tracking-widest text-sm font-semibold">About</Link>
            <Link to="/contact" className="hover:opacity-60 transition-opacity uppercase tracking-widest text-sm font-semibold">Contact</Link>
          </div>
          <div className="flex flex-col gap-2 text-xs text-black/60 pt-4 border-t border-black/10 mt-2">
            <Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-black transition-colors">Terms & Conditions</Link>
            <Link to="/cookie" className="hover:text-black transition-colors">Cookie Policy</Link>
          </div>
        </div>

        {/* Column 2: Center Logo */}
        <div className="flex items-start md:items-center justify-start md:justify-center md:col-span-2">
          <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
            <img src="/Melt-Global-V-White.png" alt="Melt Global" className="h-[90px] w-auto object-contain brightness-0" />
          </Link>
        </div>

        {/* Column 3: Locations & Socials */}
        <div className="flex flex-col gap-6 font-sans">
          <div>
             <p className="text-sm leading-relaxed mb-4 text-black/80 text-balance">From the Middle East to the United States, our teams are strategically positioned in key global hubs:</p>
             <ul className="text-sm flex flex-col gap-2 font-medium">
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> UAE: Abu Dhabi · Dubai · Sharjah · Ajman</li>
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Qatar: Doha</li>
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> KSA: Riyadh</li>
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> USA: Atlanta</li>
             </ul>
          </div>
          <div className="flex gap-4 pt-4 border-t border-black/10">
            <a href="https://facebook.com/meltglobalofficial" target="_blank" rel="noreferrer" className="p-3 bg-black/5 hover:bg-black/10 rounded-full transition-colors"><Facebook size={18} /></a>
            <a href="https://instagram.com/meltglobalofficial" target="_blank" rel="noreferrer" className="p-3 bg-black/5 hover:bg-black/10 rounded-full transition-colors"><Instagram size={18} /></a>
            <a href="https://linkedin.com/company/melt-live" target="_blank" rel="noreferrer" className="p-3 bg-black/5 hover:bg-black/10 rounded-full transition-colors"><Linkedin size={18} /></a>
            <a href="https://tiktok.com/@meltglobalofficial" target="_blank" rel="noreferrer" className="p-3 bg-black/5 hover:bg-black/10 rounded-full transition-colors"><MessageCircle size={18} /></a>
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row items-center justify-between pt-8 border-t border-black/20 text-xs tracking-widest text-black/60 uppercase">
        <p>© 2026 MELT GLOBAL Powered by MELT GLOBAL</p>
        <button onClick={scrollToTop} className="p-3 bg-black text-white hover:bg-black/80 transition-transform active:scale-95 rounded-full" aria-label="Back to Top">
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;

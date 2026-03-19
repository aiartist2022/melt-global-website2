import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/live', label: 'MELT Live' },
  { href: '/media', label: 'MELT Media' },
  { href: '/edu', label: 'Melt Education' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
        <Link to="/" className="z-50 mix-blend-difference">
          <img src="/Melt-Global-V-White.png" alt="Melt Global" className="h-10 md:h-12 w-auto object-contain" />
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="z-50 p-2 hover:opacity-70 transition-opacity mix-blend-difference text-white"
          aria-label="Open Menu"
        >
          <Menu size={32} strokeWidth={1.5} />
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // smooth spring-like ease
            className="fixed inset-0 z-[60] bg-black text-white flex flex-col justify-center items-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-2 hover:opacity-70 transition-opacity"
              aria-label="Close Menu"
            >
              <X size={32} strokeWidth={1.5} />
            </button>
            
            <div className="absolute top-8 left-8">
              <Link to="/" className="font-serif font-bold text-xl tracking-widest leading-none">
                MELT<br />GLOBAL
              </Link>
            </div>

            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                >
                  <Link
                    to={link.href}
                    className="font-serif text-4xl md:text-6xl hover:text-white/60 transition-colors uppercase tracking-wide"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

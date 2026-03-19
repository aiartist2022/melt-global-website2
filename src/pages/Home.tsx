import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      const frameCount = 901;
      const currentFrame = (index: number) => 
        `/hero-sequence/${(index + 1).toString().padStart(5, '0')}.jpg`;

      const images: HTMLImageElement[] = [];
      const imageSeq = { frame: 0 };

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
      }

      const render = () => {
        if (!context || !canvas) return;
        const img = images[imageSeq.frame];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        // Auto-scale drawing to mimic object-fit: cover
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          img, 
          0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
      };

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
      };
      
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      images[0].onload = render;

      // Bind the image sequence to the ENTIRE page scroll!
      ScrollTrigger.create({
        trigger: mainContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1, // extremely smooth scrub
        animation: gsap.to(imageSeq, {
          frame: frameCount - 1,
          snap: 'frame',
          ease: 'none',
          onUpdate: render,
        }),
      });

      // Fade-in animations for the content blocks as you scroll down
      gsap.utils.toArray<HTMLElement>('.fade-up-element').forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 50 }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
               trigger: el,
               start: "top 80%",
               toggleActions: "play none none reverse"
            }
          }
        );
      });

      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }, mainContainerRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <div ref={mainContainerRef} className="w-full relative text-white bg-black">
      
      {/* Fixed Full-Screen Canvas Background */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        <canvas 
          ref={canvasRef}
          className="w-full h-full object-cover opacity-100 transition-opacity"
          style={{ willChange: 'contents' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
      </div>

      {/* Scrolling Content - Aligned and spaced perfectly */}
      <div className="relative z-10 flex flex-col">
        
        {/* Section 1: Hero Typography */}
        <section className="h-screen w-full flex flex-col justify-center items-center text-center px-6 mix-blend-lighten fade-up-element">
          <h1 className="font-serif text-5xl md:text-8xl font-bold mb-8 tracking-tight text-balance leading-tight">
            Creating a Culture <br/><span className="italic font-light">Without Borders</span>
          </h1>
        </section>

        {/* Section 2: Intro */}
        <section className="min-h-screen w-full flex items-center py-32 px-8 fade-up-element">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 w-full">
            <div className="md:w-1/2">
              <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight drop-shadow-2xl">
                Original experiences, festivals, and live moments that bring people together.
              </h2>
            </div>
            <div className="md:w-1/2 flex flex-col justify-end">
              <p className="text-xl md:text-3xl font-medium tracking-wide text-white/90 leading-relaxed text-balance drop-shadow-xl glass-card p-8 border-white/10">
                MELT is a global cultural platform that creates original IP events and delivers impact through media, live experiences, and tailored education. 
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: The Ecosystem */}
        <section className="min-h-[120vh] w-full flex flex-col justify-center py-32 px-8 mb-8 fade-up-element">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="font-serif text-center text-4xl md:text-7xl font-bold mb-24 drop-shadow-2xl">The Ecosystem</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <Link to="/live" className="group block h-[500px] glass p-10 flex flex-col justify-between hover:bg-white/10 transition-colors overflow-hidden relative rounded-[2.5rem] border border-white/20">
                <div className="relative z-10">
                  <img src="/Melt-Live-White.png" alt="Melt Live" className="h-16 w-auto object-contain mb-8" />
                  <p className="text-lg text-white/80 font-medium">Original IP, festivals, and global live cultural moments.</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors relative z-10 font-bold">
                  →
                </div>
              </Link>

              {/* Card 2 */}
              <Link to="/media" className="group block h-[500px] glass p-10 flex flex-col justify-between hover:bg-white/10 transition-colors overflow-hidden relative rounded-[2.5rem] border border-white/20">
                <div className="relative z-10">
                  <img src="/Melt-Media-White.png" alt="Melt Media" className="h-12 w-auto object-contain mb-8" />
                  <p className="text-lg text-white/80 font-medium">Strategy, digital ecosystems, and performance-driven marketing.</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors relative z-10 font-bold">
                  →
                </div>
              </Link>

              {/* Card 3 */}
              <Link to="/edu" className="group block h-[500px] glass p-10 flex flex-col justify-between hover:bg-white/10 transition-colors overflow-hidden relative rounded-[2.5rem] border border-white/20">
                <div className="relative z-10">
                  <h3 className="font-serif text-3xl font-bold mb-4">Melt <br/> Education</h3>
                  <p className="text-lg text-white/80 font-medium">Tailored education, long-term growth, and structured curriculum.</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors relative z-10 font-bold">
                  →
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 4: Flagship IPs & Global Footprint */}
        <section className="min-h-screen w-full flex flex-col justify-center items-center text-center py-32 px-8 fade-up-element bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-12 drop-shadow-2xl">We’ll get you in touch with the right people.</h2>
            <Link to="/contact" className="inline-block bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 hover:bg-white/90 transition-all active:scale-95 shadow-2xl">
              Let's Talk
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;

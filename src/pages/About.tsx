import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
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
        `/about-sequence/${(index + 1).toString().padStart(5, '0')}.jpg`;

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
      <div className="relative z-10 flex flex-col pt-24 pb-32">
        
        {/* Hero Section */}
        <section className="min-h-[60vh] w-full flex flex-col items-center justify-center text-center px-6 fade-up-element">
          <div className="max-w-4xl p-8 glass-card rounded-3xl bg-black/40 backdrop-blur-sm border border-white/10">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight drop-shadow-xl">
              We operate as a cultural &amp; strategic platform.
            </h1>
            <p className="text-lg md:text-xl font-medium tracking-wide text-white/80 text-balance max-w-2xl mx-auto drop-shadow-md">
              Designed to orchestrate expression and protect equity across everything we build. MELT bridges East and West through profound cultural integration.
            </p>
          </div>
        </section>

        {/* Vision & Mission Split */}
        <section className="py-32 px-8 w-full fade-up-element">
          <div className="max-w-7xl mx-auto border-y border-white/20 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
              <div className="p-8 rounded-2xl glass-card bg-black/30 hover:bg-black/40 transition-colors">
                <h2 className="uppercase tracking-widest text-sm font-bold text-white/50 mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-white/50"></span> Vision
                </h2>
                <p className="text-3xl font-serif leading-relaxed drop-shadow-lg">
                  To be the most architecturally sound bridge for culture and business across global markets.
                </p>
              </div>
              <div className="p-8 rounded-2xl glass-card bg-black/30 hover:bg-black/40 transition-colors">
                <h2 className="uppercase tracking-widest text-sm font-bold text-white/50 mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-white/50"></span> Mission
                </h2>
                <p className="text-3xl font-serif leading-relaxed text-white/90 drop-shadow-lg">
                  Deliver impact through seamless media execution, breathtaking live experiences, and uncompromised structural educational frameworks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Joint Venture Section */}
        <section className="py-32 px-8 w-full fade-up-element">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="md:w-1/2 p-8 rounded-3xl glass-card bg-black/30 border border-white/10">
              <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8 drop-shadow-2xl">
                OWS Capital <br/><span className="text-white/40 font-light italic">×</span> Steve Harvey Global
              </h2>
              <p className="text-xl text-white/80 leading-relaxed font-medium drop-shadow-md">
                Formed through a strategic joint venture, MELT Global aligns the massive infrastructure network of OWS Capital with the unparalleled reach and cultural equity of Steve Harvey.
              </p>
            </div>
            <div className="md:w-1/2 aspect-video bg-black/40 backdrop-blur-md rounded-[3rem] overflow-hidden relative border border-white/20 shadow-2xl p-10 flex flex-col items-center justify-center">
               <div className="text-center w-full max-w-md">
                   <div className="p-6 border-b border-white/10">
                     <div className="text-3xl font-serif font-bold text-white mb-2 drop-shadow-xl">Steve Harvey</div>
                     <div className="text-sm font-bold text-white/50 uppercase tracking-widest">Co-Founder</div>
                   </div>
                   <div className="p-6">
                     <div className="text-3xl font-serif font-bold text-white mb-2 drop-shadow-xl">Oweis Zahran</div>
                     <div className="text-sm font-bold text-white/50 uppercase tracking-widest">Co-Founder</div>
                   </div>
               </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

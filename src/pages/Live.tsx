import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Live = () => {
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
        `/live-sequence/${(index + 1).toString().padStart(5, '0')}.jpg`;

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
        
        {/* Hero Section */}
        <section className="h-screen w-full flex flex-col justify-center items-center text-center px-6 mix-blend-lighten fade-up-element">
          <h1 className="font-serif text-5xl md:text-8xl font-bold mb-8 tracking-tight text-balance leading-tight">
            Meaningful events. <br/><span className="italic font-light">Real lasting impact.</span>
          </h1>
        </section>

        {/* What We Do */}
        <section className="min-h-[80vh] w-full flex items-center py-32 px-8 fade-up-element">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Original IP Creation", desc: "Building scalable cultural properties from the ground up." },
                { title: "Event Production", desc: "End-to-end orchestration of massive global moments." },
                { title: "Talent Integration", desc: "Connecting global figures with meaningful platforms." },
                { title: "Government Partnerships", desc: "Aligning cultural events with national strategic visions." }
              ].map((service) => (
                <div 
                  key={service.title}
                  className="p-8 border-t border-white/20 hover:border-white transition-colors glass-card"
                >
                  <h3 className="font-serif text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-white/60 font-medium leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Block */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center py-32 px-8 mb-32 fade-up-element">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center w-full glass p-10 rounded-[3rem] border border-white/10">
            <div className="w-full md:w-1/2 aspect-[4/3] bg-zinc-800 rounded-3xl overflow-hidden glass-card" />
            <div className="w-full md:w-1/2">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Steve Harvey Golf Classic</h2>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                A flagship event bridging sports, culture, and business leadership. Bringing global icons to the Middle East to foster authentic connections.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <div className="text-4xl font-serif font-bold mb-2">15k+</div>
                  <div className="text-sm font-medium text-white/50 uppercase tracking-widest">Attendees</div>
                </div>
                <div>
                  <div className="text-4xl font-serif font-bold mb-2">3</div>
                  <div className="text-sm font-medium text-white/50 uppercase tracking-widest">Days of Impact</div>
                </div>
              </div>
              <button className="bg-white text-black px-10 py-4 uppercase tracking-widest text-sm font-bold rounded-full hover:bg-white/80 transition-colors">
                Read Case Study
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Live;

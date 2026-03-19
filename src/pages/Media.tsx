import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Media = () => {
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
        `/media-sequence/${(index + 1).toString().padStart(5, '0')}.jpg`;

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
      <div className="relative z-10 flex flex-col pt-24">
        
        {/* Hero Section */}
        <section className="h-[70vh] w-full flex items-center justify-center text-center px-6 mix-blend-lighten fade-up-element">
          <div className="max-w-5xl">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Extending the life of culture.
            </h1>
            <p className="text-xl md:text-2xl font-medium tracking-wide text-white/70">
              Strategy, digital ecosystems, and performance-driven marketing.
            </p>
          </div>
        </section>

        {/* Capabilities Block */}
        <section className="py-32 px-8 w-full fade-up-element">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-24 text-center">Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['Social Media', 'Paid Media', 'SEO', 'Affiliate', 'UI/UX', 'OOH'].map((service) => (
                <div 
                  key={service}
                  className="p-10 glass-card hover:bg-white/10 transition-colors flex flex-col items-center justify-center text-center h-64 rounded-2xl"
                >
                  <h3 className="font-serif text-3xl font-bold mb-4">{service}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Approach Flow */}
        <section className="py-32 px-8 mb-32 fade-up-element w-full">
          <div className="max-w-7xl mx-auto glass p-10 rounded-[3rem] border border-white/10">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-24 p-4 text-center">Our Approach</h2>
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative p-4">
              <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-white/20" />
              
              {['Strategy', 'Content', 'Distribution', 'Measurement'].map((step, i) => (
                <div key={step} className="relative z-10 bg-black/50 p-6 rounded-2xl md:pr-8 backdrop-blur-md border border-white/5">
                  <div className="text-4xl font-serif font-bold text-white/30 mb-6 drop-shadow-lg">0{i + 1}</div>
                  <h3 className="font-serif text-3xl font-bold mb-4">{step}</h3>
                  <p className="text-white/70 leading-relaxed max-w-[250px]">
                    Curating performance and building long-lasting digital properties that convert audience to advocates.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Media;

import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [inquiryType, setInquiryType] = useState('Event (Live)');

  return (
    <div className="w-full min-h-screen bg-black text-white pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-8">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">Let’s Start the<br/><span className="italic text-white/80">Conversation</span></h1>
          <p className="text-xl text-white/60">We’re ready to build the next global moment together.</p>
        </motion.div>

        {/* Dynamic Form Layout */}
        <div className="flex flex-col md:flex-row gap-16 md:gap-32">
          {/* Left Column: Inquiry Types */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <h3 className="uppercase tracking-widest text-sm font-bold text-white/40 mb-4">Inquiry Type</h3>
            {['Event (Live)', 'Media Services', 'Education Programs', 'Talent', 'Press'].map((type) => (
              <button 
                key={type}
                onClick={() => setInquiryType(type)}
                className={`text-left text-2xl font-serif py-4 border-b transition-colors ${
                  inquiryType === type ? 'border-white text-white' : 'border-white/10 text-white/40 hover:text-white/80'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Right Column: Dynamic Fields */}
          <div className="w-full md:w-2/3">
            <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="text" placeholder="Name" className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-lg" />
                <input type="text" placeholder="Company" className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="email" placeholder="Email" className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-lg" />
                <input type="tel" placeholder="Phone" className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-lg" />
              </div>
              <input type="text" placeholder="Country" className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-lg" />
              
              <textarea 
                placeholder={`Tell us about your ${inquiryType.toLowerCase()} needs...`}
                className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-lg min-h-[150px] resize-none mt-8"
              />

              <button className="bg-white text-black px-12 py-5 uppercase tracking-widest text-sm font-bold rounded-full hover:bg-white/80 transition-transform active:scale-95 self-start mt-8">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

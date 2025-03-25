
import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import { ArrowDown, Zap, Shield, Smile, Send } from 'lucide-react';

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Animation on scroll
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        elements.forEach((el) => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-background z-0"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6 animate-fade-in">
              Beautiful simplicity meets perfect functionality
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Experience the perfect balance of design and purpose in every pixel. Crafted with attention to every detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <a href="#features" className="btn-primary">
                Discover Features
              </a>
              <a href="#contact" className="btn-outline">
                Get in Touch
              </a>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#features" className="text-foreground/60 hover:text-foreground transition-colors">
              <ArrowDown />
              <span className="sr-only">Scroll down</span>
            </a>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16 opacity-0 animate-on-scroll">
            <h2 className="heading-lg mb-4">Designed for Excellence</h2>
            <p className="text-lg text-muted-foreground">
              Our attention to detail and commitment to quality make us different.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="opacity-0 animate-on-scroll">
              <FeatureCard 
                icon={<Zap size={24} />}
                title="Lightning Fast"
                description="Performance optimized to deliver exceptional speed and responsiveness, ensuring your experience is always smooth."
              />
            </div>
            <div className="opacity-0 animate-on-scroll" style={{ animationDelay: '100ms' }}>
              <FeatureCard 
                icon={<Shield size={24} />}
                title="Secure by Design"
                description="Built with security as a foundational principle, ensuring your data and privacy are always protected."
              />
            </div>
            <div className="opacity-0 animate-on-scroll" style={{ animationDelay: '200ms' }}>
              <FeatureCard 
                icon={<Smile size={24} />}
                title="Intuitive Interface"
                description="Thoughtfully designed to be immediately familiar and effortlessly navigable from the first moment."
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="opacity-0 animate-on-scroll">
              <h2 className="heading-lg mb-6">Our Philosophy</h2>
              <p className="text-muted-foreground mb-4">
                We believe that design isn't just about how something looks, but how it works. 
                Our approach combines aesthetics with functionality, creating experiences that 
                delight and perform.
              </p>
              <p className="text-muted-foreground mb-6">
                Every decision we make is focused on creating value for our users, removing 
                complexity and distillation to pure essential elements.
              </p>
              <a href="#" className="btn-primary">Learn Our Story</a>
            </div>
            <div className="opacity-0 animate-on-scroll" style={{ animationDelay: '200ms' }}>
              <div className="aspect-video rounded-lg bg-foreground/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                <span className="text-2xl font-display text-foreground/40">Essence</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-12 opacity-0 animate-on-scroll">
              <h2 className="heading-lg mb-4">Get in Touch</h2>
              <p className="text-muted-foreground">
                Have a question or want to learn more? We'd love to hear from you.
              </p>
            </div>
            
            <form className="space-y-6 opacity-0 animate-on-scroll" style={{ animationDelay: '100ms' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full btn-primary inline-flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;


import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

const CardPreviewSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const navigateToProduct = () => {
    window.location.href = '/product';
  };

  return (
    <section id="preview" ref={sectionRef} className="py-20 lg:py-32 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 slide-in-left">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Here's How Your <span className="gradient-text">Card Will Look</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-lg text-muted-foreground">Your name, title, photo, and company logo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-lg text-muted-foreground">Clickable links to LinkedIn, Instagram, WhatsApp, etc.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-lg text-muted-foreground">"Save Contact" button</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={navigateToProduct}
              size="lg"
              className="btn-hero px-8 py-4 text-lg font-semibold group"
            >
              Start Customizing Yours
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          {/* Right Mobile Image */}
          <div className="relative slide-in-right">
            <div className="relative mx-auto max-w-sm">
              <img 
                src="/lovable-uploads/1df0ad94-f22f-430a-b504-2555a75d2ae8.png" 
                alt="Mobile NFC card interface preview" 
                className="w-full h-auto rounded-3xl shadow-2xl" 
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardPreviewSection;

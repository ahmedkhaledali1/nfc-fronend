import { useEffect, useRef } from 'react';
import { Settings, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });
    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const navigateToProduct = () => {
    window.location.href = '/product';
  };
  const steps = [{
    icon: Settings,
    title: 'We Program It',
    description: 'Your custom info (name, number, links, social) is embedded into your card.',
    color: 'text-blue-400',
    delay: '0s'
  }, {
    icon: Zap,
    title: 'You Tap It',
    description: 'Just tap your card on any NFC-enabled phone (no app needed).',
    color: 'text-yellow-400',
    delay: '0.2s'
  }, {
    icon: Users,
    title: 'They Get Your Info',
    description: 'Instantly open your profile/contact details.',
    color: 'text-green-400',
    delay: '0.4s'
  }];
  return <section id="how-it-works" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            How NFC <span className="gradient-text">Business Cards Work</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple, instant, and professional networking
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => <div key={index} className="fade-in group" style={{
          animationDelay: step.delay
        }}>
              <div className="card-premium p-8 text-center h-full hover:scale-105 transition-all duration-500">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-6">
                  <span className="text-primary font-bold text-lg">{index + 1}</span>
                </div>

                {/* Icon */}
                

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Hover Effect */}
                <div className="mt-6 w-0 h-1 bg-gradient-primary group-hover:w-full transition-all duration-500 mx-auto"></div>
              </div>
            </div>)}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 fade-in" style={{
        animationDelay: '0.6s'
      }}>
          <Button onClick={navigateToProduct} variant="outline" size="lg" className="btn-outline-hero px-8 py-4 text-lg font-semibold">
            See Card Designs →
          </Button>
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;
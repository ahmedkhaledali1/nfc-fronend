import { useEffect, useRef } from 'react';
import { 
  CreditCard, 
  Truck, 
  Palette, 
  Leaf 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhyChooseUsSection = () => {
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

    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: CreditCard,
      title: 'One-time Payment – No subscriptions',
      color: 'text-green-400'
    },
    {
      icon: Truck,
      title: 'Fast Delivery & Setup',
      color: 'text-blue-400'
    },
    {
      icon: Palette,
      title: 'Sleek, Custom Design Options',
      color: 'text-purple-400'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly Alternative to Paper Cards',
      color: 'text-emerald-400'
    }
  ];

  const navigateToProduct = () => {
    window.location.href = '/product';
  };

  return (
    <section id="why-choose-us" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Why Our NFC Cards <span className="gradient-text">Stand Out</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            The premium choice for modern professionals
          </p>
        </div>

        {/* Benefits List */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="fade-in p-6 card-premium group hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-full ${benefit.color} bg-current/10 flex items-center justify-center mb-4`}>
                <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
              </div>

              {/* Hover Effect */}
              <div className="mt-4 w-0 h-1 bg-gradient-primary group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-16 fade-in" style={{ animationDelay: '0.6s' }}>
          <Button 
            onClick={navigateToProduct}
            variant="outline"
            size="lg"
            className="btn-outline-hero px-8 py-4 text-lg font-semibold"
          >
            Browse Card Styles →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
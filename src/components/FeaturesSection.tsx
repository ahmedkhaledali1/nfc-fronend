import { useEffect, useRef } from 'react';
import { 
  Zap, 
  Star, 
  Smartphone, 
  Linkedin, 
  Clock, 
  Award 
} from 'lucide-react';

const FeaturesSection = () => {
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

  const features = [
    {
      icon: Zap,
      title: 'Instant Sharing',
      description: 'Share your contact details instantly with just a tap. No apps required.',
      color: 'text-yellow-400'
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Durable, waterproof design with premium materials that last for years.',
      color: 'text-blue-400'
    },
    {
      icon: Smartphone,
      title: 'Universal Compatibility',
      description: 'Works with almost all smartphones (iPhone & Android) without any setup.',
      color: 'text-green-400'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn Integration',
      description: 'Direct connection to your professional profile for instant networking.',
      color: 'text-blue-600'
    },
    {
      icon: Clock,
      title: 'Always Available',
      description: 'No battery required, works 24/7. Your network is always accessible.',
      color: 'text-purple-400'
    },
    {
      icon: Award,
      title: 'Professional Edge',
      description: 'Stand out with cutting-edge technology that showcases your innovation.',
      color: 'text-orange-400'
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="py-20 lg:py-32 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="gradient-text">NFC Cards</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            The future of professional networking is here
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-premium p-8 h-full hover:scale-105 transition-all duration-500">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${feature.color} bg-current/10`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Border */}
                <div className="mt-6 w-0 h-1 bg-gradient-primary group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">99%</div>
            <div className="text-muted-foreground">Phone Compatibility</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">5 Year</div>
            <div className="text-muted-foreground">Durability Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">0 Sec</div>
            <div className="text-muted-foreground">Setup Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
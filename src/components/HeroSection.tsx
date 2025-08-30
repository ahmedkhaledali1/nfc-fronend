import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { getHome } from '@/lib/service/endpoints';
import { useQuery } from '@tanstack/react-query';
import ImageErrorBoundary from './ImageErrorBoundary';
import SectionErrorBoundary from './SectionErrorBoundary';
import { useErrorHandler } from '@/hooks/useErrorHandler';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { handleImageError } = useErrorHandler();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const elements = sectionRef.current?.querySelectorAll(
      '.fade-in, .slide-in-left, .slide-in-right'
    );
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const navigateToProduct = () => {
    window.location.href = '/product';
  };

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['getHome'],
    queryFn: () => getHome(),
    // onSuccess: (data) => {
    //  },
  });

  const mainProduct = data?.data?.data?.products.find(
    (item) => item.isMainProduct
  );
  const cleanImagePath =
    mainProduct?.cardDesigns[0]?.image || mainProduct?.cardDesigns[1]?.image
      ? mainProduct?.cardDesigns[0]?.image ||
        mainProduct?.cardDesigns[1]?.image
          .replace(/\\/g, '/')
          .replace(/ /g, '%20')
      : null;

  const imageUrl = cleanImagePath
    ? `${import.meta.env.VITE_BACKEND_DOMAIN}${cleanImagePath}`
    : null;
  // console.log('cleanImageUrl:', imageUrl);
  return (
    <SectionErrorBoundary
      sectionName="Hero Section"
      onError={(error, errorInfo) => {
        console.error('Hero Section Error:', error, errorInfo);
      }}
    >
      <section
        id="hero"
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center pt-8 md:pt-16 relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 md:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Image */}
            <div className="relative slide-in-left order-1 lg:order-2">
              <div className="relative z-10">
                <ImageErrorBoundary
                  src={imageUrl ? imageUrl : '/placeholder.svg'}
                  alt={mainProduct?.title || 'NFC business card'}
                  className="w-full h-auto rounded-2xl shadow-2xl max-w-md mx-auto lg:max-w-full"
                  fallbackSrc="/placeholder.svg"
                  onError={(error) => {
                    handleImageError(error, imageUrl);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
                </ImageErrorBoundary>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-primary/20 rounded-full blur-xl animate-bounce delay-300"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 md:w-32 md:h-32 bg-accent/20 rounded-full blur-xl animate-bounce delay-700"></div>
            </div>

            {/* Right Content */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight slide-in-right">
                  {mainProduct?.title}{' '}
                  <span className="gradient-text">{mainProduct?.price}JOD</span>
                </h1>

                <p
                  className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed slide-in-right"
                  style={{
                    animationDelay: '0.2s',
                  }}
                >
                  {mainProduct?.description}
                </p>
              </div>

              <div
                className="slide-in-right"
                style={{
                  animationDelay: '0.4s',
                }}
              >
                <Button
                  onClick={navigateToProduct}
                  size="lg"
                  className="btn-hero px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold group"
                >
                  Get Your NFC Card Now
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div
                className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 pt-2 slide-in-right"
                style={{
                  animationDelay: '0.6s',
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">
                    No monthly fees
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">
                    Works on all phones
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">
                    Free delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionErrorBoundary>
  );
};

export default HeroSection;

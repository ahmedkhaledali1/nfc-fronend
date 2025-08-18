import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import CardPreviewSection from '@/components/CardPreviewSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import { getHome } from '@/lib/service/endpoints';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <CardPreviewSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;

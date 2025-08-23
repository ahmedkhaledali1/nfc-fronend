import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#hero' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu when clicking

    if (location.pathname !== '/') {
      window.location.href = `/${sectionId}`;
      return;
    }

    if (sectionId.startsWith('#')) {
      const element = document.querySelector(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToProduct = () => {
    setIsMobileMenuOpen(false);
    window.location.href = '/product';
  };

  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <div className="bg-background/80 backdrop-blur-xl rounded-2xl shadow-lg border border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="/lovable-uploads/296ec74b-2fbc-4a64-b1a2-e2c9d33b0168.png"
                alt="LinkIt"
                className="h-14 w-auto group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium text-sm"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Desktop Order Now Button */}
            <div className="hidden md:flex items-center">
              <Button onClick={navigateToProduct} className="btn-hero">
                Order Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border mt-4 pt-4 pb-4">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium text-sm py-2"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="pt-2">
                  <Button
                    onClick={navigateToProduct}
                    className="btn-hero w-full"
                  >
                    Order Now
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

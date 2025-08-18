
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Order Now', href: '/product' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  const handleNavigation = (href: string) => {
    if (href.startsWith('/')) {
      window.location.href = href;
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-t from-card to-background border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/296ec74b-2fbc-4a64-b1a2-e2c9d33b0168.png" 
                alt="LinkIt" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Revolutionizing professional networking with premium NFC technology. 
              Share your details instantly, build connections effortlessly.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <MessageCircle className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.href)}
                  className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>info@linkitnfc.com</p>
              <p>+962 79 8002626</p>
              <p>Amman, Jordan</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Get the latest updates on new features and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="btn-hero">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm">
            © 2025 LinkIt Cards. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link to="/bulk-orders" className="hover:text-foreground transition-colors">
              Bulk Orders
            </Link>
            <button className="hover:text-foreground transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-foreground transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

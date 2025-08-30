import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Zap,
  Linkedin,
  Instagram,
  MessageCircle,
  Facebook,
  Twitter,
  Youtube,
  MessageSquare,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getSocialMedia, subscribeToNewsletter } from '@/lib/service/endpoints';
import CustomInput from './form/CustomInput';
import { FormProvider, useForm } from 'react-hook-form';
import SubmitButton from './ui/SubmitButton';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

const Footer = () => {
  const { data: socialMediaData } = useQuery({
    queryKey: ['getSocialMedia'],
    queryFn: () => getSocialMedia(),
  });

  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: (data: any) => subscribeToNewsletter(data),
    onSuccess: () => {
      methods.reset();
      toast.success('Subscribed to newsletter');
    },
  });
  const schema = z.object({
    email: z.string().email(),
  });
  const methods = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(data: any) {
    subscribe(data);
  }

  const socialMediaItems = socialMediaData?.data?.data?.data || [];

  const getPlatformIcon = (platformIcon: string) => {
    const platformLower = platformIcon.toLowerCase();
    switch (platformLower) {
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'whatsapp':
        return <MessageSquare className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      default:
        return <MessageCircle className="w-5 h-5" />;
    }
  };

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
              Revolutionizing professional networking with premium NFC
              technology. Share your details instantly, build connections
              effortlessly.
            </p>
            <div className="flex space-x-4">
              {socialMediaItems
                .filter((item: any) => item.isActive)
                .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
                .map((item: any) => (
                  <a
                    key={item._id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    title={item.platformDisplayName}
                  >
                    {getPlatformIcon(item.platformIcon)}
                  </a>
                ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Quick Links
            </h3>
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
            <h3 className="text-lg font-semibold text-foreground">
              Stay Updated
            </h3>
            <p className="text-muted-foreground text-sm">
              Get the latest updates on new features and exclusive offers.
            </p>
            <form
              className="flex space-x-2"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <FormProvider {...methods}>
                <CustomInput
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  required
                />
                <SubmitButton disabled={isPending} className=" !h-[40px]">
                  {isPending ? 'Subscribing...' : 'Subscribe'}
                </SubmitButton>
              </FormProvider>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm">
            © 2025 LinkIt Cards. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            {/* Payment Methods */}
            <div className="flex items-center space-x-3">
              <span className="text-xs text-muted-foreground">We Accept:</span>
              <div className="flex space-x-2">
                <img src="/visa.svg" alt="Visa" className="w-12 h-8" />
                <img
                  src="/master-card.png"
                  alt="MasterCard"
                  className="w-12 h-8"
                />
              </div>
            </div>

            {/* Links */}
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link
                to="/bulk-orders"
                className="hover:text-foreground transition-colors"
              >
                Bulk Orders
              </Link>
              <Link
                to="/privacy-policy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/delivery-policy"
                className="hover:text-foreground transition-colors"
              >
                Delivery Policy
              </Link>
              <Link
                to="/cancellation-policy"
                className="hover:text-foreground transition-colors"
              >
                Cancellation Policy
              </Link>
              <Link
                to="/refund-policy"
                className="hover:text-foreground transition-colors"
              >
                Refund Policy
              </Link>
              <Link
                to="/refund-policy"
                className="hover:text-foreground transition-colors"
              >
                Refund Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

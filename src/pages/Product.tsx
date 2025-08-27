import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Star,
  Shield,
  Truck,
  Clock,
  Check,
  Phone,
  Mail,
  Linkedin,
  Instagram,
  MessageCircle,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderModal from '@/pages/order/OrderModal';
const nfcCardBlack =
  '/lovable-uploads/9b0a0180-d418-446a-95cf-ba999077dfa0.png';
import nfcCardWhite from '@/assets/nfc-card-white.jpg';
import { useQuery } from '@tanstack/react-query';
import { getOneProduct } from '@/lib/service/endpoints';

const Product = () => {
  const [selectedColor, setSelectedColor] = useState('black');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['getOneProduct'],
    queryFn: () => getOneProduct('689f857545ca4e292e013f13'),
    // onSuccess: (data) => {
    //  },
  });

  // console.log('data', data);

  interface CardDesign {
    color: string;
    image: string;
    _id: string;
  }

  interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    isMainProduct: boolean;
    cardDesigns: CardDesign[];
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  const product = data?.data?.data?.data as Product | undefined;

  const colors =
    product?.cardDesigns?.map((design) => ({
      id: design.color.toLowerCase(),
      name: design.color.charAt(0).toUpperCase() + design.color.slice(1),
      color: design.color,
    })) || [];

  const cleanImagePath = (path: string) => {
    return path
      .replace(/\\/g, '/') // fix slashes
      .replace(/ /g, '%20'); // encode spaces
  };

  const productImages =
    product?.cardDesigns?.reduce((acc, design) => {
      return {
        ...acc,
        [design.color.toLowerCase()]: `${
          import.meta.env.VITE_BACKEND_DOMAIN
        }${cleanImagePath(design.image)}`,
      };
    }, {}) || {};
  const features = [
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'Durable, waterproof design with premium materials',
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Fast and free delivery across Jordan',
    },
    {
      icon: Clock,
      title: 'Ready in 5 Minutes',
      description: 'Quick setup process, no technical knowledge required',
    },
  ];
  const navigateToBulkOrders = () => {
    window.location.href = '/bulk-orders';
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Product Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Product Images */}
            <div className="space-y-6">
              <div className="aspect-square bg-card rounded-2xl p-8 flex items-center justify-center border">
                <img
                  src={productImages[selectedColor] || nfcCardBlack}
                  alt={`NFC Business Card - ${selectedColor}`}
                  className="w-full h-full object-contain rounded-xl"
                  crossOrigin="anonymous"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex space-x-4">
                {Object.entries(productImages).map(
                  ([color, image]: [string, string]) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition-all duration-300 ${
                        selectedColor === color
                          ? 'border-primary shadow-lg scale-105'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${color} variant`}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {product?.title || 'Premium'}{' '}
                  <span className="gradient-text">NFC Business Card</span>
                </h1>

                <div className="text-4xl font-bold text-primary mb-6">
                  {product?.price || 35} JOD
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product?.description ||
                    'Share your contact details instantly with just a tap. Our premium NFC business card transfers your LinkedIn, phone, email, and more to any smartphone without any apps. Professional networking has never been this effortless.'}
                </p>
              </div>

              {/* Color Selector */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Choose Your Color</h3>
                <div className="flex space-x-4">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedColor === color.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div
                        style={{ backgroundColor: color.color }}
                        className={`w-6 h-6 rounded-full border-2 border-border`}
                      ></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => setIsOrderModalOpen(true)}
                size="lg"
                className="btn-hero w-full md:w-auto px-12 py-4 text-lg font-semibold group"
              >
                Order Now - {product?.price || 35} JOD
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>

              {/* Features */}
              <div className="grid gap-4 pt-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Side-by-Side Features Section */}
      <section className="py-8 bg-card/30 border-t border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 relative">
            {/* Vertical Separator Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/50 transform -translate-x-1/2 hidden md:block"></div>

            {/* What's Included */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-center mb-4">
                What's <span className="gradient-text">Included</span>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">Premium NFC Card</p>
                    <p className="text-xs text-muted-foreground">
                      Durable, waterproof design
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">Contact Integration</p>
                    <p className="text-xs text-muted-foreground">
                      Phone, email, address
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Linkedin className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">Social Links</p>
                    <p className="text-xs text-muted-foreground">
                      LinkedIn, Instagram, WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-center mb-4">
                How It <span className="gradient-text">Works</span>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">Order & Customize</p>
                    <p className="text-xs text-muted-foreground">
                      Choose design, add your details
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">Tap to Share</p>
                    <p className="text-xs text-muted-foreground">
                      Tap on any smartphone
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">Instant Connection</p>
                    <p className="text-xs text-muted-foreground">
                      Contact details appear instantly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Bulk Order Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              Running a Business? Need Custom or{' '}
              <span className="gradient-text">Bulk NFC Cards</span>?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              We work directly with companies, startups, and corporate teams to
              provide customized NFC business cards in bulk — fast turnaround,
              custom branding, and competitive pricing for your entire team.
            </p>

            <Button
              onClick={navigateToBulkOrders}
              size="lg"
              className="btn-hero px-8 py-4 text-lg font-bold group"
            >
              Request a Bulk Order
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </section>

      {/* Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedColor={selectedColor}
        product={product}
      />

      <Footer />
    </div>
  );
};
export default Product;

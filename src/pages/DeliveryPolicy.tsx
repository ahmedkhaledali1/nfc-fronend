import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Truck,
  Clock,
  MapPin,
  Package,
  AlertTriangle,
  CheckCircle,
  Globe,
  Phone,
} from 'lucide-react';

const DeliveryPolicy = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Delivery Policy & Methods</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn about our delivery options, shipping times, and delivery
              policies for your NFC card orders.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Delivery Methods */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Delivery Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-semibold">Standard Delivery</h4>
                        <p className="text-muted-foreground text-sm">
                          5-7 business days
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Free for orders over $50
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        ⚡
                      </div>
                      <div>
                        <h4 className="font-semibold">Express Delivery</h4>
                        <p className="text-muted-foreground text-sm">
                          2-3 business days
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Additional $15 fee
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        🚀
                      </div>
                      <div>
                        <h4 className="font-semibold">Rush Delivery</h4>
                        <p className="text-muted-foreground text-sm">
                          Next business day
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Additional $25 fee
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        🌍
                      </div>
                      <div>
                        <h4 className="font-semibold">International</h4>
                        <p className="text-muted-foreground text-sm">
                          7-14 business days
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Additional $20 fee
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Production & Shipping Timeline */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Production & Shipping Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Order Processing</h4>
                      <p className="text-muted-foreground">
                        Order confirmation and payment verification (1-2
                        business days)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Production</h4>
                      <p className="text-muted-foreground">
                        NFC card manufacturing and quality control (3-5 business
                        days)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Shipping</h4>
                      <p className="text-muted-foreground">
                        Package preparation and dispatch (1 business day)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold">Delivery</h4>
                      <p className="text-muted-foreground">
                        Transit time based on selected delivery method
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Custom designs may require additional
                    production time. Rush orders are prioritized in our
                    production queue.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Areas */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Delivery Areas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">
                      Local Delivery (Jordan)
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Amman - Free standard delivery</li>
                      <li>Zarqa, Irbid, Salt - $5 delivery fee</li>
                      <li>Other cities - $8 delivery fee</li>
                      <li>Remote areas - $12 delivery fee</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      International Delivery
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>GCC Countries - $15 delivery fee</li>
                      <li>Middle East - $20 delivery fee</li>
                      <li>Europe - $25 delivery fee</li>
                      <li>Other regions - $30 delivery fee</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>International Orders:</strong> Additional customs
                    duties and taxes may apply based on your country's import
                    regulations.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Package Protection */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Package Protection & Handling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">Packaging Standards</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Cards packaged in protective sleeves</li>
                      <li>Rigid cardboard packaging to prevent bending</li>
                      <li>Bubble wrap for additional protection</li>
                      <li>Waterproof packaging for international shipments</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Insurance Coverage</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>All packages insured up to $100</li>
                      <li>
                        Additional insurance available for high-value orders
                      </li>
                      <li>Full replacement for damaged items</li>
                      <li>Tracking number provided for all shipments</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Issues */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Delivery Issues & Solutions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">Common Issues</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Package not delivered within expected timeframe</li>
                      <li>Damaged package upon delivery</li>
                      <li>Incorrect delivery address</li>
                      <li>Missing tracking information</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">What We Do</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Investigate delivery issues within 24 hours</li>
                      <li>Provide replacement for damaged items</li>
                      <li>Reship to correct address if needed</li>
                      <li>
                        Offer refund or store credit for undelivered packages
                      </li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Important:</strong> Please inspect your package
                      upon delivery and report any issues within 48 hours for
                      immediate assistance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Confirmation */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Delivery Confirmation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">Tracking Information</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Tracking number sent via email upon shipment</li>
                      <li>Real-time tracking updates available</li>
                      <li>SMS notifications for delivery status</li>
                      <li>Delivery confirmation email</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Signature Requirements
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Signature required for orders over $100</li>
                      <li>Optional signature for all other orders</li>
                      <li>Authorized pickup available with ID</li>
                      <li>Redelivery attempts if recipient unavailable</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* International Shipping */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  International Shipping
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">Shipping Partners</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>DHL Express for premium international shipping</li>
                      <li>FedEx for reliable global delivery</li>
                      <li>Local postal services for cost-effective options</li>
                      <li>Regional couriers for specific areas</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Customs & Duties</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Import duties vary by country</li>
                      <li>Taxes calculated based on destination</li>
                      <li>Customs clearance assistance provided</li>
                      <li>Documentation included with shipment</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Restricted Areas:</strong> We do not ship to
                      countries with import restrictions on electronic devices
                      or NFC technology.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you have questions about delivery or need assistance with
                  your order, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    Email:{' '}
                    <a
                      href="mailto:info@linkitnfc.com"
                      className="text-primary hover:underline"
                    >
                      info@linkitnfc.com
                    </a>
                  </p>
                  <p>
                    Phone:{' '}
                    <a
                      href="tel:+962798002626"
                      className="text-primary hover:underline"
                    >
                      +962 79 8002626
                    </a>
                  </p>
                  <p>Address: Amman, Jordan</p>
                  <p className="text-sm mt-4">
                    <strong>Business Hours:</strong> Sunday - Thursday, 9:00 AM
                    - 6:00 PM (Jordan Time)
                  </p>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg mt-4">
                    <p className="text-sm text-green-800">
                      <strong>Customer Support:</strong> Our delivery team is
                      available to assist with tracking, delivery issues, and
                      order status inquiries.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DeliveryPolicy;

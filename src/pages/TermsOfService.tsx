import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FileText,
  Scale,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
} from 'lucide-react';

const TermsOfService = () => {
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
              <span className="gradient-text">Terms of Service</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Please read these terms carefully before using our services or
              placing an order.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Acceptance of Terms */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  By accessing and using LinkIt NFC Cards services, you accept
                  and agree to be bound by the terms and provision of this
                  agreement. If you do not agree to abide by the above, please
                  do not use this service.
                </p>
              </CardContent>
            </Card>

            {/* Services Description */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Services Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  LinkIt NFC Cards provides NFC-enabled business cards and
                  related services including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Custom NFC business card design and production</li>
                  <li>Bulk order processing for corporate clients</li>
                  <li>Digital profile setup and management</li>
                  <li>Shipping and delivery services</li>
                  <li>Customer support and technical assistance</li>
                </ul>
              </CardContent>
            </Card>

            {/* Ordering and Payment */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scale className="w-5 h-5 mr-2" />
                  Ordering and Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Order Process</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>
                      All orders are subject to acceptance and availability
                    </li>
                    <li>Prices are subject to change without notice</li>
                    <li>Payment is required at the time of order placement</li>
                    <li>Orders are processed in the order they are received</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Payment Terms</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>
                      We accept major credit cards and digital payment methods
                    </li>
                    <li>
                      All payments are processed securely through trusted
                      payment gateways
                    </li>
                    <li>
                      Prices are quoted in Jordanian Dinar (JOD) unless
                      otherwise stated
                    </li>
                    <li>
                      Taxes and shipping fees will be clearly displayed before
                      checkout
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Shipping and Delivery */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Shipping and Delivery
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Delivery Timeline</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Standard orders: 3-5 business days</li>
                    <li>Bulk orders: 7-10 business days</li>
                    <li>Custom designs may require additional time</li>
                    <li>
                      Delivery times may vary based on location and order volume
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Shipping Policy</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Free delivery within Jordan for orders above 50 JOD</li>
                    <li>International shipping available at additional cost</li>
                    <li>Tracking information provided for all shipments</li>
                    <li>Risk of loss transfers to customer upon delivery</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Returns and Refunds */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Returns and Refunds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Return Policy</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Returns accepted within 14 days of delivery</li>
                    <li>Items must be unused and in original packaging</li>
                    <li>Custom or personalized items are non-refundable</li>
                    <li>
                      Return shipping costs are the responsibility of the
                      customer
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Refund Process</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Refunds processed within 5-7 business days</li>
                    <li>Original payment method will be credited</li>
                    <li>Processing fees may be deducted from refunds</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  User Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  By using our services, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide accurate and complete information</li>
                  <li>Use the services only for lawful purposes</li>
                  <li>
                    Not attempt to reverse engineer or copy our technology
                  </li>
                  <li>Respect intellectual property rights</li>
                  <li>
                    Not use the services to transmit harmful or offensive
                    content
                  </li>
                  <li>Maintain the security of your account information</li>
                </ul>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  LinkIt NFC Cards shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages,
                  including without limitation, loss of profits, data, use,
                  goodwill, or other intangible losses, resulting from your use
                  of the service.
                </p>
                <p className="text-muted-foreground">
                  Our total liability to you for any claims arising from the use
                  of our services shall not exceed the amount paid by you for
                  the specific service in question.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time.
                  Changes will be effective immediately upon posting on our
                  website. Your continued use of our services after changes are
                  posted constitutes acceptance of the new terms.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please
                  contact us:
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
                  <p>Phone: +962 79 8002626</p>
                  <p>Address: Amman, Jordan</p>
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

export default TermsOfService;

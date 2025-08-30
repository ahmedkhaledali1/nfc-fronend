import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RefreshCw,
  Clock,
  CreditCard,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';

const RefundPolicy = () => {
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
              <span className="gradient-text">Refund Policy</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We want you to be completely satisfied with your NFC card order.
              Learn about our refund process and conditions.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Refund Eligibility */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Refund Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Eligible for Refund</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Defective or damaged cards upon delivery</li>
                    <li>Incorrect card design due to our error</li>
                    <li>Orders cancelled before production begins</li>
                    <li>Shipping delays beyond our control (partial refund)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Not Eligible for Refund
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Change of mind after production starts</li>
                    <li>Incorrect information provided by customer</li>
                    <li>Custom designs approved by customer</li>
                    <li>Bulk orders with custom specifications</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Refund Process */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Refund Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Contact Support</h4>
                      <p className="text-muted-foreground">
                        Email us at info@linkitnfc.com with your order number
                        and reason for refund
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Review & Approval</h4>
                      <p className="text-muted-foreground">
                        We'll review your request within 2-3 business days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Refund Processing</h4>
                      <p className="text-muted-foreground">
                        Once approved, refunds are processed within 5-10
                        business days
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Refund Timeline */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Refund Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Processing Time</h3>
                    <p className="text-muted-foreground">
                      2-3 business days for review and approval
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Refund Time</h3>
                    <p className="text-muted-foreground">
                      5-10 business days to appear in your account
                    </p>
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Refund timing may vary depending on
                    your bank or payment method. Credit card refunds typically
                    appear within 1-2 billing cycles.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Refund Methods */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Refund Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">
                      Original Payment Method
                    </h3>
                    <p className="text-muted-foreground">
                      Refunds are typically issued to the original payment
                      method used for the purchase.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Store Credit</h3>
                    <p className="text-muted-foreground">
                      In some cases, we may offer store credit for future
                      purchases instead of a cash refund.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Bank Transfers</h3>
                    <p className="text-muted-foreground">
                      For bulk orders or special circumstances, bank transfers
                      may be arranged.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Return Shipping */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Return Shipping
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">
                      When Return Shipping is Required
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Defective cards that need to be inspected</li>
                      <li>Wrong items shipped</li>
                      <li>Quality control issues</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Shipping Costs</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>We cover return shipping for defective items</li>
                      <li>Customer pays return shipping for change of mind</li>
                      <li>
                        Return shipping costs are deducted from refund amount
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exceptions */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  Special Cases & Exceptions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">Bulk Orders</h3>
                    <p className="text-muted-foreground">
                      Bulk orders (10+ cards) have different refund terms.
                      Please refer to your bulk order agreement.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Custom Designs</h3>
                    <p className="text-muted-foreground">
                      Custom designs are non-refundable once approved and
                      production begins.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Promotional Items</h3>
                    <p className="text-muted-foreground">
                      Free promotional items or samples are not eligible for
                      refunds.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you have any questions about our refund policy or need to
                  request a refund, please contact us:
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
                  <p className="text-sm mt-4">
                    <strong>Business Hours:</strong> Sunday - Thursday, 9:00 AM
                    - 6:00 PM (Jordan Time)
                  </p>
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

export default RefundPolicy;

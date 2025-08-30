import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  X,
  Clock,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Mail,
  Phone,
} from 'lucide-react';

const CancellationPolicy = () => {
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
              <span className="gradient-text">Cancellation Policy</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Understand our cancellation terms and conditions for NFC card
              orders. Learn when and how you can cancel your order.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Cancellation Eligibility */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Cancellation Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">
                    Orders That Can Be Cancelled
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Orders placed but not yet confirmed by our team</li>
                    <li>Orders in "Pending" or "Processing" status</li>
                    <li>Orders before production begins</li>
                    <li>Standard orders (non-custom designs)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Orders That Cannot Be Cancelled
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Orders already in production</li>
                    <li>Custom design orders after approval</li>
                    <li>Bulk orders with custom specifications</li>
                    <li>Orders that have been shipped</li>
                    <li>Rush orders with expedited processing</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Cancellation Timeline */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Cancellation Timeline
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
                        <h4 className="font-semibold">Within 2 Hours</h4>
                        <p className="text-muted-foreground text-sm">
                          Full refund, no cancellation fee
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        !
                      </div>
                      <div>
                        <h4 className="font-semibold">2-24 Hours</h4>
                        <p className="text-muted-foreground text-sm">
                          95% refund, 5% processing fee
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        ⚠
                      </div>
                      <div>
                        <h4 className="font-semibold">24-48 Hours</h4>
                        <p className="text-muted-foreground text-sm">
                          90% refund, 10% processing fee
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        ✗
                      </div>
                      <div>
                        <h4 className="font-semibold">After 48 Hours</h4>
                        <p className="text-muted-foreground text-sm">
                          Cancellation not possible
                        </p>
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Note:</strong> Timeline starts from order
                        confirmation, not order placement.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How to Cancel */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <X className="w-5 h-5 mr-2" />
                  How to Cancel Your Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Contact Customer Support
                      </h4>
                      <p className="text-muted-foreground">
                        Email us at info@linkitnfc.com or call +962 79 8002626
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Provide Order Details</h4>
                      <p className="text-muted-foreground">
                        Include your order number, name, and reason for
                        cancellation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Confirmation</h4>
                      <p className="text-muted-foreground">
                        We'll confirm cancellation and process refund within 24
                        hours
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cancellation Fees */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Cancellation Fees
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">Processing Fees</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>0% fee for cancellations within 2 hours</li>
                      <li>5% processing fee for 2-24 hour cancellations</li>
                      <li>10% processing fee for 24-48 hour cancellations</li>
                      <li>No cancellation possible after 48 hours</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Additional Charges</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Payment processing fees (2-3% of order total)</li>
                      <li>Bank transfer fees for refunds (if applicable)</li>
                      <li>
                        Currency conversion fees (for international orders)
                      </li>
                    </ul>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Important:</strong> All fees are calculated based
                      on the original order total.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special Cases */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Special Cases & Exceptions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">Bulk Orders</h3>
                    <p className="text-muted-foreground">
                      Bulk orders (10+ cards) have different cancellation terms.
                      Please refer to your bulk order agreement for specific
                      details.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Custom Designs</h3>
                    <p className="text-muted-foreground">
                      Custom design orders cannot be cancelled once the design
                      is approved and production begins. Design changes may be
                      possible for an additional fee.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Rush Orders</h3>
                    <p className="text-muted-foreground">
                      Rush orders with expedited processing cannot be cancelled
                      as they are prioritized in our production queue.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Force Majeure</h3>
                    <p className="text-muted-foreground">
                      In cases of force majeure (natural disasters, strikes,
                      etc.), cancellation policies may be adjusted accordingly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Refund Process */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Refund Process After Cancellation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">Refund Timeline</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Refund processing: 1-2 business days</li>
                      <li>Credit card refunds: 5-10 business days</li>
                      <li>Bank transfers: 3-7 business days</li>
                      <li>International refunds: 7-14 business days</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Refund Method</h3>
                    <p className="text-muted-foreground">
                      Refunds are issued to the original payment method used for
                      the purchase. If the original payment method is no longer
                      available, we may offer store credit or arrange an
                      alternative refund method.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you need to cancel your order or have questions about our
                  cancellation policy, please contact us immediately:
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
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Urgent Cancellations:</strong> For immediate
                      assistance, please call us during business hours for the
                      fastest response.
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

export default CancellationPolicy;

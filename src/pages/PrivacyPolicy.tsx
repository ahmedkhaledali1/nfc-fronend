import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, Users, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
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
              <span className="gradient-text">Privacy Policy</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Information We Collect */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Company information for bulk orders</li>
                    <li>
                      Payment information (processed securely through our
                      payment partners)
                    </li>
                    <li>Shipping and delivery addresses</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Technical Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>IP address and browser information</li>
                    <li>Device information and usage analytics</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Process and fulfill your orders</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Improve our services and user experience</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Information Sharing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information only in the
                  following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>With payment processors to complete transactions</li>
                  <li>With shipping partners to deliver your orders</li>
                  <li>When required by law or to protect our rights</li>
                  <li>With your explicit consent</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Data Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We implement appropriate security measures to protect your
                  personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>
                    Limited access to personal information on a need-to-know
                    basis
                  </li>
                  <li>Secure payment processing through trusted partners</li>
                </ul>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Your Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p className="text-muted-foreground">
                  To exercise these rights, please contact us at{' '}
                  <a
                    href="mailto:info@linkitnfc.com"
                    className="text-primary hover:underline"
                  >
                    info@linkitnfc.com
                  </a>
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please
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

export default PrivacyPolicy;

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Send, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { createMessage } from '@/lib/service/endpoints';
import SubmitButton from '@/components/ui/SubmitButton';

const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z.string().optional(),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Send message to backend
      await createMessage({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || undefined,
        subject: data.subject,
        message: data.message,
      });

      toast({
        title: 'Message Sent Successfully!',
        description:
          "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      form.reset();
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      toast({
        title: 'Error Sending Message',
        description:
          error?.response?.data?.message ||
          'Please try again or contact us directly at info@linkitnfc.com',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our NFC cards? We're here to help you get
            started with seamless networking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Get in Touch
                </CardTitle>
                <CardDescription>
                  Ready to transform your networking experience? Reach out to
                  us!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">info@linkitnfc.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+962 79 8002626</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">Amman, Jordan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Card */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    How long does delivery take?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We typically deliver within 3-5 business days in Jordan.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    Can I customize my NFC card?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! We offer custom designs and colors to match your brand.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    Do you offer bulk discounts?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Absolutely! Check our bulk orders page for special pricing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your phone number (optional)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject *</FormLabel>
                        <FormControl>
                          <Input placeholder="What's this about?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us more about your inquiry..."
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <SubmitButton
                    className="btn-hero w-full py-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </SubmitButton>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;

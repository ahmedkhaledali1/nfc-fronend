import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, Check, CreditCard, Truck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import nfcCardBlack from '@/assets/nfc-card-black.jpg';
import nfcCardWhite from '@/assets/nfc-card-white.jpg';

interface OrderData {
  // Personal Info
  fullName: string;
  phoneNumber: string;
  email: string;
  linkedinUrl: string;

  // Delivery
  fullAddress: string;

  // Product
  color: string;

  // Payment
  paymentMethod: string;
}

const OrderSection = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState<OrderData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    linkedinUrl: '',
    fullAddress: '',
    color: 'black',
    paymentMethod: 'cash',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const productImages = {
    black: nfcCardBlack,
    white: nfcCardWhite,
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          orderData.fullName &&
          orderData.phoneNumber &&
          orderData.email &&
          orderData.fullAddress
        );
      case 2:
        return !!orderData.paymentMethod;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    } else {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields before continuing.',
        variant: 'destructive',
      });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const submitOrder = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Here you would normally send to your backend
      console.log('Order submitted:', orderData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: 'Order Placed Successfully!',
        description: "We'll contact you within 24 hours to confirm your order.",
        duration: 5000,
      });

      // Reset form
      setOrderData({
        fullName: '',
        phoneNumber: '',
        email: '',
        linkedinUrl: '',
        fullAddress: '',
        color: 'black',
        paymentMethod: 'cash',
      });
      setCurrentStep(1);
    } catch (error) {
      toast({
        title: 'Order Failed',
        description: 'There was an error placing your order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Personal Info', description: 'Your contact details' },
    { number: 2, title: 'Payment Method', description: "How you'll pay" },
    { number: 3, title: 'Order Summary', description: 'Review your order' },
  ];

  return (
    <section id="order" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Order Your <span className="gradient-text">NFC Card</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Get your premium NFC business card delivered to your doorstep
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Product Preview */}
            <div className="lg:col-span-1 fade-in">
              <Card className="card-premium sticky top-24">
                <CardHeader>
                  <CardTitle>Premium NFC Business Card</CardTitle>
                  <CardDescription>
                    Professional networking made simple
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Product Image */}
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={
                        productImages[
                          orderData.color as keyof typeof productImages
                        ]
                      }
                      alt={`${orderData.color} NFC card`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Color Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      Select Color
                    </Label>
                    <RadioGroup
                      value={orderData.color}
                      onValueChange={(value) =>
                        setOrderData({ ...orderData, color: value })
                      }
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="black" id="black" />
                        <Label htmlFor="black" className="text-sm">
                          Black
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="white" id="white" />
                        <Label htmlFor="white" className="text-sm">
                          White
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Price Summary */}
                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>NFC Business Card</span>
                      <span>35 JOD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery</span>
                      <span className="text-green-500">FREE</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t border-border pt-2">
                      <span>Total</span>
                      <span className="gradient-text">35 JOD</span>
                    </div>
                  </div>

                  <Badge variant="secondary" className="w-full justify-center">
                    <Truck className="w-4 h-4 mr-2" />
                    Free delivery within 3-5 days
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Order Form */}
            <div
              className="lg:col-span-2 fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              <Card className="card-premium">
                <CardHeader>
                  {/* Step Indicator */}
                  <div className="flex justify-between mb-6">
                    {steps.map((step) => (
                      <div
                        key={step.number}
                        className="flex flex-col items-center"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-2 transition-all duration-300 ${
                            currentStep >= step.number
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {currentStep > step.number ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            step.number
                          )}
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">
                            {step.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {step.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <CardTitle>
                    Step {currentStep}: {steps[currentStep - 1].title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            value={orderData.fullName}
                            onChange={(e) =>
                              setOrderData({
                                ...orderData,
                                fullName: e.target.value,
                              })
                            }
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phoneNumber">Phone Number *</Label>
                          <Input
                            id="phoneNumber"
                            value={orderData.phoneNumber}
                            onChange={(e) =>
                              setOrderData({
                                ...orderData,
                                phoneNumber: e.target.value,
                              })
                            }
                            placeholder="+962 XX XXX XXXX"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={orderData.email}
                          onChange={(e) =>
                            setOrderData({
                              ...orderData,
                              email: e.target.value,
                            })
                          }
                          placeholder="your@email.com"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="linkedinUrl">
                          LinkedIn Profile URL
                        </Label>
                        <Input
                          id="linkedinUrl"
                          value={orderData.linkedinUrl}
                          onChange={(e) =>
                            setOrderData({
                              ...orderData,
                              linkedinUrl: e.target.value,
                            })
                          }
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>

                      <div>
                        <Label htmlFor="fullAddress">
                          Full Delivery Address *
                        </Label>
                        <Textarea
                          id="fullAddress"
                          value={orderData.fullAddress}
                          onChange={(e) =>
                            setOrderData({
                              ...orderData,
                              fullAddress: e.target.value,
                            })
                          }
                          placeholder="Street address, building number, city, postal code"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Payment Method */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <RadioGroup
                        value={orderData.paymentMethod}
                        onValueChange={(value) =>
                          setOrderData({ ...orderData, paymentMethod: value })
                        }
                      >
                        <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                          <RadioGroupItem value="cash" id="cash" />
                          <Label
                            htmlFor="cash"
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">
                                  Cash on Delivery
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Pay when you receive your card
                                </div>
                              </div>
                              <Truck className="w-5 h-5 text-muted-foreground" />
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2 p-4 border border-border rounded-lg opacity-50">
                          <RadioGroupItem value="online" id="online" disabled />
                          <Label
                            htmlFor="online"
                            className="flex-1 cursor-not-allowed"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">
                                  Online Payment
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Coming Soon
                                </div>
                              </div>
                              <CreditCard className="w-5 h-5 text-muted-foreground" />
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {/* Step 3: Order Summary */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">
                            Personal Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                Name:
                              </span>{' '}
                              {orderData.fullName}
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Phone:
                              </span>{' '}
                              {orderData.phoneNumber}
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Email:
                              </span>{' '}
                              {orderData.email}
                            </div>
                            {orderData.linkedinUrl && (
                              <div>
                                <span className="text-muted-foreground">
                                  LinkedIn:
                                </span>{' '}
                                {orderData.linkedinUrl}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Order Details</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                Product:
                              </span>{' '}
                              Premium NFC Business Card
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Color:
                              </span>{' '}
                              {orderData.color === 'black' ? 'Black' : 'White'}
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Payment:
                              </span>{' '}
                              Cash on Delivery
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Total:
                              </span>{' '}
                              <span className="font-semibold">35 JOD</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Delivery Address</h4>
                        <p className="text-sm text-muted-foreground">
                          {orderData.fullAddress}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    {currentStep < 3 ? (
                      <Button
                        onClick={nextStep}
                        className="btn-hero flex items-center"
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={submitOrder}
                        disabled={isSubmitting}
                        className="btn-hero flex items-center"
                      >
                        {isSubmitting ? 'Placing Order...' : 'Place Order Now'}
                        <Check className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;

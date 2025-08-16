import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/Header';
import { useCart, useFavorites } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';

const Contact = () => {
  const { getCartItemsCount } = useCart();
  const { favoritesCount } = useFavorites();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent successfully!', {
      description: "We'll get back to you within 24 hours.",
      duration: 5000,
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={getCartItemsCount()} favoritesCount={favoritesCount} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, 
            we're here to help make your coffee experience even better.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Send className="h-6 w-6 text-primary" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your question or feedback..."
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-muted-foreground">
                      <a href="tel:+1555123456" className="hover:text-primary smooth-transition">
                        (555) 123-BREW
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Available Mon-Fri, 9 AM - 6 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground">
                      <a href="mailto:hello@brewbuddy.com" className="hover:text-primary smooth-transition">
                        hello@brewbuddy.com
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Headquarters</h4>
                    <p className="text-muted-foreground">
                      123 Coffee Street<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Business Hours</h4>
                    <div className="text-muted-foreground text-sm space-y-1">
                      <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                      <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
                      <p><strong>Sunday:</strong> Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Card */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-xl">Quick Questions?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Catering & Events</h4>
                  <p className="text-muted-foreground text-sm">
                    Call us at <a href="tel:+1555123456" className="text-primary hover:underline">(555) 123-BREW</a> for 
                    catering inquiries and event planning.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Wholesale Orders</h4>
                  <p className="text-muted-foreground text-sm">
                    Interested in serving our coffee at your business? 
                    Email <a href="mailto:wholesale@brewbuddy.com" className="text-primary hover:underline">wholesale@brewbuddy.com</a>
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Employment</h4>
                  <p className="text-muted-foreground text-sm">
                    Looking to join our team? Check out our current openings and apply at 
                    <a href="mailto:careers@brewbuddy.com" className="text-primary hover:underline"> careers@brewbuddy.com</a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-xl">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Stay connected for the latest news, special offers, and coffee inspiration!
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">Facebook</Button>
                  <Button variant="outline" size="sm">Instagram</Button>
                  <Button variant="outline" size="sm">Twitter</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
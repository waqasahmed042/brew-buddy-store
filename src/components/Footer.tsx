import { Link } from 'react-router-dom';
import { Coffee, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import brewBuddyLogo from '@/assets/brew-buddy-logo.png';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={brewBuddyLogo} 
                alt="Brew Buddy" 
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed">
              Crafting exceptional coffee experiences since 2015. 
              From premium beans to warm community connections, 
              we're your perfect coffee companion.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2">
              <Link 
                to="/menu" 
                className="block text-primary-foreground/80 hover:text-primary-foreground smooth-transition"
              >
                Our Menu
              </Link>
              <Link 
                to="/locations" 
                className="block text-primary-foreground/80 hover:text-primary-foreground smooth-transition"
              >
                Store Locations
              </Link>
              <Link 
                to="/about" 
                className="block text-primary-foreground/80 hover:text-primary-foreground smooth-transition"
              >
                Our Story
              </Link>
              <Link 
                to="/contact" 
                className="block text-primary-foreground/80 hover:text-primary-foreground smooth-transition"
              >
                Contact Us
              </Link>
              <Link 
                to="/account" 
                className="block text-primary-foreground/80 hover:text-primary-foreground smooth-transition"
              >
                My Account
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <nav className="space-y-2">
              <Link 
                to="/order" 
                className="block text-primary-foreground/80 hover:text-primary-foreground smooth-transition"
              >
                Online Ordering
              </Link>
              <a 
                href="mailto:catering@brewbuddy.com"
                className="block text-primary-foreground/80 hover:text-primary-foreground smooth-transition"
              >
                Catering
              </a>
              <a 
                href="mailto:wholesale@brewbuddy.com"
                className="block text-primary-foreground/80 hover:text-primary-foreground smooth-transition"
              >
                Wholesale
              </a>
              <a 
                href="mailto:events@brewbuddy.com"
                className="block text-primary-foreground/80 hover:text-primary-foreground smooth-transition"
              >
                Private Events
              </a>
              <a 
                href="#"
                className="block text-primary-foreground/80 hover:text-primary-foreground smooth-transition"
              >
                Gift Cards
              </a>
            </nav>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <p className="text-primary-foreground/80 text-sm">
              Subscribe to get special offers, free giveaways, and insider coffee tips!
            </p>
            
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" size="sm" className="w-full">
                Subscribe
              </Button>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary-foreground/80" />
                <a href="tel:+1555123456" className="text-primary-foreground/80 hover:text-primary-foreground">
                  (555) 123-BREW
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary-foreground/80" />
                <a href="mailto:hello@brewbuddy.com" className="text-primary-foreground/80 hover:text-primary-foreground">
                  hello@brewbuddy.com
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary-foreground/80 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  123 Coffee Street<br />
                  New York, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/80">
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4" />
            <span>© 2024 Brew Buddy Coffee. All rights reserved.</span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground smooth-transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-foreground smooth-transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary-foreground smooth-transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
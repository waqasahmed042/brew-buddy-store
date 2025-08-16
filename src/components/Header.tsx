import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Menu, X, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import brewBuddyLogo from "@/assets/brew-buddy-logo.png";

interface HeaderProps {
  cartItemsCount: number;
  favoritesCount: number;
}

export const Header = ({ cartItemsCount, favoritesCount }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full coffee-blur border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-lift">
            <img 
              src={brewBuddyLogo} 
              alt="Brew Buddy" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary smooth-transition font-medium"
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className="text-foreground hover:text-primary smooth-transition font-medium"
            >
              Our Menu
            </Link>
            <Link 
              to="/locations" 
              className="text-foreground hover:text-primary smooth-transition font-medium"
            >
              Locations
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary smooth-transition font-medium"
            >
              Our Story
            </Link>
            <Link 
              to="/contact" 
              className="text-foreground hover:text-primary smooth-transition font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/locations">
                <MapPin className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link to="/favorites">
                <Heart className="h-5 w-5" />
                {favoritesCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {favoritesCount}
                  </Badge>
                )}
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild className="relative">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-secondary">
                    {cartItemsCount}
                  </Badge>
                )}
              </Link>
            </Button>

            <Button variant="outline" size="sm" asChild>
              <Link to="/account">
                <User className="h-4 w-4 mr-2" />
                Account
              </Link>
            </Button>

            <Button variant="hero" size="sm" asChild>
              <Link to="/order">Order Online</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-border mt-2">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="px-4 py-2 text-foreground hover:text-primary smooth-transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/menu" 
                className="px-4 py-2 text-foreground hover:text-primary smooth-transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Menu
              </Link>
              <Link 
                to="/locations" 
                className="px-4 py-2 text-foreground hover:text-primary smooth-transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Locations
              </Link>
              <Link 
                to="/about" 
                className="px-4 py-2 text-foreground hover:text-primary smooth-transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </Link>
              <Link 
                to="/contact" 
                className="px-4 py-2 text-foreground hover:text-primary smooth-transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link to="/favorites" className="relative">
                      <Heart className="h-5 w-5" />
                      {favoritesCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                          {favoritesCount}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to="/cart" className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      {cartItemsCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-secondary">
                          {cartItemsCount}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                </div>
                <Button variant="hero" size="sm" asChild>
                  <Link to="/order">Order Online</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
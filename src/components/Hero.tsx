import { Link } from "react-router-dom";
import { ArrowRight, Coffee, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-coffee.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The better the coffee, 
            <span className="golden-gradient bg-clip-text text-transparent"> the brighter</span> the day
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Brewing another reason to fall in love with exceptional coffee. 
            Crafted with passion, served with pride.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="hero" size="lg" asChild className="text-lg px-8">
              <Link to="/menu">
                <Coffee className="mr-2 h-5 w-5" />
                Explore Our Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="golden" size="lg" asChild className="text-lg px-8">
              <Link to="/locations">
                <MapPin className="mr-2 h-5 w-5" />
                Find a Store
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 golden-gradient bg-clip-text text-transparent">50+</div>
              <div className="text-white/80">Premium Blends</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 golden-gradient bg-clip-text text-transparent">10</div>
              <div className="text-white/80">Store Locations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 golden-gradient bg-clip-text text-transparent">24/7</div>
              <div className="text-white/80">Fresh Brewing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
          <span className="text-sm mt-2">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};
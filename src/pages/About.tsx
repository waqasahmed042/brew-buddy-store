import { Link } from 'react-router-dom';
import { Coffee, Heart, Users, Award, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { useCart, useFavorites } from '@/hooks/useLocalStorage';

const About = () => {
  const { getCartItemsCount } = useCart();
  const { favoritesCount } = useFavorites();

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

        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From humble beginnings to a beloved coffee destination, 
            discover the passion and dedication behind every cup we serve.
          </p>
        </section>

        {/* Story Content */}
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Origin Story */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">The Beginning</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                It all began in 2015 when two coffee enthusiasts, Sarah and Mark, 
                shared a simple dream: to create a space where exceptional coffee meets genuine community. 
                What started as weekend farmers market visits to source the perfect beans 
                grew into something much more meaningful.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                After months of experimenting in Sarah's kitchen, perfecting roasting techniques, 
                and testing countless blends, they finally found their signature taste. 
                The "Brew Buddy Blend" was born - a perfect balance of rich, bold flavors 
                that would become the foundation of our coffee identity.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop" 
                alt="Coffee shop interior" 
                className="rounded-2xl coffee-shadow hover-lift"
              />
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 bg-muted/30 rounded-3xl px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover-lift">
                <CardContent className="pt-6">
                  <Coffee className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Quality First</h3>
                  <p className="text-muted-foreground">
                    We source only the finest beans and use artisanal techniques to ensure every cup is exceptional.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover-lift">
                <CardContent className="pt-6">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Community Love</h3>
                  <p className="text-muted-foreground">
                    We believe in building connections and creating a warm, welcoming space for everyone.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover-lift">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
                  <p className="text-muted-foreground">
                    We're committed to ethical sourcing and environmentally responsible practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover-lift">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We constantly explore new flavors, techniques, and ways to enhance your coffee experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Growth Story */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <img 
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&fit=crop" 
                alt="Coffee roasting" 
                className="rounded-2xl coffee-shadow hover-lift"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl font-bold text-primary">Growing Together</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From our first small location in downtown, we've grown to serve thousands of 
                coffee lovers across multiple neighborhoods. But growth hasn't changed our core mission: 
                to craft exceptional coffee experiences that bring people together.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we're proud to employ over 50 passionate team members, 
                work with ethical suppliers from around the world, and serve as a 
                gathering place for students, professionals, families, and friends. 
                Every cup tells our story of dedication, quality, and community.
              </p>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 text-center">
            <h2 className="text-3xl font-bold mb-12">By the Numbers</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">8+</div>
                <div className="text-muted-foreground">Years Serving</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">5</div>
                <div className="text-muted-foreground">Store Locations</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">50+</div>
                <div className="text-muted-foreground">Team Members</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">100K+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Join Our Story</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Every customer becomes part of our journey. Come visit us and experience 
                the passion, quality, and community that defines Brew Buddy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/locations">
                    Find a Location
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/menu">
                    View Our Menu
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
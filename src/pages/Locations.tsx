import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Car, Wifi, CreditCard, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { useCart, useFavorites } from '@/hooks/useLocalStorage';

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  amenities: string[];
  driveThru: boolean;
  image: string;
}

const storeLocations: StoreLocation[] = [
  {
    id: '1',
    name: 'Downtown Main Store',
    address: '123 Coffee Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '(555) 123-4567',
    hours: {
      weekdays: '6:00 AM - 10:00 PM',
      saturday: '7:00 AM - 11:00 PM',
      sunday: '7:00 AM - 9:00 PM'
    },
    amenities: ['Free WiFi', 'Outdoor Seating', 'Meeting Rooms', 'Live Music'],
    driveThru: false,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'University District',
    address: '456 Campus Avenue',
    city: 'New York',
    state: 'NY',
    zipCode: '10003',
    phone: '(555) 234-5678',
    hours: {
      weekdays: '5:30 AM - 11:00 PM',
      saturday: '6:00 AM - 11:00 PM',
      sunday: '6:00 AM - 10:00 PM'
    },
    amenities: ['Free WiFi', 'Study Area', 'Power Outlets', '24/7 Access'],
    driveThru: false,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop'
  },
  {
    id: '3',
    name: 'Suburban Express',
    address: '789 Shopping Plaza',
    city: 'Queens',
    state: 'NY',
    zipCode: '11101',
    phone: '(555) 345-6789',
    hours: {
      weekdays: '6:00 AM - 9:00 PM',
      saturday: '7:00 AM - 10:00 PM',
      sunday: '7:00 AM - 8:00 PM'
    },
    amenities: ['Drive-Thru', 'Parking', 'Family Friendly', 'Mobile Ordering'],
    driveThru: true,
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=400&fit=crop'
  },
  {
    id: '4',
    name: 'Business District',
    address: '321 Financial Way',
    city: 'New York',
    state: 'NY',
    zipCode: '10004',
    phone: '(555) 456-7890',
    hours: {
      weekdays: '6:30 AM - 8:00 PM',
      saturday: '8:00 AM - 6:00 PM',
      sunday: 'Closed'
    },
    amenities: ['Express Service', 'Corporate Catering', 'Mobile Ordering', 'Loyalty Rewards'],
    driveThru: false,
    image: 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=600&h=400&fit=crop'
  },
  {
    id: '5',
    name: 'Riverside Cafe',
    address: '654 River Road',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: '11201',
    phone: '(555) 567-8901',
    hours: {
      weekdays: '7:00 AM - 9:00 PM',
      saturday: '8:00 AM - 10:00 PM',
      sunday: '8:00 AM - 8:00 PM'
    },
    amenities: ['River View', 'Outdoor Seating', 'Pet Friendly', 'Local Art'],
    driveThru: false,
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&h=400&fit=crop'
  }
];

const Locations = () => {
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

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find a Store Near You</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visit any of our locations to experience exceptional coffee and warm hospitality. 
            Each store offers a unique atmosphere while maintaining our commitment to quality.
          </p>
        </div>

        {/* Store Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {storeLocations.map((store) => (
            <Card key={store.id} className="hover-lift overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={store.image} 
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                />
                {store.driveThru && (
                  <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                    <Car className="w-3 h-3 mr-1" />
                    Drive-Thru
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{store.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{store.address}</p>
                    <p className="text-muted-foreground">{store.city}, {store.state} {store.zipCode}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <a href={`tel:${store.phone}`} className="text-primary hover:underline">
                    {store.phone}
                  </a>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p><strong>Mon-Fri:</strong> {store.hours.weekdays}</p>
                    <p><strong>Saturday:</strong> {store.hours.saturday}</p>
                    <p><strong>Sunday:</strong> {store.hours.sunday}</p>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="font-semibold mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {store.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="default" size="sm" className="flex-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Store
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-primary" />
                Free WiFi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All our locations offer complimentary high-speed internet access for our customers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We accept all major credit cards, mobile payments, and our loyalty rewards program.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                Parking & Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Most locations offer convenient parking and are fully accessible for all customers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Locations;
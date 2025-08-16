import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, CreditCard, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/Header';
import { useCart, useFavorites, useOrderHistory } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';

const Order = () => {
  const { cartItems, getCartTotal, getCartItemsCount, clearCart } = useCart();
  const { favoritesCount } = useFavorites();
  const { addOrder } = useOrderHistory();
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedStore, setSelectedStore] = useState('1');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stores = [
    { id: '1', name: 'Downtown Main Store', address: '123 Coffee Street, New York, NY 10001' },
    { id: '2', name: 'University District', address: '456 Campus Avenue, New York, NY 10003' },
    { id: '3', name: 'Suburban Express', address: '789 Shopping Plaza, Queens, NY 11101' },
  ];

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!customerInfo.name || !customerInfo.phone) {
      toast.error('Please fill in required customer information');
      return;
    }

    if (orderType === 'delivery' && (!deliveryAddress.street || !deliveryAddress.city)) {
      toast.error('Please provide a delivery address');
      return;
    }

    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      const order = {
        id: Date.now().toString(),
        items: cartItems,
        totalAmount: getCartTotal() * 1.08, // Including tax
        status: 'pending',
        orderDate: new Date(),
        estimatedTime: orderType === 'pickup' ? 15 : 30,
        orderType,
        customerInfo,
        deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
        storeId: orderType === 'pickup' ? selectedStore : undefined,
        paymentMethod: { id: 'card', type: 'card', label: 'Credit Card', isDefault: true }
      };

      addOrder(order);
      clearCart();
      setIsSubmitting(false);

      toast.success('Order placed successfully!', {
        description: `Order #${order.id} • Estimated time: ${order.estimatedTime} minutes`,
        duration: 5000,
      });

      // Reset form
      setCustomerInfo({ name: '', phone: '', email: '', notes: '' });
      setDeliveryAddress({ street: '', city: '', state: '', zipCode: '' });
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemsCount={0} favoritesCount={favoritesCount} />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some items to your cart before placing an order.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/menu">
                Browse Menu
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={getCartItemsCount()} favoritesCount={favoritesCount} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/cart">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Place Your Order</h1>

          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="space-y-6">
              {/* Order Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Order Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={orderType} onValueChange={(value) => setOrderType(value as 'pickup' | 'delivery')}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex-1">
                        <div>
                          <p className="font-medium">Pickup</p>
                          <p className="text-sm text-muted-foreground">Ready in 15-20 minutes</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="flex-1">
                        <div>
                          <p className="font-medium">Delivery</p>
                          <p className="text-sm text-muted-foreground">Delivered in 30-45 minutes</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Store Selection (for pickup) */}
              {orderType === 'pickup' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Select Store Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedStore} onValueChange={setSelectedStore}>
                      {stores.map((store) => (
                        <div key={store.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={store.id} id={`store-${store.id}`} />
                          <Label htmlFor={`store-${store.id}`} className="flex-1">
                            <div>
                              <p className="font-medium">{store.name}</p>
                              <p className="text-sm text-muted-foreground">{store.address}</p>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              )}

              {/* Delivery Address */}
              {orderType === 'delivery' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address *</Label>
                      <Input
                        id="street"
                        value={deliveryAddress.street}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, street: e.target.value }))}
                        placeholder="123 Main Street"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={deliveryAddress.city}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="New York"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={deliveryAddress.state}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, state: e.target.value }))}
                          placeholder="NY"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={deliveryAddress.zipCode}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                        placeholder="10001"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Full Name *</Label>
                    <Input
                      id="customerName"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Phone Number *</Label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Email Address</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderNotes">Special Instructions</Label>
                    <Textarea
                      id="orderNotes"
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Any special requests or notes for your order..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.name}</h4>
                          {item.selectedSize && (
                            <p className="text-sm text-muted-foreground">
                              Size: {item.selectedSize.name}
                            </p>
                          )}
                          {item.selectedCustomizations.length > 0 && (
                            <div className="text-sm text-muted-foreground">
                              {item.selectedCustomizations.map(customization => (
                                <p key={customization.customizationId}>
                                  {customization.customizationName}: {customization.selectedOptions.map(opt => opt.name).join(', ')}
                                </p>
                              ))}
                            </div>
                          )}
                          <p className="text-sm font-medium">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">${item.totalPrice.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    {orderType === 'delivery' && (
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>Free</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
                  </div>

                  {/* Estimated Time */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      Estimated {orderType === 'pickup' ? 'pickup' : 'delivery'} time: {orderType === 'pickup' ? '15-20' : '30-45'} minutes
                    </span>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Processing Order...'
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Place Order - ${(getCartTotal() * 1.08).toFixed(2)}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
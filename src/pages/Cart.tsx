import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { useCart, useFavorites, useOrderHistory } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';

const Cart = () => {
  const { cartItems, updateCartItem, removeFromCart, clearCart, getCartTotal, getCartItemsCount } = useCart();
  const { favoritesCount } = useFavorites();
  const { addOrder } = useOrderHistory();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      toast.success('Item removed from cart');
    } else {
      const item = cartItems.find(item => item.id === itemId);
      if (item) {
        const pricePerUnit = item.totalPrice / item.quantity;
        updateCartItem(itemId, { 
          quantity: newQuantity,
          totalPrice: pricePerUnit * newQuantity
        });
      }
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      const order = {
        id: Date.now().toString(),
        items: cartItems,
        totalAmount: getCartTotal(),
        status: 'pending',
        orderDate: new Date(),
        estimatedTime: 15,
        paymentMethod: { id: 'card', type: 'card', label: 'Credit Card', isDefault: true }
      };
      
      addOrder(order);
      clearCart();
      setIsCheckingOut(false);
      
      toast.success('Order placed successfully!', {
        description: `Order #${order.id} • Estimated time: 15 minutes`,
        duration: 5000,
      });
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
              Looks like you haven't added anything to your cart yet. Explore our menu to discover amazing coffee and treats!
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Continue Shopping
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
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <Button 
                variant="ghost" 
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                Clear Cart
              </Button>
            </div>

            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{item.product.name}</h3>
                          {item.selectedSize && (
                            <Badge variant="outline" className="mr-2">
                              {item.selectedSize.name}
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Customizations */}
                      {item.selectedCustomizations.length > 0 && (
                        <div className="space-y-1">
                          {item.selectedCustomizations.map((customization) => (
                            <div key={customization.customizationId} className="text-sm text-muted-foreground">
                              <span className="font-medium">{customization.customizationName}:</span> {' '}
                              {customization.selectedOptions.map(option => option.name).join(', ')}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">
                            ${item.totalPrice.toFixed(2)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-muted-foreground">
                              ${(item.totalPrice / item.quantity).toFixed(2)} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Items ({getCartItemsCount()})</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>Free</span>
                  </div>
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

                <Button 
                  className="w-full" 
                  size="lg"
                  variant="hero"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Free delivery on orders over $25</p>
                  <p className="mt-1">Estimated delivery: 20-30 minutes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
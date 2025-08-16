import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { useCart, useFavorites } from '@/hooks/useLocalStorage';
import { allProducts } from '@/data/products';
import { toast } from 'sonner';

const Favorites = () => {
  const { favorites, favoritesCount } = useFavorites();
  const { getCartItemsCount, addToCart } = useCart();

  const favoriteProducts = allProducts.filter(product => favorites.includes(product.id));

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast.success(`${item.product.name} added to cart!`, {
      description: `Quantity: ${item.quantity} • Total: $${item.totalPrice.toFixed(2)}`,
      duration: 3000,
    });
  };

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemsCount={getCartItemsCount()} favoritesCount={favoritesCount} />
        <div className="container mx-auto px-4 py-16">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Menu
              </Link>
            </Button>
          </div>

          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">No Favorites Yet</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start exploring our menu and add items to your favorites by clicking the heart icon. 
              Your favorite items will appear here for easy access!
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Explore Menu
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
              Back to Menu
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            <h1 className="text-3xl font-bold">Your Favorites</h1>
          </div>
          <p className="text-muted-foreground">
            You have {favoriteProducts.length} favorite item{favoriteProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Love More Items?</h3>
              <p className="text-muted-foreground mb-4">
                Continue exploring our menu to discover more amazing coffee and treats.
              </p>
              <Button variant="outline" asChild>
                <Link to="/menu">Browse Full Menu</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
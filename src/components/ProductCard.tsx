import { useState } from 'react';
import { Heart, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Product } from '@/types';
import { useFavorites } from '@/hooks/useLocalStorage';
import { ProductCustomization } from './ProductCustomization';

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: any) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleQuickAdd = () => {
    const baseItem = {
      productId: product.id,
      product,
      quantity: 1,
      selectedSize: product.sizes?.[0] || null,
      selectedCustomizations: [],
      totalPrice: product.price + (product.sizes?.[0]?.price || 0),
    };
    onAddToCart(baseItem);
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <Card className="group hover-lift overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isPopular && (
            <Badge variant="default" className="coffee-gradient text-white">
              <Star className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
          {product.isNew && (
            <Badge variant="secondary" className="golden-gradient text-primary">
              New
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-foreground"
          onClick={handleFavoriteToggle}
        >
          <Heart 
            className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
          />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mt-1">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.sizes && product.sizes.length > 1 && (
                <span className="text-xs text-muted-foreground">starting at</span>
              )}
            </div>

            <div className="flex gap-2">
              {product.customizations && product.customizations.length > 0 ? (
                <Dialog open={isCustomizationOpen} onOpenChange={setIsCustomizationOpen}>
                  <DialogTrigger asChild>
                    <Button variant="menu" size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Customize
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl">Customize Your {product.name}</DialogTitle>
                    </DialogHeader>
                    <ProductCustomization 
                      product={product}
                      onAddToCart={(item) => {
                        onAddToCart(item);
                        setIsCustomizationOpen(false);
                      }}
                    />
                  </DialogContent>
                </Dialog>
              ) : (
                <Button variant="default" size="sm" onClick={handleQuickAdd}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
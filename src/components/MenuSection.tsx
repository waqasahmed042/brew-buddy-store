import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product } from '@/types';
import { useCart } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';
import menuItemsImage from '@/assets/menu-items.jpg';

interface MenuSectionProps {
  products: Product[];
  title: string;
  description: string;
}

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'coffee', name: 'Coffee' },
  { id: 'cold-drinks', name: 'Cold Drinks' },
  { id: 'food', name: 'Food' },
  { id: 'dessert', name: 'Desserts' },
];

export const MenuSection = ({ products, title, description }: MenuSectionProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast.success(`${item.product.name} added to cart!`, {
      description: `Quantity: ${item.quantity} • Total: $${item.totalPrice.toFixed(2)}`,
      duration: 3000,
    });
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {description}
          </p>
          
          {/* Featured Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <img 
              src={menuItemsImage} 
              alt="Menu items showcase"
              className="w-full h-64 md:h-80 object-cover rounded-2xl coffee-shadow hover-lift"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="smooth-transition"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.id === 'all' 
                    ? products.length 
                    : products.filter(p => p.category === category.id).length
                  }
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* Results Summary */}
            <div className="text-center mt-12 text-muted-foreground">
              <p>
                Showing {filteredProducts.length} of {products.length} items
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
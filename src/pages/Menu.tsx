import { Header } from "@/components/Header";
import { MenuSection } from "@/components/MenuSection";
import { useCart, useFavorites } from "@/hooks/useLocalStorage";
import { allProducts } from "@/data/products";

const Menu = () => {
  const { getCartItemsCount } = useCart();
  const { favoritesCount } = useFavorites();

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={getCartItemsCount()} 
        favoritesCount={favoritesCount}
      />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Complete Menu</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            From expertly crafted coffee to fresh food and delightful treats, 
            discover everything we have to offer. Each item is made with love and the finest ingredients.
          </p>
        </div>
      </section>

      <MenuSection 
        products={allProducts}
        title="Explore Our Full Selection"
        description="Browse through our complete menu featuring premium coffee drinks, fresh food, and artisan desserts. Filter by category to find exactly what you're craving."
      />
    </div>
  );
};

export default Menu;
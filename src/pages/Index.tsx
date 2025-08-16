import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { useCart, useFavorites } from "@/hooks/useLocalStorage";
import { allProducts } from "@/data/products";

const Index = () => {
  const { getCartItemsCount } = useCart();
  const { favoritesCount } = useFavorites();

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={getCartItemsCount()} 
        favoritesCount={favoritesCount}
      />
      <Hero />
      <MenuSection 
        products={allProducts}
        title="Crafted with Love, Served with Passion"
        description="Whatever your diet or preferences, there's enough choice for everyone. Discover our premium selection of coffee, food, and treats."
      />
    </div>
  );
};

export default Index;

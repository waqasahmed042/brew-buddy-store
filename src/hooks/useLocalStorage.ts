import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Hook for cart management
export function useCart() {
  const [cartItems, setCartItems] = useLocalStorage('brewBuddy_cart', []);
  
  const addToCart = (item: any) => {
    setCartItems((prev: any[]) => {
      const existingItemIndex = prev.findIndex(
        (cartItem) => 
          cartItem.productId === item.productId && 
          JSON.stringify(cartItem.selectedSize) === JSON.stringify(item.selectedSize) &&
          JSON.stringify(cartItem.selectedCustomizations) === JSON.stringify(item.selectedCustomizations)
      );

      if (existingItemIndex > -1) {
        const updated = [...prev];
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: updated[existingItemIndex].quantity + item.quantity,
          totalPrice: updated[existingItemIndex].totalPrice + item.totalPrice
        };
        return updated;
      }

      return [...prev, { ...item, id: Date.now().toString() }];
    });
  };

  const updateCartItem = (itemId: string, updates: Partial<any>) => {
    setCartItems((prev: any[]) =>
      prev.map(item => item.id === itemId ? { ...item, ...updates } : item)
    );
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev: any[]) => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total: number, item: any) => total + item.totalPrice, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count: number, item: any) => count + item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };
}

// Hook for favorites management
export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('brewBuddy_favorites', []);

  const addToFavorites = (productId: string) => {
    setFavorites((prev: string[]) => [...prev, productId]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites((prev: string[]) => prev.filter(id => id !== productId));
  };

  const toggleFavorite = (productId: string) => {
    if (favorites.includes(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.includes(productId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    favoritesCount: favorites.length
  };
}

// Hook for order history
export function useOrderHistory() {
  const [orders, setOrders] = useLocalStorage('brewBuddy_orders', []);

  const addOrder = (order: any) => {
    setOrders((prev: any[]) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders((prev: any[]) =>
      prev.map(order => order.id === orderId ? { ...order, status } : order)
    );
  };

  return {
    orders,
    addOrder,
    updateOrderStatus
  };
}

// Hook for user preferences
export function useUserPreferences() {
  const [preferences, setPreferences] = useLocalStorage('brewBuddy_preferences', {
    favoriteProducts: [],
    defaultCustomizations: {},
    deliveryAddress: null,
    paymentMethods: []
  });

  const updatePreferences = (updates: Partial<any>) => {
    setPreferences((prev: any) => ({ ...prev, ...updates }));
  };

  return {
    preferences,
    updatePreferences
  };
}
import { useState, useCallback } from "react";
import { products, getUserLevel, getNextLevel } from "@/lib/gameData";
import { Product } from "@/components/ProductCard";
import { AuraLevel } from "@/components/AuraProgress";

export interface GameUser {
  emoji: string;
  auraPoints: number;
  level: AuraLevel;
  nextLevel?: AuraLevel;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variation?: string;
}

export const useGameState = () => {
  const [user, setUser] = useState<GameUser | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const login = useCallback((emoji: string, password: string) => {
    // Mock login - in real app, this would authenticate with backend
    const auraPoints = Math.floor(Math.random() * 5000); // Random points for demo
    const level = getUserLevel(auraPoints);
    const nextLevel = getNextLevel(level);
    
    setUser({
      emoji,
      auraPoints,
      level,
      nextLevel
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCart([]);
  }, []);

  const addToCart = useCallback((productId: string, variation?: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === productId && item.variation === variation
      );

      if (existingIndex >= 0) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        return [...prev, { product, quantity: 1, variation }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: string, variation?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === productId && item.variation === variation
      );

      if (existingIndex >= 0) {
        const newCart = [...prev];
        if (newCart[existingIndex].quantity > 1) {
          newCart[existingIndex].quantity -= 1;
        } else {
          newCart.splice(existingIndex, 1);
        }
        return newCart;
      }
      return prev;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      const price = item.variation && item.product.variaciones
        ? item.product.variaciones[item.variation].precio
        : item.product.bundle_precio || item.product.precio || 0;
      return total + (price * item.quantity);
    }, 0);
  }, [cart]);

  const getCartItemsCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const getProductQuantity = useCallback((productId: string, variation?: string) => {
    const item = cart.find(item => 
      item.product.id === productId && item.variation === variation
    );
    return item?.quantity || 0;
  }, [cart]);

  return {
    user,
    cart,
    login,
    logout,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getProductQuantity
  };
};
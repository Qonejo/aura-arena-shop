import React, { createContext, useContext } from "react";
import { useGameState } from "@/hooks/useGameState";

interface GameContextType {
  user: ReturnType<typeof useGameState>['user'];
  cart: ReturnType<typeof useGameState>['cart'];
  login: ReturnType<typeof useGameState>['login'];
  logout: ReturnType<typeof useGameState>['logout'];
  addToCart: ReturnType<typeof useGameState>['addToCart'];
  removeFromCart: ReturnType<typeof useGameState>['removeFromCart'];
  clearCart: ReturnType<typeof useGameState>['clearCart'];
  getCartTotal: ReturnType<typeof useGameState>['getCartTotal'];
  getCartItemsCount: ReturnType<typeof useGameState>['getCartItemsCount'];
  getProductQuantity: ReturnType<typeof useGameState>['getProductQuantity'];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const gameState = useGameState();
  
  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
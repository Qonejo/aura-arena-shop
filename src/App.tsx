import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { GameProvider } from "@/contexts/GameContext";
import { Login } from "./pages/Login";
import { Shop } from "./pages/Shop";
import { Levels } from "./pages/Levels";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
            {/* Public routes */}
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/shop" replace /> : 
                <Login onLoginSuccess={handleLoginSuccess} />
              } 
            />
            
            {/* Protected routes */}
            <Route 
              path="/shop" 
              element={
                isAuthenticated ? 
                <Shop /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/levels" 
              element={
                isAuthenticated ? 
                <Levels /> : 
                <Navigate to="/login" replace />
              } 
            />
            
            {/* Root redirect */}
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                <Navigate to="/shop" replace /> : 
                <Navigate to="/login" replace />
              } 
            />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </GameProvider>
    </QueryClientProvider>
  );
};

export default App;

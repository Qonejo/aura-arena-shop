import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Zap, Trophy } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface GameHeaderProps {
  userEmoji?: string;
  auraPoints?: number;
  currentLevel?: number;
  cartItemsCount?: number;
  onCartClick?: () => void;
  onProfileClick?: () => void;
}

export const GameHeader = ({
  userEmoji = "😀",
  auraPoints = 0,
  currentLevel = 0,
  cartItemsCount = 0,
  onCartClick,
  onProfileClick
}: GameHeaderProps) => {
  const location = useLocation();
  return (
    <header className="gaming-card sticky top-0 z-50 p-4 mb-6">
      <div className="flex items-center justify-between">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-6">
          <Link to="/shop" className="flex items-center gap-3">
            <div className="text-2xl font-pixel text-neon-green">⚡</div>
            <h1 className="text-lg font-pixel text-primary">CorakSmart</h1>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link to="/shop">
              <Button 
                variant={location.pathname === '/shop' ? 'gaming' : 'ghost'}
                size="sm"
                className="font-pixel text-xs"
              >
                🏪 TIENDA
              </Button>
            </Link>
            <Link to="/levels">
              <Button 
                variant={location.pathname === '/levels' ? 'level' : 'ghost'}
                size="sm"
                className="font-pixel text-xs"
              >
                🏆 NIVELES
              </Button>
            </Link>
          </nav>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          {/* Aura Points */}
          <div className="flex items-center gap-2 gaming-card p-2 aura-glow">
            <Zap className="w-4 h-4 text-neon-green" />
            <span className="text-sm font-pixel text-neon-green">{auraPoints}</span>
            <Badge variant="secondary" className="text-xs">
              LV.{currentLevel}
            </Badge>
          </div>

          {/* User Avatar */}
          <Button
            variant="outline"
            size="sm"
            onClick={onProfileClick}
            className="gaming-button"
          >
            <span className="text-lg mr-2">{userEmoji}</span>
            <User className="w-4 h-4" />
          </Button>

          {/* Cart */}
          <Button
            variant="outline"
            size="sm"
            onClick={onCartClick}
            className="gaming-button relative"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartItemsCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 text-xs min-w-[20px] h-5"
              >
                {cartItemsCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
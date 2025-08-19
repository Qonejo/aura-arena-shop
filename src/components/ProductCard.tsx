import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Zap } from "lucide-react";

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio?: number;
  stock: number;
  imagen: string;
  promocion?: boolean;
  bundle_precio?: number;
  variaciones?: Record<string, { precio: number; stock: number }>;
  aura_multiplier?: number;
}

interface ProductCardProps {
  product: Product;
  quantity?: number;
  onAddToCart: (productId: string, variation?: string) => void;
  onRemoveFromCart: (productId: string, variation?: string) => void;
}

export const ProductCard = ({ 
  product, 
  quantity = 0, 
  onAddToCart, 
  onRemoveFromCart 
}: ProductCardProps) => {
  const isBundle = product.bundle_precio !== undefined;
  const hasVariations = product.variaciones && Object.keys(product.variaciones).length > 0;
  const displayPrice = isBundle ? product.bundle_precio : product.precio;
  const isOutOfStock = product.stock === 0;
  const auraPoints = displayPrice ? Math.floor(displayPrice * (product.aura_multiplier || 3.0)) : 0;

  const parseDescription = (desc: string) => {
    return desc
      .replace(/<span class='amarillo'>(.*?)<\/span>/g, '<span class="text-neon-yellow">$1</span>')
      .replace(/<span class='verde'>(.*?)<\/span>/g, '<span class="text-neon-green">$1</span>');
  };

  return (
    <Card className={`gaming-card h-full flex flex-col ${product.promocion ? 'level-glow' : ''}`}>
      {/* Image */}
      <div className="relative">
        <div className="aspect-square bg-muted/20 rounded-t flex items-center justify-center">
          <span className="text-4xl">🎮</span> {/* Placeholder for product image */}
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          {product.promocion && (
            <Badge className="bg-gradient-level text-primary-foreground font-pixel text-xs">
              PROMO
            </Badge>
          )}
          {isBundle && (
            <Badge variant="secondary" className="font-pixel text-xs">
              PACK
            </Badge>
          )}
          {isOutOfStock && (
            <Badge variant="destructive" className="font-pixel text-xs">
              AGOTADO
            </Badge>
          )}
        </div>

        {/* Aura Points */}
        <div className="absolute top-2 right-2">
          <Badge className="bg-gradient-aura text-primary-foreground flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span className="text-xs font-pixel">+{auraPoints}</span>
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="font-pixel text-sm leading-relaxed">
          {product.nombre}
        </CardTitle>
        {product.descripcion && (
          <CardDescription 
            className="text-xs"
            dangerouslySetInnerHTML={{ __html: parseDescription(product.descripcion) }}
          />
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        {/* Price */}
        <div className="mb-4">
          {hasVariations ? (
            <div className="space-y-2">
              {Object.entries(product.variaciones!).map(([variation, data]) => (
                <div key={variation} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{variation}</span>
                  <span className="font-pixel text-neon-green">
                    ${data.precio}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xl font-pixel text-neon-green">
              ${displayPrice}
            </div>
          )}
        </div>

        {/* Stock */}
        <div className="mb-4">
          <Badge variant="outline" className="text-xs">
            Stock: {product.stock}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          {quantity > 0 ? (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onRemoveFromCart(product.id)}
                className="gaming-button"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="font-pixel text-sm min-w-[2ch] text-center">
                {quantity}
              </span>
              <Button
                size="sm"
                variant="default"
                onClick={() => onAddToCart(product.id)}
                disabled={isOutOfStock}
                className="gaming-button"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => onAddToCart(product.id)}
              disabled={isOutOfStock}
              className="gaming-button font-pixel text-xs"
            >
              AGREGAR
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
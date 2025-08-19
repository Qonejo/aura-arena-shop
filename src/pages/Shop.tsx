import { GameHeader } from "@/components/GameHeader";
import { ProductCard } from "@/components/ProductCard";
import { AuraProgress } from "@/components/AuraProgress";
import { products } from "@/lib/gameData";
import { useGame } from "@/contexts/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap } from "lucide-react";

export const Shop = () => {
  const { 
    user, 
    cart, 
    addToCart, 
    removeFromCart, 
    getCartTotal, 
    getCartItemsCount, 
    getProductQuantity 
  } = useGame();

  if (!user) return null;

  const promoProducts = products.filter(p => p.promocion);
  const regularProducts = products.filter(p => !p.promocion);
  const cartTotal = getCartTotal();
  const potentialAura = Math.floor(cartTotal * 3.0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <GameHeader
          userEmoji={user.emoji}
          auraPoints={user.auraPoints}
          currentLevel={user.level.level}
          cartItemsCount={getCartItemsCount()}
        />

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Shop Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Aura Progress */}
            <AuraProgress
              currentPoints={user.auraPoints}
              currentLevel={user.level}
              nextLevel={user.nextLevel}
            />

            {/* Promo Products */}
            {promoProducts.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-pixel text-neon-purple">🔥 PROMOCIONES</h2>
                  <Badge className="bg-gradient-level">HOT</Badge>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {promoProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantity={getProductQuantity(product.id)}
                      onAddToCart={addToCart}
                      onRemoveFromCart={removeFromCart}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Regular Products */}
            <section>
              <h2 className="text-xl font-pixel text-neon-green mb-4">⚡ INVENTARIO</h2>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {regularProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={getProductQuantity(product.id)}
                    onAddToCart={addToCart}
                    onRemoveFromCart={removeFromCart}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="gaming-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-pixel text-sm">
                    <ShoppingCart className="w-4 h-4" />
                    CARRITO
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-8">
                      Tu carrito está vacío
                    </p>
                  ) : (
                    <>
                      {/* Cart Items */}
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {cart.map((item, index) => {
                          const price = item.variation && item.product.variaciones
                            ? item.product.variaciones[item.variation].precio
                            : item.product.bundle_precio || item.product.precio || 0;
                          
                          return (
                            <div key={`${item.product.id}-${item.variation || 'default'}-${index}`} 
                                 className="flex justify-between items-center text-sm">
                              <div className="flex-1">
                                <div className="font-medium">{item.product.nombre}</div>
                                {item.variation && (
                                  <div className="text-xs text-muted-foreground">
                                    {item.variation}
                                  </div>
                                )}
                                <div className="text-xs text-neon-green">
                                  ${price} x {item.quantity}
                                </div>
                              </div>
                              <div className="font-pixel text-neon-green">
                                ${(price * item.quantity).toFixed(0)}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Cart Summary */}
                      <div className="border-t border-border pt-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-pixel text-sm">TOTAL:</span>
                          <span className="font-pixel text-lg text-neon-green">
                            ${cartTotal.toFixed(0)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-neon-green" />
                            <span>Aura:</span>
                          </div>
                          <span className="text-neon-green">+{potentialAura}</span>
                        </div>

                        <Button 
                          className="w-full gaming-button font-pixel text-xs"
                          disabled={cart.length === 0}
                        >
                          💳 FINALIZAR
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
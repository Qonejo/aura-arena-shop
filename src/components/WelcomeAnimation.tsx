import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WelcomeAnimationProps {
  userEmoji: string;
  onComplete: () => void;
}

export const WelcomeAnimation = ({ userEmoji, onComplete }: WelcomeAnimationProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 500);
    const timer2 = setTimeout(() => setStep(2), 1500);
    const timer3 = setTimeout(() => setStep(3), 2500);
    const timer4 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="gaming-card w-full max-w-md mx-4 level-glow">
        <CardContent className="p-8 text-center space-y-6">
          {/* User Avatar with animation */}
          <div className={`text-6xl transition-all duration-1000 ${step >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            {userEmoji}
          </div>

          {/* Welcome text */}
          <div className={`transition-all duration-1000 delay-500 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="font-pixel text-xl text-neon-green mb-2">
              ¡Bienvenido!
            </h2>
            <p className="text-muted-foreground">
              Iniciando CorakSmart...
            </p>
          </div>

          {/* Gaming elements */}
          <div className={`transition-all duration-1000 delay-1000 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-aura font-pixel text-xs">
                ⚡ SISTEMA AURA ACTIVADO
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Cargando inventario...
            </div>
          </div>

          {/* Loading bar */}
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-aura transition-all duration-3000 ease-out"
              style={{ width: step >= 1 ? '100%' : '0%' }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
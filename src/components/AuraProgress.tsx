import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Crown } from "lucide-react";

export interface AuraLevel {
  level: number;
  points_needed: number;
  name: string;
  flame_color: string;
  prize: string;
  character_size: number;
}

interface AuraProgressProps {
  currentPoints: number;
  currentLevel: AuraLevel;
  nextLevel?: AuraLevel;
  className?: string;
}

export const AuraProgress = ({ 
  currentPoints, 
  currentLevel, 
  nextLevel,
  className = "" 
}: AuraProgressProps) => {
  const progressPercentage = nextLevel 
    ? ((currentPoints - currentLevel.points_needed) / (nextLevel.points_needed - currentLevel.points_needed)) * 100
    : 100;

  const getFlameColor = (color: string) => {
    const colorMap: Record<string, string> = {
      white: "text-white",
      blue: "text-blue-400",
      green: "text-neon-green",
      yellow: "text-neon-yellow",
      orange: "text-orange-400",
      red: "text-red-400",
      purple: "text-neon-purple",
      black: "text-gray-800"
    };
    return colorMap[color] || "text-white";
  };

  return (
    <Card className={`gaming-card ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`text-2xl ${getFlameColor(currentLevel.flame_color)}`}>
              🔥
            </div>
            <span className="font-pixel text-sm">{currentLevel.name}</span>
          </div>
          <Badge className="bg-gradient-aura">
            LV.{currentLevel.level}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current Points */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-neon-green" />
            <span className="font-pixel text-lg text-neon-green">
              {currentPoints.toLocaleString()}
            </span>
          </div>
          {currentLevel.level > 0 && (
            <div className="flex items-center gap-1">
              <Crown className="w-4 h-4 text-neon-yellow" />
              <span className="text-xs text-muted-foreground">
                {currentLevel.prize}
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {nextLevel && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{currentLevel.points_needed.toLocaleString()}</span>
              <span>{nextLevel.points_needed.toLocaleString()}</span>
            </div>
            <Progress 
              value={Math.max(0, Math.min(100, progressPercentage))} 
              className="h-3 gaming-card"
            />
            <div className="text-center">
              <span className="text-xs font-pixel text-muted-foreground">
                {nextLevel.points_needed - currentPoints > 0 
                  ? `${(nextLevel.points_needed - currentPoints).toLocaleString()} para ${nextLevel.name}`
                  : "¡Nivel completado!"
                }
              </span>
            </div>
          </div>
        )}

        {/* Max Level */}
        {!nextLevel && currentLevel.level > 0 && (
          <div className="text-center">
            <Badge className="bg-gradient-level font-pixel">
              ¡NIVEL MÁXIMO ALCANZADO!
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
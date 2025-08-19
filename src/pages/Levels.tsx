import { GameHeader } from "@/components/GameHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { auraLevels } from "@/lib/gameData";
import { useGame } from "@/contexts/GameContext";
import { Crown, Lock, CheckCircle, Zap } from "lucide-react";

export const Levels = () => {
  const { user, getCartItemsCount } = useGame();

  if (!user) return null;

  const getFlameEmoji = (color: string) => {
    const flameMap: Record<string, string> = {
      white: "⚪",
      blue: "🔵", 
      green: "🟢",
      yellow: "🟡",
      orange: "🟠",
      red: "🔴",
      purple: "🟣",
      black: "⚫"
    };
    return flameMap[color] || "🔥";
  };

  const getStatusIcon = (level: typeof auraLevels[0]) => {
    if (user.auraPoints >= level.points_needed) {
      return <CheckCircle className="w-5 h-5 text-neon-green" />;
    } else if (level.level === user.level.level + 1) {
      return <Zap className="w-5 h-5 text-neon-yellow animate-pulse" />;
    } else {
      return <Lock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getLevelProgress = (level: typeof auraLevels[0]) => {
    if (user.auraPoints >= level.points_needed) return 100;
    
    const prevLevel = auraLevels[level.level - 1] || { points_needed: 0 };
    const progress = ((user.auraPoints - prevLevel.points_needed) / (level.points_needed - prevLevel.points_needed)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <GameHeader
          userEmoji={user.emoji}
          auraPoints={user.auraPoints}
          currentLevel={user.level.level}
          cartItemsCount={getCartItemsCount()}
        />

        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-pixel text-neon-purple">🏆 NIVELES DE AURA</h1>
            <p className="text-muted-foreground">
              Gana puntos comprando productos y desbloquea recompensas épicas
            </p>
          </div>

          {/* Current Level Highlight */}
          <Card className="gaming-card level-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{getFlameEmoji(user.level.flame_color)}</div>
                  <div>
                    <CardTitle className="font-pixel text-lg">
                      Nivel Actual: {user.level.name}
                    </CardTitle>
                    <CardDescription>
                      {user.auraPoints.toLocaleString()} puntos de aura
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-gradient-level font-pixel">
                  LV.{user.level.level}
                </Badge>
              </div>
            </CardHeader>
            
            {user.nextLevel && (
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso al siguiente nivel</span>
                    <span className="font-pixel text-neon-green">
                      {((user.auraPoints - user.level.points_needed) / (user.nextLevel.points_needed - user.level.points_needed) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={getLevelProgress(user.nextLevel)} 
                    className="h-3 gaming-card"
                  />
                  <div className="text-xs text-muted-foreground text-center">
                    {(user.nextLevel.points_needed - user.auraPoints).toLocaleString()} puntos para {user.nextLevel.name}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* All Levels */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {auraLevels.map((level) => {
              const isUnlocked = user.auraPoints >= level.points_needed;
              const isCurrent = level.level === user.level.level;
              const isNext = level.level === user.level.level + 1;

              return (
                <Card 
                  key={level.level} 
                  className={`gaming-card transition-all duration-300 ${
                    isCurrent ? 'level-glow scale-105' : 
                    isUnlocked ? 'aura-glow' : 
                    'opacity-75'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl" style={{ fontSize: `${level.character_size / 2}px` }}>
                          {getFlameEmoji(level.flame_color)}
                        </div>
                        <div>
                          <CardTitle className="font-pixel text-sm">
                            {level.name}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            Nivel {level.level}
                          </CardDescription>
                        </div>
                      </div>
                      {getStatusIcon(level)}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* Points Required */}
                    <div className="flex justify-between items-center text-sm">
                      <span>Puntos requeridos:</span>
                      <span className="font-pixel text-neon-green">
                        {level.points_needed.toLocaleString()}
                      </span>
                    </div>

                    {/* Prize */}
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-neon-yellow" />
                      <span className="text-sm font-medium">{level.prize}</span>
                    </div>

                    {/* Progress for next level */}
                    {!isUnlocked && level.level > 0 && (
                      <div className="space-y-1">
                        <Progress 
                          value={getLevelProgress(level)} 
                          className="h-2"
                        />
                        <div className="text-xs text-muted-foreground text-center">
                          {getLevelProgress(level).toFixed(1)}% completo
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    {isUnlocked && level.level > 0 && level.prize !== "-" && (
                      <Button 
                        size="sm" 
                        className="w-full gaming-button font-pixel text-xs"
                        variant={isCurrent ? "default" : "secondary"}
                      >
                        {isCurrent ? "🎁 RECLAMAR" : "✅ OBTENIDO"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
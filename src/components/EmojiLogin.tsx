import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import MatrixBackground from "./MatrixBackground";

const availableEmojis = ["😀", "😺", "🦊", "🐼", "🐨", "🐸", "🐵", "🐯", "🐶", "🐰"];

interface EmojiLoginProps {
  onLogin: (emoji: string, password: string) => void;
}

export const EmojiLogin = ({ onLogin }: EmojiLoginProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (selectedEmoji && password) {
      onLogin(selectedEmoji, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <MatrixBackground />
      <Card className="gaming-card w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-4xl mb-4">⚡</div>
          <CardTitle className="font-pixel text-2xl text-neon-green">
            CorakSmart
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Selecciona tu avatar y entra a la tienda
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Emoji Selection */}
          <div className="space-y-3">
            <Label className="font-pixel text-sm">Elige tu emoji</Label>
            <div className="grid grid-cols-5 gap-2">
              {availableEmojis.map((emoji) => (
                <Button
                  key={emoji}
                  variant={selectedEmoji === emoji ? "default" : "outline"}
                  className={`gaming-button aspect-square text-2xl p-0 ${
                    selectedEmoji === emoji ? "aura-glow" : ""
                  }`}
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="font-pixel text-sm">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="gaming-card"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            disabled={!selectedEmoji || !password}
            className="w-full gaming-button font-pixel text-sm"
          >
            ⚡ ENTRAR ⚡
          </Button>

          {/* Info */}
          <div className="text-center">
            <Badge variant="secondary" className="text-xs">
              Tienda privada - Solo usuarios autorizados
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
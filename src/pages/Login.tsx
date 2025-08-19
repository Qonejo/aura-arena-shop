import { EmojiLogin } from "@/components/EmojiLogin";
import { WelcomeAnimation } from "@/components/WelcomeAnimation";
import { useGame } from "@/contexts/GameContext";
import { useEffect, useState } from "react";

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login = ({ onLoginSuccess }: LoginProps) => {
  const { login, user } = useGame();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (user && !showWelcome) {
      setShowWelcome(true);
    }
  }, [user, showWelcome]);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    onLoginSuccess();
  };

  const handleLogin = async (emoji: string, password: string) => {
    // Mock authentication - in real app this would call backend
    try {
      login(emoji, password);
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error - show toast notification
    }
  };

  return (
    <>
      <EmojiLogin onLogin={handleLogin} />
      {showWelcome && user && (
        <WelcomeAnimation 
          userEmoji={user.emoji} 
          onComplete={handleWelcomeComplete}
        />
      )}
    </>
  );
};
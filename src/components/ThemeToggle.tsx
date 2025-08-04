import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="hover:bg-transparent"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-bank-dark-text transition-all" />
      ) : (
        <Sun className="h-5 w-5 text-bank-gold transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

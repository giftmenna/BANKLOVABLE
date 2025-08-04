import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./ThemeProvider";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <ThemeProvider>
      <div className={cn("min-h-screen bg-background font-sans antialiased", className)}>
        {children}
        <Toaster position="top-right" />
      </div>
    </ThemeProvider>
  );
}

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./ui/theme-provider";

export default function Layout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background font-sans antialiased">
        <main>{children}</main>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}


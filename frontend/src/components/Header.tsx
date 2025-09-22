import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_rfcc.webp";
import React from 'react';

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || "http://localhost:8080/admin";

interface HeaderProps {
  adminMode?: boolean;
  onNavigateHome?: () => void; // optional callback
}

const Header: React.FC<HeaderProps> = ({ adminMode = false, onNavigateHome }) => {
  // Helper to navigate back to landing page
  const goHome = () => {
    if (onNavigateHome) onNavigateHome();
    window.location.href = '/';
  };

  // In adminMode any navigation should return to landing page
  const handleNavClick = (e: React.MouseEvent, action?: () => void) => {
    e.preventDefault();
    if (adminMode) {
      goHome();
      return;
    }
    if (action) action();
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={goHome}
            className="flex items-center gap-2 focus:outline-none"
            aria-label="Voltar para página inicial"
          >
            <img src={logo} alt="RFCC Logo" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold text-foreground">RFCC.PB</span>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              onClick={(e) => handleNavClick(e)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Quem somos
            </a>
            <a
              href="#"
              onClick={(e) => handleNavClick(e)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Notícias
            </a>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground transition-colors"
              type="button"
              onClick={(e) => adminMode ? goHome() : (window.location.href = 'https://rede-feminina-colab.onrender.com/')}
            >
              Bazar
            </Button>
            <a
              href="#"
              onClick={(e) => handleNavClick(e)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Ajuda
            </a>
            {!adminMode && (
              <Button
                variant="outline"
                className="text-muted-foreground hover:text-foreground transition-colors"
                type="button"
                onClick={() => window.location.href = ADMIN_URL}
              >
                Login
              </Button>
            )}
          </nav>
          {adminMode && (
            <Button className="btn-primary" onClick={() => goHome()}>
              Voltar
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
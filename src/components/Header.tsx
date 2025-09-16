import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_rfcc.webp";

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="RFCC Logo" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold text-foreground">RFCC.PB</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Quem somos
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Notícias
            </a>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground transition-colors" type="button" onClick={() => window.location.href = 'https://rede-feminina-colab.onrender.com/'}>
              Bazar
            </Button>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Ajuda
            </a>
          </nav>

          {/* CTA Button */}
          <Button className="btn-primary">
            Doar
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
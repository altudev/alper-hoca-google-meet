"use client";

import { Video } from "lucide-react";

interface HeaderProps {
  onFeatureClick?: () => void;
  onAboutClick?: () => void;
  onLoginClick?: () => void;
}

export default function Header({ onFeatureClick, onAboutClick, onLoginClick }: HeaderProps) {
  const handleFeatureClick = () => {
    console.log("Features clicked");
    onFeatureClick?.();
    // In a real app, this would scroll to features section or navigate to features page
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutClick = () => {
    console.log("About clicked");
    onAboutClick?.();
    // In a real app, this would navigate to about page
    alert("AlperMeet - Google Meet benzeri video konferans uygulaması");
  };

  const handleLoginClick = () => {
    console.log("Login clicked");
    onLoginClick?.();
    // In a real app, this would open login modal or redirect to login page
    alert("Giriş özelliği yakında gelecek!");
  };

  return (
    <header className="border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="h-8 w-8 text-primary" aria-hidden="true" />
          <span className="text-xl font-semibold">AlperMeet</span>
        </div>
        <nav className="flex items-center gap-6" aria-label="Ana navigasyon">
          <button 
            onClick={handleFeatureClick}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Özellikler bölümüne git"
          >
            Özellikler
          </button>
          <button 
            onClick={handleAboutClick}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Hakkında sayfasına git"
          >
            Hakkında
          </button>
          <button 
            onClick={handleLoginClick}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            aria-label="Giriş yap"
          >
            Giriş Yap
          </button>
        </nav>
      </div>
    </header>
  );
}
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const [pricingData, setPricingData] = useState({
    sectionSubtitle: "SUA AJUDA FAZ A DIFERENÇA",
    title: "Apoie. Inspire. Transforme vidas.",
    description: "Faça uma doação única via Pix ou depósito bancário e ajude a transformar vidas. Juntos, somos mais fortes.",
    donationTitle: "Doações Esporádicas",
    donationDescription: "Faça uma doação única via Pix ou depósito bancário e ajude a transformar vidas.",
    donationCardTitle: "Contribua de forma rápida e segura",
    donationCardDescription: "Sua doação vai direto para quem mais precisa. Cada real faz a diferença na vida de quem enfrenta o câncer.",
    buttonText: "Doar agora via Pix",
    buttonLink: "#"
  });

  useEffect(() => {
    fetchPricingData();
  }, []);

  const fetchPricingData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/content/pricing');
      if (response.ok) {
        const data = await response.json();
        setPricingData(data);
      }
    } catch (error) {
      console.error('Error fetching pricing data:', error);
      // Keep default values on error
    }
  };

  const handleButtonClick = () => {
    if (pricingData.buttonLink && pricingData.buttonLink !== '#') {
      if (pricingData.buttonLink.startsWith('http')) {
        window.open(pricingData.buttonLink, '_blank');
      } else {
        window.location.href = pricingData.buttonLink;
      }
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
            {pricingData.sectionSubtitle}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {pricingData.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {pricingData.description}
          </p>
        </div>

        {/* Donations Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              {pricingData.donationTitle}
            </h3>
            <p className="text-lg text-muted-foreground">
              {pricingData.donationDescription}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
            <h4 className="text-xl font-semibold text-foreground mb-4">
              {pricingData.donationCardTitle}
            </h4>
            <p className="text-muted-foreground mb-6">
              {pricingData.donationCardDescription}
            </p>
            <Button 
              className="btn-primary text-lg px-8 py-4" 
              type="button"
              onClick={handleButtonClick}
            >
              {pricingData.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
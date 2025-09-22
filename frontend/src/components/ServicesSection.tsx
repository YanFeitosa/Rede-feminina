import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const [servicesData, setServicesData] = useState({
    title: "Transformamos dor em força",
    description: "Acolhimento, informação e esperança para quem enfrenta o câncer. Descubra nossos serviços, participe das ações e faça parte dessa rede de apoio e solidariedade.",
    buttonText: "Bazar solidário",
    buttonLink: "https://rede-feminina-colab.onrender.com/"
  });

  useEffect(() => {
    fetchServicesData();
  }, []);

  const fetchServicesData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/content/services');
      if (response.ok) {
        const data = await response.json();
        setServicesData(data);
      }
    } catch (error) {
      console.error('Error fetching services data:', error);
      // Keep default values on error
    }
  };

  const handleButtonClick = () => {
    if (servicesData.buttonLink) {
      if (servicesData.buttonLink.startsWith('http')) {
        window.open(servicesData.buttonLink, '_blank');
      } else {
        window.location.href = servicesData.buttonLink;
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {servicesData.title}
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8">
              {servicesData.description}
            </p>
            
            <Button 
              className="btn-primary text-xl px-12 py-8" 
              type="button" 
              onClick={handleButtonClick}
            >
              {servicesData.buttonText}
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
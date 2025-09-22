import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import img01 from "@/assets/img_01.png";
import img02 from "@/assets/img_02.png";
import img03 from "@/assets/img_03.png";
import img04 from "@/assets/img_04.png";
import img05 from "@/assets/img_05.png";
import img06 from "@/assets/img_06.png";

const HeroSection = () => {
  const [heroData, setHeroData] = useState({
    title: "Juntos por vidas",
    subtitle: "mais fortes",
    description: "Acolhimento, prevenção e esperança para quem enfrenta o câncer. Faça parte dessa rede de apoio, participe das ações e conheça o Bazar solidário.",
    buttonText: "Contribua",
    buttonLink: "#",
    images: []
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fallback images in case API doesn't have images or fails
  const fallbackImages = [
    { src: img01, alt: "Rede Feminina - Atividade 1" },
    { src: img02, alt: "Rede Feminina - Atividade 2" },
    { src: img03, alt: "Rede Feminina - Atividade 3" },
    { src: img04, alt: "Rede Feminina - Atividade 4" },
    { src: img05, alt: "Rede Feminina - Atividade 5" },
    { src: img06, alt: "Rede Feminina - Atividade 6" },
  ];

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/content/hero');
      if (response.ok) {
        const data = await response.json();
        setHeroData(data);
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
      // Keep default values on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (heroData.buttonLink && heroData.buttonLink !== '#') {
      if (heroData.buttonLink.startsWith('http')) {
        window.open(heroData.buttonLink, '_blank');
      } else {
        window.location.href = heroData.buttonLink;
      }
    }
  };

  // Use API images if available, otherwise use fallback images
  const imagesToDisplay = heroData.images && heroData.images.length > 0 
    ? heroData.images.map(img => ({
        src: `http://localhost:3001${img.url}`,
        alt: img.alt
      }))
    : fallbackImages;

  return (
    <section className="min-h-screen bg-gradient-warm py-16 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {heroData.title}
              <br />
              <span className="text-primary">{heroData.subtitle}</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              {heroData.description}
            </p>

            <Button 
              className="btn-primary text-lg px-10 py-6"
              onClick={handleButtonClick}
            >
              {heroData.buttonText}
            </Button>
          </div>

          {/* Dynamic Images Grid */}
          <div className="grid grid-cols-2 gap-4 h-[600px]">
            {imagesToDisplay.slice(0, 6).map((image, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
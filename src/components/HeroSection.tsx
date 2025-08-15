import { Button } from "@/components/ui/button";
import heroYoga from "@/assets/hero-yoga.jpg";
import heroMedical from "@/assets/hero-medical.jpg";
import heroVolunteers from "@/assets/hero-volunteers.jpg";
import heroFacility from "@/assets/hero-facility.jpg";
import heroTeam from "@/assets/hero-team.jpg";
import heroEducation from "@/assets/hero-education.jpg";

const HeroSection = () => {
  const images = [
    { src: heroYoga, alt: "Yoga em grupo" },
    { src: heroMedical, alt: "Consulta médica" },
    { src: heroVolunteers, alt: "Voluntárias" },
    { src: heroFacility, alt: "Instalações" },
    { src: heroTeam, alt: "Equipe médica" },
    { src: heroEducation, alt: "Educação" },
  ];

  return (
    <section className="min-h-screen bg-gradient-warm py-16 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Juntas por vidas
              <br />
              <span className="text-primary">mais fortes</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Acolhimento, prevenção e esperança para quem
              enfrenta o câncer. Faça parte dessa rede de
              apoio, participe das ações e conheça nossa loja
              solidária com produtos feitos por pacientes.
            </p>

            <Button className="btn-primary text-lg px-10 py-6">
              Contribua
            </Button>
          </div>

          {/* Static Images Grid */}
          <div className="grid grid-cols-2 gap-4 h-[600px]">
            {images.map((image, index) => (
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
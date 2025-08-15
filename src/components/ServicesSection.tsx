import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Gift, Sparkles, ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Produtos feitos com amor",
      description: "Compre peças criadas por pacientes e voluntárias. Cada compra fortalece nossos projetos e ações.",
      action: "Comprar",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Doações especiais",
      description: "Encontre itens doados por parceiros e comunidade. Sua compra mantém nossos serviços gratuitos.",
      action: "Apoie",
    },
    {
      icon: <Gift className="w-8 h-8 text-primary" />,
      title: "Presentes que transformam",
      description: "Escolha presentes que fazem a diferença. Surpreenda alguém e ajude a mudar vidas.",
      action: "Conferir",
    },
  ];

  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Juntas, vencemos o câncer
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8">
              Acolhimento, informação e esperança para quem enfrenta o câncer.
              Descubra nossos serviços, participe das ações e faça parte dessa rede de
              apoio e solidariedade.
            </p>
            
            <Button className="btn-primary text-xl px-12 py-8">
              Loja solidária
            </Button>
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-soft hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center space-y-6">
                <div className="flex justify-center">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                <Button variant="ghost" className="group">
                  {service.action}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
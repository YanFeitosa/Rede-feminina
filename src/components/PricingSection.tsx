import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Plano Essencial",
      description: "Apoio inicial, escuta e informações para quem começa a jornada.",
      price: "R$19",
      period: "/mês",
      annual: "ou R$199 anual",
      features: [
        "Acolhimento humano",
        "Conteúdo educativo",
        "Convite para eventos"
      ],
      highlight: false
    },
    {
      name: "Plano Bem-Estar",
      description: "Oficinas, grupos de conversa e suporte emocional ampliado.",
      price: "R$29",
      period: "/mês",
      annual: "ou R$299 anual",
      features: [
        "Oficinas terapêuticas",
        "Grupos de apoio",
        "Acompanhamento psicológico",
        "Atividades de bem-estar",
        "Prioridade em eventos"
      ],
      highlight: true
    },
    {
      name: "Plano Esperança",
      description: "Todos os benefícios anteriores, mais suporte social e jurídico.",
      price: "R$49",
      period: "/mês",
      annual: "ou R$499 anual",
      features: [
        "Suporte social",
        "Orientação jurídica",
        "Apoio nutricional",
        "Acompanhamento personalizado",
        "Campanhas solidárias",
        "Acesso ao bazar"
      ],
      highlight: false
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
            SUA AJUDA FAZ A DIFERENÇA
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Apoie. Inspire. Transforme vidas.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Escolha um plano e faça parte dessa rede de cuidado, acolhimento e
            esperança para quem enfrenta o câncer. Juntos, somos mais fortes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${
                plan.highlight 
                  ? 'border-primary shadow-soft scale-105' 
                  : 'border-border'
              } transition-all duration-300 hover:shadow-card`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Recomendado
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-semibold mb-2">
                  {plan.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-foreground">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.annual}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button 
                  className={`w-full transition-all duration-300 ${
                    plan.highlight 
                      ? 'btn-primary' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105 hover:shadow-lg'
                  }`}
                >
                  Doar
                </Button>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {index === 0 ? 'INCLUI:' : 
                     index === 1 ? 'TUDO DO ESSENCIAL +' :
                     index === 2 ? 'TUDO DO BEM-ESTAR +' :
                     'INCLUI TODOS OS BENEFÍCIOS +'}
                  </p>
                  
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Donations Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Doações Esporádicas
            </h3>
            <p className="text-lg text-muted-foreground">
              Faça uma doação única via Pix ou depósito bancário e ajude a transformar vidas.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
            <h4 className="text-xl font-semibold text-foreground mb-4">
              Contribua de forma rápida e segura
            </h4>
            <p className="text-muted-foreground mb-6">
              Sua doação vai direto para quem mais precisa. Cada real faz a diferença na vida de quem enfrenta o câncer.
            </p>
            <Button className="btn-primary text-lg px-8 py-4">
              Doar agora via Pix
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
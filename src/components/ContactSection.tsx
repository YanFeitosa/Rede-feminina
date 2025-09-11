import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "E-mail",
      description: "Mande sua mensagem, queremos ouvir você.",
      info: "contato@redefeminina.org"
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Telefone", 
      description: "Segunda a quinta: 8h às 17h\nSexta: 7h às 12:30h\nSábado e domingo: fechado",
      info: "(083) 3241-5373"
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Endereço",
      description: "Venha nos visitar e conhecer nosso espaço.",
      info: "Av. Doze de Outubro, 858 -\nJaguaribe, João Pessoa"
    }
  ];

  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => (
            <Card key={index} className="card-soft text-center">
              <CardContent className="p-8 space-y-4">
                <div className="flex justify-center">
                  {method.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-foreground">
                  {method.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {method.description}
                </p>
                
                <div className="text-foreground font-medium whitespace-pre-line">
                  {method.title === "Telefone" ? (
                    <div className="flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5 text-green-500" />
                      <span>{method.info}</span>
                    </div>
                  ) : (
                    <span>{method.info}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Donations Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Contribua via Pix ou Depósito Bancário
            </h3>
            <p className="text-lg text-muted-foreground">
              Faça doações únicas ou periódicas e ajude a manter nossos projetos ativos. Sua contribuição faz a diferença na vida de quem enfrenta o câncer.
            </p>
          </div>
          
          <div className="bg-white/50 rounded-2xl p-8 text-center shadow-soft">
            <h4 className="text-xl font-semibold text-foreground mb-4">
              Formas de Contribuir
            </h4>
            <p className="text-muted-foreground mb-6">
              Escolha a forma que preferir: doação única via Pix para agilidade ou depósito bancário para contribuições maiores. Toda ajuda é bem-vinda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Doar via Pix
              </button>
              <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors">
                Depósito Bancário
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
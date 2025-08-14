import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

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
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
            FALE COM A GENTE
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Acolhimento começa aqui
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos ao seu lado em cada etapa. Tire dúvidas, peça
            orientação ou participe das nossas ações de apoio e prevenção.
          </p>
        </div>

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
                
                <p className="text-foreground font-medium whitespace-pre-line">
                  {method.info}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
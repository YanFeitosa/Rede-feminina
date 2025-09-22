import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const [contactData, setContactData] = useState({
    contactMethods: [
      {
        type: "email",
        title: "E-mail",
        description: "Mande sua mensagem, queremos ouvir você.",
        info: "contato@redefeminina.org"
      },
      {
        type: "phone",
        title: "Telefone", 
        description: "Segunda a quinta: 8h às 17h\nSexta: 7h às 12:30h\nSábado e domingo: fechado",
        info: "(083) 3241-5373"
      },
      {
        type: "address",
        title: "Endereço",
        description: "Venha nos visitar e conhecer nosso espaço.",
        info: "Av. Doze de Outubro, 858 -\nJaguaribe, João Pessoa"
      }
    ]
  });

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/content/contact');
      if (response.ok) {
        const data = await response.json();
        setContactData(data);
      }
    } catch (error) {
      console.error('Error fetching contact data:', error);
      // Keep default values on error
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'email':
        return <Mail className="w-6 h-6 text-primary" />;
      case 'phone':
        return <Phone className="w-6 h-6 text-primary" />;
      case 'address':
        return <MapPin className="w-6 h-6 text-primary" />;
      default:
        return <Mail className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactData.contactMethods.map((method, index) => (
            <Card key={index} className="card-soft text-center">
              <CardContent className="p-8 space-y-4">
                <div className="flex justify-center">
                  {getIcon(method.type)}
                </div>
                
                <h3 className="text-xl font-semibold text-foreground">
                  {method.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {method.description}
                </p>
                
                <div className="text-foreground font-medium whitespace-pre-line">
                  {method.type === "phone" ? (
                    <div className="flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5 text-green-500" />
                      <span>{method.info}</span>
                    </div>
                  ) : (
                    method.info
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
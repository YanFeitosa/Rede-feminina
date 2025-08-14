import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Como posso receber apoio?",
      answer: "Oferecemos escuta, orientação e suporte prático para pacientes e familiares. Fale conosco para saber como participar das atividades e acessar nossos serviços."
    },
    {
      question: "Como posso ser voluntário(a)?",
      answer: "Seja parte dessa rede! Doe seu tempo, talento ou carinho. Preencha o formulário e venha transformar vidas junto com a gente."
    },
    {
      question: "Como funcionam as doações?",
      answer: "Aceitamos roupas, alimentos, itens de higiene e artesanato. Tudo é destinado a quem precisa ou vendido para manter nossos projetos ativos."
    },
    {
      question: "Posso comprar produtos solidários?",
      answer: "Sim! Nossa loja oferece peças feitas por pacientes e voluntárias. Cada compra apoia nossos projetos e fortalece quem enfrenta o câncer."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Title and CTA */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Perguntas frequentes, respostas acolhedoras
              </h2>
              <p className="text-lg text-muted-foreground">
                Tire suas dúvidas sobre apoio, voluntariado,
                doações e nossa loja solidária. Estamos aqui
                para ajudar você e sua família em cada etapa.
              </p>
            </div>
            
            <Button className="btn-primary">
              Confira
            </Button>
          </div>

          {/* Right Column - FAQ */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-muted/50 rounded-lg">
                    <span className="font-medium text-foreground">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
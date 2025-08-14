import { Card, CardContent } from "@/components/ui/card";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rafaela Nunes",
      text: "O cuidado das voluntárias me acolheu nos dias mais difíceis. Senti que não estava sozinha e ganhei forças para seguir lutando.",
      avatar: testimonial1
    },
    {
      name: "Gabriel Tavares", 
      text: "Recebi apoio verdadeiro e esperança renovada. Minha família e eu fomos abraçados por uma rede de carinho durante todo o tratamento.",
      avatar: testimonial2
    }
  ];

  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
            VOZES DE SUPERAÇÃO E ESPERANÇA
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Juntos, somos mais fortes
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Descubra relatos emocionantes de quem encontrou acolhimento, força e
            carinho em nossa rede. Essas experiências mostram como o apoio
            transforma vidas e inspira novas jornadas de coragem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-soft">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground">
                  {testimonial.name}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
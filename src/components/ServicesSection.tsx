import { Button } from "@/components/ui/button";

const ServicesSection = () => {

  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Transformamos dor em força
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8">
              Acolhimento, informação e esperança para quem enfrenta o câncer.
              Descubra nossos serviços, participe das ações e faça parte dessa rede de
              apoio e solidariedade.
            </p>
            
            <Button className="btn-primary text-xl px-12 py-8" type="button" onClick={() => { console.log('Bazar clicked'); window.location.href = 'https://rede-feminina-colab.onrender.com/'; }}>
              Bazar solidário
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
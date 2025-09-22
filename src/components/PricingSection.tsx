import { Button } from "@/components/ui/button";

// Esta seção agora exibe apenas a área de doações esporádicas (planos removidos conforme solicitado)
const PricingSection = () => {

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
            Faça uma doação única via Pix ou depósito bancário e ajude a transformar vidas. Juntos, somos mais fortes.
          </p>
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
            <Button className="btn-primary text-lg px-8 py-4" type="button">
              Doar agora via Pix
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
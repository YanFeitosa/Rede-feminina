const PartnersSection = () => {
  const partners = [
    "LOGO", "EGGS", "THE PAAK",
    "IDEA", "360LAB", "ECHOES"
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Unidas pela esperança e cuidado
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Acolhemos, informamos e inspiramos quem enfrenta o
            câncer. Aqui, cada história importa: oferecemos apoio,
            prevenção e oportunidades para transformar vidas.
            Junte-se a uma rede de solidariedade, onde cada
            gesto faz a diferença e fortalece nossa comunidade.
          </p>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="w-32 h-16 bg-muted rounded-lg flex items-center justify-center text-muted-foreground font-semibold"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
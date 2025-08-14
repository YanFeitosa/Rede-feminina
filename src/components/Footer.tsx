const Footer = () => {
  const footerSections = [
    {
      title: "Quem somos",
      links: ["Nossa história", "Propósito", "Time"]
    },
    {
      title: "Apoio", 
      links: ["Projetos", "Eventos", "Doações"]
    },
    {
      title: "Serviços",
      links: ["Atendimento", "Prevenção", "Orientação"]
    },
    {
      title: "Loja",
      links: ["Produtos", "Artesanato", "Presentes"]
    }
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4 text-background">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-background/70 hover:text-background transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/70 text-sm">
            © 2024 Rede Feminina. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
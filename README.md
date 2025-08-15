# 🌸 Rede Feminina - Site Institucional

Um site moderno e responsivo para a ONG Rede Feminina, dedicada ao acolhimento, prevenção e apoio a pessoas que enfrentam o câncer.

## 🎯 Sobre o Projeto

A Rede Feminina é uma organização que oferece acolhimento humano, informações sobre prevenção e uma rede de apoio solidário para quem enfrenta o câncer. Este site apresenta os serviços da ONG, planos de apoio e facilita o contato com a comunidade.

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool rápido e moderno
- **TailwindCSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis e customizáveis
- **Lucide React** - Ícones modernos e consistentes
- **React Router** - Roteamento para SPA

### 📦 Principais Dependências

```json
{
  "react": "^18.3.1",
  "typescript": "^5.8.3",
  "vite": "^5.4.19",
  "tailwindcss": "^3.4.17",
  "@radix-ui/react-*": "Componentes UI",
  "lucide-react": "^0.462.0"
}
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/YanFeitosa/Rede-feminina.git
   cd Rede-feminina
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute em modo desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:8080
   ```

### 📋 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview da build
npm run lint     # Verificação de código
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── ui/              # Componentes base (shadcn/ui)
│   ├── Header.tsx       # Cabeçalho e navegação
│   ├── HeroSection.tsx  # Seção principal
│   ├── ServicesSection.tsx    # Serviços da ONG
│   ├── PartnersSection.tsx    # Parceiros e sobre
│   ├── PricingSection.tsx     # Planos de apoio
│   ├── TestimonialsSection.tsx # Depoimentos
│   ├── FAQSection.tsx         # Perguntas frequentes
│   ├── ContactSection.tsx     # Contato
│   └── Footer.tsx             # Rodapé
├── pages/               # Páginas da aplicação
├── hooks/               # Custom hooks
├── lib/                 # Utilitários
└── assets/              # Imagens e recursos
```

### 🏠 Hero Section
- Apresentação da missão da ONG
- Call-to-action principal
- Grid de imagens representativas

### 🛍️ Services Section
- Loja solidária em destaque
- Produtos feitos por pacientes
- Botão ampliado para maior conversão

### 🤝 Partners Section
- Informações sobre a ONG
- Missão e valores
- Rede de apoio

### 💝 Pricing Section
- 4 planos de apoio diferentes
- Benefícios detalhados
- Botões de doação com hover effects

### 💬 Testimonials Section
- Depoimentos reais
- Histórias inspiradoras
- Carrossel responsivo

### ❓ FAQ Section
- Perguntas frequentes
- Accordion interativo
- Informações essenciais

### 📞 Contact Section
- WhatsApp com ícone visual
- E-mail institucional
- Endereço físico
- Horários de funcionamento

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npm run build
# Deploy automático via GitHub
```

### Netlify
```bash
npm run build
# Upload da pasta dist/
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contato

**Rede Feminina**
- 📧 Email: contato@redefeminina.org
- 📱 WhatsApp: (083) 3241-5373
- 📍 Endereço: Av. Doze de Outubro, 858 - Jaguaribe, João Pessoa

---

<div align="center">
  <p>Feito com ❤️ para apoiar quem enfrenta o câncer</p>
  <p><strong>Juntas por vidas mais fortes</strong></p>
</div>

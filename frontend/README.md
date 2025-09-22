# Rede Feminina - Frontend

Interface React/TypeScript com painel administrativo para gerenciamento de conteúdo da landing page.

## 🛠️ Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápido
- **TailwindCSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos
- **React Router** - Roteamento SPA
- **React Query** - Gerenciamento de estado do servidor

## 🚀 Instalação e Execução

```bash
# Instalar dependências
bun install

# Executar em modo desenvolvimento
bun dev

# Build para produção
bun build

# Preview do build de produção
bun preview
```

## 📁 Estrutura

```
src/
├── components/          # Componentes reutilizáveis
│   ├── admin/          # Componentes do painel admin
│   └── ui/             # Componentes shadcn/ui
├── pages/              # Páginas da aplicação
│   └── admin/          # Páginas do painel admin
├── hooks/              # Custom hooks
├── lib/                # Utilitários
└── assets/             # Assets estáticos
```

## 🎯 Funcionalidades

### Landing Page Pública
- ✅ Seção Hero dinâmica
- ✅ Seção de Serviços
- ✅ Seção de Doações/Pricing
- ✅ Seção de Contato
- ✅ Design responsivo
- ✅ Carregamento dinâmico via API

### Painel Administrativo (/admin)
- ✅ Login/logout seguro
- ✅ Editor da seção Hero
- ✅ Editor da seção de Serviços
- ✅ Editor da seção de Doações
- ✅ Editor da seção de Contato
- ✅ Gerenciador de imagens
- ✅ Interface com tabs
- ✅ Validação de formulários
- ✅ Feedback visual (toasts)

## 🔧 Configuração

### Variáveis de Ambiente (Produção)

Crie um arquivo `.env` se necessário para configurar a URL da API:

```env
VITE_API_URL=https://sua-api-backend.com
```

### URLs da API

O frontend se conecta ao backend através das seguintes URLs (configuradas no código):

- Desenvolvimento: `http://localhost:3001`
- Produção: Configure a URL da sua API

## 🎨 Customização

### Cores e Tema

Edite `tailwind.config.ts` para personalizar:
- Paleta de cores
- Tipografia
- Espaçamentos
- Animações

### Componentes

Para adicionar novos componentes shadcn/ui:

```bash
bunx shadcn-ui@latest add [component-name]
```

### Novas Seções

Para adicionar uma nova seção editável:

1. Criar componente na landing page
2. Criar editor em `src/components/admin/`
3. Adicionar tab no `AdminDashboard`
4. Implementar API calls

## 📱 Responsividade

O design é mobile-first com breakpoints:
- `sm:` 640px+
- `md:` 768px+
- `lg:` 1024px+
- `xl:` 1280px+
- `2xl:` 1536px+

## 🔗 Rotas

- `/` - Landing page pública
- `/admin` - Painel administrativo
- `/*` - Página 404

## 📦 Scripts Disponíveis

```bash
bun dev          # Servidor de desenvolvimento
bun build        # Build de produção
bun preview      # Preview do build
bun lint         # Linting com ESLint
```

## 🌐 Deploy

### Vercel (Recomendado)

```bash
# Build do projeto
bun build

# Deploy automático conectando o repositório Git
# ou usando Vercel CLI
npx vercel
```

### Netlify

```bash
# Build do projeto
bun build

# Arraste a pasta dist para Netlify
# ou configure deploy automático
```

### GitHub Pages

```bash
# Instalar gh-pages
bun add -D gh-pages

# Adicionar script no package.json
"deploy": "gh-pages -d dist"

# Build e deploy
bun build
bun run deploy
```

## 🔧 Desenvolvimento

### Adicionar Nova Página

1. Criar componente em `src/pages/`
2. Adicionar rota em `src/App.tsx`
3. Implementar navegação se necessário

### Estilização

O projeto usa Tailwind CSS com classes utilitárias. Evite CSS customizado sempre que possível.

### Estado Global

Use React Query para estado do servidor e Context API para estado local compartilhado.

## 📞 Suporte

Para problemas específicos do frontend:
1. Verificar console do navegador
2. Confirmar conectividade com backend
3. Verificar se todas as dependências estão instaladas
4. Testar em modo de produção com `bun preview`
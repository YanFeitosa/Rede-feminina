# Rede Feminina - Sistema de Gerenciamento de Conteúdo

Este projeto agora inclui um backend completo para gerenciamento dinâmico do conteúdo da landing page através de um painel administrativo.

## 🚀 Funcionalidades Implementadas

### Backend
- ✅ API REST em Node.js/Express
- ✅ Banco de dados MongoDB
- ✅ Sistema de autenticação JWT
- ✅ Upload e gerenciamento de imagens
- ✅ APIs para todas as seções da landing page
- ✅ Middleware de segurança (CORS, Helmet, Rate Limiting)

### Frontend
- ✅ Painel administrativo completo
- ✅ Integração com APIs do backend
- ✅ Editores para todas as seções
- ✅ Gerenciador de imagens
- ✅ Sistema de login/logout
- ✅ Carregamento dinâmico de conteúdo

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- (Opcional) MongoDB local ou Atlas. Se não quiser instalar, use o modo de armazenamento em arquivo.

### Modo sem MongoDB
Adicione no `.env`:
```
USE_FILE_DB=true
```
Isso cria um arquivo `backend/data/data.json` para persistir usuários e conteúdo.

## 🛠️ Instalação

### 1. Configurar o Backend

```bash
cd backend
npm install
```

### 2. Configurar Variáveis de Ambiente

Edite o arquivo `backend/.env` com suas configurações:

```env
NODE_ENV=development
PORT=3001

# MongoDB - Configure se for usar Mongo (deixe como está se estiver em modo arquivo)
MONGODB_URI=mongodb://localhost:27017/rede-feminina

# JWT Secret - MUDE ESTA CHAVE EM PRODUÇÃO
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Credenciais do admin padrão (serão criadas no Mongo ou no arquivo)
ADMIN_EMAIL=admin@redefeminina.org
ADMIN_PASSWORD=admin123

# Upload de arquivos
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
```

### 3. Iniciar o Backend

```bash
cd backend
npm run dev
```

O backend estará rodando em: http://localhost:3001

### 4. Instalar Dependências do Frontend

```bash
# Na raiz do projeto
npm install
```

### 5. Iniciar o Frontend

```bash
npm run dev
```

O frontend estará rodando em: http://localhost:8080

## 👤 Acesso Administrativo

### Login no Painel Admin
- URL: http://localhost:8080/admin
- Email: admin@redefeminina.org
- Senha: admin123

**⚠️ IMPORTANTE: Altere as credenciais padrão antes de colocar em produção!**

## 📚 Seções Editáveis

O painel administrativo permite editar:

### 1. Seção Hero
- Título principal e subtítulo
- Descrição
- Texto e link do botão
- Imagens da galeria

### 2. Seção de Serviços
- Título
- Descrição
- Texto e link do botão (Bazar solidário)

### 3. Seção de Doações
- Subtítulo da seção
- Título principal
- Descrições
- Informações de PIX
- Dados bancários
- Texto e link do botão

### 4. Seção de Contato
- Múltiplos métodos de contato
- Email, telefone e endereço
- Descrições personalizáveis

### 5. Gerenciador de Imagens
- Upload de imagens
- Visualização de todas as imagens
- Cópia de URLs
- Exclusão de imagens

## 🔐 Segurança

### Implementado
- Autenticação JWT
- Hashing de senhas com bcrypt
- Middleware de segurança (Helmet)
- Rate limiting
- CORS configurado
- Validação de dados com Joi

### Recomendações para Produção
1. Altere JWT_SECRET para uma chave forte
2. Configure HTTPS
3. Use MongoDB Atlas ou servidor dedicado
4. Configure backup automático
5. Monitore logs e erros
6. Implemente renovação de tokens

## 🗃️ Estrutura da API

### Autenticação
- `POST /api/auth/login` - Login admin
- `POST /api/auth/verify` - Verificar token
- `POST /api/auth/change-password` - Alterar senha
- `POST /api/auth/logout` - Logout

### Conteúdo
- `GET /api/content/hero` - Obter seção hero
- `PUT /api/content/hero` - Atualizar seção hero
- `GET /api/content/services` - Obter seção serviços
- `PUT /api/content/services` - Atualizar seção serviços
- `GET /api/content/pricing` - Obter seção doações
- `PUT /api/content/pricing` - Atualizar seção doações
- `GET /api/content/contact` - Obter seção contato
- `PUT /api/content/contact` - Atualizar seção contato
- `GET /api/content/all` - Obter todas as seções

### Upload
- `POST /api/upload/image` - Upload de imagem única
- `POST /api/upload/images` - Upload múltiplo
- `GET /api/upload/images` - Listar imagens
- `DELETE /api/upload/image/:filename` - Deletar imagem

## 🚀 Deploy

### Backend (Heroku/Railway/DigitalOcean)
1. Configure as variáveis de ambiente
2. Configure MongoDB Atlas
3. Execute: `npm start`

### Frontend (Vercel/Netlify)
1. Configure a URL da API no código
2. Execute: `npm run build`
3. Deploy da pasta `dist`

## 🔧 Desenvolvimento

### Adicionar Nova Seção
1. Criar modelo no backend (`backend/src/models/`)
2. Adicionar rotas (`backend/src/routes/content.js`)
3. Criar editor no frontend (`src/components/admin/`)
4. Integrar na landing page

### Customizações
- Modifique as seções existentes
- Adicione novos campos aos modelos
- Customize o painel administrativo
- Adicione validações específicas

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do backend
2. Confirme se o MongoDB está rodando
3. Verifique as variáveis de ambiente
4. Teste as APIs diretamente

## 📄 Licença

Este projeto é privado da Rede Feminina.
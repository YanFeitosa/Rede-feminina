#!/bin/bash

# Script para inicializar o projeto Rede Feminina
# Este script configura e inicia tanto o backend quanto o frontend

echo "🌸 Iniciando projeto Rede Feminina..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Verificar se o Bun está instalado
if ! command -v bun &> /dev/null; then
    echo "❌ Bun não encontrado. Por favor, instale o Bun primeiro."
    echo "Instale em: https://bun.sh"
    exit 1
fi

# Verificar se o MongoDB está rodando
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB não está rodando. Por favor, inicie o MongoDB primeiro."
    echo "Use: mongod ou inicie o serviço do MongoDB"
fi

echo "📦 Instalando dependências do backend..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "✅ Dependências do backend já instaladas"
fi

echo "📦 Instalando dependências do frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    bun install
else
    echo "✅ Dependências do frontend já instaladas"
fi

echo ""
echo "🚀 Para executar o projeto:"
echo ""
echo "1. Backend (Terminal 1):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "2. Frontend (Terminal 2):"
echo "   cd frontend"
echo "   bun dev"
echo ""
echo "3. Acesse:"
echo "   - Landing page: http://localhost:5173"
echo "   - Painel admin: http://localhost:5173/admin"
echo "   - API backend: http://localhost:3001"
echo ""
echo "🔑 Credenciais do admin:"
echo "   Email: admin@redefeminina.org"
echo "   Senha: admin123"
echo ""
echo "✅ Configuração concluída!"
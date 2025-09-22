# Script para inicializar o projeto Rede Feminina no Windows
# Este script configura e inicia tanto o backend quanto o frontend

Write-Host "🌸 Iniciando projeto Rede Feminina..." -ForegroundColor Green

# Verificar se o Node.js está instalado
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro." -ForegroundColor Red
    Write-Host "Download em: https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Verificar se o Bun está instalado
if (!(Get-Command bun -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Bun não encontrado. Por favor, instale o Bun primeiro." -ForegroundColor Red
    Write-Host "Instale em: https://bun.sh" -ForegroundColor Yellow
    exit 1
}

# Verificar se o MongoDB está rodando (opcional)
$mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue
if (!$mongoProcess) {
    Write-Host "⚠️  MongoDB não está rodando. Por favor, inicie o MongoDB primeiro." -ForegroundColor Yellow
    Write-Host "Use: mongod ou inicie o serviço do MongoDB" -ForegroundColor Yellow
}

Write-Host "📦 Instalando dependências do backend..." -ForegroundColor Blue
Set-Location backend
if (!(Test-Path "node_modules")) {
    npm install
} else {
    Write-Host "✅ Dependências do backend já instaladas" -ForegroundColor Green
}

Write-Host "📦 Instalando dependências do frontend..." -ForegroundColor Blue
Set-Location ../frontend
if (!(Test-Path "node_modules")) {
    bun install
} else {
    Write-Host "✅ Dependências do frontend já instaladas" -ForegroundColor Green
}

Set-Location ..

Write-Host ""
Write-Host "🚀 Para executar o projeto:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Backend (Terminal 1):" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Frontend (Terminal 2):" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Gray
Write-Host "   bun dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Acesse:" -ForegroundColor White
Write-Host "   - Landing page: http://localhost:5173" -ForegroundColor Gray
Write-Host "   - Painel admin: http://localhost:5173/admin" -ForegroundColor Gray
Write-Host "   - API backend: http://localhost:3001" -ForegroundColor Gray
Write-Host ""
Write-Host "🔑 Credenciais do admin:" -ForegroundColor Yellow
Write-Host "   Email: admin@redefeminina.org" -ForegroundColor Gray
Write-Host "   Senha: admin123" -ForegroundColor Gray
Write-Host ""
Write-Host "✅ Configuração concluída!" -ForegroundColor Green
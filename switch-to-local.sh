#!/bin/bash
# switch-to-local.sh - Configurar para desarrollo local/ngrok

echo "🔄 Configurando para desarrollo local..."

# Leer el package.json y cambiar los campos
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Guardar homepage actual como temporal (si existe)
if (pkg.homepage && !pkg._homepage_for_github_pages) {
  pkg._homepage_for_github_pages = pkg.homepage;
  console.log('💾 Homepage guardado como temporal:', pkg.homepage);
}

// Remover homepage para desarrollo local
if (pkg.homepage) {
  delete pkg.homepage;
  console.log('🗑️ Homepage removido para desarrollo local');
}

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

echo "✅ Configurado para desarrollo local. Ahora ejecuta:"
echo "   npm run build"
echo "   npx serve -s build -l 3000"
echo "   ngrok http 3000"

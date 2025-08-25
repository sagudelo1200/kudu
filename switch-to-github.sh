#!/bin/bash
# switch-to-github.sh - Configurar para GitHub Pages

echo "🔄 Configurando para GitHub Pages..."

# Leer el package.json y cambiar los campos
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Restaurar homepage desde el campo temporal
if (pkg._homepage_for_github_pages) {
  pkg.homepage = pkg._homepage_for_github_pages;
  console.log('✅ Homepage restaurado:', pkg.homepage);
} else {
  console.log('❌ No se encontró _homepage_for_github_pages');
}

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

echo "✅ Configurado para GitHub Pages. Ahora ejecuta:"
echo "   npm run build"
echo "   npm run deploy"

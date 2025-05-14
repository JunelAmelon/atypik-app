module.exports = {
  extends: ['next/core-web-vitals'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // Désactiver l'avertissement pour les styles inline
    'react/no-inline-styles': 'off',
  },
};

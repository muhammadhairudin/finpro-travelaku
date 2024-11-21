module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'warn',
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'react/jsx-uses-vars': 'error',
    'no-console': 'warn',
    'react/no-unescaped-entities': 'warn'
  },
  settings: {
    react: {
      version: '18.3.1'
    }
  }
} 
module.exports = {
  env: {
    es2021: true,
    browser: true
  },
  extends: [
    'airbnb-base',
  ],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'randonly'
  },

  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    "eslint.validate": [ "javascript", "javascriptreact", "html", "typescriptreact" ],
    "class-methods-use-this": "off"
  },
};

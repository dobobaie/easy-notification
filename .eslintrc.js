module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    quotes: [1, 'single'],
    // typedef: 'error',
    'nuxt/no-cjs-in-config': 'off',
    camelcase: 'off',
    'spaced-comment': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error'
  }
};

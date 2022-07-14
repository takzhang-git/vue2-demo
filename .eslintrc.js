const path = require('path');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/strongly-recommended'],
  rules: {
    'no-bitwise': ['error', {
      allow: ['~']
    }],
    'key-spacing': [
        "error",
        {
            "beforeColon": false,
            "afterColon": true,
            "mode": 'strict'
        },
    ],
    'comma-spacing': ['error', {
        "before": false,
        "after": true 
    }],
    'no-multi-spaces': ['error', {

    }],
    'no-trailing-spaces': 'error',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-underscore-dangle': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-tabs': 'off',
    'linebreak-style': [0, 'error', 'windows'],
    'no-continue': 'off',
    indent: 'off',
    'comma-dangle': 'off',
    'func-names': 'off',
    'prefer-destructuring': 'off',
    'object-curly-newline': 'off',
    'guard-for-in': 'off',
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'arrow-body-style': 'off',
    'no-useless-return': 'off',
    'global-require': 'off',
    'max-len': ['error', 150],
    'vue/require-valid-default-prop': 'off',
    'vue/script-indent': [
      'error',
      4,
      {
        baseIndent: 1,
      },
    ],
    'vue/html-indent': ['error', 4],
    'vue/max-attributes-per-line': ['off'],
    'vue/attribute-hyphenation': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'class-methods-use-this': 'off',
    'max-lines': [
      'error',
      {
        max: 1000,
        skipBlankLines: true,
        skipComments: true
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', path.join(__dirname, './src')],
        ],
        extensions: ['.js', '.jsx', '.json', 'vue'],
      },
    },
  },
};

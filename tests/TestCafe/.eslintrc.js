module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    'plugins': [
        'testcafe'
    ],
    'extends': [
        'eslint:recommended',
        'plugin:testcafe/recommended'
    ],
    'parser': 'babel-eslint',
    'parserOptions': {
        'sourceType': 'module'
    },
    'rules': {
        'strict': 0,
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single',
            {
                'avoidEscape': false
            }
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-console': 'warn',
        'block-scoped-var': 'warn'
    },
    'globals': {
        'module': false
    }
};

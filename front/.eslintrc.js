const resolve = require('./webpack.resolve.config');

module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb',
        'prettier',
        'prettier/react',
        'prettier/standard',
    ],
    plugins: ['prettier', 'react', 'jsx-a11y', 'import', 'typescript'],
    rules: {
        'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx'] }],
        'react/jsx-wrap-multilines': [
            2,
            {
                declaration: true,
                assignment: true,
                return: true,
            },
        ],
        'import/no-extraneous-dependencies': ['error', {"devDependencies": true}],
        "import/order": ["error", {"groups": ["builtin", "external", "internal", "parent", "sibling", "index"]}],
        'prettier/prettier': [2],
        'arrow-parens': [2, 'as-needed'],
        'no-unused-vars': [0],
        'no-param-reassign': [0],
        'react/prefer-stateless-function': [0],
        'react/forbid-prop-types': [0],
        'no-confusing-arrow': [0],
        'no-mixed-operators': [0],
        'no-undef': [0],
        'consistent-return': [0],
        'jsx-a11y/anchor-has-content': [0],
        'class-methods-use-this': [0],
        'no-console': [0],
        'no-bitwise': [0],
        'jsx-a11y/no-static-element-interactions': [0],
        'jsx-a11y/no-autofocus': [0],
        'linebreak-style': [0],
        'jsx-a11y/img-has-alt': [0],
        'jsx-a11y/anchor-is-valid': [0],
        'jsx-a11y/no-noninteractive-element-interactions': [0],
        'eol-last': [0],
        'react/prop-types': [0],
        'jsx-a11y/label-has-for': [0],
        'jsx-a11y/click-events-have-key-events': [0],
        'react/default-props-match-prop-types': [0],
        'react/require-default-props': [0],
        'react/no-unused-prop-types': [0],
    },
    globals: {
        window: true,
        document: true
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: {
                    resolve,
                },
            },
        },
    },
};

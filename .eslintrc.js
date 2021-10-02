module.exports = {
    extends: [
        'next/core-web-vitals',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:cypress/recommended',
        'prettier',
    ],
    plugins: ['react', '@typescript-eslint', 'testing-library', 'cypress'],
    env: {
        browser: true,
        es6: true,
        jest: true,
        'cypress/globals': true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: ['./tsconfig.lint.json', './cypress/tsconfig.json'],
    },
    rules: {
        'linebreak-style': 'off',
        // warns about leftover log/debugger statements when building for Production
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'import/newline-after-import': ['error', { count: 1 }],
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    overrides: [
        {
            files: ['cypress/**/*'],
            rules: {
                'jest/valid-expect': 0,
                'jest/expect-expect': 0,
                'promise/always-return': 0,
                'promise/catch-or-return': 0,
                'promise/prefer-await-to-then': 0,
                'promise/prefer-await-to-callbacks': 0,
            },
        },
        // Only uses Testing Library lint rules in test files
        {
            files: ['components/**/?(*.)+(spec|test).[jt]s?(x)'],
            extends: ['plugin:testing-library/react'],
        },
    ],
}

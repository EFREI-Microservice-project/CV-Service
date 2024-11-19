import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: { sourceType: 'commonjs' },
        rules: {
            'no-global-assign': 'off'
        }
    },
    { languageOptions: { globals: globals.node } }
];

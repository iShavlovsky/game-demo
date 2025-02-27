import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: [
            '**/dist',
            '**/dist-ssr',
            '**/shims-vue.d.ts',
            '**/typed-router.d',
            'archive/**/*',
            '**/stats-build.html',
            '**/.nuxt',
            '**/.idea',
            '**/.output',
            'node_modules/'
        ]
    },

    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    stylistic.configs['disable-legacy'],
    stylistic.configs.customize({
        indent: 4,
        quotes: 'single',
        semi: true,
        commaDangle: 'never',
        jsx: true
    }),
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        },
        rules: {
            'no-undef': 'off',
            'arrow-body-style': 'off',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-empty-interface': 'warn'
        }
    },
    {
        files: ['**/*.{js,mjs,cjs,mts,jsx,vue}'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                vueFeatures: {
                    filter: true,
                    interpolationAsNonHTML: true,
                    styleCSSVariableInjection: true,
                    customMacros: []
                },
                sourceType: 'module',
                ecmaVersion: 2020
            }
        },
        plugins: {
            'unused-imports': unusedImports,
            'simple-import-sort': simpleImportSort
        },
        rules: {
            'no-undef': 'off',
            'arrow-body-style': 'off',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-empty-interface': 'warn',

            'import/order': 'off',
            'import/no-duplicates': 'off',
            'import/no-cycle': 'off',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',

            'vue/no-v-for-template-key': 'off',
            'vue/no-deprecated-data-object-declaration': 'error',
            'vue/no-deprecated-destroyed-lifecycle': 'error',
            'vue/no-deprecated-dollar-listeners-api': 'error',
            'vue/no-deprecated-dollar-scopedslots-api': 'error',
            'vue/no-deprecated-events-api': 'error',
            'vue/no-deprecated-functional-template': 'error',
            'vue/no-deprecated-html-element-is': 'error',
            'vue/no-deprecated-props-default-this': 'error',
            'vue/no-deprecated-v-bind-sync': 'error',
            'vue/no-deprecated-v-on-native-modifier': 'error',
            'vue/no-deprecated-v-on-number-modifiers': 'error',
            'vue/no-deprecated-vue-config-keycodes': 'error',
            'vue/no-lifecycle-after-await': 'error',
            'vue/no-ref-as-operand': 'error',
            'vue/require-slots-as-functions': 'error',
            'vue/require-toggle-inside-transition': 'error',
            'vue/valid-v-is': 'error',
            'vue/multi-word-component-names': 'off', // Отключение правила multi-word-component-names

            'vue/html-self-closing': ['error', {
                html: {
                    void: 'never',
                    normal: 'never',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }],

            'vue/html-indent': ['error', 2, {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }],

            'vue/first-attribute-linebreak': ['error', {
                singleline: 'beside',
                multiline: 'beside'
            }],

            'vue/html-button-has-type': ['error', {
                button: true,
                submit: true,
                reset: true
            }],

            'vue/block-lang': ['error', {
                script: {
                    lang: 'ts'
                }
            }],

            'vue/component-api-style': ['error', ['script-setup', 'composition']],

            'vue/max-len': ['error', {
                code: 500,
                template: 2000,
                tabWidth: 2,
                comments: 500,
                ignorePattern: '',
                ignoreComments: false,
                ignoreTrailingComments: false,
                ignoreUrls: false,
                ignoreStrings: false,
                ignoreTemplateLiterals: false,
                ignoreRegExpLiterals: false,
                ignoreHTMLAttributeValues: false,
                ignoreHTMLTextContents: false
            }],

            'vue/html-closing-bracket-spacing': ['error', {
                startTag: 'never',
                endTag: 'never',
                selfClosingTag: 'always'
            }],

            'vue/max-attributes-per-line': ['error', {
                singleline: {
                    max: 1
                },
                multiline: {
                    max: 1
                }
            }],

            'vue/order-in-components': ['error', {
                order: [
                    'el',
                    'name',
                    'key',
                    'parent',
                    'functional',
                    ['delimiters', 'comments'],
                    ['components', 'directives', 'filters'],
                    'extends',
                    'mixins',
                    ['provide', 'inject'],
                    'ROUTER_GUARDS',
                    'layout',
                    'middleware',
                    'validate',
                    'scrollToTop',
                    'transition',
                    'loading',
                    'inheritAttrs',
                    'model',
                    ['props', 'propsData'],
                    'emits',
                    'setup',
                    'asyncData',
                    'data',
                    'fetch',
                    'head',
                    'computed',
                    'watch',
                    'watchQuery',
                    'LIFECYCLE_HOOKS',
                    'methods',
                    ['template', 'render'],
                    'renderError'
                ]
            }],

            'vue/no-irregular-whitespace': ['error', {
                skipStrings: true,
                skipComments: false,
                skipRegExps: false,
                skipTemplates: false,
                skipHTMLAttributeValues: false,
                skipHTMLTextContents: false
            }],

            'vue/component-definition-name-casing': ['error', 'PascalCase'],

            'vue/match-component-file-name': ['error', {
                extensions: ['vue'],
                shouldMatchCase: false
            }],

            'vue/no-dupe-keys': ['error', {
                groups: []
            }],

            'vue/component-name-in-template-casing': ['error', 'PascalCase', {
                registeredComponentsOnly: true
            }],

            'comma-dangle': ['error', {
                arrays: 'never',
                objects: 'never',
                imports: 'never',
                exports: 'never',
                functions: 'never'
            }],

            'linebreak-style': ['error', 'windows'],
            'no-console': 'off',
            'no-debugger': 'error',
            'no-plusplus': 'off',
            'constructor-super': 'off',

            'no-mixed-operators': ['error', {
                groups: [
                    ['+', '-', '*', '/', '%', '**'],
                    ['&', '|', '^', '~', '<<', '>>', '>>>'],
                    ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                    ['&&', '||'],
                    ['in', 'instanceof']
                ],
                allowSamePrecedence: true
            }],

            'import/extensions': 'off',
            'import/prefer-default-export': 'off',
            'import/no-unresolved': 'off',
            'import/no-absolute-path': 'off',
            'no-unused-expressions': 'error',
            'no-param-reassign': 'off',

            'prefer-destructuring': ['error', {
                array: true,
                object: true
            }, {
                enforceForRenamedProperties: false
            }],

            'no-bitwise': ['error', {
                allow: ['~']
            }],

            'no-unused-vars': ['off', {
                argsIgnorePattern: '^_'
            }],

            'object-curly-spacing': ['error', 'always'],
            'object-curly-newline': ['error', {
                ObjectExpression: {
                    multiline: true,
                    consistent: true
                },
                ObjectPattern: {
                    multiline: true,
                    consistent: true
                }
            }],

            'lines-between-class-members': ['error', 'always', {
                exceptAfterSingleLine: true
            }],

            'vue/no-duplicate-attributes': ['error', {
                allowCoexistClass: true,
                allowCoexistStyle: true
            }],

            'vue/no-mutating-props': ['error', {
                shallowOnly: false
            }],

            'vue/no-parsing-error': ['error', {
                'abrupt-closing-of-empty-comment': true,
                'absence-of-digits-in-numeric-character-reference': true,
                'cdata-in-html-content': true,
                'character-reference-outside-unicode-range': true,
                'control-character-in-input-stream': true,
                'control-character-reference': true,
                'eof-before-tag-name': true,
                'eof-in-cdata': true,
                'eof-in-comment': true,
                'eof-in-tag': true,
                'incorrectly-closed-comment': true,
                'incorrectly-opened-comment': true,
                'invalid-first-character-of-tag-name': true,
                'missing-attribute-value': true,
                'missing-end-tag-name': true,
                'missing-semicolon-after-character-reference': true,
                'missing-whitespace-between-attributes': true,
                'nested-comment': true,
                'noncharacter-character-reference': true,
                'noncharacter-in-input-stream': true,
                'null-character-reference': true,
                'surrogate-character-reference': true,
                'surrogate-in-input-stream': true,
                'unexpected-character-in-attribute-name': true,
                'unexpected-character-in-unquoted-attribute-value': true,
                'unexpected-equals-sign-before-attribute-name': true,
                'unexpected-null-character': true,
                'unexpected-question-mark-instead-of-tag-name': true,
                'unexpected-solidus-in-tag': true,
                'unknown-named-character-reference': true,
                'end-tag-with-attributes': true,
                'duplicate-attribute': true,
                'end-tag-with-trailing-solidus': true,
                'non-void-html-element-start-tag-with-trailing-solidus': false,
                'x-invalid-end-tag': true,
                'x-invalid-namespace': true
            }]
        }
    }

];

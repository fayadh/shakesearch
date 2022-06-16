module.exports = {
  parserOptions: {
    extraFileExtensions: ['.json'],
    project: `${__dirname}/tsconfig.json`,
  },
  plugins: ["unused-imports"],
  ignorePatterns: [
    'brainhubeu__react-carousel.d.ts',
    'config/',
    'react-app-env.d.ts',
    'source/serviceWorker.ts',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/no-default-export': 'off',
    'jest/valid-title': 'warn',
    'max-lines-per-function': ['warn', { max: 42, skipBlankLines: true, skipComments: true }],
    'unicorn/filename-case': 'warn',
    'unicorn/prevent-abbreviations': 'warn',
    "unused-imports/no-unused-imports": "error",
		"unused-imports/no-unused-vars": [
			"warn",
			{ "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ],
    "sort-keys": ["warn", "asc", {"caseSensitive": true, "natural": false, "minKeys": 2}],
    'import-helpers/order-imports': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variable",
        "types": ["boolean"],
        "format": ["PascalCase"],
        "prefix": ["is", "should", "has", "can", "did", "will", "are"]
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.test.{js,jsx,ts,tsx}'],
      rules: {
        '@typescript-eslint/no-magic-numbers': 'off',
        'max-lines-per-function': 'off',
        'prettier/prettier': 'warn',
      },
    },
    {
      files: ['cypress.json'],
      rules: {
        'no-unused-expressions': 'off',
        'quotes': 'off',
      },
    }
  ],
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        map: [
          ['@common', `${__dirname}/source/common`],
          ['@components', `${__dirname}/source/components`],
          ['@hooks', `${__dirname}/source/hooks`],
          ['@layouts', `${__dirname}/source/layouts`],
          ['@navigation', `${__dirname}/source/navigation`],
          ['@pages', `${__dirname}/source/pages`],
          ['@utils', `${__dirname}/source/utils`],
        ],
      },
    },
    react: {
      pragma: 'React',
      version: '^16.13.1',
    },
  },
};

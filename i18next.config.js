// i18next-parser.config.js

export default {
  input: ['src/**/*.ts', "app.ts"],
  output: 'static/locales/$LOCALE/$NAMESPACE.json',
  locales: ['en', 'ko'],
  defaultNamespace: 'translation',
  namespaceSeparator: '::',

  contextSeparator: '_',
  createOldCatalogs: true,
  defaultValue: '',
  indentation: 2,
  keepRemoved: false,
  keySeparator: '.',
  lexers: {
    hbs: ['HandlebarsLexer'],
    handlebars: ['HandlebarsLexer'],

    htm: ['HTMLLexer'],
    html: ['HTMLLexer'],

    mjs: ['JavascriptLexer'],
    js: ['JavascriptLexer'],
    ts: ['JavascriptLexer'],
    jsx: ['JsxLexer'],
    tsx: ['JsxLexer'],

    default: ['JavascriptLexer'],
  },
  lineEnding: 'auto',
  pluralSeparator: '_',
  sort: false,
  verbose: false,
  failOnWarnings: false,
  failOnUpdate: false,
  customValueTemplate: null,
  resetDefaultValueLocale: null,
  i18nextOptions: null,
  yamlOptions: null,
}
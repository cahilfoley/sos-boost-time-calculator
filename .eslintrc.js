module.exports = {
  $schema:
    'https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/eslintrc.json',
  extends: [
    'react-app',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-redeclare': 'off',
  },
}

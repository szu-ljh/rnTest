module.exports = {
  extends: ['prettier'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': 0,
    'no-unused-vars': ['error', {vars: 'local'}],
    'no-nested-ternary': 0,
    'react/no-array-index-key': 0,
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
    'no-unused-expressions': [
      'error',
      {allowShortCircuit: true, allowTernary: true},
    ],
    'no-param-reassign': 0,
    'no-use-before-define': [
      'error',
      {functions: true, classes: true, variables: false},
    ],
    //'react/jsx-closing-bracket-location': 3,
    'react/jsx-closing-bracket-location': false,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
};

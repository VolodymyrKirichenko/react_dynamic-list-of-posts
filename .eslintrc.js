module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript', 'plugin:cypress/recommended'],
  rules: {
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    'jsx-a11y/label-has-associated-control': ["error", {
      assert: "either",
    }],
    'operator-linebreak': ['error', 'before'],
    'jsx-a11y/control-has-associated-label': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};

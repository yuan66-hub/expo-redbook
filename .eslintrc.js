module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        parser: "flow",
      },
    ],
    "react-hooks/exhaustive-deps": 'off' // <--- THIS IS THE NEW RULE

  },
};

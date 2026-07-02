import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      // New in eslint-plugin-react-hooks@7 (bundled with eslint-config-next@16).
      // Flags widespread pre-existing "fetch on mount" / "sync on prop change"
      // effects across this codebase as errors; downgraded to a warning rather
      // than mass-rewriting working data-fetching code during a dependency bump.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;

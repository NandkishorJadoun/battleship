import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
    {
        ignores: [
            'babel.config.js',
            'webpack.common.js',
            'webpack.dev.js',
            'webpack.prod.js',
        ],
    },
    { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
    { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
]);
import type { StorybookConfig } from "@storybook/react-vite"
import path from "path"
import { loadConfigFromFile, mergeConfig } from "vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(config) {
    const { config: mainConfig } = (await loadConfigFromFile(
      path.resolve(__dirname, "../vite.config.ts") as any
    )) as any

    // we need to exclude @vitejs/plugin-react from the plugins to prevent a conflict
    // @vitejs/plugin-react is an array of objects so we can exclude it by checking for a name key
    const filteredPlugins = mainConfig.plugins.filter((item) => item.name)

    return mergeConfig(config, {
      resolve: {
        alias: { "@": path.resolve(__dirname, "../src") },
      },
      plugins: [...filteredPlugins],
    })
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
}
export default config

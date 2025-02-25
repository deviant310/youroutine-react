import react from "@vitejs/plugin-react-swc";
import ExpressApp, { Express } from "express";
import { defineConfig, Plugin, PreviewServer, ViteDevServer } from "vite";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const {
  DEV_SERVER_HOST,
  DEV_SERVER_PORT,
  DEV_SERVER_API_PROXY,
  DEV_SERVER_HTTP_OVERRIDES,
} = process.env;

const { host, port, apiProxy, httpOverridesEnabled } = {
  host: DEV_SERVER_HOST,
  get port() {
    if (DEV_SERVER_PORT) return parseInt(DEV_SERVER_PORT);
  },
  apiProxy: DEV_SERVER_API_PROXY,
  httpOverridesEnabled: Boolean(DEV_SERVER_HTTP_OVERRIDES),
};

/**
 * https://vitejs.dev/config/
 */
console.log(apiProxy);
export default defineConfig(async ({ command }) => ({
  server: {
    proxy: {
      ...(apiProxy && { "/api": apiProxy }),
    },
    host,
    port,
  },
  preview: {
    port,
  },
  build: {
    target: "es2020",
    sourcemap: command === "serve",
  },
  plugins: [
    svgr({
      svgrOptions: {
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        svgoConfig: {
          floatPrecision: 2,
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      },
    }),
    tsconfigPaths(),
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: `eslint ./src`,
        useFlatConfig: true,
      },
    }),
    httpOverridesEnabled && httpOverridesPlugin(),
  ],
}));

async function httpOverridesPlugin(): Promise<Plugin> {
  const express = ExpressApp();

  express.use(ExpressApp.json());

  const { default: applyOverrides }: HttpOverridesDefaultImport = await import(
    // eslint-disable-next-line
    // @ts-ignore Local overrides index file can be missing
    "./.http-overrides"
  ).catch(() => ({}));

  const configureServer = (server: ViteDevServer | PreviewServer) => {
    server.middlewares.use(express);

    applyOverrides?.(express);
  };

  return {
    name: "http-overrides-plugin",
    configureServer,
    configurePreviewServer: configureServer,
  };
}

interface HttpOverridesDefaultImport {
  default?(express: Express): void;
}

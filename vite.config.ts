import react from "@vitejs/plugin-react-swc";
import ExpressApp, { Express } from "express";
import { defineConfig, Plugin, PreviewServer, ViteDevServer } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

const {
  DEV_SERVER_HOST,
  DEV_SERVER_PORT,
  DEV_SERVER_PROXY,
  DEV_SERVER_HTTP_OVERRIDES,
} = process.env;

const host = DEV_SERVER_HOST;
const port = DEV_SERVER_PORT && parseInt(DEV_SERVER_PORT);
const proxyHost = DEV_SERVER_PROXY;
const httpOverridesEnabled = Boolean(DEV_SERVER_HTTP_OVERRIDES);

/**
 * https://vitejs.dev/config/
 */
export default defineConfig(async ({ command }) => ({
  server: {
    proxy: {
      ...(proxyHost && { "/api": proxyHost }),
    },
    ...(host && { host }),
    ...(port && { port }),
  },
  build: {
    target: "es2020",
    sourcemap: command === "serve",
  },
  plugins: [
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

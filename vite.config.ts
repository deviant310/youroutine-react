import react from "@vitejs/plugin-react-swc";
import ExpressApp, { Express } from "express";
import { defineConfig, Plugin, PreviewServer, ViteDevServer } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

const proxyHost = process.env.DEV_SERVER_PROXY;

/**
 * https://vitejs.dev/config/
 */
export default defineConfig(async ({ command }) => ({
  server: {
    proxy: {
      ...(proxyHost && { "/api": proxyHost }),
    },
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
    httpOverridesPlugin(),
  ],
}));

async function httpOverridesPlugin(): Promise<Plugin> {
  const httpOverridesEnabled = "DEV_SERVER_HTTP_OVERRIDES" in process.env;

  const express = ExpressApp();

  express.use(ExpressApp.json());

  const { default: applyOverrides }: HttpOverridesDefaultImport = await import(
    // eslint-disable-next-line
    // @ts-ignore Local overrides index file can be missing
    "./.http-overrides"
  ).catch(() => ({}));

  const configureServer = (server: ViteDevServer | PreviewServer) => {
    server.middlewares.use(express);

    if (httpOverridesEnabled) applyOverrides?.(express);
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

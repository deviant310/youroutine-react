import react from "@vitejs/plugin-react-swc";
import { defineConfig, Plugin, PreviewServer, ViteDevServer } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

import { LocalOverride } from "./.local-overrides/local-override";

const proxyHost = process.env.DEV_SERVER_PROXY;

/**
 * https://vitejs.dev/config/
 */
export default defineConfig(async ({ command }) => {
  const { default: localOverrides }: LocalOverridesDefaultImport = await import(
    // eslint-disable-next-line
    // @ts-ignore Local overrides index file can be missing
    "./.local-overrides"
  ).catch(() => ({}));

  return {
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
      localOverrides &&
        (() => {
          const configureServer = (server: ViteDevServer | PreviewServer) => {
            localOverrides.forEach(([route, handler]) => {
              server.middlewares.use(route, handler);
            });
          };

          return {
            name: "local-overrides",
            configureServer,
            configurePreviewServer: configureServer,
          } as Plugin;
        })(),
    ],
  };
});

interface LocalOverridesDefaultImport {
  default?: Array<LocalOverride>;
}

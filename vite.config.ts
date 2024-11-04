import react from "@vitejs/plugin-react-swc";
import {
  Connect,
  defineConfig,
  Plugin,
  PreviewServer,
  ViteDevServer,
} from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

const proxyHost = process.env.DEV_SERVER_PROXY;
const httpOverridesEnabled = "DEV_SERVER_HTTP_OVERRIDES" in process.env;

/**
 * https://vitejs.dev/config/
 */
export default defineConfig(async ({ command }) => {
  const { default: applyOverrides }: HttpOverridesDefaultImport = await import(
    // eslint-disable-next-line
    // @ts-ignore Local overrides index file can be missing
    "./.http-overrides"
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
      (() => {
        if (!httpOverridesEnabled) return;

        const configureServer = (server: ViteDevServer | PreviewServer) => {
          applyOverrides?.(server.middlewares);
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

interface HttpOverridesDefaultImport {
  default?(server: Connect.Server): void;
}

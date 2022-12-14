const { existsSync, readdirSync, rmSync } = require('fs');
const { resolve } = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const paths = require('../paths');
const { name: packageName } = require(paths.appPackageJson);
const appName = process.env.APP_PUBLIC_NAME ?? packageName;
const devServerPort = process.env.DEV_SERVER_PORT ?? 3000;

module.exports = function (mode = 'development') {
  const isDevelopmentBuild = mode === 'development';
  const isProductionBuild = mode === 'production';

  // noinspection WebpackConfigHighlighting
  return {
    devServer: {
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      compress: true,
      open: true,
      port: devServerPort,
      static: {
        directory: paths.appBuild,
      }
    },
    devtool: isDevelopmentBuild && 'source-map',
    entry: paths.appIndex,
    infrastructureLogging: {
      level: 'none',
    },
    mode: isProductionBuild ? 'production' : 'development',
    module: {
      rules: [
        {
          include: [paths.appLib, paths.appSrc],
          loader: 'babel-loader',
          options: {
            cacheCompression: false,
            cacheDirectory: true,
            compact: isProductionBuild,
          },
          test: /\.(ts|tsx|js|jsx)$/,
        },
      ]
    },
    optimization: {
      minimize: isProductionBuild,
    },
    output: {
      filename: 'index.js',
      path: paths.appBuild,
    },
    plugins: [
      new ESLintPlugin({
        extensions: ['ts', 'tsx'],
        failOnError: true,
        overrideConfig: {
          rules: {
            'no-debugger': isDevelopmentBuild ? 'off' : 'error'
          }
        }
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false
      }),
      {
        apply: compiler => {
          compiler.hooks.shouldEmit.tap('Plugin', (compilation) => {
            return !compilation.getStats().hasErrors();
          });
        }
      },
      {
        apply: compiler => {
          compiler.hooks.environment.tap('Plugin', () => {
            if (existsSync(paths.appBuild)) {
              readdirSync(paths.appBuild).forEach(baseName => {
                const path = resolve(paths.appBuild, baseName);

                rmSync(path, { recursive: true });
              });
            }
          });
        }
      },
      new HtmlWebpackPlugin({
        template: paths.appHtml,
        title: appName
      })
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    stats: {
      colors: true,
      modules: false
    }
  };
};

import path from 'path';
import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { mode, paths, isDev } = options;
  return {
    mode: mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(),
    devtool: isDev ? 'inline-source-map' : undefined, // если режим сборки для разработки то нам не нужны лишнии коментарии в которых могли бы быть указанны ссылки на ошибки в исходных файлач
    devServer: isDev ? buildDevServer(options) : undefined, // при сборке в режиме production нам не нужно запускать webpack-dev-server
  };
}

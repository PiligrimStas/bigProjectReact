import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import { BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildPlugins({ paths }: BuildOptions) {
  return [
    // этот плагин встраивает содержимое выходного js файла в выходной файл ./public/index.html а переданный в него tepmplate
    // указывает на то что в этот же выходной файл нужно вставить <div class='root'> из иходного src/index.html
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    // miniCssExtractPlugin создаёт отдельный выходной css файл для каждого файла в котором используются стили без него css будет записан прямо в выходно js
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
  ];
}

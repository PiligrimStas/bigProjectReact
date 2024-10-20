import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/config';

export function buildPlugins({
    paths,
    isDev,
    apiUrl,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
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
        // c помощью этого плагина можно прокидывать в приложение глобальные переменные. Мы прокинем переменную __IS_DEV__ в файл i18.ts
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
        }),
    ];

    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin()); // это плагин нужен для того что бы после сохранения изменений в каком либо файле приложения мы могли бы видеть обновления на экране без перезагрузки страницы
        plugins.push(
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
                // в опциях для BundleAnalyzerPlugin указываем что не нужно его запускать и открывать в отдельной вкладке браузера при каждой сборке приложения
            }),
        );
    }

    return plugins;
}

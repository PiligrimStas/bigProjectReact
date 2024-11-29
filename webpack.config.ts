import webpack from 'webpack';
import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

export default (env: BuildEnv) => {
    const mode = env.mode || 'development';
    const PORT = env.port || 3000;
    const apiUrl = env.apiUrl || 'http://localhost:8000';

    const isDev = mode === 'development';

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        // что бы работали переводы нужен copy-webpack-plugin
        locales: path.resolve(__dirname, 'public', 'locales'), // где брать переводы в prod режиме
        buildLocales: path.resolve(__dirname, 'build', 'locales'), // куда переместить переводы при prod режиме
    };

    // весь конфиг вынесли в отдельный файл buildWebpackConfig. Получаем его в результате вызова buildWebpackConfig
    // с передачей путей через аргументы

    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
        apiUrl,
        project: 'frontend',
    });
    return config;
};

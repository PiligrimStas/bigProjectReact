import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    // Можно было бы обиойтись и без этого лоадера потомучто мы используем typeScript. Здесь он нужен
    // только для того что бы мог работать плагин 'i18next-extract', который мы настраиваем здесь в
    // options.plugins а так же в коне компоенета указываем его в babel.plugin.json. Этот плагин должен
    // создавать папку в корне проекта с переводами которые были выполнены во время работа приложения
    // но у меня этой хуй заработала, да и папка это нихуй не нужна (ещё мы насраивали jest для чего вносли изменения в babel.confit, так что возможно babel всёже нужен не только для i18)
    const babelLoader = {
        test: /\.(js|jsx|txx)$/, // изменяем регулярку по умолчнаи ( /\.m?js$/ )
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    'i18next-extract',
                    {
                        locales: ['ru', 'en'],
                        keyAsDefaultValue: true,
                    },
                ],
            },
        },
    };

    const cssLoader = buildCssLoader(isDev);
    // если не используем ts нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/,
        use: [
            {
                loader: 'file-loader',
                options: {},
            },
        ],
    };
    // порядок loders важен
    return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader];
}

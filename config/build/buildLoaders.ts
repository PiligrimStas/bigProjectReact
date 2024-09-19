import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';

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

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // порядок лоадеров важен
            // Creates `style` nodes from JS strings
            // если режим сборки dev используется style-loader иначе miniCssExtractPlugin. miniCssExtractPlugin нужен для того чтобы для создания выходных css файлов
            // без него выходной css будет записан прямо в выходной js файл
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // мы можем иметь два компонетна например Header.tsx и Body.tsx для каждого из них мы можем создать
            // модульные файлы css например header.moduse.scss и body.module.scss далее мы можем импортировать
            // классы из файла header.module.scss в компонент Header (import classes from './Counter.module.scss';)
            // а в компонент Body классы из файла body.module.scss. Важно то что названия классов в одном из этих модульны scss файлов
            // могут повторять названия классов из другого файла, потому что webpack при компиляции сгененерирует
            // yникальные названия классов взамен тек которые мы указали, таким образом в выходном файле который
            // будет сгенерирует webpack и в который будут записаны все классы из модулей их названия никогда
            // не будут конфликтовать так как в выходной файл они попадут с уникальными именами типфа "efeRYadgg"
            // а для того чтобы webpack мог работать с модулями в options.modules css лоадера мы указываем настройки для них
            // если у нас есть файл index.css или index.scss в котором мы храним глобальные стили которые могут быть
            // использованны в любой части приложения то для селекторов в этом файле так же будут сгенерированны
            // случайные имена и они так же будут добавленны в выходной файл, из-за чего стили из этого index файла
            // не будут применены к элементам использующим классы из этого файла, в то время как те которые были сгенерированны
            // для модульных классов будут применены. (То есть при запуске npm start в dev tools браузера мы увидим на элементак
            // стили которые были написанны в модульных файлах с уже новыми сгенерированными уникальными именами
            // которые уже будут работать а вот селекторы стилей указанных в index.scss хотя и будут записанны в выходной css
            // файл в dev tools будут прикрепляться к элементам со старыми указанными в исходном index.scss файле и будут пустыми)
            // чтобы это исправить мы настраиваем поле options.modules так чтобы новые имена генерировались только для селекторов из
            // модульных файлов, а для исходного файла index.scss они останутся прежними, какими и по попадут в выходной файл
            {
                loader: 'css-loader',
                options: {
                    // module: true указывает  на то что модули будут работать
                    modules: {
                        auto: /\.module\./i, // указываем что генерировать случайные именна нужно только для селекторв из модульных файлов, а имена в глобалном index.scss файле оставить как есть
                        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:5]', // указывам на то что в режиме dev будут сгенерированны понятные читаемые имена селекторов а в режиме продакшн случайно сгенерированный кеш
                    },
                    esModule: false,
                },
            },
            // Compiles Sass to CSS
            'sass-loader',
        ],
    };
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

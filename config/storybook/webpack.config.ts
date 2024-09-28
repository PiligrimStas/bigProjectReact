import webpack, { RuleSetRule } from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

// Этот файл был создан для переореления конфирурации по умолчанию для storybook, нам понадобилось
// его переопределять для того чтобы storybook мог работать с абсолютными путями и css файлами
// Здесь мы возвращаем переопределённый webpack.config из корня проекта (здесь параметр config и есть та самая конфигруцаия
// из коренвого вебпак конфига). Получается что здесь мы пушим дополнительно в уже существующий вебпак конфиг
// то что нужно для работы storybook. Только не понятно где вообще функция из этого файла вызывается
// возможно её вызов встроен в одни из пакетов storybook
export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };
    config.resolve?.modules?.push(paths.src);
    config.resolve?.extensions?.push('.ts', '.tsx');

    // eslint-disable-next-line no-param-reassign
    config.module.rules = config.module?.rules?.map((rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
    });
    config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });
    config.module?.rules?.push(buildCssLoader(true));

    return config;
};

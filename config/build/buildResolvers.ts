import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): ResolveOptions {
  console.log(options.paths.src);

  return {
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true, // эта настройка нужна чтобы согласовать то что указано в поле paths tsconfig.json с ней webpack бутет предпочитать абсолютные пут
    modules: [options.paths.src, 'node_modules'], // указываем импорты из каких папок являются абсолютными
    mainFiles: ['index'], // указываем что для каждого файла главным файлом будет являться index (хотя это не обязательно)
    alias: {},
  };
}

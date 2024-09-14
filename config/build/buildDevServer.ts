import { BuildOptions } from './types/config';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
// импортируется как DevServerConfiguration чтобы не дублировать название Configuration из webpack
// сам webpack-dev-server нужен что бы нам не приходилось переосбирать приложени комндой webpack
// после любого внесённого изменения в исходные файлы. webpack-dev-server будет выполнять пересборку
// за нас после сохранения изменений

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    open: true, // с этой опцией будет ватоматически открываться страница с нашим приложением
    historyApiFallback: true, // без этой опции если мы будем находится не на корневой странице при попытке её обновить будет ошибка notFoundPage. Все опции можно посмотреть на старнице github webpack dev server
  };
}

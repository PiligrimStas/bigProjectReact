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
  };
}

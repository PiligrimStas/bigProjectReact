// TypeScript не знает, что существуют файлы, отличные от .ts или .tsx, поэтому он выдаст ошибку, если импорт имеет неизвестный суффикс файла!
// эта настройка нужна чтобы работали подобные импорты import classes from './Counter.module.scss'
declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.png';
declare module '*.gpg';
declare module '*.gpeg';
declare module '*.svg' {
  import React = require('react');

  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

// объясняем TS что из себя представляет переменная из webpack.DefinePlugin
declare const __IS_DEV__: boolean;

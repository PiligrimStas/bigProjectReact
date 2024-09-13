// TypeScript не знает, что существуют файлы, отличные от .ts или .tsx, поэтому он выдаст ошибку, если импорт имеет неизвестный суффикс файла!
// эта настройка нужна чтобы работали подобные импорты import classes from './Counter.module.scss'
declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

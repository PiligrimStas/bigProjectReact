<<<<<<< HEAD
import { Mods, classNames } from 'shared/lib/classNames/classNames';
=======
import { classNames, Mods } from 'shared/lib/classNames/classNames';
>>>>>>> fromFouryOneLesson
import { memo } from 'react';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

<<<<<<< HEAD
=======
export enum TextSize {
    M = 'sizeM',
    L = 'sizeL',
}

>>>>>>> fromFouryOneLesson
interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
<<<<<<< HEAD
}

export const Text = memo((props: TextProps) => {
    const { className, text, title, theme = TextTheme.PRIMARY, align = TextAlign.LEFT } = props;
=======
    size?: TextSize;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
    } = props;
>>>>>>> fromFouryOneLesson

    const mods: Mods = {
        [cls[theme]]: true,
        [cls[align]]: true,
<<<<<<< HEAD
=======
        [cls[size]]: true,
>>>>>>> fromFouryOneLesson
    };

    return (
        <div className={classNames('', mods, [className])}>
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});

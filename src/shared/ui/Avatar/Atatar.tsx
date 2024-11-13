import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
}

export const Avatar = ({ className, src, size }: AvatarProps) => {
    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size || 100,
            height: size || 100,
        }),
        [size],
    );

    return (
        <img
            alt="avatar"
            style={styles}
            src={src}
            className={classNames(cls.avatar, mods, [className])}
        />
    );
};

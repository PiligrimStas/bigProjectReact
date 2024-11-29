import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import cls from './AppLInk.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    children?: ReactNode;
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        to, className, children, theme = AppLinkTheme.PRIMARY, ...otherProps
    } = props;
    return (
        <Link
            to={to}
            className={classNames(cls.appLink, { [cls[theme]]: true }, [className])}
            {...otherProps}
        >
            {children}
        </Link>
    );
});

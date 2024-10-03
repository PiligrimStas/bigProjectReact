import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';

interface NavBarProps {
    className?: string;
}

// для элементов не трубующих асинсхронного chunk используем именованный экспорт
export const Navbar = ({ className }: NavBarProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.navbar)}>
            <div className={cls.links}>7</div>
        </div>
    );
};

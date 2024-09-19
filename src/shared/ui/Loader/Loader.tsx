import { classNames } from 'shared/lib/classNames/classNames';

// здесь вместо module.scss импортируем обычный scss так как было лень переименновывать классы для спинера
// взятого с сайта loadint.io
import './Loader.scss';

interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
    <div className={classNames('lds-hourglass', {}, [className])} />
);

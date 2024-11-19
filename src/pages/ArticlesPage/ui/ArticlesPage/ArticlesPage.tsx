import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article');

    return (
        <div className={classNames(cls.articlePage, {}, [className])}>
            {t('This is the page of articles')}
        </div>
    );
};

// lazy работает только с импортами по умаолчанию
export default memo(ArticlesPage);

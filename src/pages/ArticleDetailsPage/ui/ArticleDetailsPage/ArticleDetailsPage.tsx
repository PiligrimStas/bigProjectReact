import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('aritcle');

    return (
        <div className={classNames(cls.articleDetailsPage, {}, [className])}>
            {t('Article details page')}
        </div>
    );
};

// lazy работает только с импортами по умаолчанию
export default memo(ArticleDetailsPage);

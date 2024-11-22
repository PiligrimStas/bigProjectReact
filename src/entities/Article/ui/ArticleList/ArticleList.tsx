import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSceleton';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
        ));

export const ArticleList = memo((props: ArticleListProps) => {
    const { className, articles, isLoading, view } = props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
                {getSkeletons(view)}
            </div>
        );
    }

    // console.log(articles);

    const renderArticle = (article: Article) => (
        <ArticleListItem className={cls.card} article={article} view={view} key={article.id} />
    );

    return (
        <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
            {articles.length > 0 ? articles.map(renderArticle) : null}
        </div>
    );
});

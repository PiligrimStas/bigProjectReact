import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { RoutePath } from 'shared/config/routeConfig/route.config';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { getArticleDetailsData } from 'entities/Article';
import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/article';
import { HStack } from 'shared/ui/Stack';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const navigate = useNavigate();
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.article_edit);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.articles}/${article?.id}/edit`);
    }, [navigate, article?.id]);

    return (
        <HStack max justify="between" className={classNames('', {}, [className])}>
            <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                {t('Назад к списку')}
            </Button>
            {canEdit && (
                <Button theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
                    {t('Редактировать')}
                </Button>
            )}
        </HStack>
    );
});

import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleList, ArticleView } from 'entities/Article';
import { VStack } from 'shared/ui/Stack';
import { useArticleRecomendationsList } from '../../api/articleRecomendationsApi';

interface ArticleRecomendationsListProps {
    className?: string;
}

export const ArticleRecomendationsList = memo((props: ArticleRecomendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { isLoading, data: articles, error } = useArticleRecomendationsList(3);

    // на счёт спинера загрузки или заглушки для ошибки пока не заморачиваемся
    if (isLoading || error) {
        return null;
    }

    return (
        <VStack gap="8" className={classNames('', {}, [className])}>
            <Text size={TextSize.L} title={t('Рекомендации')} />
            <ArticleList articles={articles} target="_blank" />
        </VStack>
    );
});
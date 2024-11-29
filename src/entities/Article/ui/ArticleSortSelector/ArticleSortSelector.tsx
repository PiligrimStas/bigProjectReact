import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { SortOrder } from 'shared/types';
import { ArticlesSortField } from '../../model/types/article';
import cls from './Article.SortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticlesSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticlesSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {
        className, sort, order, onChangeOrder, onChangeSort,
    } = props;
    const { t } = useTranslation('article-details');

    const orderOptions = useMemo<SelectOption[]>(
        () => [
            {
                value: 'asc',
                content: t('возрастанию'),
            },
            {
                value: 'desc',
                content: t('убыванию'),
            },
        ],
        [t],
    );

    const sortFieldOptions = useMemo<SelectOption[]>(
        () => [
            {
                value: ArticlesSortField.CREATED,
                content: t('дате создания'),
            },
            {
                value: ArticlesSortField.TITLE,
                content: t('названию'),
            },
            {
                value: ArticlesSortField.VIEWS,
                content: t('количеству просморов'),
            },
        ],
        [t],
    );

    // следующие две функии хреновое решении написаны для совместиости с onChange для инпута, что бы увидеть как это можно было сделать еще можно пересмотреть этот урок 59
    const changeSortHandler = useCallback(
        (newSort: string) => {
            onChangeSort(newSort as ArticlesSortField);
        },
        [onChangeSort],
    );

    const changeOrderHandler = useCallback(
        (newOrder: string) => {
            onChangeOrder(newOrder as SortOrder);
        },
        [onChangeOrder],
    );

    return (
        <div className={classNames(cls.articleSortSelector, {}, [className])}>
            <Select
                label={t('Сортировать по')}
                options={sortFieldOptions}
                value={sort}
                onChange={changeSortHandler}
                className={cls.order}
            />
            <Select
                label={t('по')}
                options={orderOptions}
                value={order}
                onChange={changeOrderHandler}
                className={cls.order}
            />
        </div>
    );
});

import { EntityState } from '@reduxjs/toolkit';
import {
    Article, ArticlesSortField, ArticleType, ArticleView,
} from 'entities/Article';
import { SortOrder } from 'shared/types';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;

    // for pagination
    page: number;
    limit?: number;
    hasMore: boolean;
    // for filtration
    view: ArticleView;
    order: SortOrder;
    sort: ArticlesSortField;
    search: string;
    type: ArticleType;

    _inited: boolean;
}

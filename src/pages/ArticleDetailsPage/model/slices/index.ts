import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { articleDetailsPageRecomendationsReducer } from './articleDetailsPageRecomentdationsSlice';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    recomendations: articleDetailsPageRecomendationsReducer,
    comments: articleDetailsCommentsReducer,
});

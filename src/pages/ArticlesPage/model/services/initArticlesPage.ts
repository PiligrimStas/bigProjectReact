import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SortOrder } from 'shared/types';
import { ArticlesSortField } from 'entities/Article';
import { getArticlesPageInited } from '../selectors/articlesPageSelectors';
import { articlesPageActions } from '../slices/articlesPageSlice';
import { fetchArticlesList } from './fetchArticlesList';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const inited = getArticlesPageInited(getState());

        if (!inited) {
            const orderFromUrl = searchParams.get('order') as SortOrder;
            const sortFromUrl = searchParams.get('sort') as ArticlesSortField;
            const searchFromUrl = searchParams.get('search');

            if (orderFromUrl) {
                dispatch(articlesPageActions.setOrder(orderFromUrl));
            }
            if (sortFromUrl) {
                dispatch(articlesPageActions.setSort(sortFromUrl));
            }
            if (searchFromUrl) {
                dispatch(articlesPageActions.setSearch(searchFromUrl));
            }

            // ков выше в этом блоке нужен для того что бы при вставке в адресную строку ссылки с уже
            // установленными парамерами поиска первый запрос на сервер выполнился именно с этими параметрами
            // то есть например мы получили ссылку на страницу где уже былы выполнен поиск. Когда эта ссылка появляется
            // в строке запроса браузер из неё при на странице ArticlesPage при помощи хука useSearchParams
            // считываются все поисковые параметры и с этими параметрами выполняются запросы на сервер. Таким обрзом мы увидим
            // такое же содержимое странцы как и тот человек который нам прислал ссылку.

            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({}));
        }
    },
);

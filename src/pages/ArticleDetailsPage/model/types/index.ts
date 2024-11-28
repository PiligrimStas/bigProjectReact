import { ArticleDetailsCommentsSchema } from './articleDetailsCommentsSchema';
import { ArticleDetailsRecomendationsSchema } from './ArticleDetailsPageRecomendationsSchema';

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentsSchema;
    recomendations: ArticleDetailsRecomendationsSchema;
}

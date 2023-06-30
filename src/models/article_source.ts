import { IArticle, Article } from "./article";

export interface IArticleSource {
  id?: number;
  name?: string;
  article?: IArticle[];
}

export class ArticleSource {
  id?: number;
  name?: string;
  article?: Article[];

  constructor(data: IArticleSource) {
    this.id = data.id;
    this.name = data.name;
    this.article = data.article?.map((i) => {
      return new Article(i);
    });
  }
}

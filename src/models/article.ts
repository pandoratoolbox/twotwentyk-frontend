import { IArticleSource, ArticleSource } from "./article_source";
import { IClaim, Claim } from "./claim";

export interface IArticle {
  article_source?: IArticleSource;
  id?: number;
  excerpt?: string;
  created_at?: number | string | Date;
  thumbnail_src?: string;
  title?: string;
  claim?: IClaim[];
  article_source_id?: number;
  url?: string;
  tags?: string[];
}

export class Article {
  article_source?: ArticleSource;
  id?: number;
  excerpt?: string;
  created_at?: Date;
  thumbnail_src?: string;
  title?: string;
  claim?: Claim[];
  article_source_id?: number;
  url?: string;
  tags?: string[];

  constructor(data: IArticle) {
    this.article_source = data.article_source
      ? new ArticleSource(data.article_source)
      : undefined;
    this.id = data.id;
    this.excerpt = data.excerpt;
    this.created_at = data.created_at ? new Date(data.created_at) : undefined;
    this.thumbnail_src = data.thumbnail_src;
    this.title = data.title;
    this.claim = data.claim?.map((i) => {
      return new Claim(i);
    });
    this.article_source_id = data.article_source_id;
    this.url = data.url;
    this.tags = data.tags;
  }
}

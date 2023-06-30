import { IArticleSource, ArticleSource } from "./article_source";
import { IClaim, Claim } from "./claim";

export interface IArticle {
  id?: number;
  article_source_id?: number;
  url?: string;
  created_at?: number | string | Date;
  thumbnail_src?: string;
  article_source?: IArticleSource;
  excerpt?: string;
  title?: string;
  tags?: string[];
  claim?: IClaim[];
}

export class Article {
  id?: number;
  article_source_id?: number;
  url?: string;
  created_at?: Date;
  thumbnail_src?: string;
  article_source?: ArticleSource;
  excerpt?: string;
  title?: string;
  tags?: string[];
  claim?: Claim[];

  constructor(data: IArticle) {
    this.id = data.id;
    this.article_source_id = data.article_source_id;
    this.url = data.url;
    this.created_at = data.created_at ? new Date(data.created_at) : undefined;
    this.thumbnail_src = data.thumbnail_src;
    this.article_source = data.article_source
      ? new ArticleSource(data.article_source)
      : undefined;
    this.excerpt = data.excerpt;
    this.title = data.title;
    this.tags = data.tags;
    this.claim = data.claim?.map((i) => {
      return new Claim(i);
    });
  }
}

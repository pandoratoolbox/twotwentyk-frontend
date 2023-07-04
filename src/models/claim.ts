import { IUser, User } from "./user";
import { IArticle, Article } from "./article";
import { INftCardPrediction, NftCardPrediction } from "./nft_card_prediction";

export interface IClaim {
  id?: number;
  status?: number;
  created_at?: number | string | Date;
  event_date?: number | string | Date;
  claimer_id?: number;
  nft_prediction_id?: number;
  nft_card_predicton?: INftCardPrediction;
  trigger?: string;
  article_id?: number;
  claimer?: IUser;
  article?: IArticle;
}

export class Claim {
  id?: number;
  status?: number;
  created_at?: Date;
  event_date?: Date;
  claimer_id?: number;
  nft_prediction_id?: number;
  nft_card_predicton?: NftCardPrediction;
  trigger?: string;
  article_id?: number;
  claimer?: User;
  article?: Article;

  constructor(data: IClaim) {
    this.id = data.id;
    this.status = data.status;
    this.created_at = data.created_at ? new Date(data.created_at) : undefined;
    this.claimer_id = data.claimer_id;
    this.nft_prediction_id = data.nft_prediction_id;
    this.article_id = data.article_id;
    this.claimer = data.claimer ? new User(data.claimer) : undefined;
    this.article = data.article ? new Article(data.article) : undefined;
  }
}

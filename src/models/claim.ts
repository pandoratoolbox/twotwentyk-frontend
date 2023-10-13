import { IUser, User } from "./user";
import { IArticle, Article } from "./article";
import { INftCardTrigger } from "./nft_card_trigger";
import { INftCardPrediction } from "./nft_card_prediction";

export interface IClaim {
  nft_prediction_id?: number;
  created_at?: number | string | Date;
  nft_trigger_id?: number;
  article?: IArticle;
  nft_trigger?: INftCardTrigger;
  nft_prediction?: INftCardPrediction;
  id?: number;
  status?: number;
  claimer_id?: number;
  article_id?: number;
  claimer?: IUser;
}
export class Claim {
  nft_prediction_id?: number;
  article_id?: number;
  claimer?: User;
  article?: Article;
  id?: number;
  status?: number;
  created_at?: Date;
  claimer_id?: number;

  constructor(data: IClaim) {
    this.nft_prediction_id = data.nft_prediction_id;
    this.article_id = data.article_id;
    this.claimer = data.claimer ? new User(data.claimer) : undefined;
    this.article = data.article ? new Article(data.article) : undefined;
    this.id = data.id;
    this.status = data.status;
    this.created_at = data.created_at ? new Date(data.created_at) : undefined;
    this.claimer_id = data.claimer_id;
  }
}

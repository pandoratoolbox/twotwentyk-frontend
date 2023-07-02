import { IUser, User } from "./user";
import { INftCardDayMonth, NftCardDayMonth } from "./nft_card_day_month";
import { INftCardTrigger, NftCardTrigger } from "./nft_card_trigger";
import { INftCardCrafting, NftCardCrafting } from "./nft_card_crafting";
import { INftCardCategory, NftCardCategory } from "./nft_card_category";
import { INftCardPrediction, NftCardPrediction } from "./nft_card_prediction";
import { INftCardIdentity, NftCardIdentity } from "./nft_card_identity";
import { INftCardYear, NftCardYear } from "./nft_card_year";

export interface IMarketplaceListing {
  nft_card_prediction_id?: number;
  nft_collection_id?: number;
  owner?: IUser;
  nft_card_day_month?: INftCardDayMonth;
  nft_card_trigger?: INftCardTrigger;
  nft_card_crafting_id?: number;
  is_listed?: boolean;
  nft_card_identity_id?: number;
  nft_card_crafting?: INftCardCrafting;
  nft_card_category?: INftCardCategory;
  price?: number;
  nft_card_day_month_id?: number;
  nft_card_year_id?: number;
  card_pack_id?: number;
  id?: number;
  created_at?: number | string | Date;
  nft_card_category_id?: number;
  nft_card_trigger_id?: number;
  nft_card_prediction?: INftCardPrediction;
  nft_card_identity?: INftCardIdentity;
  nft_card_year?: INftCardYear;
  owner_id?: number;
}

export class MarketplaceListing {
  nft_card_prediction_id?: number;
  nft_collection_id?: number;
  owner?: User;
  nft_card_day_month?: NftCardDayMonth;
  nft_card_trigger?: NftCardTrigger;
  nft_card_crafting_id?: number;
  is_listed?: boolean;
  nft_card_identity_id?: number;
  nft_card_crafting?: NftCardCrafting;
  nft_card_category?: NftCardCategory;
  price?: number;
  nft_card_day_month_id?: number;
  nft_card_year_id?: number;
  card_pack_id?: number;
  id?: number;
  created_at?: Date;
  nft_card_category_id?: number;
  nft_card_trigger_id?: number;
  nft_card_prediction?: NftCardPrediction;
  nft_card_identity?: NftCardIdentity;
  nft_card_year?: NftCardYear;
  owner_id?: number;

  constructor(data: IMarketplaceListing) {
    this.nft_card_prediction_id = data.nft_card_prediction_id;
    this.nft_collection_id = data.nft_collection_id;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.nft_card_day_month = data.nft_card_day_month
      ? new NftCardDayMonth(data.nft_card_day_month)
      : undefined;
    this.nft_card_trigger = data.nft_card_trigger
      ? new NftCardTrigger(data.nft_card_trigger)
      : undefined;
    this.nft_card_crafting_id = data.nft_card_crafting_id;
    this.is_listed = data.is_listed;
    this.nft_card_identity_id = data.nft_card_identity_id;
    this.nft_card_crafting = data.nft_card_crafting
      ? new NftCardCrafting(data.nft_card_crafting)
      : undefined;
    this.nft_card_category = data.nft_card_category
      ? new NftCardCategory(data.nft_card_category)
      : undefined;
    this.price = data.price;
    this.nft_card_day_month_id = data.nft_card_day_month_id;
    this.nft_card_year_id = data.nft_card_year_id;
    this.card_pack_id = data.card_pack_id;
    this.id = data.id;
    this.created_at = data.created_at ? new Date(data.created_at) : undefined;
    this.nft_card_category_id = data.nft_card_category_id;
    this.nft_card_trigger_id = data.nft_card_trigger_id;
    this.nft_card_prediction = data.nft_card_prediction
      ? new NftCardPrediction(data.nft_card_prediction)
      : undefined;
    this.nft_card_identity = data.nft_card_identity
      ? new NftCardIdentity(data.nft_card_identity)
      : undefined;
    this.nft_card_year = data.nft_card_year
      ? new NftCardYear(data.nft_card_year)
      : undefined;
    this.owner_id = data.owner_id;
  }
}

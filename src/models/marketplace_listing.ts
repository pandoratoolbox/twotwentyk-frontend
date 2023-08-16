import { INftCardTrigger, NftCardTrigger } from "./nft_card_trigger";
import { INftCardDayMonth, NftCardDayMonth } from "./nft_card_day_month";
import { INftCardPrediction, NftCardPrediction } from "./nft_card_prediction";
import { INftCardYear, NftCardYear } from "./nft_card_year";
import { IUser, User } from "./user";
import { INftCardIdentity, NftCardIdentity } from "./nft_card_identity";
import { INftCardCrafting, NftCardCrafting } from "./nft_card_crafting";
import { INftCardCategory, NftCardCategory } from "./nft_card_category";
import { IMarketplaceOffer, MarketplaceOffer } from "./marketplace_offer";
import { ICardPack } from "./card_pack";

export interface IMarketplaceListing {
  nft_card_identity_id?: number;
  nft_card_prediction_id?: number;
  nft_card_trigger?: INftCardTrigger;
  price?: number;
  nft_card_crafting_id?: number;
  nft_card_trigger_id?: number;
  nft_type_id?: number;
  nft_card_day_month?: INftCardDayMonth;
  nft_card_prediction?: INftCardPrediction;
  nft_card_year?: INftCardYear;
  created_at?: number | string | Date;
  is_listed?: boolean;
  owner?: IUser;
  nft_card_identity?: INftCardIdentity;
  nft_card_day_month_id?: number;
  card_pack_id?: number;
  card_pack?: ICardPack;
  nft_card_category_id?: number;
  nft_card_year_id?: number;
  nft_card_crafting?: INftCardCrafting;
  nft_card_category?: INftCardCategory;
  marketplace_offer?: IMarketplaceOffer[];
  id?: number;
  owner_id?: number;
}

export class MarketplaceListing {
  nft_card_identity_id?: number;
  nft_card_prediction_id?: number;
  nft_card_trigger?: NftCardTrigger;
  price?: number;
  nft_card_crafting_id?: number;
  nft_card_trigger_id?: number;
  nft_collection_id?: number;
  nft_card_day_month?: NftCardDayMonth;
  nft_card_prediction?: NftCardPrediction;
  nft_card_year?: NftCardYear;
  created_at?: Date;
  is_listed?: boolean;
  owner?: User;
  nft_card_identity?: NftCardIdentity;
  nft_card_day_month_id?: number;
  card_pack_id?: number;
  nft_card_category_id?: number;
  nft_card_year_id?: number;
  nft_card_crafting?: NftCardCrafting;
  nft_card_category?: NftCardCategory;
  marketplace_offer?: MarketplaceOffer[];
  id?: number;
  owner_id?: number;

  constructor(data: IMarketplaceListing) {
    this.nft_card_identity_id = data.nft_card_identity_id;
    this.nft_card_prediction_id = data.nft_card_prediction_id;
    this.nft_card_trigger = data.nft_card_trigger
      ? new NftCardTrigger(data.nft_card_trigger)
      : undefined;
    this.price = data.price;
    this.nft_card_crafting_id = data.nft_card_crafting_id;
    this.nft_card_trigger_id = data.nft_card_trigger_id;
    this.nft_collection_id = data.nft_type_id;
    this.nft_card_day_month = data.nft_card_day_month
      ? new NftCardDayMonth(data.nft_card_day_month)
      : undefined;
    this.nft_card_prediction = data.nft_card_prediction
      ? new NftCardPrediction(data.nft_card_prediction)
      : undefined;
    this.nft_card_year = data.nft_card_year
      ? new NftCardYear(data.nft_card_year)
      : undefined;
    this.created_at = data.created_at ? new Date(data.created_at) : undefined;
    this.is_listed = data.is_listed;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.nft_card_identity = data.nft_card_identity
      ? new NftCardIdentity(data.nft_card_identity)
      : undefined;
    this.nft_card_day_month_id = data.nft_card_day_month_id;
    this.card_pack_id = data.card_pack_id;
    this.nft_card_category_id = data.nft_card_category_id;
    this.nft_card_year_id = data.nft_card_year_id;
    this.nft_card_crafting = data.nft_card_crafting
      ? new NftCardCrafting(data.nft_card_crafting)
      : undefined;
    this.nft_card_category = data.nft_card_category
      ? new NftCardCategory(data.nft_card_category)
      : undefined;
    this.marketplace_offer = data.marketplace_offer?.map((i) => {
      return new MarketplaceOffer(i);
    });
    this.id = data.id;
    this.owner_id = data.owner_id;
  }
}

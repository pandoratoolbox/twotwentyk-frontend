import { ICardPack, CardPack } from "./card_pack";
import { INftCardCategory, NftCardCategory } from "./nft_card_category";
import { INftCardCrafting, NftCardCrafting } from "./nft_card_crafting";
import { INftCardDayMonth, NftCardDayMonth } from "./nft_card_day_month";
import { INftCardYear, NftCardYear } from "./nft_card_year";
import { ICardCollection, CardCollection } from "./card_collection";
import { INftCardIdentity, NftCardIdentity } from "./nft_card_identity";
import { INftCardPrediction, NftCardPrediction } from "./nft_card_prediction";
import { INftCardTrigger, NftCardTrigger } from "./nft_card_trigger";

export interface ICardSeries {
  name?: string;
  pct_day?: number;
  pct_event?: number;
  cost_usd: number;
  card_collection_id: number;
  card_pack?: ICardPack[];
  pct_identity?: number;
  card_amount?: number;
  rarity?: number;
  nft_card_category?: INftCardCategory[];
  nft_card_crafting?: INftCardCrafting[];
  nft_card_day_month?: INftCardDayMonth[];
  nft_card_year?: INftCardYear[];
  card_collection?: ICardCollection;
  pct_month?: number;
  quantity?: number;
  pct_year?: number;
  nft_card_identity?: INftCardIdentity[];
  nft_card_prediction?: INftCardPrediction[];
  nft_card_trigger?: INftCardTrigger[];
  id?: number;
}

export class CardSeries {
  name?: string;
  pct_day?: number;
  pct_event?: number;
  cost_usd?: number;
  card_collection_id?: number;
  card_pack?: CardPack[];
  pct_identity?: number;
  card_amount?: number;
  rarity?: number;
  nft_card_category?: NftCardCategory[];
  nft_card_crafting?: NftCardCrafting[];
  nft_card_day_month?: NftCardDayMonth[];
  nft_card_year?: NftCardYear[];
  card_collection?: CardCollection;
  pct_month?: number;
  quantity?: number;
  pct_year?: number;
  nft_card_identity?: NftCardIdentity[];
  nft_card_prediction?: NftCardPrediction[];
  nft_card_trigger?: NftCardTrigger[];
  id?: number;

  constructor(data: ICardSeries) {
    this.name = data.name;
    this.pct_day = data.pct_day;
    this.pct_event = data.pct_event;
    this.cost_usd = data.cost_usd;
    this.card_collection_id = data.card_collection_id;
    this.card_pack = data.card_pack?.map((i) => {
      return new CardPack(i);
    });
    this.pct_identity = data.pct_identity;
    this.card_amount = data.card_amount;
    this.rarity = data.rarity;
    this.nft_card_category = data.nft_card_category?.map((i) => {
      return new NftCardCategory(i);
    });
    this.nft_card_crafting = data.nft_card_crafting?.map((i) => {
      return new NftCardCrafting(i);
    });
    this.nft_card_day_month = data.nft_card_day_month?.map((i) => {
      return new NftCardDayMonth(i);
    });
    this.nft_card_year = data.nft_card_year?.map((i) => {
      return new NftCardYear(i);
    });
    this.card_collection = data.card_collection
      ? new CardCollection(data.card_collection)
      : undefined;
    this.pct_month = data.pct_month;
    this.quantity = data.quantity;
    this.pct_year = data.pct_year;
    this.nft_card_identity = data.nft_card_identity?.map((i) => {
      return new NftCardIdentity(i);
    });
    this.nft_card_prediction = data.nft_card_prediction?.map((i) => {
      return new NftCardPrediction(i);
    });
    this.nft_card_trigger = data.nft_card_trigger?.map((i) => {
      return new NftCardTrigger(i);
    });
    this.id = data.id;
  }
}

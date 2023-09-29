import { INftCardIdentity, NftCardIdentity } from "./nft_card_identity";
import { INftCardTrigger, NftCardTrigger } from "./nft_card_trigger";
import { INftCardYear, NftCardYear } from "./nft_card_year";
import { ICardCollection, CardCollection } from "./card_collection";
import { INftCardCrafting, NftCardCrafting } from "./nft_card_crafting";
import { ICardPack, CardPack } from "./card_pack";
import { INftCardCategory, NftCardCategory } from "./nft_card_category";
import { INftCardDayMonth, NftCardDayMonth } from "./nft_card_day_month";
import { INftCardPrediction, NftCardPrediction } from "./nft_card_prediction";

export interface ICardSeries {
  nft_card_identity?: INftCardIdentity[];
  nft_card_trigger?: INftCardTrigger[];
  guaranteed?: object;
  probabilities?: object;
  name?: string;
  nft_card_year?: INftCardYear[];
  card_collection?: ICardCollection;
  id?: number;
  card_collection_id: number;
  nft_card_crafting?: INftCardCrafting[];
  cards_per_pack?: number;
  card_pack?: ICardPack[];
  nft_card_category?: INftCardCategory[];
  nft_card_day_month?: INftCardDayMonth[];
  nft_card_prediction?: INftCardPrediction[];
  card_pack_quantity?: number;
  cost_usd: number;
}

export class CardSeries {
  nft_card_identity?: NftCardIdentity[];
  nft_card_trigger?: NftCardTrigger[];
  guaranteed?: object;
  probabilities?: object;
  name?: string;
  nft_card_year?: NftCardYear[];
  card_collection?: CardCollection;
  id?: number;
  card_collection_id?: number;
  nft_card_crafting?: NftCardCrafting[];
  cards_per_pack?: number;
  card_pack?: CardPack[];
  nft_card_category?: NftCardCategory[];
  nft_card_day_month?: NftCardDayMonth[];
  nft_card_prediction?: NftCardPrediction[];
  card_pack_quantity?: number;
  cost_usd?: number;

  constructor(data: ICardSeries) {
    this.nft_card_identity = data.nft_card_identity?.map((i) => {
      return new NftCardIdentity(i);
    });
    this.nft_card_trigger = data.nft_card_trigger?.map((i) => {
      return new NftCardTrigger(i);
    });
    this.guaranteed = data.guaranteed;
    this.probabilities = data.probabilities;
    this.name = data.name;
    this.nft_card_year = data.nft_card_year?.map((i) => {
      return new NftCardYear(i);
    });
    this.card_collection = data.card_collection
      ? new CardCollection(data.card_collection)
      : undefined;
    this.id = data.id;
    this.card_collection_id = data.card_collection_id;
    this.nft_card_crafting = data.nft_card_crafting?.map((i) => {
      return new NftCardCrafting(i);
    });
    this.cards_per_pack = data.cards_per_pack;
    this.card_pack = data.card_pack?.map((i) => {
      return new CardPack(i);
    });
    this.nft_card_category = data.nft_card_category?.map((i) => {
      return new NftCardCategory(i);
    });
    this.nft_card_day_month = data.nft_card_day_month?.map((i) => {
      return new NftCardDayMonth(i);
    });
    this.nft_card_prediction = data.nft_card_prediction?.map((i) => {
      return new NftCardPrediction(i);
    });
    this.card_pack_quantity = data.card_pack_quantity;
    this.cost_usd = data.cost_usd;
  }
}

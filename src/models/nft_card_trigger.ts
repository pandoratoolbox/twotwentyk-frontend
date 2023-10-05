import { ICardSeries, CardSeries } from "./card_series";
import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";
import { CardImages } from "./nft";
import { IUser, User } from "./user";

export interface INftCardTrigger {
  trigger?: string;
  card_series_id?: number;
  card_series?: ICardSeries;
  id?: number;
  is_crafted?: boolean;
  owner_id?: number;
  marketplace_listing?: IMarketplaceListing[];
  rarity?: number;
  tier?: string;
  owner?: IUser;
  created_at: string | number | Date;
  images?: CardImages;
}

export class NftCardTrigger {
  trigger?: string;
  card_series_id?: number;
  card_series?: CardSeries;
  id?: number;
  is_crafted?: boolean;
  owner_id?: number;
  marketplace_listing?: MarketplaceListing[];
  rarity?: number;
  tier?: string;
  owner?: User;

  constructor(data: INftCardTrigger) {
    this.trigger = data.trigger;
    this.card_series_id = data.card_series_id;
    this.card_series = data.card_series
      ? new CardSeries(data.card_series)
      : undefined;
    this.id = data.id;
    this.is_crafted = data.is_crafted;
    this.owner_id = data.owner_id;
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
    this.rarity = data.rarity;
    this.tier = data.tier;
    this.owner = data.owner ? new User(data.owner) : undefined;
  }
}

import { IUser, User } from "./user";
import { ICardSeries, CardSeries } from "./card_series";
import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";

export interface INftCardTrigger {
  card_series_id?: number;
  owner?: IUser;
  card_series?: ICardSeries;
  id?: number;
  is_crafted?: boolean;
  owner_id?: number;
  trigger?: string;
  rarity?: number;
  tier?: string;
  marketplace_listing?: IMarketplaceListing[];
}

export class NftCardTrigger {
  card_series_id?: number;
  owner?: User;
  card_series?: CardSeries;
  id?: number;
  is_crafted?: boolean;
  owner_id?: number;
  trigger?: string;
  rarity?: number;
  tier?: string;
  marketplace_listing?: MarketplaceListing[];

  constructor(data: INftCardTrigger) {
    this.card_series_id = data.card_series_id;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.card_series = data.card_series
      ? new CardSeries(data.card_series)
      : undefined;
    this.id = data.id;
    this.is_crafted = data.is_crafted;
    this.owner_id = data.owner_id;
    this.trigger = data.trigger;
    this.rarity = data.rarity;
    this.tier = data.tier;
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
  }
}

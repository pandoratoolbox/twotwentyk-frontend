import { IUser, User } from "./user";
import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";
import { ICardSeries, CardSeries } from "./card_series";

export interface INftCardCategory {
  owner?: IUser;
  owner_id?: number;
  rarity?: number;
  is_crafted?: boolean;
  card_series_id?: number;
  marketplace_listing?: IMarketplaceListing[];
  card_series?: ICardSeries;
  id?: number;
  category: string;
}

export class NftCardCategory {
  owner?: User;
  owner_id?: number;
  rarity?: number;
  is_crafted?: boolean;
  card_series_id?: number;
  marketplace_listing?: MarketplaceListing[];
  card_series?: CardSeries;
  id?: number;
  category?: string;

  constructor(data: INftCardCategory) {
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.owner_id = data.owner_id;
    this.rarity = data.rarity;
    this.is_crafted = data.is_crafted;
    this.card_series_id = data.card_series_id;
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
    this.card_series = data.card_series
      ? new CardSeries(data.card_series)
      : undefined;
    this.id = data.id;
    this.category = data.category;
  }
}

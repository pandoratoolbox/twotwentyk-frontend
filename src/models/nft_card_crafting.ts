import { IUser, User } from "./user";
import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";
import { ICardSeries, CardSeries } from "./card_series";

export interface INftCardCrafting {
  id?: number;
  is_crafted?: boolean;
  owner_id?: number;
  rarity?: number;
  card_series_id?: number;
  owner?: IUser;
  marketplace_listing?: IMarketplaceListing[];
  card_series?: ICardSeries;
}

export class NftCardCrafting {
  id?: number;
  is_crafted?: boolean;
  owner_id?: number;
  rarity?: number;
  card_series_id?: number;
  owner?: User;
  marketplace_listing?: MarketplaceListing[];
  card_series?: CardSeries;

  constructor(data: INftCardCrafting) {
    this.id = data.id;
    this.is_crafted = data.is_crafted;
    this.owner_id = data.owner_id;
    this.rarity = data.rarity;
    this.card_series_id = data.card_series_id;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
    this.card_series = data.card_series
      ? new CardSeries(data.card_series)
      : undefined;
  }
}

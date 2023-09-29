import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";
import { IUser, User } from "./user";
import { ICardSeries, CardSeries } from "./card_series";

export interface INftCardYear {
  owner_id?: number;
  is_crafted?: boolean;
  marketplace_listing?: IMarketplaceListing[];
  id?: number;
  year?: number;
  rarity?: number;
  card_series_id?: number;
  owner?: IUser;
  card_series?: ICardSeries;
}

export class NftCardYear {
  owner_id?: number;
  is_crafted?: boolean;
  marketplace_listing?: MarketplaceListing[];
  id?: number;
  year?: number;
  rarity?: number;
  card_series_id?: number;
  owner?: User;
  card_series?: CardSeries;

  constructor(data: INftCardYear) {
    this.owner_id = data.owner_id;
    this.is_crafted = data.is_crafted;
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
    this.id = data.id;
    this.year = data.year;
    this.rarity = data.rarity;
    this.card_series_id = data.card_series_id;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.card_series = data.card_series
      ? new CardSeries(data.card_series)
      : undefined;
  }
}

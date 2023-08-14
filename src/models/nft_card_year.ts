import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";
import { IUser, User } from "./user";
import { ICardSeries, CardSeries } from "./card_series";

export interface INftCardYear {
  rarity?: number;
  marketplace_listing?: IMarketplaceListing[];
  card_series_id?: number;
  owner?: IUser;
  card_series?: ICardSeries;
  id?: number;
  year: number;
  owner_id?: number;
  is_crafted?: boolean;
}

export class NftCardYear {
  rarity?: number;
  marketplace_listing?: MarketplaceListing[];
  card_series_id?: number;
  owner?: User;
  card_series?: CardSeries;
  id?: number;
  year?: number;
  owner_id?: number;
  is_crafted?: boolean;

  constructor(data: INftCardYear) {
    this.rarity = data.rarity;
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
    this.card_series_id = data.card_series_id;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.card_series = data.card_series
      ? new CardSeries(data.card_series)
      : undefined;
    this.id = data.id;
    this.year = data.year;
    this.owner_id = data.owner_id;
    this.is_crafted = data.is_crafted;
  }
}

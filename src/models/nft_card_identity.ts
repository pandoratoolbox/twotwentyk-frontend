import { IUser, User } from "./user";
import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";
import { ICardSeries, CardSeries } from "./card_series";

export interface INftCardIdentity {
  id: number;
  year?: number;
  owner_id?: number;
  owner?: IUser;
  marketplace_listing?: IMarketplaceListing[];
  card_series_id?: number;
  card_series?: ICardSeries;
  month?: number;
  day?: number;
  is_crafted?: boolean;
  celebrity_name?: string;
  category?: string;
  rarity?: number;
}

export class NftCardIdentity {
  id?: number;
  year?: number;
  owner_id?: number;
  owner?: User;
  marketplace_listing?: MarketplaceListing[];
  card_series_id?: number;
  card_series?: CardSeries;
  month?: number;
  day?: number;
  is_crafted?: boolean;
  celebrity_name?: string;
  category?: string;
  rarity?: number;

  constructor(data: INftCardIdentity) {
    this.id = data.id;
    this.year = data.year;
    this.owner_id = data.owner_id;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
    this.card_series_id = data.card_series_id;
    this.card_series = data.card_series
      ? new CardSeries(data.card_series)
      : undefined;
    this.month = data.month;
    this.day = data.day;
    this.is_crafted = data.is_crafted;
    this.celebrity_name = data.celebrity_name;
    this.category = data.category;
    this.rarity = data.rarity;
  }
}

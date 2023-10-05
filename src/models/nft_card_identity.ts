import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";
import { ICardSeries, CardSeries } from "./card_series";
import { IUser, User } from "./user";
import { CardImages } from "./nft";

export interface INftCardIdentity {
  is_crafted?: boolean;
  owner_id?: number;
  celebrity_name?: string;
  marketplace_listing?: IMarketplaceListing[];
  card_series?: ICardSeries;
  owner?: IUser;
  id?: number;
  month?: number;
  day?: number;
  year?: number;
  category?: string;
  rarity?: number;
  card_series_id?: number;
  created_at: string | number | Date;
  images?: CardImages;
}

export class NftCardIdentity {
  is_crafted?: boolean;
  owner_id?: number;
  celebrity_name?: string;
  marketplace_listing?: MarketplaceListing[];
  card_series?: CardSeries;
  owner?: User;
  id?: number;
  month?: number;
  day?: number;
  year?: number;
  category?: string;
  rarity?: number;
  card_series_id?: number;

  constructor(data: INftCardIdentity) {
    this.is_crafted = data.is_crafted;
    this.owner_id = data.owner_id;
    this.celebrity_name = data.celebrity_name;
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
    this.card_series = data.card_series
      ? new CardSeries(data.card_series)
      : undefined;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.id = data.id;
    this.month = data.month;
    this.day = data.day;
    this.year = data.year;
    this.category = data.category;
    this.rarity = data.rarity;
    this.card_series_id = data.card_series_id;
  }
}

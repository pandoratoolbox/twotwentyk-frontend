import { IUser, User } from "./user";
import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";
import { ICardSeries, CardSeries } from "./card_series";
import { CardImages } from "./nft";

export interface INftCardCategory {
  rarity?: number;
  card_series_id?: number;
  owner?: IUser;
  marketplace_listing?: IMarketplaceListing[];
  id?: number;
  is_crafted?: boolean;
  card_series?: ICardSeries;
  category?: string;
  owner_id?: number;
  created_at: string | number | Date;
  images?: CardImages;
}

export class NftCardCategory {
  rarity?: number;
  card_series_id?: number;
  owner?: User;
  marketplace_listing?: MarketplaceListing[];
  id?: number;
  is_crafted?: boolean;
  card_series?: CardSeries;
  category?: string;
  owner_id?: number;

  constructor(data: INftCardCategory) {
    this.rarity = data.rarity;
    this.card_series_id = data.card_series_id;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
    this.id = data.id;
    this.is_crafted = data.is_crafted;
    this.card_series = data.card_series
      ? new CardSeries(data.card_series)
      : undefined;
    this.category = data.category;
    this.owner_id = data.owner_id;
  }
}

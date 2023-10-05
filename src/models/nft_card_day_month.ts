import { IUser, User } from "./user";
import { ICardSeries, CardSeries } from "./card_series";
import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";
import { CardImages } from "./nft";

export interface INftCardDayMonth {
  rarity?: number;
  card_series_id?: number;
  owner?: IUser;
  day: number;
  month: number;
  owner_id?: number;
  card_series?: ICardSeries;
  id?: number;
  is_crafted?: boolean;
  marketplace_listing?: IMarketplaceListing[];
  created_at: string | number | Date;
  images?: CardImages;
}

export class NftCardDayMonth {
  rarity?: number;
  card_series_id?: number;
  owner?: User;
  day?: number;
  month?: number;
  owner_id?: number;
  card_series?: CardSeries;
  id?: number;
  is_crafted?: boolean;
  marketplace_listing?: MarketplaceListing[];

  constructor(data: INftCardDayMonth) {
    this.rarity = data.rarity;
    this.card_series_id = data.card_series_id;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.day = data.day;
    this.month = data.month;
    this.owner_id = data.owner_id;
    this.card_series = data.card_series
      ? new CardSeries(data.card_series)
      : undefined;
    this.id = data.id;
    this.is_crafted = data.is_crafted;
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
  }
}

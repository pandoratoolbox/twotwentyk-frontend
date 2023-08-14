import { IUser, User } from "./user";
import { ICardSeries, CardSeries } from "./card_series";
import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";

export interface INftCardDayMonth {
  day: number;
  owner_id?: number;
  owner?: IUser;
  card_series?: ICardSeries;
  id?: number;
  rarity?: number;
  is_crafted?: boolean;
  card_series_id?: number;
  marketplace_listing?: IMarketplaceListing[];
  month: number;
}

export class NftCardDayMonth {
  day?: number;
  owner_id?: number;
  owner?: User;
  card_series?: CardSeries;
  id?: number;
  rarity?: number;
  is_crafted?: boolean;
  card_series_id?: number;
  marketplace_listing?: MarketplaceListing[];
  month?: number;

  constructor(data: INftCardDayMonth) {
    this.day = data.day;
    this.owner_id = data.owner_id;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.card_series = data.card_series
      ? new CardSeries(data.card_series)
      : undefined;
    this.id = data.id;
    this.rarity = data.rarity;
    this.is_crafted = data.is_crafted;
    this.card_series_id = data.card_series_id;
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
    this.month = data.month;
  }
}

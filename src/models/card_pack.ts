import { ICardSeries, CardSeries } from "./card_series";
import { IUser, User } from "./user";
import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";

export interface ICardPack {
  id?: number;
  owner_id?: number;
  is_opened?: boolean;
  card_series?: ICardSeries;
  owner?: IUser;
  card_series_id?: number;
  cards?: object;
  tier?: number;
  marketplace_listing?: IMarketplaceListing[];
}

export class CardPack {
  id?: number;
  owner_id?: number;
  is_opened?: boolean;
  card_series?: CardSeries;
  owner?: User;
  card_series_id?: number;
  cards?: object;
  tier?: number;
  marketplace_listing?: MarketplaceListing[];

  constructor(data: ICardPack) {
    this.id = data.id;
    this.owner_id = data.owner_id;
    this.is_opened = data.is_opened;
    this.card_series = data.card_series
      ? new CardSeries(data.card_series)
      : undefined;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.card_series_id = data.card_series_id;
    this.cards = data.cards;
    this.tier = data.tier;
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
  }
}

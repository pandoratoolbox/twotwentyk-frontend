import { IUser, User } from "./user";
import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";
import { ICardSeries, CardSeries } from "./card_series";

export interface INftCardPrediction {
  id?: number;
  rarity?: number;
  owner?: IUser;
  marketplace_listing?: IMarketplaceListing[];
  is_claimed?: boolean;
  triggers?: string[];
  celebrity_name?: string;
  owner_id?: number;
  card_series_id?: number;
  card_series?: ICardSeries;
}

export class NftCardPrediction {
  id?: number;
  rarity?: number;
  owner?: User;
  marketplace_listing?: MarketplaceListing[];
  is_claimed?: boolean;
  triggers?: string[];
  celebrity_name?: string;
  owner_id?: number;
  card_series_id?: number;
  card_series?: CardSeries;

  constructor(data: INftCardPrediction) {
    this.id = data.id;
    this.rarity = data.rarity;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
    this.is_claimed = data.is_claimed;
    this.triggers = data.triggers;
    this.celebrity_name = data.celebrity_name;
    this.owner_id = data.owner_id;
    this.card_series_id = data.card_series_id;
    this.card_series = data.card_series
      ? new CardSeries(data.card_series)
      : undefined;
  }
}

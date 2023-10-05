import { IUser, User } from "./user";
import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";
import { ICardSeries, CardSeries } from "./card_series";
import { CardImages } from "./nft";

export interface INftCardPrediction {
  is_claimed?: boolean;
  triggers?: string[];
  owner?: IUser;
  marketplace_listing?: IMarketplaceListing[];
  card_series?: ICardSeries;
  id?: number;
  celebrity_name?: string;
  owner_id?: number;
  rarity?: number;
  card_series_id?: number;
  created_at: string | number | Date;
  images?: CardImages;
}

export class NftCardPrediction {
  is_claimed?: boolean;
  triggers?: string[];
  owner?: User;
  marketplace_listing?: MarketplaceListing[];
  card_series?: CardSeries;
  id?: number;
  celebrity_name?: string;
  owner_id?: number;
  rarity?: number;
  card_series_id?: number;

  constructor(data: INftCardPrediction) {
    this.is_claimed = data.is_claimed;
    this.triggers = data.triggers;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
    this.card_series = data.card_series
      ? new CardSeries(data.card_series)
      : undefined;
    this.id = data.id;
    this.celebrity_name = data.celebrity_name;
    this.owner_id = data.owner_id;
    this.rarity = data.rarity;
    this.card_series_id = data.card_series_id;
  }
}

import { ICardSeries, CardSeries } from "./card_series";
import { IUser, User } from "./user";

export interface ICardPack {
  owner_id?: number;
  is_opened?: boolean;
  tier?: number;
  card_series?: ICardSeries;
  owner?: IUser;
  id?: number;
  card_series_id?: number;
  cards?: object;
}

export class CardPack {
  owner_id?: number;
  is_opened?: boolean;
  tier?: number;
  card_series?: CardSeries;
  owner?: User;
  id?: number;
  card_series_id?: number;
  cards?: object;

  constructor(data: ICardPack) {
    this.owner_id = data.owner_id;
    this.is_opened = data.is_opened;
    this.tier = data.tier;
    this.card_series = data.card_series
      ? new CardSeries(data.card_series)
      : undefined;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.id = data.id;
    this.card_series_id = data.card_series_id;
    this.cards = data.cards;
  }
}

import { ICardPackSeries, CardPackSeries } from "./card_pack_series";

export interface ICardPacks {
  id?: number;
  card_pack_series_id?: number;
  cards?: object;
  card_pack_series?: ICardPackSeries;
}

export class CardPacks {
  id?: number;
  card_pack_series_id?: number;
  cards?: object;
  card_pack_series?: CardPackSeries;

  constructor(data: ICardPacks) {
    this.id = data.id;
    this.card_pack_series_id = data.card_pack_series_id;
    this.cards = data.cards;
    this.card_pack_series = data.card_pack_series
      ? new CardPackSeries(data.card_pack_series)
      : undefined;
  }
}

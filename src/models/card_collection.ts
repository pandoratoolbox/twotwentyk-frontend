import { ICardSeries, CardSeries } from "./card_series";

export interface ICardCollection {
  id: number;
  name: string;
  card_series: ICardSeries[];
}

export class CardCollection {
  id?: number;
  name?: string;
  card_series?: CardSeries[];

  constructor(data: ICardCollection) {
    this.id = data.id;
    this.name = data.name;
    this.card_series = data.card_series?.map((i) => {
      return new CardSeries(i);
    });
  }
}

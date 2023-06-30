import { ICardPacks, CardPacks } from "./card_packs";

export interface ICardPackSeries {
  pct_identity?: number;
  pct_year?: number;
  pct_day?: number;
  card_amount?: number;
  pct_event?: number;
  card_packs?: ICardPacks[];
  id?: number;
  name?: string;
  quantity?: number;
  pct_month?: number;
}

export class CardPackSeries {
  pct_identity?: number;
  pct_year?: number;
  pct_day?: number;
  card_amount?: number;
  pct_event?: number;
  card_packs?: CardPacks[];
  id?: number;
  name?: string;
  quantity?: number;
  pct_month?: number;

  constructor(data: ICardPackSeries) {
    this.pct_identity = data.pct_identity;
    this.pct_year = data.pct_year;
    this.pct_day = data.pct_day;
    this.card_amount = data.card_amount;
    this.pct_event = data.pct_event;
    this.card_packs = data.card_packs?.map((i) => {
      return new CardPacks(i);
    });
    this.id = data.id;
    this.name = data.name;
    this.quantity = data.quantity;
    this.pct_month = data.pct_month;
  }
}

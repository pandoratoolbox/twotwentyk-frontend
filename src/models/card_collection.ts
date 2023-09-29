import { ITrigger, Trigger } from "./trigger";
import { ICelebrity, Celebrity } from "./celebrity";
import { ICardSeries, CardSeries } from "./card_series";

export interface ICardCollection {
  id?: number;
  trigger?: ITrigger[];
  celebrity?: ICelebrity[];
  agg_pack_path?: string;
  trigger_address?: string;
  day_month_address?: string;
  year_address?: string;
  name?: string;
  crafting_address?: string;
  card_series?: ICardSeries[];
  status?: number;
  category_address?: string;
  identity_address?: string;
  prediction_address?: string;
  card_pack_address?: string;
}

export class CardCollection {
  id?: number;
  trigger?: Trigger[];
  celebrity?: Celebrity[];
  agg_pack_path?: string;
  trigger_address?: string;
  day_month_address?: string;
  year_address?: string;
  name?: string;
  crafting_address?: string;
  card_series?: CardSeries[];
  status?: number;
  category_address?: string;
  identity_address?: string;
  prediction_address?: string;

  constructor(data: ICardCollection) {
    this.id = data.id;
    this.trigger = data.trigger?.map((i) => {
      return new Trigger(i);
    });
    this.celebrity = data.celebrity?.map((i) => {
      return new Celebrity(i);
    });
    this.agg_pack_path = data.agg_pack_path;
    this.trigger_address = data.trigger_address;
    this.day_month_address = data.day_month_address;
    this.year_address = data.year_address;
    this.name = data.name;
    this.crafting_address = data.crafting_address;
    this.card_series = data.card_series?.map((i) => {
      return new CardSeries(i);
    });
    this.status = data.status;
    this.category_address = data.category_address;
    this.identity_address = data.identity_address;
    this.prediction_address = data.prediction_address;
  }
}

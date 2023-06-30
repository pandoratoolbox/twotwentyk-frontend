import { IUser, User } from "./user";

export interface INftCardDayMonth {
  rarity?: number;
  is_crafted?: boolean;
  owner?: IUser;
  id?: number;
  day?: number;
  month?: number;
  image?: string;
  owner_id?: number;
}

export class NftCardDayMonth {
  rarity?: number;
  is_crafted?: boolean;
  owner?: User;
  id?: number;
  day?: number;
  month?: number;
  image?: string;
  owner_id?: number;

  constructor(data: INftCardDayMonth) {
    this.rarity = data.rarity;
    this.is_crafted = data.is_crafted;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.id = data.id;
    this.day = data.day;
    this.month = data.month;
    this.image = data.image;
    this.owner_id = data.owner_id;
  }
}

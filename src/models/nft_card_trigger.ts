import { IUser, User } from "./user";

export interface INftCardTrigger {
  id?: number;
  is_crafted?: boolean;
  owner_id?: number;
  trigger?: string;
  rarity?: number;
  tier?: string;
  owner?: IUser;
  image?: string;

}

export class NftCardTrigger {
  id?: number;
  is_crafted?: boolean;
  owner_id?: number;
  trigger?: string;
  rarity?: number;
  tier?: string;
  owner?: User;
  image?: string;


  constructor(data: INftCardTrigger) {
    this.id = data.id;
    this.is_crafted = data.is_crafted;
    this.owner_id = data.owner_id;
    this.trigger = data.trigger;
    this.rarity = data.rarity;
    this.tier = data.tier;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.image = data.image;

  }
}

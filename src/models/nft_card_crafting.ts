import { IUser, User } from "./user";

export interface INftCardCrafting {
  id?: number;
  is_crafted?: boolean;
  owner_id?: number;
  rarity?: number;
  owner?: IUser;
  image?: string;
  name?: string | number;
}

export class NftCardCrafting {
  id?: number;
  is_crafted?: boolean;
  owner_id?: number;
  rarity?: number;
  owner?: User;
  image?: string;
  name?: string | number;

  constructor(data: INftCardCrafting) {
    this.id = data.id;
    this.is_crafted = data.is_crafted;
    this.owner_id = data.owner_id;
    this.rarity = data.rarity;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.image = data.image;
    this.name = data.name;
  }
}

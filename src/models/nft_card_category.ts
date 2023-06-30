import { IUser, User } from "./user";

export interface INftCardCategory {
  id?: number;
  category?: string;
  owner_id?: number;
  is_crafted?: boolean;
  rarity?: number;
  owner?: IUser;
}

export class NftCardCategory {
  id?: number;
  category?: string;
  owner_id?: number;
  is_crafted?: boolean;
  rarity?: number;
  owner?: User;

  constructor(data: INftCardCategory) {
    this.id = data.id;
    this.category = data.category;
    this.owner_id = data.owner_id;
    this.is_crafted = data.is_crafted;
    this.rarity = data.rarity;
    this.owner = data.owner ? new User(data.owner) : undefined;
  }
}

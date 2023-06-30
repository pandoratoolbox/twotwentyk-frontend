import { IUser, User } from "./user";

export interface INftCardYear {
  id?: number;
  year?: number;
  owner_id?: number;
  is_crafted?: boolean;
  rarity?: number;
  owner?: IUser;
  image?: string;
  name?: string | number;
}

export class NftCardYear {
  id?: number;
  year?: number;
  owner_id?: number;
  is_crafted?: boolean;
  rarity?: number;
  owner?: User;
  image?: string;
  name?: string | number;

  constructor(data: INftCardYear) {
    this.id = data.id;
    this.year = data.year;
    this.owner_id = data.owner_id;
    this.is_crafted = data.is_crafted;
    this.rarity = data.rarity;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.image = data.image;
    this.name = data.name;
  }
}

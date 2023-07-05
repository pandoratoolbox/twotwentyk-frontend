import { IUser, User } from "./user";

export interface INftCardIdentity {
  day: number;
  rarity: number;
  owner?: IUser;
  is_crafted: boolean;
  owner_id?: number;
  celebrity_name: string;
  category: string;
  id?: number;
  month: number;
  year: number;
  image?: string;

}

export class NftCardIdentity {
  day?: number;
  rarity?: number;
  owner?: User;
  is_crafted?: boolean;
  owner_id?: number;
  celebrity_name?: string;
  category?: string;
  id?: number;
  month?: number;
  year?: number;
  image?: string;


  constructor(data: INftCardIdentity) {
    this.day = data.day;
    this.rarity = data.rarity;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.is_crafted = data.is_crafted;
    this.owner_id = data.owner_id;
    this.celebrity_name = data.celebrity_name;
    this.category = data.category;
    this.id = data.id;
    this.month = data.month;
    this.year = data.year;
    this.image = data.image;

  }
}

import { IUser, User } from "./user";

export interface INftCardPrediction {
  rarity?: number;
  owner?: IUser;
  id?: number;
  is_claimed?: boolean;
  triggers?: string[];
  celebrity_name?: string;
  owner_id?: number;
}

export class NftCardPrediction {
  rarity?: number;
  owner?: User;
  id?: number;
  is_claimed?: boolean;
  triggers?: string[];
  celebrity_name?: string;
  owner_id?: number;

  constructor(data: INftCardPrediction) {
    this.rarity = data.rarity;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.id = data.id;
    this.is_claimed = data.is_claimed;
    this.triggers = data.triggers;
    this.celebrity_name = data.celebrity_name;
    this.owner_id = data.owner_id;
  }
}

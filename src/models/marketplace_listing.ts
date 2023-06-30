import { IUser, User } from "./user";

export interface IMarketplaceListing {
  is_listed?: boolean;
  nft_collection_id?: number;
  nft_id?: number;
  owner?: IUser;
  id?: number;
  owner_id?: number;
  price?: number;
  created_at?: number | string | Date;
}

export class MarketplaceListing {
  is_listed?: boolean;
  nft_collection_id?: number;
  nft_id?: number;
  owner?: User;
  id?: number;
  owner_id?: number;
  price?: number;
  created_at?: Date;

  constructor(data: IMarketplaceListing) {
    this.is_listed = data.is_listed;
    this.nft_collection_id = data.nft_collection_id;
    this.nft_id = data.nft_id;
    this.owner = data.owner ? new User(data.owner) : undefined;
    this.id = data.id;
    this.owner_id = data.owner_id;
    this.price = data.price;
    this.created_at = data.created_at ? new Date(data.created_at) : undefined;
  }
}

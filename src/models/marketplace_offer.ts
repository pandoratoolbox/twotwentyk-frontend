import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";
import { IUser, User } from "./user";

export interface IMarketplaceOffer {
  marketplace_listing?: IMarketplaceListing;
  buyer?: IUser;
  id?: number;
  status?: number;
  marketplace_listing_id?: number;
  amount?: number;
  buyer_id?: number;
}

export class MarketplaceOffer {
  marketplace_listing?: MarketplaceListing;
  buyer?: User;
  id?: number;
  status?: number;
  marketplace_listing_id?: number;
  amount?: number;
  buyer_id?: number;

  constructor(data: IMarketplaceOffer) {
    this.marketplace_listing = data.marketplace_listing
      ? new MarketplaceListing(data.marketplace_listing)
      : undefined;
    this.buyer = data.buyer ? new User(data.buyer) : undefined;
    this.id = data.id;
    this.status = data.status;
    this.marketplace_listing_id = data.marketplace_listing_id;
    this.amount = data.amount;
    this.buyer_id = data.buyer_id;
  }
}

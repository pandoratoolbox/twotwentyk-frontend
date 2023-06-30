import { INftCardCrafting, NftCardCrafting } from "./nft_card_crafting";
import { INftCardCategory, NftCardCategory } from "./nft_card_category";
import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";
import { INftCardYear, NftCardYear } from "./nft_card_year";
import { INftCardDayMonth, NftCardDayMonth } from "./nft_card_day_month";
import { INftCardTrigger, NftCardTrigger } from "./nft_card_trigger";
import { INftCardPrediction, NftCardPrediction } from "./nft_card_prediction";
import { INftCardIdentity, NftCardIdentity } from "./nft_card_identity";
import { IClaim, Claim } from "./claim";

export interface IUser {
  role_ids?: number[];
  nft_card_crafting?: INftCardCrafting[];
  nft_card_category?: INftCardCategory[];
  password?: string;
  marketplace_listing?: IMarketplaceListing[];
  nft_card_year?: INftCardYear[];
  nft_card_day_month?: INftCardDayMonth[];
  nft_card_trigger?: INftCardTrigger[];
  id?: number;
  username?: string;
  email?: string;
  created_at?: number | string | Date;
  wallet_address?: string;
  phone_number?: string;
  name?: string;
  nft_card_prediction?: INftCardPrediction[];
  nft_card_identity?: INftCardIdentity[];
  external_auth_id?: string;
  balance?: number;
  claim?: IClaim[];
}

export class User {
  role_ids?: number[];
  nft_card_crafting?: NftCardCrafting[];
  nft_card_category?: NftCardCategory[];
  password?: string;
  marketplace_listing?: MarketplaceListing[];
  nft_card_year?: NftCardYear[];
  nft_card_day_month?: NftCardDayMonth[];
  nft_card_trigger?: NftCardTrigger[];
  id?: number;
  username?: string;
  email?: string;
  created_at?: Date;
  wallet_address?: string;
  phone_number?: string;
  name?: string;
  nft_card_prediction?: NftCardPrediction[];
  nft_card_identity?: NftCardIdentity[];
  external_auth_id?: string;
  balance?: number;
  claim?: Claim[];

  constructor(data: IUser) {
    this.role_ids = data.role_ids;
    this.nft_card_crafting = data.nft_card_crafting?.map((i) => {
      return new NftCardCrafting(i);
    });
    this.nft_card_category = data.nft_card_category?.map((i) => {
      return new NftCardCategory(i);
    });
    this.password = data.password;
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
    this.nft_card_year = data.nft_card_year?.map((i) => {
      return new NftCardYear(i);
    });
    this.nft_card_day_month = data.nft_card_day_month?.map((i) => {
      return new NftCardDayMonth(i);
    });
    this.nft_card_trigger = data.nft_card_trigger?.map((i) => {
      return new NftCardTrigger(i);
    });
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.created_at = data.created_at ? new Date(data.created_at) : undefined;
    this.wallet_address = data.wallet_address;
    this.phone_number = data.phone_number;
    this.name = data.name;
    this.nft_card_prediction = data.nft_card_prediction?.map((i) => {
      return new NftCardPrediction(i);
    });
    this.nft_card_identity = data.nft_card_identity?.map((i) => {
      return new NftCardIdentity(i);
    });
    this.external_auth_id = data.external_auth_id;
    this.balance = data.balance;
    this.claim = data.claim?.map((i) => {
      return new Claim(i);
    });
  }
}

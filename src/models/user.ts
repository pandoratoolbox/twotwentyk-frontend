import { INftCardPrediction, NftCardPrediction } from "./nft_card_prediction";
import { INftCardDayMonth, NftCardDayMonth } from "./nft_card_day_month";
import { IMarketplaceOffer, MarketplaceOffer } from "./marketplace_offer";
import { IClaim, Claim } from "./claim";
import { IMarketplaceListing, MarketplaceListing } from "./marketplace_listing";
import { INftCardTrigger, NftCardTrigger } from "./nft_card_trigger";
import { ICardPack, CardPack } from "./card_pack";
import { INftCardCrafting, NftCardCrafting } from "./nft_card_crafting";
import { INftCardCategory, NftCardCategory } from "./nft_card_category";
import { INftCardYear, NftCardYear } from "./nft_card_year";
import { INftCardIdentity, NftCardIdentity } from "./nft_card_identity";

export interface IUser {
  nft_card_prediction?: INftCardPrediction[];
  nft_card_day_month?: INftCardDayMonth[];
  marketplace_offer?: IMarketplaceOffer[];
  name?: string;
  balance?: number;
  claim?: IClaim[];
  marketplace_listing?: IMarketplaceListing[];
  nft_card_trigger?: INftCardTrigger[];
  email?: string;
  password?: string;
  username?: string;
  created_at?: number | string | Date;
  external_auth_id?: string;
  wallet_address?: string;
  card_pack?: ICardPack[];
  nft_card_crafting?: INftCardCrafting[];
  nft_card_category?: INftCardCategory[];
  id?: number;
  role_ids?: number[];
  phone_number?: string;
  nft_card_year?: INftCardYear[];
  nft_card_identity?: INftCardIdentity[];
}

export class User {
  nft_card_prediction?: NftCardPrediction[];
  nft_card_day_month?: NftCardDayMonth[];
  marketplace_offer?: MarketplaceOffer[];
  name?: string;
  balance?: number;
  claim?: Claim[];
  marketplace_listing?: MarketplaceListing[];
  nft_card_trigger?: NftCardTrigger[];
  email?: string;
  password?: string;
  username?: string;
  created_at?: Date;
  external_auth_id?: string;
  wallet_address?: string;
  card_pack?: CardPack[];
  nft_card_crafting?: NftCardCrafting[];
  nft_card_category?: NftCardCategory[];
  id?: number;
  role_ids?: number[];
  phone_number?: string;
  nft_card_year?: NftCardYear[];
  nft_card_identity?: NftCardIdentity[];

  constructor(data: IUser) {
    this.nft_card_prediction = data.nft_card_prediction?.map((i) => {
      return new NftCardPrediction(i);
    });
    this.nft_card_day_month = data.nft_card_day_month?.map((i) => {
      return new NftCardDayMonth(i);
    });
    this.marketplace_offer = data.marketplace_offer?.map((i) => {
      return new MarketplaceOffer(i);
    });
    this.name = data.name;
    this.balance = data.balance;
    this.claim = data.claim?.map((i) => {
      return new Claim(i);
    });
    this.marketplace_listing = data.marketplace_listing?.map((i) => {
      return new MarketplaceListing(i);
    });
    this.nft_card_trigger = data.nft_card_trigger?.map((i) => {
      return new NftCardTrigger(i);
    });
    this.email = data.email;
    this.password = data.password;
    this.username = data.username;
    this.created_at = data.created_at ? new Date(data.created_at) : undefined;
    this.external_auth_id = data.external_auth_id;
    this.wallet_address = data.wallet_address;
    this.card_pack = data.card_pack?.map((i) => {
      return new CardPack(i);
    });
    this.nft_card_crafting = data.nft_card_crafting?.map((i) => {
      return new NftCardCrafting(i);
    });
    this.nft_card_category = data.nft_card_category?.map((i) => {
      return new NftCardCategory(i);
    });
    this.id = data.id;
    this.role_ids = data.role_ids;
    this.phone_number = data.phone_number;
    this.nft_card_year = data.nft_card_year?.map((i) => {
      return new NftCardYear(i);
    });
    this.nft_card_identity = data.nft_card_identity?.map((i) => {
      return new NftCardIdentity(i);
    });
  }
}

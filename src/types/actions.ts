export type LoginParams = {
  username: string;
  password: string;
};

export type RegisterParams = {
  username: string;
  password: string;
  email: string;
};

export type MarketplaceListObjectParams = {
  nft_collection_id?: number | string;
  nft_id?: number | string;
  id?: number;
  owner_id?: number;
  price?: number | string;
  created_at?: number | string | Date;
  is_listed?: boolean;
};

export type IdentityCraftingParams = {
  nft_card_day_month_id: number | string;
  nft_card_crafting_id: number | string;
  nft_card_year_id: number | string;
  celebrity_id: number | string | null;
  nft_card_category_id: number | string;


};

export type PredictionCraftingParams = {
  nft_card_identity_id: number;
  nft_card_trigger_ids: number[];
  nft_card_crafting_id: number;
};

/////////////////////////////////////

export interface IFilters {
  rarities?: [];
  status?: [];
}

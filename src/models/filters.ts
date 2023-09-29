export interface NftCardCategoryFilters {
  card_series_id: number | null;
  rarities: number[] | null;
  categories: number[] | null;
  status: number[] | null;
}

export interface NftCardCraftingFilters {
  rarities: number[] | null;
  card_series_id: number | null;
  status: number[] | null;
}

export interface NftCardDayMonthFilters {
  rarities: number[] | null;
  status: number[] | null;
  card_series_id: number | null;
  day: number | null;
  month: number | null;
}

export interface NftCardIdentityFilters {
  rarities: number[] | null;
  status: number[] | null;
  card_series_id: number | null;
  celebrities: number[] | null;
  categories: number[] | null;
}

export interface NftCardPredictionFilters {
  card_series_id: number | null;
  rarities: number[] | null;
  status: number[] | null;
  triggers: number[] | null;
  celebrities: number[] | null;
}

export interface NftCardTriggerFilters {
  card_series_id: number | null;
  nft_collection_id: number | null;
  status: number[] | null;
  rarities: number[] | null;
  triggers: number[] | null;
  tiers: string[] | null;
}

export interface NftCardYearFilters {
  card_series_id: number | null;
  rarities: number[] | null;
  status: number[] | null;
  year: number | null;
}

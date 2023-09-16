import api from "../config/api";
import { MarketplaceListObjectParams } from "../types/actions";

export interface RequestSearchMarketplaceListingParams {
  rarity?: number[];
  status?: number[];
  nft_type_ids: number[];
  nft_collection_id: number;
  limit?: number;
  offset?: number;
}

export const getMarketplaceList = async (params: RequestSearchMarketplaceListingParams) => {
  if (!params.limit) params.limit = 20;
  if (!params.offset) params.offset = 0;
  if (!params.rarity) params.rarity = [0,1,2];
  if (!params.status) params.status = [0,1];
  try {
    const res = await api.get(
      `/marketplace_listing?nft_type_ids=${params.nft_type_ids.join(",")}&limit=${params.limit}&nft_collection_id=${params.nft_collection_id}&rarity=${params.rarity.join(",")}&offset=${params.offset}&status=${params.status.join(",")}`
    );
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: "Server Error!" };
  }
};

export const getMarketplaceListByFilter = async (filter: string) => {
  try {
    const res = await api.get("/marketplace_listing?q=" + filter);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: "Server Error!" };
  }
};

export const getMarketplaceListById = async (id: number) => {
  try {
    const res = await api.get("/marketplace_listing/" + id);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: "Server Error!" };
  }
};

export const buyMarketplaceById = async (token: string, id: number) => {
  try {
    const res = await api.post("/marketplace_listing/" + id + "/buy", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: "Server Error!" };
  }
};

export const newMarketplaceList = async (
  newMarketplace: MarketplaceListObjectParams
) => {
  try {
    const res = await api.post("/marketplace_listing/", newMarketplace);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: "Server Error!" };
  }
};

export const updateMarketplaceListById = async (
  id: string,
  marketplaceData: MarketplaceListObjectParams
) => {
  try {
    const res = await api.put("/marketplace_listing/" + id, {
      ...marketplaceData,
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: "Server Error!" };
  }
};

export const deleteMarketplaceListById = async (id: string) => {
  try {
    const res = await api.delete("/marketplace_listing/" + id);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: "Server Error!" };
  }
};

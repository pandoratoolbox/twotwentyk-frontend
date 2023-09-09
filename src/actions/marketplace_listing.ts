import api from "../config/api";
import { MarketplaceListObjectParams } from "../types/actions";

export const getMarketplaceList = async (
  nft_collection_id: number,
  nft_type_ids: number[],
  limit: number
) => {
  try {
    const res = await api.get(
      `/marketplace_listing?nft_type_ids=${nft_type_ids.join(",")}&limit=${limit}&nft_collection_id=${nft_collection_id}`
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

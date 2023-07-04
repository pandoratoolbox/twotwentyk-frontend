import api from "../config/api";
import { MarketplaceListObjectParams } from "../types/actions";

export const getMarketplaceList = async (token: string) => {
  try {
    const res = await api.get(
      "/marketplace_listing?nft_collection_id=1&limit=20",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
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

export const newMarketplaceList = async (
  newMarketplace: MarketplaceListObjectParams,
  token: string
) => {
  try {
    const res = await api.post("/marketplace_listing/", newMarketplace, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
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

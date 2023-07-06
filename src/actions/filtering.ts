import api from "../config/api";
import { IFilters } from "../types/actions";

export const getFilterTriggerType = async (data: string[]) => {
  try {
    let queryString;
    queryString = `?trigger_types=${data.join(",")}`;

    const res = await api.get<IFilters[]>(`/me/nft_card_trigger${queryString}`);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};

export const getFilterCardType = async (data: string[]) => {
  try {
    let queryString;
    queryString = `?card_types=${data.join(",")}`;

    const res = await api.get<IFilters[]>(`/me/nft_card_trigger${queryString}`);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};

export const getFilterPackType = async (data: string[]) => {
  try {
    let queryString;
    queryString = `?pack_types=${data.join(",")}`;

    const res = await api.get<IFilters[]>(`/me/nft_card_trigger${queryString}`);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};

export const getFilterRarities = async (data: string[]) => {
  try {
    let queryString;
    queryString = `?rarities=${data.join(",")}`;

    const res = await api.get<IFilters[]>(`/me/nft_card_trigger${queryString}`);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};

export const getFilterStatus = async (data: string[]) => {
  try {
    let queryString;
    queryString = `?status=${data.join(",")}`;

    const res = await api.get<IFilters[]>(`/me/nft_card_trigger${queryString}`);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};

export const getFilterCollection = async (data: string) => {
  try {
    let queryString;
    queryString = `?collection=${data}`;

    const res = await api.get<IFilters[]>(`/me/nft_card_trigger${queryString}`);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};

export const getFilterCategory = async (data: string[]) => {
  try {
    let queryString;
    queryString = `?categories=${data.join(",")}`;

    const res = await api.get<IFilters[]>(`/me/nft_card_trigger${queryString}`);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};

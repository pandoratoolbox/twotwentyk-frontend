import api from "../config/api";
import { IFilters } from "../types/actions";

export const getFilter = async (
  filterType: string,
  data: string[],
  token: string
) => {
  try {
    let queryString;
    if (filterType === "category") {
      queryString = `?categories=${data.join(",")}`;
    }else if(filterType === "category"){

    }

    const res = await api.get<IFilters[]>(
      `/me/nft_card_trigger${queryString}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};

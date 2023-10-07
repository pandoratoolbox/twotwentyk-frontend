import api from "../config/api";

export const submitClaim = async (nft_card_prediction_id: number, nft_card_trigger_id : number) => {
  try {
    const res = await api.post("/claim", {
      nft_card_prediction_id,
      nft_card_trigger_id
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: "Server Error!" };
  }
}
import api from "../config/api";
import {
    nft_card_category_data,
    nft_card_crafting_data,
    nft_card_day_month_data,
    nft_card_identity_data,
    nft_card_prediction_data,
    nft_card_trigger_data,
    nft_card_year_data,
} from "../data/nfts";
import { IClaim } from "../models/claim";
import { ITransaction } from "../models/transaction";
import type { LoginParams, RegisterParams } from "../types/actions";

export const signin = async ({ username, password }: LoginParams) => {
    try {
        const res = await api.post("/auth/login", { username, password });
        return { success: true, token: res.data.token };
    } catch (error) {
        return { success: false, message: "Server Error!" };
    }
};

export const register = async ({
    username,
    password,
    email,
}: RegisterParams) => {
    try {
        const res = await api.post("/auth/register", {
            username,
            password,
            email,
        });
        return { success: true, user: res.data };
    } catch (error: any) {
        const errorRes = error?.response?.data;
        let errorMsg = "Server Error!";
        if (String(errorRes).search("user_email_key") !== -1)
            errorMsg = "Already in use, try a different email or Log In.";
        if (String(errorRes).search("user_username_key") !== -1)
            errorMsg = "Already in use, try a different username.";

        return { success: false, message: errorMsg };
    }
};

export const getMyInfo = async () => {
    try {
        const res = await api.get("/me");
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: "Server Error!" };
    }
};

export const updateMyInfo = async (arg: { [key: string]: string }) => {
    try {
        const res = await api.put("/me", { ...arg });
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: "Server Error!" };
    }
};

export const verifyPassword = async (arg: { [key: string]: string }) => {
    try {
        const res = await api.post("/me/verify_password", { ...arg });
        return { success: res.data.success };
    } catch (error) {
        return { success: false, message: "Server Error!" };
    }
};

export const getMyNFTs = async (token: string) => {
    const myNFTsData = {
        nft_card_category_data: nft_card_category_data.filter(
            (f) => f.owner_id === 3
        ),
        nft_card_crafting_data: nft_card_crafting_data.filter(
            (f) => f.owner_id === 3
        ),
        nft_card_day_month_data: nft_card_day_month_data.filter(
            (f) => f.owner_id === 3
        ),
        nft_card_identity_data: nft_card_identity_data.filter(
            (f) => f.owner_id === 3
        ),
        nft_card_prediction_data: nft_card_prediction_data.filter(
            (f) => f.owner_id === 3
        ),
        nft_card_trigger_data: nft_card_trigger_data.filter(
            (f) => f.owner_id === 3
        ),
        nft_card_year_data: nft_card_year_data.filter((f) => f.owner_id === 3),
    };

    // console.log(myNFTsData);
    return { success: true, data: myNFTsData };

    // try {
    //   const res = await api.get("/me/nft", {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   });
    //   return { success: true, data: res.data };
    // } catch (error) {
    //   return { success: false, message: "Server Error!" };
    // }
};

export const getClaim = async () => {
    try {
        const res = await api.get<IClaim[]>("/me/claim");
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: "Server Error!", data: [] };
    }
};

export const getTransactions = async () => {
    try {
        const res = await api.get<ITransaction[]>("/me/transaction");
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: "Server Error!" };
    }
};

const NFT_TYPE_ID_CARD_PACK  = 0
const NFT_TYPE_ID_CRAFTING   = 1
const NFT_TYPE_ID_CATEGORY   = 2
const NFT_TYPE_ID_DAY_MONTH  = 3
const NFT_TYPE_ID_YEAR       = 4
const NFT_TYPE_ID_TRIGGER    = 5
const NFT_TYPE_ID_IDENTITY   = 6
const NFT_TYPE_ID_PREDICTION = 7

export {
    NFT_TYPE_ID_CARD_PACK,
    NFT_TYPE_ID_CRAFTING,
    NFT_TYPE_ID_CATEGORY,
    NFT_TYPE_ID_DAY_MONTH,
    NFT_TYPE_ID_IDENTITY,
    NFT_TYPE_ID_PREDICTION,
    NFT_TYPE_ID_TRIGGER,
    NFT_TYPE_ID_YEAR
}

export interface CardImages {
    card_front?: string;
    card_back?: string;
    animation?: string;
}
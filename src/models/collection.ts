import { ICelebrity } from "./celebrity";
import { ITrigger } from "./trigger";

export interface ICardCollection {
    id: number;
    day_month_address: string;
    year_address: string;
    agg_pack_path: string;
    trigger_address: string;
    card_pack_address: string;
    crafting_address: string;
    name: string;
    identity_address: string;
    prediction_address: string;
    status: number;
    category_address: string;
    trigger_prize_pool_distribution: {
        [key: string]: number;
    };
    images: {
        logo: string;
        card_front: string;
        card_back: string;
    };
    card_series?: ICardSeries[];
    trigger?: ITrigger[];
    celebrity?: ICelebrity[];
}

export interface CardSeriesGuaranteed {
    rare: CardTypeValue;
    core: CardTypeValue;
    uncommon: CardTypeValue;
}


export interface ICardSeries {
    card_collection?: ICardCollection;
    cards_per_pack: number;
    card_pack_quantity: number;
    cost_usd: number;
    guaranteed: CardSeriesGuaranteed;
    probabilities: {
        year: RarityValues;
        day_month: RarityValues;
        category: RarityValues;
        trigger: {
            [key: string]: {
                [key: number]: {
                    probability: number;
                    reward_type: number;
                    reward_rarity: number;
                    reg_definition: number;
                };
            };
        };
    };
    id?: number;
    card_collection_id: number;
    name: string;
    card_packs?: CollectionCards;
    images?: {
        card_pack_front: string;
        card_pack_back: string;
    };
}

export interface CardTypeValue {
    category: number;
    day_month: number;
    trigger: {
        amount: number;
        tier?: string;
        id?: number;
    };
    year: number;
    crafting: number;
}
interface RarityValues {
    core: number;
    uncommon: number;
    rare: number;
}


interface CollectionCards {
    crafting: CardTypeValue[];
    category: CardTypeValue[];
    trigger: CardTypeValue[];
    year: CardTypeValue[];
    day_month: CardTypeValue[];
}


import { ICardSeries } from "../models/card_series";
import { ICelebrity } from "../models/celebrity";
import { IMarketplaceListing } from "../models/marketplace_listing";
import { INftCardCategory } from "../models/nft_card_category";
import { INftCardCrafting } from "../models/nft_card_crafting";
import { INftCardDayMonth } from "../models/nft_card_day_month";
import { INftCardYear } from "../models/nft_card_year";
import { CardActionTypes } from "./common";

export type SocialAuthButtonProps = {
  socialType: "Google" | "Facebook" | "Apple";
  onClick: () => void;
} & SocialButtonsGroupProps;

export type SocialButtonsGroupProps = {
  authType: "Signup" | "Login";
};

export type InputProps = {
  label?: string;
  error?: string;
  desc?: string;
  code?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type ButtonProps = {
  disabled?: boolean;
  variant?: string;
} & React.HTMLAttributes<HTMLElement>;

export type checkEmailFormProps = {
  title: string;
  desc: string;
  onResend?: () => void;
};

export type AppHeaderMenuItemProps = {
  label: string;
  to: string;
  children?: {
    label: string;
    to: string;
  }[];
};

export type CardPacksCardProps = {
  cardType?: string;
  item?: any;
  id?: number;
  is_opened?: boolean;
  owner_id?: number;
  rarity?: number;
  height?: number;
  image?: string;
  name?: string;
  isNotHover?: boolean;
  onView?: (id: number) => void;
  onSell?: (id: number) => void;
  onOpen?: (id: number) => void;
};

export type PredictionCardProps = {
  dashbordstyle?: boolean;
  cardType?: string;
  item?: any;
  id?: number;
  month?: number;
  year?: number;
  is_crafted?: boolean;
  is_claimed?: boolean;
  triggers?: string[];
  owner_id?: number;
  category?: string;
  rarity?: number;
  height?: number;
  day?: number;
  celebrity_name?: string;
  image?: string;
  icon?: React.ReactNode;
  iconText?: string;
  isNotHover?: boolean;
  onClick?: () => void;
  onCard?: (item: IMarketplaceListing | undefined, action: CardActionTypes) => void;
  onView?: (id: number) => void;
  onCraft?: (id: number) => void;
  onSell?: (id: number) => void;
  onBuy?: (id: number) => void;
} & IMarketplaceListing;

export type FeedItemProps = {
  date: string;
  image: string;
  title: string;
  desc: string;
  tags: string[];
};

export type NotificationItemProps = {
  date: string;
  title: string;
  desc: string;
  isNew: boolean;
};

export type DateCardProps = {
  id?: number;
  category: string;
  owner_id?: number;
  day: number;
  month: number;
  rarity: number;
  is_crafted?: boolean;
  image: string;
  isNotHover?: boolean;
  onView?: (id: number) => void;
  onCraft?: (id: number) => void;
  onSell?: (id: number) => void;
  item?: any;
};

export type TriggerCardProps = {
  tier: string;
  item?: any;
  id?: number;
  trigger: string;
  owner_id?: number;
  rarity: number;
  is_crafted?: boolean;
  image: string;
  isNotHover?: boolean;
  onView?: (id: number) => void;
  onCraft?: (id: number) => void;
  onSell?: (id: number) => void;
};

export type DateCardGridProps = {
  data?: Array<any>;
  identityData?: Array<any>;
  cardType?: string;
  onView?: (id: string | number) => void;
  onCraft?: (id: string | number) => void;
  onSell?: (id: string | number) => void;
};

export type ViewDateCardProps = {
  isView: boolean;

  onClose: () => void;
  cardType?: string;
  item: any;
};

export type SellDateCardProps = {
  item: any;

  onSellConfirm: (
    id: number,
    nftCollectionId: number,
    totalPrice: number
  ) => Promise<void>;
} & ViewDateCardProps;

export type ModalProps = {
  paddingClass?: string;
  modalHeader?: boolean;
  width?: number;
  onClose: () => void;
  open: boolean;
} & React.HTMLAttributes<HTMLElement>;

export type ModalHeaderProps = {
  bg?: string;
  onClose?: () => void;
} & React.HTMLAttributes<HTMLElement>;

export type SellModalProps = {
  onConfirm?: () => void;
  isMarket?: boolean;
  isOffer?: boolean;
} & ModalProps;

export type CraftIdentityModalProps = {
  selectCelebrity: (c: ICelebrity | null) => void;
  selectedCards: {
    crafting: INftCardCrafting | null;
    year: INftCardYear | null;
    dayMonth: INftCardDayMonth | null;
    category: INftCardCategory | null;
  };
  onCraft: () => void;
} & ModalProps;

export type WithdrawConfirmModalProps = {
  status: "success" | "failed";
} & ModalProps;

export type ProfileModalProps = { title: string } & ModalProps;

export type UseBalanceBuyModalProps = {
  price?: number | string;
  onBuyClick: () => void;
} & ModalProps;

export type BalanceBuyConfirmModalProps = {
  price?: number | string;
  onConfirm: () => void;
  isOffer?: boolean;
} & ModalProps;

export type SelectBoxProps = {
  clear?: boolean;
  placeholder?: string;
  border?: boolean;
  label?: string;
  value?: string | Array<string>;
  isFilter?: boolean;
  options?: SelectOptionProps[];
  // newData?: any;
  onClick?: (filterType: string, selectedOptions: string[]) => void;
  onChange?: (value: string | Array<string>) => void;
  onSelect?: (v: SelectOptionProps) => void;
};

export type WithdrawModalProps = {
  onWithdraw: (status?: boolean) => void;
} & ModalProps;

export type SelectOptionProps = {
  label: string;
  value: string;
  image?: string;
  checked?: boolean;
};

export type ProfileProps = {
  username: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  onEdit?: (key: string) => void;
};

export type ProfileItemProps = {
  id: string;
  label: string;
  value: string;
  type?: "text" | "password";
  isRequired?: boolean;
  isEditable?: boolean;
  onEdit?: (key: string) => void;
};

export type ProfileEditProps = {
  onBack: () => void;
  section: string;
} & React.HTMLAttributes<HTMLElement>;

export type NotifyProps = {
  text: string;
  show: boolean;
};

export type BuyPackProps = {
  onCardClick: (cardSeries: ICardSeries) => void;
  cardType: string;
  preview?: boolean;
  price: number;
  cardSeries: ICardSeries;
  rarity: number;
};

export type BuyDetailsProps = {
  id: string | number;
  onClose: () => void;
  isView: boolean;
  onBuyClick: (cardSeries: ICardSeries, quantity: number, payment_method_id: number) => void;
  cardSeries: ICardSeries;
  rarity: number;
};

export type NotificationProps = {
  open: boolean;
  onClose: () => void;
};

// export type forItem = {
//   nft_card_prediction_id?: number;
//   nft_collection_id?: number;
//   owner?: any;
//   nft_card_day_month?: any;
//   nft_card_trigger?: any;
//   nft_card_crafting_id?: number;
//   is_listed?: boolean;
//   nft_card_identity_id?: number;
//   nft_card_crafting?: any;
//   nft_card_category?: any;
//   price?: number;
//   nft_card_day_month_id?: number;
//   nft_card_year_id?: number;
//   card_pack_id?: number;
//   id?: number;
//   created_at?: number | string | Date;
//   nft_card_category_id?: number;
//   nft_card_trigger_id?: number;
//   nft_card_prediction?: any;
//   nft_card_identity?: any;
//   nft_card_year?: any;
//   owner_id?: number;
// };

export type MarketCardProps = {
  item: IMarketplaceListing;
  // price?: number;
  // image: string;
  // name: string;
  type?: string;
  // id?: number | string;
  isOffer?: boolean;
  // rarity: string;
  // status?: string;
  // owned?: string | number;
  // onCard?: (id?: string | number, action?: CardActionTypes) => void;
  // is_listed?: string;
  // owner_id?: string | number;
  onCard?: (item: IMarketplaceListing | undefined, action: CardActionTypes) => void;
} & IMarketplaceListing;

export type CraftPredictionModalProps = {
  onBurn?: () => void;
} & ModalProps;


export const cardTypeOption = new Map<number, {name: string, id: number}>([
  [3, {
    name: "Day/Month",
    id: 1
  }],
  [4, {
    name: "Year",
    id: 4
  }],
  [2,{
    name: "Category",
    id: 2
  }],
  [5,{
    name: "Trigger",
    id: 5
  }],
  [1,{
    name: "Crafting",
    id: 1
  }]
]);

export const triggerTypeOption = new Map<number, { id: number; name: string }>([
  [
    1,
    {
      name: "Major",
      id: 1,
    },
  ],
  [
    2,
    {
      name: "Minor Tier1",
      id: 2,
    },
  ],
  [
    3,
    {
      name: "Minor Tier2",
      id: 3,
    },
  ],
]);

export const collectionOption = new Map<number, { id: number; name: string }>([
  [
    1,
    {
      id: 1,
      name: "Genesis",
    },
  ],
]);

export const statusOption = new Map<number, { id: number; name: string }>([
  [
    1,
    {
      name: "Owned",
      id: 1,
    },
  ],
  [
    2,
    {
      name: "For Sale",
      id: 2,
    },
  ],
  [
    3,
    {
      name: "Not for sale",
      id: 3,
    },
  ],
]);
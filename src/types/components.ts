import { ICelebrity } from "../models/celebrity";
import { INftCardCategory } from "../models/nft_card_category";
import { INftCardCrafting } from "../models/nft_card_crafting";
import { INftCardDayMonth } from "../models/nft_card_day_month";
import { INftCardYear } from "../models/nft_card_year";
import { IMarketplaceListing } from "./actions";
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

export type PredictionCardProps = {
  forDashboard?: boolean;
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
  onCard?: (item: forItem | undefined, action: CardActionTypes) => void;
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
  identityData?: Array<any> ;
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
    id: string | number,
    nftCollectionId: string | number,
    totalPrice: string | number
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
  isMarket?: boolean;
  isOffer?: boolean;
} & ModalProps;

export type CraftIdentityModalProps = {
  selectCelebrity: (c: ICelebrity) => void,
  selectedCards: {
    crafting: INftCardCrafting | null,
    year: INftCardYear | null,
    dayMonth: INftCardDayMonth | null,
    category: INftCardCategory | null
  },
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
  placeholder?: string;
  border?: boolean;
  label?: string;
  value?: string | Array<string>;
  isFilter?: boolean;
  options?: SelectOptionProps[];
  newData?: any;
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
  onCardClick: (id: string | number) => void;
  onBuyClick: (id: string | number) => void;
  cardType: string;
  price: number;
};

export type BuyDetailsProps = {
  id: string | number;
  onClose: () => void;
  isView: boolean;
};

export type NotificationProps = {
  open: boolean;
  onClose: () => void;
};

export type forItem = {
  nft_card_prediction_id?: number;
  nft_collection_id?: number;
  owner?: any;
  nft_card_day_month?: any;
  nft_card_trigger?: any;
  nft_card_crafting_id?: number;
  is_listed?: boolean;
  nft_card_identity_id?: number;
  nft_card_crafting?: any;
  nft_card_category?: any;
  price?: number;
  nft_card_day_month_id?: number;
  nft_card_year_id?: number;
  card_pack_id?: number;
  id?: number;
  created_at?: number | string | Date;
  nft_card_category_id?: number;
  nft_card_trigger_id?: number;
  nft_card_prediction?: any;
  nft_card_identity?: any;
  nft_card_year?: any;
  owner_id?: number;
};

export type MarketCardProps = {
  item?: forItem;
  price?: number;
  image: string;
  name: string;
  type?: string;
  rarity: string;
  is_listed?: string;
  owner_id?: string | number;
  onCard?: (item: forItem | undefined, action: CardActionTypes) => void;
} & IMarketplaceListing;

export type CraftPredictionModalProps = {
  onBurn?: () => void;
} & ModalProps;

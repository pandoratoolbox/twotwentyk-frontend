import { IMarketplaceListing } from "../models/marketplace_listing";

export type SVGAttributes = React.SVGProps<SVGSVGElement>;

export type CardActionTypes = "" | "view" | "sell" | "buy" | "offer";

export type CardSidebarProps = {
  selectedItem: IMarketplaceListing;
  onClose: () => void;
  page?: string;
  onConfirm?: () => void;
  open: boolean;
  data?: IMarketplaceListing[] | null;
  setData?: React.Dispatch<React.SetStateAction<IMarketplaceListing[] | null>>;
};

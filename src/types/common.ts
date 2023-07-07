export type SVGAttributes = React.SVGProps<SVGSVGElement>;

export type CardActionTypes = "" | "view" | "sell" | "buy" | "offer";

export type CardSidebarProps = {
  selectedItem?: any;
  onClose: () => void;
  page?: string;
  onConfirm?: () => void;
  open: boolean;
};

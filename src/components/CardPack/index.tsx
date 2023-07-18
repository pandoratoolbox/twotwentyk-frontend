import React from "react";
import {
  CardBottomWrapper,
  CardTopWrapper,
  CardTypeWrapper,
  PredictionCardWrapper,
} from "./styles";
import {
  CardButton,
  CardButtonGroup,
  CardOverlayWrapper,
} from "../DateCard/styles";
import { CardPacksCardProps } from "../../types";

export const CardPack: React.FC<CardPacksCardProps> = ({
  item,
  id = 0,
  image,
  rarity,
  height,
  onSell,
  onView,
  onOpen,
}) => {
  image = "/assets/buy.png";
  return (
    <PredictionCardWrapper height={height} bg={image}>
      <CardTopWrapper>
        {rarity === 0 && <CardTypeWrapper>Common</CardTypeWrapper>}
        {rarity === 1 && <CardTypeWrapper>Uncommon</CardTypeWrapper>}
        {rarity === 2 && <CardTypeWrapper>Rare</CardTypeWrapper>}
      </CardTopWrapper>

      <CardBottomWrapper>Card Pack</CardBottomWrapper>

      <CardOverlayWrapper className="overlay">
        <CardButtonGroup>
          {onView && <CardButton onClick={() => onView(item)}>View</CardButton>}
          {onOpen && <CardButton onClick={() => onOpen(item)}>Open</CardButton>}
          {onSell && <CardButton onClick={() => onSell(item)}>Sell</CardButton>}
        </CardButtonGroup>
      </CardOverlayWrapper>
    </PredictionCardWrapper>
  );
};

import React from "react";
import {
  CardBottomWrapper,
  CardTopWrapper,
  CardTypeWrapper,
  PredictionCardWrapper,
  CardOverlayWrapper
} from "./styles";
import {
  CardButton,
  CardButtonGroup,
} from "../DateCard/styles";
import { CardPacksCardProps } from "../../types";
import { CardImgWrapper, Rarity } from "../MarketCard/styles";

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
  image = "/assets/nfts/new2.png";
  return (
    <PredictionCardWrapper height={height} bg={image}>
      <CardImgWrapper>
        <img src={image} alt="nft" />
        <>
          {rarity === 0 && <Rarity>Common</Rarity>}
          {rarity === 1 && <Rarity>Uncommon</Rarity>}
          {rarity === 2 && <Rarity>Rare</Rarity>}
        </>
      </CardImgWrapper>
      {/* <CardTopWrapper>
        {rarity === 0 && <CardTypeWrapper>Common</CardTypeWrapper>}
        {rarity === 1 && <CardTypeWrapper>Uncommon</CardTypeWrapper>}
        {rarity === 2 && <CardTypeWrapper>Rare</CardTypeWrapper>}
      </CardTopWrapper> */}

      <CardBottomWrapper>Card Pack</CardBottomWrapper>

      <CardOverlayWrapper className="overlay">
        <CardButtonGroup>
          {onView && <CardButton onClick={() => onView(item)}>View</CardButton>}
          {onOpen && <CardButton onClick={() => onOpen(item.id)}>Open</CardButton>}
          {onSell && <CardButton onClick={() => onSell(item)}>Sell</CardButton>}
        </CardButtonGroup>
      </CardOverlayWrapper>
    </PredictionCardWrapper>
  );
};

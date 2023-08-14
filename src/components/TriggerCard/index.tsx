import React from "react";
import { TriggerCardProps } from "../../types";
import {
  CardButton,
  CardButtonGroup,
  CardOverlayWrapper,
  CardTooltip,
  DateCardWrapper,
} from "../DateCard/styles";
import {
  CardBottomWrapper,
  CardTopWrapper,
  CardTypeWrapper,
} from "../PredictionCard/styles";
import { IconBag } from "../Icons";
import { CardImgWrapper, Rarity, StatusWrapper } from "../MarketCard/styles";

export const TriggerCard: React.FC<TriggerCardProps> = ({
  item,
  image,
  id = 0,
  is_crafted,
  owner_id,
  rarity,
  trigger,
  isNotHover,
  tier,
  onCraft,
  onSell,
  onView,
}) => {
  image = "/assets/nfts/new4.png";
  return (
    <DateCardWrapper bg={image} isnothover={isNotHover ? "true" : undefined}>
      <CardImgWrapper>
        <img src={image} alt="nft" />
        <>
          {rarity === 0 && <Rarity>Common</Rarity>}
          {rarity === 1 && <Rarity>Uncommon</Rarity>}
          {rarity === 2 && <Rarity>Rare</Rarity>}
        </>
      </CardImgWrapper>
      <CardBottomWrapper>{trigger}</CardBottomWrapper>
      <CardOverlayWrapper className="overlay">
        <CardButtonGroup>
          <CardTooltip className="left">
            <IconBag />
          </CardTooltip>
          {onView && <CardButton onClick={() => onView(item)}>View</CardButton>}
          {!is_crafted && onCraft && (
            <CardButton onClick={() => onCraft(item)}>
              Craft Prediction
            </CardButton>
          )}
          {onSell && <CardButton onClick={() => onSell(item)}>Sell</CardButton>}
        </CardButtonGroup>
      </CardOverlayWrapper>
    </DateCardWrapper>
  );
};

import React from "react";
import { TriggerCardProps } from "../../types";
import {
  CardButton,
  CardButtonGroup,
  CardOverlayWrapper,
  CardTooltip,
  DateCardWrapper,
} from "../DateCard/styles";
import { CardBottomWrapper } from "../PredictionCard/styles";
import { IconBag } from "../Icons";
import { CardImgWrapper } from "../MarketCard/styles";
import { useMyInfoContext } from "../../context";

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
  const { myInfoContext } = useMyInfoContext();

  console.log(item);
  return (
    <DateCardWrapper isnothover={isNotHover ? "true" : undefined}>
      <CardImgWrapper>
        {rarity === 0 && (
          <img src="/assets/nfts/rarity/Trigger-Core-No-Text.png" alt="nft" />
        )}
        {rarity === 1 && (
          <img src="/assets/nfts/rarity/Trigger-Rare-No-Text.png" alt="nft" />
        )}
        {rarity === 2 && (
          <img
            src="/assets/nfts/rarity/Trigger-Uncommon-No-Text.png"
            alt="nft"
          />
        )}
        {/* <div className="info-nft info-nft-trigger">
          <h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            veniam
          </h4>
        </div> */}
      </CardImgWrapper>
      <CardBottomWrapper>{trigger}</CardBottomWrapper>
      <CardOverlayWrapper className="overlay">
        <CardButtonGroup>
          <CardTooltip className="left">
            <IconBag />
          </CardTooltip>
          {onView && <CardButton onClick={() => onView(item)}>View</CardButton>}
          {onCraft && (
            <CardButton onClick={() => onCraft(item)}>
              Craft Prediction
            </CardButton>
          )}
          {item?.owner_id === myInfoContext?.id && onSell && (
            <CardButton onClick={() => onSell(item)}>Sell</CardButton>
          )}
        </CardButtonGroup>
      </CardOverlayWrapper>
    </DateCardWrapper>
  );
};

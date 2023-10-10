import React from "react";
import {
  CardBottomWrapper,
  CardTopWrapper,
  CardTypeWrapper,
  PredictionCardWrapper,
  CardOverlayWrapper,
} from "./styles";
import { CardButton, CardButtonGroup } from "../DateCard/styles";
import { CardPacksCardProps } from "../../types";
import { CardImgWrapper } from "../MarketCard/styles";
import { useMyInfoContext } from "../../context";

export const CardPack: React.FC<CardPacksCardProps> = ({
  item,
  id = 0,
  image,
  rarity,
  tier,
  height,
  status,
  onSell,
  onView,
  onOpen,
  onCancel,
}) => {
  const { myInfoContext } = useMyInfoContext();
  console.log(item);
  return (
    <PredictionCardWrapper>
      <CardImgWrapper>
        {tier === 0 && (
          <img
            src="/assets/nfts/rarity/Standard-Pack-Background.png"
            alt="nft"
          />
        )}
        {tier === 1 && (
          <img
            src="/assets/nfts/rarity/Premium-Pack-Background.png"
            alt="nft"
          />
        )}
        {tier === 2 && (
          <img src="/assets/nfts/rarity/Elite-Pack-Background.png" alt="nft" />
        )}
        <div className="info-nft info-nft-cardPack">
          {tier === 0 && (
            <img src="/assets/nfts/rarity/Standard-Egg-Animation-No-Bkgnd-Small.gif" alt="gif" />
          )}
          {tier === 1 && (
            <img src="/assets/nfts/rarity/Premium-Egg-Animation-No-Bkgnd-Small.gif" alt="nft" />
          )}
          {tier === 2 && (
            <img src="/assets/nfts/rarity/Elite-Egg-Animation-No-Bkgnd-Small.gif" alt="nft" />
          )}
        </div>
      </CardImgWrapper>

      <CardBottomWrapper>Card Pack</CardBottomWrapper>

      <CardOverlayWrapper className="overlay">
        <CardButtonGroup>
          {onView && <CardButton onClick={() => onView(item)}>View</CardButton>}
          {onOpen && <CardButton onClick={() => onOpen(item.id)}>Open</CardButton>}
          {item?.owner_id === myInfoContext?.id && onSell && <CardButton onClick={() => onSell(item)}>Sell</CardButton>}
          {/* {onCancel && status === 1 && <CardButton onClick={() => onCancel(item)}>Cancel Listing</CardButton>} */}
          {onCancel && <CardButton onClick={() => onCancel(item)}>Cancel Listing</CardButton>}
        </CardButtonGroup>
      </CardOverlayWrapper>
    </PredictionCardWrapper>
  );
};

import React from "react";
import {
  CardBottomWrapper,
  PredictionCardWrapper,
  CardOverlayWrapper,
} from "./styles";
import { CardButton, CardButtonGroup } from "../DateCard/styles";
import { CardPacksCardProps } from "../../types";
import { CardImgWrapper } from "../MarketCard/styles";
import { useMyInfoContext } from "../../context";
import { checkTier } from "../../utils/helperFunctions";
import { Loader } from "../Loader";

export const CardPack: React.FC<CardPacksCardProps> = ({
  item,
  tier,
  onSell,
  onView,
  onOpen,
}) => {
  const { myInfoContext } = useMyInfoContext();
  
  return (
    <PredictionCardWrapper>
      <CardImgWrapper>
        {tier || tier === 0 ? (
          <>
            <img
              src={`/assets/nfts/rarity/${checkTier(tier)}-Pack-Background.png`}
              alt="Card Pack"
            />
            <div className="info-nft info-nft-cardPack">
              <img
                src={`/assets/nfts/rarity/${checkTier(
                  tier
                )}-Egg-Animation-No-Bkgnd-Small.gif`}
                alt="gif"
              />
            </div>
          </>
        ) : (
          <Loader />
        )}
      </CardImgWrapper>

      <CardBottomWrapper>Card Pack</CardBottomWrapper>

      <CardOverlayWrapper className="overlay">
        <CardButtonGroup>
          {onView && <CardButton onClick={() => onView(item)}>View</CardButton>}
          {onOpen && (
            <CardButton onClick={() => onOpen(item.id)}>Open</CardButton>
          )}
          {item?.owner_id === myInfoContext?.id && onSell && (
            <CardButton onClick={() => onSell(item)}>Sell</CardButton>
          )}
        </CardButtonGroup>
      </CardOverlayWrapper>
    </PredictionCardWrapper>
  );
};

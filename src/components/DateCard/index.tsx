import React from "react";
import { DateCardProps } from "../../types";
import {
  CardButton,
  CardButtonGroup,
  CardOverlayWrapper,
  CardTooltip,
  DateCardWrapper,
  TooltipContent,
  TooltipItem,
} from "./styles";
import {
  CardBottomWrapper,
  CardTopWrapper,
  CardTypeWrapper,
} from "../PredictionCard/styles";
import { IconUser2 } from "../Icons";
import { useMonthContext } from "../../context";
import { CardImgWrapper, Rarity, StatusWrapper } from "../MarketCard/styles";
export const DateCard: React.FC<DateCardProps> = ({
  item,
  image,
  day,
  month,
  id = 0,
  is_crafted,
  owner_id,
  rarity,

  isNotHover,
  onCraft,
  onSell,
  onView,
}) => {
  const { monthContext } = useMonthContext();

  image = "/assets/nfts/new4.png";
  return (
    item?.id && (
      <DateCardWrapper bg={image} isnothover={isNotHover ? "true" : undefined}>
        <CardImgWrapper>
          <img src={image} alt="nft" />
          <>
            {rarity === 0 && <Rarity>Common</Rarity>}
            {rarity === 1 && <Rarity>Uncommon</Rarity>}
            {rarity === 2 && <Rarity>Rare</Rarity>}
          </>
        </CardImgWrapper>
        {day && monthContext && (
          <CardBottomWrapper>
            {day} {(monthContext as Map<number, string>).get(month)}
          </CardBottomWrapper>
        )}
        {item?.year && <CardBottomWrapper>{item?.year}</CardBottomWrapper>}
        <CardOverlayWrapper className="overlay">
          <CardButtonGroup>
            <CardTooltip>
              <div className="bg-black">
                <IconUser2 />
              </div>
              <TooltipContent className="tooltip-content">
                <div>
                  <h3>Identity Matches</h3>
                  <TooltipItem>Tom Brady</TooltipItem>
                  <TooltipItem>Brad Pitt</TooltipItem>
                  <TooltipItem>Emma Watson</TooltipItem>
                  <TooltipItem>Tom Brady</TooltipItem>
                  <TooltipItem>Michael B. Jordan</TooltipItem>
                  <TooltipItem>Kid Rock</TooltipItem>
                  <TooltipItem>Barack Obama</TooltipItem>
                  <TooltipItem>Tom Brady</TooltipItem>
                  <TooltipItem>Brad Pitt</TooltipItem>
                  <TooltipItem>Emma Watson</TooltipItem>
                  <TooltipItem>Tom Brady</TooltipItem>
                  <TooltipItem>Michael B. Jordan</TooltipItem>
                  <TooltipItem>Kid Rock</TooltipItem>
                  <TooltipItem>Barack Obama</TooltipItem>
                </div>
              </TooltipContent>
            </CardTooltip>
            {onView && (
              <CardButton onClick={() => onView(item)}>View</CardButton>
            )}
            {!is_crafted && onCraft && (
              <CardButton onClick={() => onCraft(item)}>
                Craft Identity
              </CardButton>
            )}
            {onSell && (
              <CardButton onClick={() => onSell(item)}>Sell</CardButton>
            )}
          </CardButtonGroup>
        </CardOverlayWrapper>
      </DateCardWrapper>
    )
  );
};

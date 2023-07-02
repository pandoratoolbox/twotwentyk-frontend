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
import { IconUserAdd } from "../Icons";
import { useMonthContext } from "../../context";

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
  // console.log(item)
  image = "/assets/nfts/1.png"
  return (
    <DateCardWrapper bg={image} isnothover={isNotHover ? "true" : undefined}>
      <CardTopWrapper>
        <div></div>
        {rarity === 0 && <CardTypeWrapper>Common</CardTypeWrapper>}
        {rarity === 1 && <CardTypeWrapper>Uncommon</CardTypeWrapper>}
        {rarity === 2 && <CardTypeWrapper>Rare</CardTypeWrapper>}
      </CardTopWrapper>
      {monthContext && (
        <CardBottomWrapper>
          {day} {(monthContext as Map<number, string>).get(month)}
        </CardBottomWrapper>
      )}
      <CardOverlayWrapper className="overlay">
        <CardButtonGroup>
          <CardTooltip>
            <IconUserAdd />
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
          {onView && <CardButton onClick={() => onView(item)}>View</CardButton>}
          {!is_crafted && onCraft && (
            <CardButton onClick={() => onCraft(item)}>
              Craft Identity
            </CardButton>
          )}
          {onSell && <CardButton onClick={() => onSell(item)}>Sell</CardButton>}
        </CardButtonGroup>
      </CardOverlayWrapper>
    </DateCardWrapper>
  );
};

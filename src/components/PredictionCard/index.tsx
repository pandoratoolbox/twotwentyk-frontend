import React from "react";
import {
  AmountWrapper,
  CardBodyWrapper,
  CardBottomWrapper,
  CardDateWrapper,
  CardTopWrapper,
  CardTypeWrapper,
  PredictionCardWrapper,
  CardTooltip,
  TooltipContent,
  TooltipItem,
} from "./styles";
import {
  CardButton,
  CardButtonGroup,
  CardOverlayWrapper,
} from "../DateCard/styles";
import { PredictionCardProps } from "../../types";
import { useMonthContext } from "../../context";

export const PredictionCard: React.FC<PredictionCardProps> = ({
  name,
  cardType,
  item,
  id = 0,
  image,
  category,
  day,
  month,
  rarity,
  year,
  icon,
  iconText,
  is_crafted,
  height,
  isNotHover,
  onClick,
  onCraft,
  onSell,
  onView,
  onBuy,
}) => {
  const { monthContext } = useMonthContext();

  image = "/assets/nfts/1.png";

  return (
    <PredictionCardWrapper
      cardType={cardType}
      onClick={onClick}
      bg={cardType === "prediction" ? image : ""}
      height={height}
      isnothover={isNotHover ? "true" : undefined}
    >
      <CardTopWrapper>
        <CardDateWrapper>
          {monthContext && (
            <span className="date">
              {day && month
                ? `${day}/${(monthContext as Map<number, string>).get(month)}`
                : "Month/Day"}
            </span>
          )}

          {year && <span className="year">{year}</span>}
        </CardDateWrapper>
        {rarity === 0 && <CardTypeWrapper>Common</CardTypeWrapper>}
        {rarity === 1 && <CardTypeWrapper>Uncommon</CardTypeWrapper>}
        {rarity === 2 && <CardTypeWrapper>Rare</CardTypeWrapper>}
      </CardTopWrapper>
      {icon && (
        <CardBodyWrapper>
          <span>{icon}</span>
          <p>{iconText}</p>
        </CardBodyWrapper>
      )}
      {/* {category && (
        <CardBottomWrapper> */}
      {/* {amount && <AmountWrapper>{amount}</AmountWrapper>} */}
      {/* {category}
        </CardBottomWrapper>
      )} */}

      {name && <CardBottomWrapper>{name}</CardBottomWrapper>}
      <CardOverlayWrapper className="overlay">
        <CardButtonGroup>
          {onView && <CardButton onClick={() => onView(item)}>View</CardButton>}
          {!is_crafted && onCraft && (
            <CardButton onClick={() => onCraft(item)}>
              Craft Prediction
            </CardButton>
          )}
          {onSell && <CardButton onClick={() => onSell(item)}>Sell</CardButton>}
          {onBuy && <CardButton onClick={() => onBuy(item)}>Buy</CardButton>}
          {cardType === "prediction" && (
            <CardTooltip>
              <span>3T</span>
              <TooltipContent className="tooltip-content">
                <div>
                  <h3>Triggers</h3>
                  <TooltipItem>Wins Superbowl - Major</TooltipItem>
                  <TooltipItem>Trigger Name - Minor 1</TooltipItem>
                  <TooltipItem>Trigger Name - Minor 2</TooltipItem>
                </div>
              </TooltipContent>
            </CardTooltip>
          )}
        </CardButtonGroup>
      </CardOverlayWrapper>
    </PredictionCardWrapper>
  );
};

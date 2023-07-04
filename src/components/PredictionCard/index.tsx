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
  celebrity_name,
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
  is_crafted,
  height,
  isNotHover,
  triggers,
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
          {monthContext && day && (
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
      {category && (
        <CardBodyWrapper>
          <span></span>
          <p>{category}</p>
        </CardBodyWrapper>
      )}

      {celebrity_name && (
        <CardBottomWrapper>{celebrity_name}</CardBottomWrapper>
      )}
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
              <span>
                {triggers && triggers?.length > 0
                  ? `${triggers.length}T`
                  : "#T"}
              </span>
              <TooltipContent className="tooltip-content">
                <div>
                  <h3>Triggers</h3>
                  {triggers &&
                    triggers?.map((item: string, key: number) => (
                      <TooltipItem>{item}</TooltipItem>
                    ))}
                </div>
              </TooltipContent>
            </CardTooltip>
          )}
        </CardButtonGroup>
      </CardOverlayWrapper>
    </PredictionCardWrapper>
  );
};

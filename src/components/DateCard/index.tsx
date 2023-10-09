import React, { useEffect, useState} from "react";
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
import { CardBottomWrapper } from "../PredictionCard/styles";
import { IconUser2 } from "../Icons";
<<<<<<< HEAD
import { useMonthContext, useMyInfoContext } from "../../context";
import { CardImgWrapper } from "../MarketCard/styles";

const getImagePath = (
  itemYear: any,
  rarity: number,
  category: string,
  isYear: boolean
) => {
  const raritySuffix =
    rarity === 0 ? "Core" : rarity === 1 ? "Rare" : "Uncommon";
  const dateType = isYear ? "Year" : "Month-Day";
  return `/assets/nfts/rarity/${
    itemYear ? dateType : category
  }-${raritySuffix}-copy.png`;
};

=======
import { useCelebritiesContext, useMonthContext, useMyInfoContext } from "../../context";
import { CardImgWrapper, Rarity, StatusWrapper } from "../MarketCard/styles";
import { ICelebrity } from "../../models/celebrity";
>>>>>>> fbccb720957c6d6315586e68ccc675ea2d52fae7
export const DateCard: React.FC<DateCardProps> = ({
  item,
  image,
  day,
  month,
  position = "",
  id = 0,
  is_crafted,
  owner_id,
  rarity,

  isNotHover,
  onCraft,
  onSell,
  onView,
  buttonText
}) => {
  console.log("buttonText====", buttonText);
  const { monthContext } = useMonthContext();
  const { myInfoContext } = useMyInfoContext();
  const isYear = Boolean(item?.year);
  const imagePath = getImagePath(item?.year, rarity, "Month-Day", isYear);

  return (
    item?.id && (
      <DateCardWrapper isnothover={isNotHover ? "true" : undefined}>
        <CardImgWrapper>
          <img src={imagePath} alt="nft" />
          <div className="info-nft info-nft-day-month">
            {day && monthContext && (
              <h3>
                {day} {(monthContext as Map<number, string>).get(month)}
              </h3>
            )}
            {item?.year && <h3>{item?.year}</h3>}
          </div>
        </CardImgWrapper>


        {buttonText && buttonText != undefined && buttonText != '' ? (
          <CardBottomWrapper>
            {buttonText}
          </CardBottomWrapper>) : day && monthContext && (
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
              <TooltipContent position={position} className="tooltip-content">
                <div>
                  <h3>Identity Matches</h3>
                  {identityMatches && identityMatches.map((v) => (<TooltipItem>
                    {v.name}
                  </TooltipItem>))}
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
            {item?.owner_id === myInfoContext?.id && onSell && (
              <CardButton onClick={() => onSell(item)}>Sell</CardButton>
            )}
          </CardButtonGroup>
        </CardOverlayWrapper>
      </DateCardWrapper>
    )
  );
};

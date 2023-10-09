import React, { useEffect, useState } from "react";
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
import {
  useMonthContext,
  useMyInfoContext,
  useCelebritiesContext,
} from "../../context";
import { CardImgWrapper } from "../MarketCard/styles";

import { ICelebrity } from "../../models/celebrity";

export const CraftingCard: React.FC<DateCardProps> = ({
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
  buttonText,
}) => {
  console.log("buttonText====", item);

  const { monthContext } = useMonthContext();
  const { myInfoContext } = useMyInfoContext();
  const { celebritiesContext } = useCelebritiesContext();

  const [identityMatches, setIdentityMatches] = useState<ICelebrity[]>([]);

  useEffect(() => {
    if (celebritiesContext && day && month) {
      setIdentityMatches(
        Array.from(
          (celebritiesContext as Map<number, ICelebrity>).values()
        ).filter(
          (v: ICelebrity) => v.birth_day === day && v.birth_month === month
        )
      );
    }
  }, [celebritiesContext, day, month]);

  return (
    item?.id && (
      <DateCardWrapper isnothover={isNotHover ? "true" : undefined}>
        <CardImgWrapper>
          {rarity === 0 && (
            <img
              src="/assets/nfts/rarity/Crafting-Core-copy.png"
              alt="nft"
            />
          )}
          {rarity === 1 && (
            <img
              src="/assets/nfts/rarity/Crafting-Rare-copy.png"
              alt="nft"
            />
          )}
          {rarity === 2 && (
            <img
              src="/assets/nfts/rarity/Crafting-Uncommon-copy.png"
              alt="nft"
            />
          )}
        </CardImgWrapper>

        <CardBottomWrapper>Crafting</CardBottomWrapper>
        <CardOverlayWrapper className="overlay">
          <CardButtonGroup>
            <CardTooltip>
              <div className="bg-black">
                <IconUser2 />
              </div>
              <TooltipContent position={position} className="tooltip-content">
                <div>
                  <h3>Identity Matches</h3>
                  {identityMatches &&
                    identityMatches.map((v) => (
                      <TooltipItem>{v.name}</TooltipItem>
                    ))}
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

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
import {
  CardBottomWrapper,
} from "../PredictionCard/styles";
import { IconUser2 } from "../Icons";
import { CardImgWrapper } from "../MarketCard/styles";
import { useCelebritiesContext, useMyInfoContext } from "../../context";
import { ICelebrity } from "../../models/celebrity";

export const CategoryCard: React.FC<DateCardProps> = ({
  item,
  image,
  category,
  id = 0,
  is_crafted,
  owner_id,
  rarity,

  isNotHover,
  onCraft,
  onSell,
  onView,
}) => {
  const { myInfoContext } = useMyInfoContext();
  const { celebritiesContext } = useCelebritiesContext();
  const [identityMatches, setIdentityMatches] = useState<ICelebrity[]>([]);

  useEffect(() => {
    if (celebritiesContext && category) {
      setIdentityMatches(
        Array.from(
          (celebritiesContext as Map<number, ICelebrity>).values()
        ).filter(
          (v: ICelebrity) => v.category === category
        )
      );
    }

  }, [celebritiesContext, category])

  function formatCategory(category: string) {
    const words = category.split(' ');

    const formattedCategory = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-');

    return formattedCategory;
  }

  return (
    <DateCardWrapper isnothover={isNotHover ? "true" : undefined}>
      <CardImgWrapper>
        {rarity === 0 && (
          <img src={`/assets/nfts/rarity/${formatCategory(category)}-Core.png`} alt="nft" />
        )}
        {rarity === 1 && (
          <img src={`/assets/nfts/rarity/${formatCategory(category)}-Rare.png`} alt="nft" />
        )}
        {rarity === 2 && (
          <img src={`/assets/nfts/rarity/${formatCategory(category)}-Uncommon.png`} alt="nft" />
        )}
      </CardImgWrapper>
      <CardBottomWrapper>{category}</CardBottomWrapper>
      <CardOverlayWrapper className="overlay">
        <CardButtonGroup>
          <CardTooltip>
            <div className="bg-black">
              <IconUser2 />
            </div>
            <TooltipContent className="tooltip-content">
              <div>
                <h3>Identity Matches</h3>
                {
                  identityMatches && identityMatches.map((v) => (
                    <TooltipItem>{v.name}</TooltipItem>
                  ))
                }
              </div>
            </TooltipContent>
          </CardTooltip>
          {onView && <CardButton onClick={() => onView(item)}>View</CardButton>}
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
  );
};

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
import { CardImgWrapper } from "../MarketCard/styles";
import { useCelebritiesContext, useMyInfoContext } from "../../context";
import { ICelebrity } from "../../models/celebrity";
import { formatCategory } from "../../utils/helperFunctions";
import { checkRarity } from "../../utils/helperFunctions";
import { Loader } from "../Loader";

export const CategoryCard: React.FC<DateCardProps> = ({
  item,
  category,
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
        ).filter((v: ICelebrity) => v.category === category)
      );
    }
  }, [celebritiesContext, category]);

  const captilizeEachLetterOfWord = (data: string) => {
    let words = data.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1) + " ";
    }
    return words;
  };

  return (
    <DateCardWrapper isnothover={isNotHover ? "true" : undefined}>
      <CardImgWrapper>
        {rarity || rarity === 0 ? (
          <img
            src={`/assets/nfts/rarity/${formatCategory(
              category
            )}-${checkRarity(rarity)}.png`}
            alt="nft"
          />
        ) : (
          <Loader />
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
                {identityMatches &&
                  identityMatches.map((v) => (
                    <TooltipItem>
                      {captilizeEachLetterOfWord(v.name)}
                    </TooltipItem>
                  ))}
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

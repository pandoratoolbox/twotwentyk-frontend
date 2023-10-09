import React, { useState, useEffect } from "react";
import {
  CardBottomWrapper,
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
import { PredictionCardProps, SelectOptionProps } from "../../types";
import {
  useMonthContext,
  useCelebritiesContext,
  useMyInfoContext,
} from "../../context";
import { SelectOption } from "../SelectBox/SelectOption";
import { ICelebrity } from "../../models/celebrity";
import { updateMyNftCardIdentity } from "../../actions/nft_card_identity";
import { CardImgWrapper, Rarity, StatusWrapper } from "../MarketCard/styles";

export const IdentityCard: React.FC<PredictionCardProps> = ({
  dashbordstyle,
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
  onCard,
  onView,
  onBuy,
  onClaimSubmit,
}) => {
  const { monthContext } = useMonthContext();
  const { myInfoContext } = useMyInfoContext();
  const { celebritiesContext } = useCelebritiesContext();
  const [clearSelect, setClearSelect] = useState<boolean>(true);

  const chooseCelebrity = async (v: SelectOptionProps) => {
    let c = (celebritiesContext as Map<number, ICelebrity>).get(
      Number(v.value)
    );

    if (c) {
      let res = await updateMyNftCardIdentity(c?.id, c?.name);
      if (res.success) {
        console.log("identity updated");
      }
    }
  };

  const [identityMatches, setIdentityMatches] = useState<
    { label: string; value: string }[] | null
  >(null);

  useEffect(() => {
    if (celebritiesContext) {
      let matches: { label: string; value: string }[] = [];
      (celebritiesContext as Map<number, ICelebrity>).forEach((v) => {
        if (
          v.birth_day === day &&
          v.birth_month === month &&
          v.birth_year === year &&
          v.category === category
        )
          matches.push({ label: v.name, value: v.id.toString() });
      });

      setIdentityMatches(matches);
    }
  }, [celebritiesContext]);


  return (
    <PredictionCardWrapper
      cardType={cardType}
      onClick={onClick}
      height={height}
      isnothover={isNotHover && celebrity_name ? "true" : undefined}
    >
      <CardImgWrapper dashbordstyle={dashbordstyle}>
        {rarity === 0 && (
          <img
            src="/assets/nfts/rarity/Identity-Card-Blank-Core.png"
            alt="nft"
          />
        )}
        {rarity === 1 && (
          <img
            src="/assets/nfts/rarity/Identity-Card-Blank-Rare.png"
            alt="nft"
          />
        )}
        {rarity === 2 && (
          <img
            src="/assets/nfts/rarity/Identity-Card-Blank-Uncommon.png"
            alt="nft"
          />
        )}
        <div className="info-nft info-nft-identity">
          {rarity === 0 && (
            <img src="/assets/nfts/rarity/Core-Torso.gif" alt="gif" />
          )}
          {rarity === 1 && (
            <img src="/assets/nfts/rarity/Rare-Torso.gif" alt="nft" />
          )}
          {rarity === 2 && (
            <img src="/assets/nfts/rarity/Uncommon-Torso.gif" alt="nft" />
          )}
          <div className="nft-info-detail">
            <h2 className="date">{item?.day} {item?.month} {item?.year}</h2>
            <h3>{category}</h3>
          </div>
        </div>
      </CardImgWrapper>

      {celebrity_name ? (
        <CardBottomWrapper>{celebrity_name}</CardBottomWrapper>
      ) : (
        <CardBottomWrapper>
          {identityMatches && (
            <SelectOption
              options={identityMatches}
              placeholder="Identity Matches"
              clear={clearSelect}
              onSelect={chooseCelebrity}
            />
          )}
        </CardBottomWrapper>
      )}

      <CardOverlayWrapper className="overlay">
        <CardButtonGroup>
          {!is_crafted && onCraft && (
            <CardButton onClick={() => onCraft(item)}>
              Craft Prediction
            </CardButton>
          )}
          {onView && <CardButton onClick={() => onView(item)}>View</CardButton>}
          {cardType === "prediction" && (
            <CardButton onClick={() => {}}>Add Trigger</CardButton>
          )}
          {cardType === "prediction" && onClaimSubmit && (
            <CardButton onClick={() => onClaimSubmit(item)}>
              Submit Claim
            </CardButton>
          )}
          {item?.owner_id === myInfoContext?.id && onSell && (
            <CardButton onClick={() => onSell(item)}>Sell</CardButton>
          )}
          {item?.owner_id !== myInfoContext?.id && onBuy && (
            <CardButton onClick={() => onBuy(item)}>Buy</CardButton>
          )}
          {onCard && (
            <>
              <CardButton onClick={() => onCard(item, "view")}>View</CardButton>
              {item?.is_listed ? (
                <CardButton onClick={() => onCard(item, "buy")}>Buy</CardButton>
              ) : (
                <CardButton onClick={() => onCard(item, "offer")}>
                  Make an Offer
                </CardButton>
              )}
            </>
          )}
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
                      <TooltipItem key={key}>{item}</TooltipItem>
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

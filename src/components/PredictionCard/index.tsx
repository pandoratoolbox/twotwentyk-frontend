import React, { useState, useEffect } from "react";
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
import { PredictionCardProps, SelectOptionProps } from "../../types";
import { useMonthContext, useCelebritiesContext } from "../../context";
import { SelectOption } from "../SelectBox/SelectOption";
import { ICelebrity } from "../../models/celebrity";
import { updateMyNftCardIdentity } from "../../actions/nft_card_identity";
import { CardImgWrapper, Rarity, StatusWrapper } from "../MarketCard/styles";

export const PredictionCard: React.FC<PredictionCardProps> = ({
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
}) => {
  const { monthContext } = useMonthContext();
  const { celebritiesContext } = useCelebritiesContext();
  const [clearSelect, setClearSelect] = useState<boolean>(true);

  const chooseCelebrity = async (v: SelectOptionProps) => {
    let c = (celebritiesContext as Map<number, ICelebrity>).get(
      Number(v.value)
    );

    if (c) {
      let res = await updateMyNftCardIdentity(c?.id , c?.name);
      if (res.success) {
        console.log("identity updated")
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

  image = "/assets/nfts/new4.png";
  return (
    <PredictionCardWrapper
      cardType={cardType}
      onClick={onClick}
      bg={cardType === "prediction" ? image : ""}
      height={height}
      isnothover={isNotHover && celebrity_name ? "true" : undefined}
    >
      <CardImgWrapper>
        <img src={image} alt="nft" />
        <>
          {rarity === 0 && <Rarity>Common</Rarity>}
          {rarity === 1 && <Rarity>Uncommon</Rarity>}
          {rarity === 2 && <Rarity>Rare</Rarity>}
        </>
        {/* <Rarity>Uncommon</Rarity> */}
        {/* <StatusWrapper>
          {is_listed && <span>{is_listed ? "For Sale" : "Not For Sale"}</span>}
        </StatusWrapper> */}
      </CardImgWrapper>
      {/* <CardTopWrapper>
        <CardDateWrapper dashbordstyle={dashbordstyle}>
          {monthContext && day && (
            <span className="date">
              {day && month
                ? `${day}/${(monthContext as Map<number, string>).get(month)}`
                : "Month/Day"}
            </span>
          )}

          {year && <span className="year">{year}</span>}
        </CardDateWrapper>
        {rarity === 0 && (
          <CardTypeWrapper dashbordstyle={dashbordstyle}>
            Common
          </CardTypeWrapper>
        )}
        {rarity === 1 && (
          <CardTypeWrapper dashbordstyle={dashbordstyle}>
            Uncommon
          </CardTypeWrapper>
        )}
        {rarity === 2 && (
          <CardTypeWrapper dashbordstyle={dashbordstyle}>Rare</CardTypeWrapper>
        )}
      </CardTopWrapper> */}
      {/* {category && (
        <CardBodyWrapper>
          <span></span>
          <p>{category}</p>
        </CardBodyWrapper>
      )} */}

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
          {onSell && <CardButton onClick={() => onSell(item)}>Sell</CardButton>}
          {onBuy && <CardButton onClick={() => onBuy(item)}>Buy</CardButton>}
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

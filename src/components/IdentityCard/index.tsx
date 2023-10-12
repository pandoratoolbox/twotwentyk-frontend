import React, { useState, useEffect } from "react";
import { CardBottomWrapper, PredictionCardWrapper } from "./styles";
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
  useAuthContext,
} from "../../context";
import { SelectOption } from "../SelectBox/SelectOption";
import { ICelebrity } from "../../models/celebrity";
import { updateMyNftCardIdentity } from "../../actions/nft_card_identity";
import { CardImgWrapper } from "../MarketCard/styles";
import { checkRarity } from "../../utils/helperFunctions";
import { Loader } from "../Loader";
import { useNavigate } from "react-router-dom";

export const IdentityCard: React.FC<PredictionCardProps> = ({
  dashbordstyle,
  celebrity_name,
  cardType,
  item,
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
  forCraft,
  onClick,
  onCraft,
  onSell,
  onCard,
  onView,
  onBuy,
  onClaimSubmit,
  onSelectCardIdentity,
  onCardClicked
}) => {
  const { myInfoContext } = useMyInfoContext();
  const { celebritiesContext } = useCelebritiesContext();
  const { authContext } = useAuthContext()
  const navigate = useNavigate();

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
      onClick={() => {
        !forCraft && onClick && onClick()
      }}
      height={height}
      isnothover={isNotHover && celebrity_name ? "true" : undefined}
    >
      <CardImgWrapper dashbordstyle={dashbordstyle}>
        {rarity || rarity === 0 ? (
          <>
            <img
              src={`/assets/nfts/rarity/Identity-Card-Blank-${checkRarity(
                rarity
              )}.png`}
              alt="nft"
            />
            <div className="info-nft info-nft-identity">
              <img
                src={`/assets/nfts/rarity/${checkRarity(rarity)}-Torso.gif`}
                alt="gif"
              />
              <div className="nft-info-detail">
                <h2 className="date">
                  {day} {month} {year}
                </h2>
                <h3>{category}</h3>
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </CardImgWrapper>

      {celebrity_name ? (
        <CardBottomWrapper>{celebrity_name}</CardBottomWrapper>
      ) : (
        <CardBottomWrapper isSelect="true">
          {identityMatches && (
            <SelectOption
              options={identityMatches}
              placeholder="Identity Matches"
              // clear={clearSelect}
              onSelect={chooseCelebrity}
            />
          )}
        </CardBottomWrapper>
      )}

      <CardOverlayWrapper className="overlay" onClick={() => forCraft && onCardClicked && item && onCardClicked(item.id, item)}>
        {!forCraft && <CardButtonGroup>
          {!is_crafted && onCraft && (
            <CardButton onClick={() => !authContext?.isAuthenticated ? navigate("/signin") : onCraft(item)}>
              Craft Prediction
            </CardButton>
          )}
          {onView && <CardButton onClick={() => onView(item)}>View</CardButton>}

          {item?.owner_id === myInfoContext?.id && onSell && (
            <CardButton onClick={() => !authContext?.isAuthenticated ? navigate("/signin") : onSell(item)}>Sell</CardButton>
          )}
          {item?.owner_id !== myInfoContext?.id && onBuy && (
            <CardButton onClick={() => !authContext?.isAuthenticated ? navigate("/signin") : authContext?.isAuthenticated ? onBuy(item) : navigate("/signin")}>Buy</CardButton>
          )}
          {onCard && (
            <>
              <CardButton onClick={() => onCard(item, "view")}>View</CardButton>
              {item?.is_listed ? (
                <CardButton onClick={() => !authContext?.isAuthenticated ? navigate("/signin") : onCard(item, "buy")}>Buy</CardButton>
              ) : (
                <CardButton onClick={() => !authContext?.isAuthenticated ? navigate("/signin") : onCard(item, "offer")}>
                  Make an Offer
                </CardButton>
              )}
            </>
          )}
        </CardButtonGroup>}
        {forCraft && <CardButtonGroup>
          <CardButton onClick={() => !authContext?.isAuthenticated ? navigate("/signin") : item && onSelectCardIdentity && onSelectCardIdentity(item)}>Select</CardButton>

        </CardButtonGroup>}
      </CardOverlayWrapper>
    </PredictionCardWrapper>
  );
};

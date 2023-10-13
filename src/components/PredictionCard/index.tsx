import React, { useState, useEffect } from "react";
import { CardBottomWrapper, PredictionCardWrapper } from "./styles";
import {
  CardButton,
  CardButtonGroup,
  CardOverlayWrapper,
} from "../DateCard/styles";
import { PredictionCardProps, SelectOptionProps } from "../../types";
import {
  useCelebritiesContext,
  useMyInfoContext,
  useAuthContext,
} from "../../context";
import { ICelebrity } from "../../models/celebrity";
import { updateMyNftCardIdentity } from "../../actions/nft_card_identity";
import { CardImgWrapper } from "../MarketCard/styles";
import { checkRarity } from "../../utils/helperFunctions";
import { Loader } from "../Loader";
import { useNavigate } from "react-router-dom";

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
  status,
  is_claimed,
  onClick,
  onCraft,
  onSell,
  onCard,
  onView,
  onBuy,
  onClaimSubmit,
  onCancel
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
      let res = await updateMyNftCardIdentity(item?.id, c?.id);
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
        {(rarity || rarity === 0) && item ? (
          <>
            <img
              src={`/assets/nfts/rarity/Prediction-${checkRarity(rarity)}.png`}
              alt="nft"
            />
            <div className="info-nft info-nft-prediction">
              <h4 className={checkRarity(rarity)}>{item?.nft_identity?.category}</h4>

              <img
                src={`/assets/nfts/rarity/${checkRarity(rarity)}-Torso.gif`}
                alt="gif"
              />
              <h4 className={checkRarity(rarity)}>{item?.nft_identity?.day} {item?.nft_identity?.month} {item?.nft_identity?.year}</h4>
            </div>
          </>
        ) : (
          <Loader />
        )}

        {/* <StatusWrapper>
          {is_listed && <span>{is_listed ? "For Sale" : "Not For Sale"}</span>}
        </StatusWrapper> */}
      </CardImgWrapper>
      <CardBottomWrapper>{celebrity_name}</CardBottomWrapper>

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
      </CardTopWrapper> */}
      <CardOverlayWrapper className="overlay">
        <CardButtonGroup>
          {!is_crafted && onCraft && item?.owner_id === myInfoContext?.id && cardType === "identity" && (
            <CardButton onClick={() => !authContext?.isAuthenticated ? navigate("/signin") : onCraft(item)}>
              Craft Prediction
            </CardButton>
          )}
          {onView && <CardButton onClick={() => onView(item)}>View</CardButton>}
          {item?.owner_id === myInfoContext?.id && !is_claimed && onClaimSubmit && (
            <CardButton onClick={() => !authContext?.isAuthenticated ? navigate("/signin") : onClaimSubmit(item)}>Submit Claim</CardButton>
          )}
          {item?.owner_id === myInfoContext?.id && onSell && (
            <CardButton onClick={() => !authContext?.isAuthenticated ? navigate("/signin") : onSell(item)}>Sell</CardButton>
          )}
          {item?.owner_id !== myInfoContext?.id && onBuy && (
            <CardButton onClick={() => !authContext?.isAuthenticated ? navigate("/signin") : onBuy(item)}>Buy</CardButton>
          )}
          {item?.owner_id === myInfoContext?.id && onCancel && item?.nft_card_prediction?.marketplace_listing && <CardButton onClick={() => !authContext?.isAuthenticated ? navigate("/signin") : onCancel(item)}>Cancel Listing</CardButton>}
          {onCard && (
            <>
              <CardButton onClick={() => onCard(item, "view")}>View</CardButton>
              {item?.nft_card_prediction?.marketplace_listing &&
                item?.owner_id !== myInfoContext?.id && <CardButton onClick={() => !authContext?.isAuthenticated ? navigate("/signin") : onCard(item, "buy")}>Buy</CardButton>
              }
              {!item?.nft_card_prediction?.marketplace_listing && item?.owner_id !== myInfoContext?.id && <CardButton onClick={() => !authContext?.isAuthenticated ? navigate("/signin") : onCard(item, "offer")}>
                Make an Offer
              </CardButton>
              }
            </>)
          }
        </CardButtonGroup>
      </CardOverlayWrapper>
    </PredictionCardWrapper>
  );
};

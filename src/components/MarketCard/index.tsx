import React from "react";
import { MarketCardProps } from "../../types";
import {
  CardBottomSection,
  CardImgWrapper,
  CardOverlay,
  CardWrapper,
  StatusWrapper,
} from "./styles";
import { CardButton } from "../DateCard/styles";
import {
  checkRarity,
  formatCategory,
  checkTier,
} from "../../utils/helperFunctions";
import { useAuthContext, useMonthContext, useMyInfoContext } from "../../context";
import { useNavigate } from "react-router-dom";

const CardImage = ({ item }: any) => {
  const { monthContext } = useMonthContext();

  return (
    <>
      {item?.nft_card_day_month && (
        <>
          <img
            src={`/assets/nfts/rarity/Month-Day-${checkRarity(
              item?.nft_card_day_month?.rarity
            )}-copy.png`}
            alt=""
          />
          <div className="info-nft info-nft-day-month">
            {item?.nft_card_day_month?.day && monthContext && (
              <h3 className={checkRarity(item?.nft_card_day_month?.rarity)}>
                {item?.nft_card_day_month?.day}{" "}
                {(monthContext as Map<number, string>).get(
                  item?.nft_card_day_month?.month
                )}
              </h3>
            )}
          </div>
        </>
      )}
      {item?.nft_card_year && (
        <>
          <img
            src={`/assets/nfts/rarity/Year-${checkRarity(
              item?.nft_card_year?.rarity
            )}-copy.png`}
            alt=""
          />
          <div className="info-nft info-nft-day-month">
            {item?.nft_card_year?.year && (
              <h3 className={checkRarity(item?.nft_card_year?.rarity)}>
                {item?.nft_card_year?.year}
              </h3>
            )}
          </div>
        </>
      )}
      {item?.nft_card_trigger && (
        <>
          <img
            src={`/assets/nfts/rarity/Trigger-${checkRarity(
              item?.nft_card_trigger?.rarity
            )}-No-Text.png`}
            alt=""
          />
        </>
      )}
      {item?.nft_card_category && (
        <>
          <img
            src={`/assets/nfts/rarity/${formatCategory(
              item?.nft_card_category?.category
            )}-${checkRarity(item?.nft_card_category?.rarity)}.png`}
            alt=""
          />
        </>
      )}
      {item?.card_pack && (
        <>
          <img
            src={`/assets/nfts/rarity/${checkTier(
              item?.card_pack?.tier
            )}-Pack-Background.png`}
            alt=""
          />
          <div className="info-nft info-nft-cardPack">
            <img
              src={`/assets/nfts/rarity/${checkTier(
                item?.card_pack?.tier
              )}-Egg-Animation-No-Bkgnd-Small.gif`}
              alt="gif"
            />
          </div>
        </>
      )}
    </>
  );
};

export const MarketCard: React.FC<MarketCardProps> = ({
  item,
  type,
  isOffer,
  onCard,
}) => {
  const { myInfoContext } = useMyInfoContext();
  const { authContext } = useAuthContext()
  const navigate = useNavigate();

  const getTypeValue = () => {
    if (item?.nft_card_day_month) {
      return "Day/Month";
    } else if (item?.nft_card_trigger) {
      return "Trigger";
    } else if (item?.nft_card_crafting) {
      return "Crafting";
    } else if (item?.nft_card_year) {
      return "Year";
    } else if (item?.nft_card_category) {
      return "Category";
    } else if (item?.card_pack) {
      return "Card Pack";
    } else {
      return "No Type";
    }
  };

  const is_listed = React.useMemo(() => {
    return item?.nft_card_category?.marketplace_listing || item?.nft_card_crafting?.marketplace_listing || item?.nft_card_day_month?.marketplace_listing || item?.nft_card_trigger?.marketplace_listing || item?.nft_card_year?.marketplace_listing || item?.card_pack?.marketplace_listing
  }, [])

  return (
    <CardWrapper>
      <CardImgWrapper>
        <CardImage item={item} />
        <StatusWrapper>
          {is_listed && (
            <span>{is_listed ? "For Sale" : "Not For Sale"}</span>
          )}
        </StatusWrapper>
      </CardImgWrapper>
      <CardBottomSection>
        <p>{getTypeValue()}</p>
      </CardBottomSection>
      {!isOffer
        ? onCard && (
          <CardOverlay className="overlay">
            <CardButton onClick={() => onCard(item, "view")}>View</CardButton>
            {type === "Category" &&
              item?.owner_id &&
              myInfoContext?.id &&
              item.owner_id !== myInfoContext.id && (
                <CardButton onClick={() => onCard(item, "buy")}>
                  Buy
                </CardButton>
              )}
            {(type === "Day/Month" || type === "Year") &&
              item?.owner_id &&
              myInfoContext?.id &&
              item.owner_id === myInfoContext.id && (
                <CardButton onClick={() => onCard(item, "sell")}>
                  Sell
                </CardButton>
              )}
            {/* {(type === "Crafting" || type === "Trigger") &&
                item?.owner_id &&
                myInfoContext?.id &&
                item.owner_id !== myInfoContext.id && (
                  <CardButton onClick={() => onCard(item, "offer")}>
                    Make an Offer
                  </CardButton>
                )} */}
            {is_listed &&
              item?.owner_id &&
              myInfoContext?.id &&
              item.owner_id !== myInfoContext.id && (
                <CardButton onClick={() => onCard(item, "buy")}>
                  Buy
                </CardButton>
              )}
            {!is_listed &&
              item?.owner_id &&
              myInfoContext?.id &&
              item.owner_id !== myInfoContext.id && (
                <CardButton onClick={() => onCard(item, "offer")}>
                  Make an Offer
                </CardButton>
              )}
          </CardOverlay>
        )
        : onCard && (
          <CardOverlay className="overlay">
            <CardButton onClick={() => onCard(item, "view")}>View</CardButton>
          </CardOverlay>
        )}
    </CardWrapper>
  );
};

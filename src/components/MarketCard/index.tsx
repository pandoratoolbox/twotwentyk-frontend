import React from "react";
import { MarketCardProps } from "../../types";
import {
  CardBottomSection,
  CardImgWrapper,
  CardOverlay,
  CardWrapper,
  Rarity,
  StatusWrapper,
} from "./styles";
import { CardButton } from "../DateCard/styles";
import { useMonthContext } from "../../context";

export const MarketCard: React.FC<MarketCardProps> = ({
  // id,
  item,
  // image,
  // name,
  // rarity,
  type,
  isOffer,
  // owner_id,
  // is_listed,
  onCard,
}) => {
  const { monthContext } = useMonthContext();

  // console.log(item, type);
  const image = "/assets/nfts/new3.png";

  // for check rarity
  const checkRarity = (item: any) => {
    if (
      item?.nft_card_day_month?.rarity === 0 ||
      item?.nft_card_trigger?.rarity === 0 ||
      item?.nft_card_crafting?.rarity === 0 ||
      item?.nft_card_identity?.rarity === 0 ||
      item?.nft_card_prediction?.rarity === 0 ||
      item?.nft_card_year?.rarity === 0
    ) {
      return <Rarity>Common</Rarity>;
    } else if (
      item?.nft_card_day_month?.rarity === 1 ||
      item?.nft_card_trigger?.rarity === 1 ||
      item?.nft_card_crafting?.rarity === 1 ||
      item?.nft_card_identity?.rarity === 1 ||
      item?.nft_card_prediction?.rarity === 1 ||
      item?.nft_card_year?.rarity === 1
    ) {
      return <Rarity>Uncommon</Rarity>;
    } else if (
      item?.nft_card_day_month?.rarity === 2 ||
      item?.nft_card_trigger?.rarity === 2 ||
      item?.nft_card_crafting?.rarity === 2 ||
      item?.nft_card_identity?.rarity === 2 ||
      item?.nft_card_prediction?.rarity === 2 ||
      item?.nft_card_year?.rarity === 2
    ) {
      return <Rarity>Rare</Rarity>;
    }

    return undefined;
  };

  //for check type value
  const checkTypeValue = (item: any) => {
    if (item?.nft_card_day_month) {
      return `${item?.nft_card_day_month?.day}/${
        monthContext &&
        (monthContext as Map<number, string>).get(
          item?.nft_card_day_month?.month
        )
      }`;
    } else if (item?.nft_card_trigger) {
      return item?.nft_card_trigger?.trigger;
    } else if (item?.nft_card_crafting) {
      return "Crafting";
    } else if (item?.nft_card_identity) {
      return item?.nft_card_identity?.celebrity_name;
    } else if (item?.nft_card_prediction) {
      return item?.nft_card_prediction?.celebrity_name;
    } else if (item?.nft_card_year) {
      return item?.nft_card_year?.year;
    }
    return undefined;
  };

  return (
    <CardWrapper>
      <CardImgWrapper>
        <img src={image} alt="" />
        <> {checkRarity(item)}</>
        {/* <Rarity>Uncommon</Rarity> */}
        <StatusWrapper>
          {/* {owner_id && <p>Owned x{owner_id}</p>} */}
          {item.is_listed && <span>{item.is_listed ? "For Sale" : "Not For Sale"}</span>}
        </StatusWrapper>
      </CardImgWrapper>
      <CardBottomSection>
        {/* <h4>{checkTypeValue(item)}</h4> */}
        <p>
          {item?.nft_card_day_month
            ? "Day/Month"
            : item?.nft_card_trigger
            ? "Trigger"
            : item?.nft_card_crafting
            ? "Crafting"
            : item?.nft_card_identity
            ? "Identity"
            : item?.nft_card_prediction
            ? "Prediction"
            : item?.nft_card_year
            ? "Year"
            : item?.card_pack ? "Card Pack"
            : checkTypeValue(item)
            ? checkTypeValue(item)
            : "No Type"}
        </p>
      </CardBottomSection>
      {!isOffer
        ? onCard && (
            <CardOverlay className="overlay">
              <CardButton onClick={() => onCard(item, "view")}>View</CardButton>
              {type === "Category" && (
                <CardButton onClick={() => onCard(item, "buy")}>Buy</CardButton>
              )}
              {(type === "Day/Month" || type === "Year") && (
                <CardButton onClick={() => onCard(item, "sell")}>
                  Sell
                </CardButton>
              )}
              {(type === "Crafting" || type === "Trigger") && (
                <CardButton onClick={() => onCard(item, "offer")}>
                  Make an Offer
                </CardButton>
              )}
              {item.is_listed && (
                <CardButton onClick={() => onCard(item, "buy")}>Buy</CardButton>
              )}
              {!item.is_listed && (
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

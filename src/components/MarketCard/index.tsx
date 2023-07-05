import React from "react";
import { MarketCardProps } from "../../types";
import {
  CardBottomSection,
  CardOverlay,
  CardTopSection,
  CardWrapper,
  Rarity,
  StatusWrapper,
} from "./styles";
import { CardButton } from "../DateCard/styles";

export const MarketCard: React.FC<MarketCardProps> = ({
  item,
  image,
  name,
  rarity,
  type,
  owner_id,
  is_listed,
  onCard,
}) => {
  // console.log(item, type);
  image = "/assets/nfts/1.png";

  return (
    <CardWrapper bg={image}>
      <CardTopSection>
        <StatusWrapper>
          {owner_id && <p>Owned x{owner_id}</p>}
          {is_listed && <span>{is_listed ? "For Sale" : "Not For Sale"}</span>}
        </StatusWrapper>
        {item?.nft_card_day_month?.rarity === 0 ||
        item?.nft_card_trigger?.rarity === 0 ||
        item?.nft_card_crafting?.rarity === 0 ||
        item?.nft_card_identity?.rarity === 0 ||
        item?.nft_card_prediction?.rarity === 0 ||
        item?.nft_card_year?.rarity === 0 ? (
          <Rarity>Common</Rarity>
        ) : null}
        {item?.nft_card_day_month?.rarity === 1 ||
        item?.nft_card_trigger?.rarity === 1 ||
        item?.nft_card_crafting?.rarity === 1 ||
        item?.nft_card_identity?.rarity === 1 ||
        item?.nft_card_prediction?.rarity === 1 ||
        item?.nft_card_year?.rarity === 1 ? (
          <Rarity>Uncommon</Rarity>
        ) : null}
        {item?.nft_card_day_month?.rarity === 2 ||
        item?.nft_card_trigger?.rarity === 2 ||
        item?.nft_card_crafting?.rarity === 2 ||
        item?.nft_card_identity?.rarity === 2 ||
        item?.nft_card_prediction?.rarity === 2 ||
        item?.nft_card_year?.rarity === 2 ? (
          <Rarity>Rare</Rarity>
        ) : null}
      </CardTopSection>
      <CardBottomSection>
        <h4>BoredApe</h4>
        <p>
          {item?.nft_card_day_month ? "Day/Month" : null}
          {item?.nft_card_trigger ? "Trigger" : null}
          {item?.nft_card_crafting ? "Crafting" : null}
          {item?.nft_card_identity ? "Identity" : null}
          {item?.nft_card_prediction ? "Prediction" : null}
          {item?.nft_card_year ? "Year" : null}
        </p>
      </CardBottomSection>
      {onCard && (
        <CardOverlay className="overlay">
          <CardButton onClick={() => onCard(item, "view")}>View</CardButton>
          {type === "Category" && (
            <CardButton onClick={() => onCard(item, "buy")}>Buy</CardButton>
          )}
          {(type === "Day/Month" || type === "Year") && (
            <CardButton onClick={() => onCard(item, "sell")}>Sell</CardButton>
          )}
          {(type === "Crafting" || type === "Trigger") && (
            <CardButton onClick={() => onCard(item, "offer")}>
              Make an Offer
            </CardButton>
          )}
          {is_listed && (
            <CardButton onClick={() => onCard(item, "buy")}>Buy</CardButton>
          )}
          {!is_listed && (
            <CardButton onClick={() => onCard(item, "offer")}>
              Make an Offer
            </CardButton>
          )}
        </CardOverlay>
      )}
    </CardWrapper>
  );
};

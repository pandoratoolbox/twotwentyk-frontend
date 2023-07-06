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
  id,
  image,
  name,
  rarity,
  type,
  isOffer,
  owned,
  status,
  onCard,
}) => {
  return (
    <CardWrapper bg={image}>
      <CardTopSection>
        <StatusWrapper>
          {owned && <p>Owned x{owned}</p>}
          {status && <span>{status}</span>}
        </StatusWrapper>
        <Rarity>{rarity}</Rarity>
      </CardTopSection>
      <CardBottomSection>
        <h4>{name}</h4>
        <p>{type}</p>
      </CardBottomSection>
      {!isOffer
        ? onCard && (
            <CardOverlay className="overlay">
              <CardButton onClick={() => onCard(id, "view")}>View</CardButton>
              {type === "Category" && (
                <CardButton onClick={() => onCard(id, "buy")}>Buy</CardButton>
              )}
              {(type === "Day/Month" || type === "Year") && (
                <CardButton onClick={() => onCard(id, "sell")}>Sell</CardButton>
              )}
              {(type === "Crafting" || type === "Trigger") && (
                <CardButton onClick={() => onCard(id, "offer")}>
                  Make an Offer
                </CardButton>
              )}
              {!type && status === "For Sale" && (
                <CardButton onClick={() => onCard(id, "sell")}>Sell</CardButton>
              )}
              {!type && !status && (
                <CardButton onClick={() => onCard(id, "buy")}>Buy</CardButton>
              )}
            </CardOverlay>
          )
        : onCard && (
            <CardOverlay className="overlay">
              <CardButton onClick={() => onCard(id, "view")}>View</CardButton>
            </CardOverlay>
          )}
    </CardWrapper>
  );
};

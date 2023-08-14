import React from "react";
import { BuyCardWrapper, CardAction, CardType } from "./styles";
import { Button } from "../Button";
import { BuyPackProps } from "../../types";
import { CardImgWrapper, Rarity } from "../MarketCard/styles";

export const BuyCard: React.FC<BuyPackProps> = ({
  cardType,
  preview,
  price,
  onCardClick,
  cardSeries,
  rarity
}) => {
  return (
    <BuyCardWrapper onClick={() => onCardClick(cardSeries)}>
      <CardImgWrapper>
        <img src="/assets/nfts/new3.png" alt="" />
        <Rarity>{cardType}</Rarity>
      </CardImgWrapper>
      {!preview && (
        <CardAction>
          <div>
            <p>Price</p>
            <h3>${cardSeries.cost_usd / 100} USD</h3>
          </div>
          <Button className="buy-button" onClick={() => onCardClick(cardSeries)}>
            Buy Now
          </Button>
        </CardAction>
      )}
    </BuyCardWrapper>
  );
};

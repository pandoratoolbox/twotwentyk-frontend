import React from "react";
import { BuyCardWrapper, CardAction, CardType } from "./styles";
import { Button } from "../Button";
import { BuyPackProps } from "../../types";
import { CardImgWrapper, Rarity } from "../MarketCard/styles";

export const BuyCard: React.FC<BuyPackProps> = ({
  cardType,
  preview,
  price,
  onBuyClick,
  onCardClick,
}) => {
  return (
    <BuyCardWrapper onClick={() => onCardClick("1")}>
      <CardImgWrapper>
        <img src="/assets/nfts/new3.png" alt="" />
        <Rarity>{cardType}</Rarity>
      </CardImgWrapper>
      {!preview && (
        <CardAction>
          <div>
            <p>Price</p>
            <h3>${price} USD</h3>
          </div>
          <Button className="buy-button" onClick={() => onBuyClick("1")}>
            Buy Now
          </Button>
        </CardAction>
      )}
    </BuyCardWrapper>
  );
};

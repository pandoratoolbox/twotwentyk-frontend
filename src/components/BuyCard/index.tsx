import React from "react";
import { BuyCardWrapper, CardAction, CardType } from "./styles";
import { Button } from "../Button";
import { BuyPackProps } from "../../types";
import { CardImgWrapper, Rarity } from "../MarketCard/styles";
import { Loader } from "../Loader";

export const BuyCard: React.FC<BuyPackProps> = ({
  cardType,
  preview,
  price,
  onCardClick,
  cardSeries,
  rarity,
}) => {
  console.log(cardSeries);
  return (
    <BuyCardWrapper onClick={() => onCardClick(cardSeries)}>
      <CardImgWrapper>
        {cardType ? (
          <>
            <img
              src={`/assets/nfts/rarity/${cardType}-Pack-Background.png`}
              alt="Card Pack"
            />
            <Rarity>{cardType}</Rarity>
          </>
        ) : (
          <Loader />
        )}
      </CardImgWrapper>
      {!preview && (
        <CardAction>
          <div>
            <p>Price</p>
            <h3>${cardSeries.cost_usd / 100} USD</h3>
          </div>
          <Button
            className="buy-button"
            onClick={() => onCardClick(cardSeries)}
          >
            Buy Now
          </Button>
        </CardAction>
      )}
    </BuyCardWrapper>
  );
};

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
  const imageUrl = React.useMemo(() => {
    if (!cardSeries?.card_collection)  return "/assets/nfts/StandardPack.png"
    else {
      // if (cardSeries?.tier === 1) return  "/assets/nfts/StandardPack.png"
      // if (cardSeries?.tier === 2) return  "/assets/nfts/StandardPack.png"
    }
    return "/assets/nfts/StandardPack.png"
  }, [cardSeries])

  return (
    <BuyCardWrapper onClick={() => onCardClick(cardSeries)}>
      <CardImgWrapper>
        <img src={imageUrl} alt="" />
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

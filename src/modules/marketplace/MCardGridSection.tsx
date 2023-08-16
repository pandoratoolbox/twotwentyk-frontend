import React from "react";
import { CardGridWrapper } from "./styles";
import { MarketCard, PredictionCard } from "../../components";
// import { cardData, packData } from "./data";
import { CardActionTypes } from "../../types";
import { IMarketplaceListing } from "../../models/marketplace_listing";
// import { identitiesData } from "../../pages/app/identities/data";
// import { predictionData } from "../../pages/app/predictions/data";
// import { IMarketplaceListing } from "../../types/actions";

export const MCardGridSection: React.FC<{
  onCardClick: (item: IMarketplaceListing, action: CardActionTypes) => void;
  page?: string;
  data: any[] | undefined;
}> = ({ onCardClick, page, data }) => {
  return (
    <CardGridWrapper>
      {!page &&
        data?.map((item, key) => (
          <MarketCard key={key} item={item} {...item} onCard={onCardClick} />
        ))}
      {page === "packs" &&
        data?.map((item, key) => (
          <MarketCard
            item={item}
            // {...packData[key]}
            key={key}
            {...item}
            onCard={onCardClick}
          />
        ))}
      {page === "identities" &&
        data?.map((item, key) => {
          return (
            <PredictionCard
              cardType={"identity"}
              isNotHover={true}
              item={item}
              key={key}
              {...item?.nft_card_identity}
              onCard={onCardClick}
            />
          );
        })}
      {page === "predictions" &&
        data?.map((item, key) => {
          return (
            <PredictionCard
              cardType={"prediction"}
              isNotHover={true}
              key={key}
              item={item}
              {...item?.nft_card_prediction}
              onCard={onCardClick}
            />
          );
        })}
    </CardGridWrapper>
  );
};

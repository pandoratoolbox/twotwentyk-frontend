import React from "react";
import { CardGridWrapper } from "./styles";
import { MarketCard, PredictionCard } from "../../components";
import { cardData, packData } from "./data";
import { CardActionTypes } from "../../types";
import { identitiesData } from "../../pages/app/identities/data";
import { predictionData } from "../../pages/app/predictions/data";
import { IMarketplaceListing } from "../../types/actions";

export const MCardGridSection: React.FC<{
  onCardClick: (id: string | number, action: CardActionTypes) => void;
  page?: string;
  data: any[] | undefined;
}> = ({ onCardClick, page, data }) => {
  console.log(data)
  return (
    <CardGridWrapper>
      {!page &&
        data?.map((item, key) => (
          <MarketCard
            {...cardData[key]}
            key={key}
            {...item}
            onCard={onCardClick}
          />
        ))}
      {page === "packs" &&
        data?.map((item, key) => (
          <MarketCard
            {...packData[key]}
            key={key}
            {...item}
            onCard={onCardClick}
          />
        ))}
      {page === "identities" &&
        data?.map((item, key) => {
          const func =
            key % 2 === 0
              ? { onSell: () => onCardClick(1, "sell") }
              : { onBuy: () => onCardClick(1, "buy") };
          return (
            // <PredictionCard
            //   height={293}
            //   isNotHover={true}
            //   {...identitiesData[key]}
            //   key={key}
            //   {...item}
            //   onView={() => onCardClick(1, "view")}
            //   {...func}
            // />
            <>asdf</>
          );
        })}
      {page === "predictions" &&
        data?.map((item, key) => {
          const func =
            key % 2 === 0
              ? { onSell: () => onCardClick(1, "sell") }
              : { onBuy: () => onCardClick(1, "buy") };
          return (
            // <PredictionCard
            //   height={293}
            //   isNotHover={true}
            //   {...predictionData[key]}
            //   key={key}
            //   {...item}
            //   onView={() => onCardClick(1, "view")}
            //   {...func}
            // />
            <>asdf</>
          );
        })}
      {/* {!page &&
        cardData.map((item, key) => (
          <MarketCard key={key} {...item} onCard={onCardClick} />
        ))} */}
      {/* {page === "packs" &&
        packData.map((item, key) => (
          <MarketCard key={key} {...item} onCard={onCardClick} />
        ))} */}
      {/* {page === "identities" &&
        identitiesData.map((item, key) => {
          const func =
            key % 2 === 0
              ? { onSell: () => onCardClick(1, "sell") }
              : { onBuy: () => onCardClick(1, "buy") };
          return (
            <PredictionCard
              height={293}
              isNotHover={true}
              key={key}
              {...item}
              onView={() => onCardClick(1, "view")}
              {...func}
            />
          );
        })}
      {page === "predictions" &&
        predictionData.map((item, key) => {
          const func =
            key % 2 === 0
              ? { onSell: () => onCardClick(1, "sell") }
              : { onBuy: () => onCardClick(1, "buy") };
          return (
            <PredictionCard
              height={293}
              isNotHover={true}
              key={key}
              {...item}
              onView={() => onCardClick(1, "view")}
              {...func}
            />
          );
        })} */}
    </CardGridWrapper>
  );
};

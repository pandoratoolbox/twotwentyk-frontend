import React from "react";
import { CardGridWrapper } from "./styles";
import { DateCardGridProps } from "../../../types";
import { DateCard, PredictionCard, CardPack } from "../../../components";
import { CategoryCard } from "../../../components/CategoryCard";
import { TriggerCard } from "../../../components/TriggerCard";

export const CardGridSection: React.FC<DateCardGridProps> = ({
  data,
  cardType,
  identityData,
  onCraft,
  onSell,
  onView,
}) => {
  return (
    <CardGridWrapper>
      {cardType === "category" &&
        data?.map((item, key) => (
          <CategoryCard
            key={key}
            item={item}
            {...item}
            onCraft={onCraft}
            onView={onView}
            onSell={onSell}
          />
        ))}
      {cardType === "date" &&
        data?.map((item, key) => (
          <DateCard
            key={key}
            item={item}
            {...item}
            onCraft={onCraft}
            onView={onView}
            onSell={onSell}
          />
        ))}
      {cardType === "trigger" &&
        data?.map((item, key) => (
          <TriggerCard
            tier={item?.tier}
            key={key}
            item={item}
            {...item}
            onCraft={onCraft}
            onView={onView}
            onSell={onSell}
          />
        ))}
      {cardType === "cardPacks" &&
        data?.map((item, key) => (
          <CardPack
            key={key}
            item={item}
            {...item}
            onOpen={onCraft}
            onView={onView}
            onSell={onSell}
          />
        ))}
      {identityData &&
        identityData?.map((item, key) => (
          <PredictionCard
            cardType={cardType}
            height={293}
            isNotHover={true}
            key={key}
            item={item}
            {...item}
            // onCraft={onCraft}
            onView={onView}
            onSell={onSell}
          />
        ))}
    </CardGridWrapper>
  );
};

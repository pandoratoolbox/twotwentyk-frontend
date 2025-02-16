import React from "react";
import { CardGridWrapper } from "./styles";
import { DateCardGridProps } from "../../../types";
import {
  DateCard,
  PredictionCard,
  CardPack,
  IdentityCard,
  CraftingCard,
} from "../../../components";
import { CategoryCard } from "../../../components/CategoryCard";
import { TriggerCard } from "../../../components/TriggerCard";

export const CardGridSection: React.FC<DateCardGridProps> = ({
  data,
  cardType,
  identityData,
  onCraft,
  onSell,
  onView,
  onClaimSubmit,
  buttonText,
  onCancel
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
            position={key % 2 === 0 ? "left" : "right"}
            key={key}
            item={item}
            {...item}
            onCraft={onCraft}
            onView={onView}
            onSell={onSell}
            buttonText={buttonText}
          />
        ))}
      {cardType === "crafting" &&
        data?.map((item, key) => (
          <CraftingCard
            position={key % 2 === 0 ? "left" : "right"}
            key={key}
            item={item}
            {...item}
            onCraft={onCraft}
            onView={onView}
            onSell={onSell}
            buttonText={buttonText}
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
            onCancel={onCancel}
          />
        ))}
      {cardType === "prediction" &&
        identityData?.map((item, key) => (
          <PredictionCard
            cardType={cardType}
            height={293}
            isNotHover={true}
            key={`${cardType}-${key}`}
            item={item}
            {...item}
            onCraft={onCraft}
            onView={onView}
            onSell={onSell}
            onClaimSubmit={onClaimSubmit}
            onCancel={onCancel}
          />
        ))}

      {cardType === "identity" &&
        identityData?.map((item, key) => (
          <IdentityCard
            cardType={cardType}
            height={293}
            isNotHover={true}
            key={`${cardType}-${key}`}
            item={item}
            {...item}
            onCraft={onCraft}
            onView={onView}
            onSell={onSell}
            onClaimSubmit={onClaimSubmit}
          />
        ))}
    </CardGridWrapper>
  );
};

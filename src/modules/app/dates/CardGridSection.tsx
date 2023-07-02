import React from "react";
import { CardGridWrapper } from "./styles";
import { DateCardGridProps } from "../../../types";
import { DateCard, PredictionCard } from "../../../components";
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
  // console.log(data);
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
            key={key}
            item={item}
            {...item}
            onCraft={onCraft}
            onView={onView}
            onSell={onSell}
          />
        ))}
      {/* {data &&
        data?.map(
          ///////// add some filter
          (item, key: number) =>
            cardType === "trigger" ? (
              <TriggerCard
                key={key}
               
                {...item}
                onCraft={onCraft}
                onView={onView}
                onSell={onSell}
              />
            ) : (
              <DateCard
               
                key={key}
                {...item}
                onCraft={onCraft}
                onView={onView}
                onSell={onSell}
              />
            )
        )} */}
      {identityData &&
        identityData?.map((item, key) => (
          <PredictionCard
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

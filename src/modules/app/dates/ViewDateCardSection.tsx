import React from "react";
import { ViewDateCardProps } from "../../../types";
import {
  CloseButton,
  PreviewCardWrapper,
  PropertiesContent,
  PropertiesHeader,
  PropertiesWrapper,
  PropertyItem,
  ViewDateCardContainer,
  ViewDateCardWrapper,
} from "./styles";
import { DateCard, IconArrowDown, PredictionCard } from "../../../components";
import { TriggerCard } from "../../../components/TriggerCard";
import { CategoryCard } from "../../../components/CategoryCard";
import { useMonthContext } from "../../../context";

export const ViewDateCardSection: React.FC<ViewDateCardProps> = ({
  item,
  cardType,
  isView,
  onClose,
}) => {
  const { monthContext } = useMonthContext();
  return (
    <ViewDateCardWrapper isview={isView ? "true" : undefined}>
      <ViewDateCardContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>
          View{" "}
          {cardType === "trigger"
            ? "Trigger"
            : cardType === "identity"
            ? "Identity"
            : cardType === "prediction"
            ? "Prediction"
            : cardType === "category"
            ? "Category"
            : "Date Card"}
        </h2>
        <PreviewCardWrapper>
          {cardType === "trigger" ? (
            <TriggerCard
              tier={item?.tier}
              image={item?.image}
              trigger={item?.trigger}
              rarity={item?.rarity}
              isNotHover={true}
            />
          ) : cardType === "identity" || cardType === "prediction" ? (
            <PredictionCard
              day={item?.day}
              month={item?.month}
              category={item?.category}
              rarity={item?.rarity}
              year={item?.year}
              icon={item?.icon}
              iconText={item?.iconText}
              celebrity_name={item?.celebrity_name}
              image={item?.image}
              cardType={cardType}
            />
          ) : cardType === "category" ? (
            <CategoryCard
              item={item}
              day={item?.day}
              month={item?.month}
              category={item?.category}
              rarity={item?.rarity}
              image={item?.image}
            />
          ) : (
            <DateCard
              day={item?.day}
              month={item?.month}
              image={item?.image}
              category={item?.category}
              rarity={item?.rarity}
              isNotHover={true}
            />
          )}
        </PreviewCardWrapper>
        <PropertiesWrapper>
          <PropertiesHeader>
            <span>Properties</span>
            <IconArrowDown />
          </PropertiesHeader>
          <PropertiesContent>
            <PropertyItem>
              <p>Rarity</p>
              <span>
                {item?.rarity === 0 && "Common"}
                {item?.rarity === 1 && "Uncommon"}
                {item?.rarity === 2 && "Rare"}
              </span>
            </PropertyItem>
            <PropertyItem>
              <p>
                {cardType === "trigger"
                  ? "Category"
                  : cardType === "identity" || cardType === "prediction"
                  ? "Day/Month"
                  : "Type"}
              </p>
              <span>
                {cardType === "date"
                  ? item?.day
                    ? "Day/Month"
                    : "Year"
                  : cardType === "category"
                  ? "Category"
                  : cardType === "trigger"
                  ? item?.category
                  : cardType === "identity" || cardType === "prediction"
                  ? item?.day
                    ? `${item?.day}/${item?.month}`
                    : null
                  : ""}
              </span>
            </PropertyItem>
            <PropertyItem>
              <p>
                {cardType === "trigger"
                  ? "Trigger Type"
                  : cardType === "date"
                  ? item?.day
                    ? "Day/Month"
                    : "Year"
                  : cardType === "category"
                  ? "Category"
                  : cardType === "identity" || cardType === "prediction"
                  ? "Year"
                  : ""}
              </p>
              <span>
                {cardType === "date"
                  ? item?.day
                    ? `${item?.day} ${
                        monthContext &&
                        (monthContext as Map<number, string>).get(item?.month)
                      }`
                    : item?.year
                  : cardType === "category"
                  ? item?.category
                  : cardType === "trigger"
                  ? item?.tier
                  : cardType === "identity" || cardType === "prediction"
                  ? item?.year
                  : ""}
              </span>
            </PropertyItem>
            <PropertyItem>
              <p>
                {cardType === "trigger"
                  ? "Trigger"
                  : cardType === "identity" || cardType === "prediction"
                  ? "Category"
                  : "Collection"}
              </p>
              <span>
                {cardType === "trigger"
                  ? item?.trigger
                  : cardType === "identity" || cardType === "prediction"
                  ? item?.category
                  : ""}
              </span>
            </PropertyItem>
          </PropertiesContent>
        </PropertiesWrapper>
      </ViewDateCardContainer>
    </ViewDateCardWrapper>
  );
};

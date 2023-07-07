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
            {cardType === "prediction" ? (
              <PropertyItem>
                <p>Celebrity</p>
                <span>{item?.celebrity_name}</span>
              </PropertyItem>
            ) : null}
            <PropertyItem>
              <p>Rarity</p>
              <span>
                {item?.rarity === 0 && "Common"}
                {item?.rarity === 1 && "Uncommon"}
                {item?.rarity === 2 && "Rare"}
              </span>
            </PropertyItem>

            {cardType === "identity" ? (
              <PropertyItem>
                <p>Day/Month</p>
                <span>{`${item?.day} ${
                  monthContext &&
                  (monthContext as Map<number, string>).get(item?.month)
                }`}</span>
              </PropertyItem>
            ) : cardType === "date" ? (
              <PropertyItem>
                <p>Type</p>
                <span>{item?.day ? "Day/Month" : "Year"}</span>
              </PropertyItem>
            ) : null}

            {cardType === "trigger" ? (
              <PropertyItem>
                <p>Tier</p>
                <span>{item?.tier}</span>
              </PropertyItem>
            ) : cardType === "identity" ? (
              <PropertyItem>
                <p>Year</p>
                <span>{item?.year}</span>
              </PropertyItem>
            ) : cardType === "date" ? (
              <PropertyItem>
                <p>Type</p>
                <span>
                  {item?.day
                    ? `${item?.day} ${
                        monthContext &&
                        (monthContext as Map<number, string>).get(item?.month)
                      }`
                    : item?.year}
                </span>
              </PropertyItem>
            ) : cardType === "category" ? (
              <PropertyItem>
                <p>Category</p>
                <span>{item?.category}</span>
              </PropertyItem>
            ) : null}

            <PropertyItem>
              <p>
                {cardType === "trigger"
                  ? "Trigger"
                  : cardType === "identity"
                  ? "Category"
                  : null}
              </p>
              <span>
                {cardType === "trigger"
                  ? item?.trigger
                  : cardType === "identity"
                  ? item?.category
                  : ""}
              </span>
            </PropertyItem>
            {cardType === "prediction" && item?.triggers && (
              <>
                <PropertiesHeader noborder={"true"}>
                  <span>Triggers</span>
                  <span>{item?.triggers?.length}</span>
                </PropertiesHeader>
                {item?.triggers.map((item: string, key: number) => (
                  <PropertyItem key={key} nfttrigger={"true"}>
                    <p>Marriage</p>

                    <span>{item}</span>
                  </PropertyItem>
                ))}
              </>
            )}
          </PropertiesContent>
        </PropertiesWrapper>
      </ViewDateCardContainer>
    </ViewDateCardWrapper>
  );
};

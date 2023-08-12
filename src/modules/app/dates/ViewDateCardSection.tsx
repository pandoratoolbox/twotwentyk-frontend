import React, { useState, useEffect } from "react";
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
import {
  DateCard,
  IconArrowDown,
  PredictionCard,
  CardPack,
} from "../../../components";
import { TriggerCard } from "../../../components/TriggerCard";
import { CategoryCard } from "../../../components/CategoryCard";
import { useMonthContext, useTriggersContext } from "../../../context";
import { ITrigger } from "../../../models/trigger";
import { INftCardTrigger } from "../../../models/nft_card_trigger";
import { INftCardPrediction } from "../../../models/nft_card_prediction";

export const ViewDateCardSection: React.FC<ViewDateCardProps> = ({
  item,
  cardType,
  isView,
  onClose,
}) => {
  const { monthContext } = useMonthContext();
  const { triggersContext } = useTriggersContext();

  const [filteredTriggers, setFilteredTriggers] = useState<ITrigger[] | null>(
    null
  );
  useEffect(() => {
    if (item) {
      if (cardType === "prediction") {
        let filtered: ITrigger[] = [];
        if (triggersContext) {
          (triggersContext as Map<number, ITrigger>).forEach((v: ITrigger) => {
            if (item) {
              if (item.triggers) {
                if (item.triggers.includes(v.name)) {
                  filtered.push(v);
                }
              }
            }
          });
          if (filtered.length !== 0) {
            setFilteredTriggers(filtered);
          }
        }
      }
    }
  }, [triggersContext, item]);
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
            : cardType === "cardPacks"
            ? "Card Pack"
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
          ) : cardType === "cardPacks" ? (
            <CardPack item={item} rarity={item?.rarity} image={item?.image} />
          ) : (
            <DateCard
              item={item}
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
            {cardType === "prediction" || cardType === "identity" ? (
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
                <p>{item?.day ? "Day/Month" : "Year"}</p>
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
                  : cardType === "cardPacks"
                  ? "Collection"
                  : null}
              </p>
              <span>
                {cardType === "trigger"
                  ? item?.trigger
                  : cardType === "identity"
                  ? item?.category
                  : cardType === "cardPacks"
                  ? item?.collection
                  : ""}
              </span>
            </PropertyItem>

            {cardType === "prediction" && filteredTriggers && (
              <>
                <PropertiesHeader noborder={"true"}>
                  <span>Triggers</span>
                  <span>{filteredTriggers.length}</span>
                </PropertiesHeader>
                {filteredTriggers.map((item: ITrigger, key: number) => (
                  <PropertyItem key={key} nfttrigger={"true"}>
                    <p>{item.tier}</p>

                    <span>{item.name}</span>
                  </PropertyItem>
                ))}
              </>
            )}

            {cardType === "cardPacks" && (
              <>
                <PropertiesHeader>
                  <span>Pack Contents</span>
                  <IconArrowDown />
                </PropertiesHeader>
                <PropertyItem>
                  <p>6 Cards</p>
                </PropertyItem>
                <PropertyItem>
                  <p>3 Guaranteed Core Cards</p>
                </PropertyItem>
                <PropertyItem>
                  <p>2 Core cards with chance of Uncommon Card</p>
                </PropertyItem>
                <PropertyItem>
                  <p>1 Crafting Card</p>
                </PropertyItem>
              </>
            )}
          </PropertiesContent>
        </PropertiesWrapper>
      </ViewDateCardContainer>
    </ViewDateCardWrapper>
  );
};

import React, { useState, useEffect } from "react";
import {
  CloseButton,
  PreviewCardWrapper,
  PriceItem,
  PropertiesContent,
  PropertiesHeader,
  PropertiesWrapper,
  PropertyItem,
  SetPriceWrapper,
  ViewDateCardContainer,
  ViewDateCardWrapper,
} from "./styles";
import { SellDateCardProps } from "../../../types";
import {
  Button,
  DateCard,
  IconArrowDown,
  Input,
  PredictionCard,
} from "../../../components";
import { TriggerCard } from "../../../components/TriggerCard";
import { CategoryCard } from "../../../components/CategoryCard";
import { ITrigger } from "../../../models/trigger";

import { useMonthContext, useTriggersContext } from "../../../context";

const addMarketPlaceFee = (priceValue: string) => {
  const amountWithoutDollarSign = priceValue.replace("$", "").replace(",", "");
  const priceNumber = parseFloat(amountWithoutDollarSign);
  const fee = (priceNumber * 0.03).toFixed(2);
  return fee;
};

export const SellDateCardSection: React.FC<SellDateCardProps> = ({
  item,
  cardType,
  isView,
  onClose,
  onSellConfirm,
}) => {
  const { monthContext } = useMonthContext();
  const { triggersContext } = useTriggersContext();

  // console.log(item);
  const [priceValue, setPriceValue] = useState<string>("$1,000");
  const [totalPrice, setTotalPrice] = useState<string | number>("");
  const [nftCollectionId, setNftCollectionID] = useState<string | number>("");

  const handlePriceChange = (price: string) => {
    setPriceValue(price);
  };

  //get price
  useEffect(() => {
    const fee = addMarketPlaceFee(priceValue);
    const totalPrice =
      parseFloat(priceValue.replace("$", "").replace(",", "")) +
      parseFloat(fee);
    setTotalPrice(totalPrice);
  }, [priceValue]);

  //get collection id
  useEffect(() => {
    if (item) {
      if (item.day || item.month) {
        setNftCollectionID(3);
      } else if (item.year) {
        setNftCollectionID(4);
      } else if (item.category) {
        setNftCollectionID(2);
      } else if (item.crafting) {
        setNftCollectionID(1);
      } else if (item.trigger) {
        setNftCollectionID(5);
      } else if (item.identity) {
        setNftCollectionID(6);
      } else if (item.prediction) {
        setNftCollectionID(7);
      }
    }
  }, [item]);

  const [filteredTriggers, setFilteredTriggers] = useState<ITrigger[] | null>(
    null
  );
  useEffect(() => {
    if (cardType === "prediction") {
      let filtered: ITrigger[] = [];
      if (triggersContext) {
        (triggersContext as Map<number, ITrigger>).forEach((v: ITrigger) => {
          if (item.triggers) {
            if (item.triggers.includes(v.name)) {
              filtered.push(v);
            }
          }
        });
        if (filtered.length !== 0) {
          setFilteredTriggers(filtered);
        }
      }
    }
  }, [triggersContext, item]);

  return (
    <ViewDateCardWrapper isview={isView ? "true" : undefined}>
      <ViewDateCardContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>
          Sell{" "}
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
              item={item}
              day={item?.day}
              month={item?.month}
              category={item?.category}
              rarity={item?.rarity}
              year={item?.year}
              icon={item?.icon}
              celebrity_name={item?.celebrity_name}
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
            {cardType === "identity" || cardType === "prediction" ? (
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
                <p>Tire</p>
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
                  : null}
              </p>
              <span>
                {cardType === "trigger"
                  ? item?.trigger
                  : cardType === "identity"
                  ? item?.category
                  : null}
              </span>
            </PropertyItem>
            {cardType === "identity" && (
              <PropertyItem>
                <p>Collection</p>
                <span>
                  {item?.card_series_id ? item?.card_series_id : "N/A"}
                </span>
              </PropertyItem>
            )}
            {cardType === "prediction" && filteredTriggers && (
              <>
                <PropertiesHeader noborder={"true"}>
                  <span>Triggers</span>
                  <span>{filteredTriggers?.length}</span>
                </PropertiesHeader>
                {filteredTriggers.map((item: ITrigger, key: number) => (
                  <PropertyItem key={key} nfttrigger={"true"}>
                    <p>{item.tier}</p>

                    <span>{item.name}</span>
                  </PropertyItem>
                ))}
              </>
            )}
          </PropertiesContent>
        </PropertiesWrapper>
        <SetPriceWrapper>
          <p>Enter the listing price for your card</p>
          <Input
            value={priceValue}
            onChange={(e) => handlePriceChange(e.target.value)}
          />
        </SetPriceWrapper>
        <PropertiesWrapper>
          <PropertiesHeader>
            <span>Price Summary</span>
            <IconArrowDown />
          </PropertiesHeader>
          <PropertiesContent>
            <PriceItem>
              <p>Asking price</p>
              <span>{priceValue} USD</span>
            </PriceItem>
            <PriceItem>
              <p>Marketplace fee (3%)</p>
              <span className="weak">{`$${addMarketPlaceFee(
                priceValue
              )} USD`}</span>
            </PriceItem>
          </PropertiesContent>
          <PropertiesContent>
            <PriceItem>
              <p>Net amount to seller</p>
              <span>{`$${totalPrice && totalPrice} USD`}</span>
            </PriceItem>
            <PriceItem>
              <p>Prize Pool Replenishment Fee</p>
              <span className="weak">--</span>
            </PriceItem>
          </PropertiesContent>
        </PropertiesWrapper>
        <Button
          className="sell-confirm-button"
          onClick={() => onSellConfirm(item.id, nftCollectionId, totalPrice)}
        >
          Confirm
        </Button>
      </ViewDateCardContainer>
    </ViewDateCardWrapper>
  );
};

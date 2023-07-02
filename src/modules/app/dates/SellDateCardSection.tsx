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
  IconCardAthlete,
  Input,
  PredictionCard,
} from "../../../components";
import { TriggerCard } from "../../../components/TriggerCard";
import { CategoryCard } from "../../../components/CategoryCard";

import { useMonthContext } from "../../../context";

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

  return (
    <ViewDateCardWrapper isview={isView ? "true" : undefined}>
      <ViewDateCardContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Sell {cardType === "trigger" ? "Trigger" : "Date Card"}</h2>
        <PreviewCardWrapper>
          {cardType === "trigger" ? (
            <TriggerCard
              image={item?.image}
              trigger="2005"
              rarity={item?.rarity}
              isNotHover={true}
            />
          ) : cardType === "identity" ? (
            <PredictionCard
              item={item}
              day={item?.day}
              month={item?.month}
              category="Athlete"
              rarity={item?.rarity}
              height={293}
              year={2023}
              icon={<IconCardAthlete />}
              iconText="Athlete"
            />
          ) : cardType === "prediction" ? (
            <PredictionCard
              item={item}
              day={item?.day}
              month={item?.month}
              category="Tom Brady"
              rarity={item?.rarity}
              height={293}
              year={2023}
              image={item?.image}
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
            {cardType === "identity" && (
              <PropertyItem>
                <p>Identity Match</p>
                <span>Tom Brady</span>
              </PropertyItem>
            )}
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
                  : cardType === "identity"
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
                  : ""}
              </span>
            </PropertyItem>
            <PropertyItem>
              <p>
                {cardType === "trigger"
                  ? "Trigger"
                  : cardType === "identity"
                  ? "Category"
                  : "Collection"}
              </p>
              <span>{cardType === "trigger" ? item?.trigger : ""}</span>
            </PropertyItem>
            {cardType === "identity" && (
              <PropertyItem>
                <p>Collection</p>
                <span>Sports Series</span>
              </PropertyItem>
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

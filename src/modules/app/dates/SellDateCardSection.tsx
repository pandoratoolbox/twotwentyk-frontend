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
  CardPack,
} from "../../../components";
import { TriggerCard } from "../../../components/TriggerCard";
import { CategoryCard } from "../../../components/CategoryCard";
import { ITrigger } from "../../../models/trigger";

import { useMonthContext, useTriggersContext } from "../../../context";
import { NFT_TYPE_ID_CATEGORY, NFT_TYPE_ID_CRAFTING, NFT_TYPE_ID_DAY_MONTH, NFT_TYPE_ID_IDENTITY, NFT_TYPE_ID_PREDICTION, NFT_TYPE_ID_TRIGGER, NFT_TYPE_ID_YEAR } from "../../../models/nft";

export const SellDateCardSection: React.FC<SellDateCardProps> = ({
  item,
  cardType,
  isView,
  onClose,
  onSellConfirm,
}) => {
  const prizePoolFee = 0.05;
  const marketplaceFee = 0.05;
  const { monthContext } = useMonthContext();
  const { triggersContext } = useTriggersContext();

  // console.log(item);
  const [priceValue, setPriceValue] = useState<string>("$1");
  const [totalPrice, setTotalPrice] = useState<number>(1);
  const [nftCollectionId, setNftCollectionID] = useState<number>(0);

  const calculateMarketplaceFee = (priceValue: string) => {
    const amountWithoutDollarSign = priceValue.replace("$", "").replace(",", "");
    const priceNumber = parseFloat(amountWithoutDollarSign);
    const fee = (priceNumber * marketplaceFee).toFixed(2);
    return fee;
  };

  const calculatePrizePoolFee = (priceValue: string) => {
    const amountWithoutDollarSign = priceValue.replace("$", "").replace(",", "");
    const priceNumber = parseFloat(amountWithoutDollarSign);
    const fee = (priceNumber * prizePoolFee).toFixed(2);
    return fee;
  };


  const handlePriceChange = (price: string) => {
    setPriceValue(price);
  };

  //get price
  useEffect(() => {
    const marketplaceFee = calculateMarketplaceFee(priceValue);
    const prizePoolFee = calculatePrizePoolFee(priceValue);
    const totalPrice =
      parseFloat(priceValue.replace("$", "").replace(",", "")) -
      parseFloat(marketplaceFee) - parseFloat(prizePoolFee);
    setTotalPrice(Number(totalPrice.toFixed(2)));
  }, [priceValue]);

  //get collection id
  useEffect(() => {
    if (item) {
      if (item.day || item.month) {
        setNftCollectionID(NFT_TYPE_ID_DAY_MONTH);
      } else if (item.year) {
        setNftCollectionID(NFT_TYPE_ID_YEAR);
      } else if (item.category) {
        setNftCollectionID(NFT_TYPE_ID_CATEGORY);
      } else if (item.crafting) {
        setNftCollectionID(NFT_TYPE_ID_CRAFTING);
      } else if (item.trigger) {
        setNftCollectionID(NFT_TYPE_ID_TRIGGER);
      } else if (item.identity) {
        setNftCollectionID(NFT_TYPE_ID_IDENTITY);
      } else if (item.prediction) {
        setNftCollectionID(NFT_TYPE_ID_PREDICTION);
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
              <p>Marketplace fee (5%)</p>
              <span className="weak">{`$${calculateMarketplaceFee(
                priceValue
              )} USD`}</span>
            </PriceItem>
            <PriceItem>
              <p>Prize Pool Replenishment Fee (5%)</p>
              <span className="weak">{`$${calculatePrizePoolFee(
                priceValue
              )} USD`}</span>
            </PriceItem>
          </PropertiesContent>
          <PropertiesContent>
            <PriceItem>
              <p>Net amount to seller</p>
              <span>{`$${totalPrice && totalPrice} USD`}</span>
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

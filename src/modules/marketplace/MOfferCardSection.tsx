import React, { useState } from "react";
import { CardSidebarProps } from "../../types";
import {
  BalanceInfo,
  IconWRapper,
  MSidebarContainer,
  MSidebarWrapper,
  MyBalanceWrapper,
  ViewCardWrapper,
} from "./styles";
import {
  CloseButton,
  PropertiesContent,
  PropertiesHeader,
  PropertiesWrapper,
  PropertyItem,
  SetPriceWrapper,
} from "../app/dates/styles";
import {
  BalanceBuyConfirmModal,
  Button,
  IconArrowDown,
  IconCoinsLarge,
  IconPigMoney,
  Input,
  MarketCard,
  SellConfirmModal,
} from "../../components";

export const MOfferCardSection: React.FC<CardSidebarProps> = ({
  selectedItem,
  onClose,
  onConfirm,
  open,
}) => {
  const [offerConfirm, setOfferConfirm] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleContinue = () => {
    setOfferConfirm(true);
  };

  const handleOfferConfirm = () => {
    setOfferConfirm(false);
    setConfirm(true);
  };

  // for check rarity
  const checkRarity = (selectedItem: any) => {
    if (
      selectedItem?.nft_card_day_month?.rarity === 0 ||
      selectedItem?.nft_card_trigger?.rarity === 0 ||
      selectedItem?.nft_card_crafting?.rarity === 0 ||
      selectedItem?.nft_card_identity?.rarity === 0 ||
      selectedItem?.nft_card_prediction?.rarity === 0 ||
      selectedItem?.nft_card_year?.rarity === 0
    ) {
      return "Common";
    } else if (
      selectedItem?.nft_card_day_month?.rarity === 1 ||
      selectedItem?.nft_card_trigger?.rarity === 1 ||
      selectedItem?.nft_card_crafting?.rarity === 1 ||
      selectedItem?.nft_card_identity?.rarity === 1 ||
      selectedItem?.nft_card_prediction?.rarity === 1 ||
      selectedItem?.nft_card_year?.rarity === 1
    ) {
      return "Uncommon";
    } else if (
      selectedItem?.nft_card_day_month?.rarity === 2 ||
      selectedItem?.nft_card_trigger?.rarity === 2 ||
      selectedItem?.nft_card_crafting?.rarity === 2 ||
      selectedItem?.nft_card_identity?.rarity === 2 ||
      selectedItem?.nft_card_prediction?.rarity === 2 ||
      selectedItem?.nft_card_year?.rarity === 2
    ) {
      return "Rare";
    }

    return undefined;
  };

  //for check type
  const checkType = (selectedItem: any) => {
    if (selectedItem?.nft_card_day_month) {
      return "Day/Month";
    } else if (selectedItem?.nft_card_trigger) {
      return "Trigger";
    } else if (selectedItem?.nft_card_crafting) {
      return "Crafting";
    } else if (selectedItem?.nft_card_identity) {
      return "Identity";
    } else if (selectedItem?.nft_card_prediction) {
      return "Prediction";
    } else if (selectedItem?.nft_card_year) {
      return "Year";
    }

    return undefined;
  };

  //for check type value
  const checkTypeValue = (selectedItem: any) => {
    if (selectedItem?.nft_card_day_month) {
      return `${selectedItem?.nft_card_day_month?.day}/${selectedItem?.nft_card_day_month?.month}`;
    } else if (selectedItem?.nft_card_trigger) {
      return selectedItem?.nft_card_trigger?.trigger;
    } else if (selectedItem?.nft_card_crafting) {
      return "Crafting";
    } else if (selectedItem?.nft_card_identity) {
      return selectedItem?.nft_card_identity?.celebrity_name;
    } else if (selectedItem?.nft_card_prediction) {
      return selectedItem?.nft_card_prediction?.celebrity_name;
    } else if (selectedItem?.nft_card_year) {
      return selectedItem?.nft_card_year?.year;
    }

    return undefined;
  };

  return (
    <>
      <MSidebarWrapper open={open}>
        <MSidebarContainer>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <h2>Make an Offer</h2>
          <MyBalanceWrapper>
            <IconWRapper>
              <IconCoinsLarge />
            </IconWRapper>
            <BalanceInfo>
              <p>Your account balance is</p>
              <h3>
                ${selectedItem?.price}
                <span>USD</span>
              </h3>
            </BalanceInfo>
          </MyBalanceWrapper>
          <ViewCardWrapper>
            <MarketCard item={selectedItem} {...selectedItem} />
          </ViewCardWrapper>
          {/* <p className="owner">
            Owned by <b>Username</b>
          </p> */}
          <PropertiesWrapper>
            <PropertiesHeader>
              <span>Properties</span>
              <IconArrowDown />
            </PropertiesHeader>
            <PropertiesContent>
              <PropertyItem>
                <p>Rarity</p>
                <span>{checkRarity(selectedItem)}</span>
              </PropertyItem>
              <PropertyItem>
                <p>Type</p>
                <span>{checkType(selectedItem)}</span>
              </PropertyItem>
              <PropertyItem>
                <p>{checkType(selectedItem)}</p>
                {checkTypeValue(selectedItem)}
              </PropertyItem>
              <PropertyItem>
                <p>Collection</p>
                <span></span>
              </PropertyItem>
            </PropertiesContent>
          </PropertiesWrapper>
          <SetPriceWrapper>
            <p>Enter your offering price</p>
            <Input value={selectedItem?.price} onChange={() => {}} />
          </SetPriceWrapper>
          <Button className="sell-confirm-button" onClick={handleContinue}>
            Continue
          </Button>
        </MSidebarContainer>
      </MSidebarWrapper>
      <BalanceBuyConfirmModal
        isOffer
        onConfirm={handleOfferConfirm}
        open={offerConfirm}
        onClose={() => setOfferConfirm(false)}
      />
      <SellConfirmModal
        isMarket
        isOffer
        onConfirm={onConfirm}
        open={confirm}
        onClose={() => setConfirm(false)}
      />
    </>
  );
};

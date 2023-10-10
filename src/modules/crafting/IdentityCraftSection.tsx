import React, { useEffect, useState } from "react";
import {
  EmptyCraftCard,
  CraftCardGroup,
  CraftCardWrapper,
  CraftSectionWrapper,
  TitleWrapper,
  CraftCard,
  AddTrigger,
  EmptyCraftCardWrapper,
  CraftSectionContainer,
} from "./styles";
import { Button } from "../../components";

import { INftCardCrafting } from "../../models/nft_card_crafting";
import { INftCardCategory } from "../../models/nft_card_category";
import { INftCardDayMonth } from "../../models/nft_card_day_month";
import { INftCardYear } from "../../models/nft_card_year";
import { INftCardIdentity } from "../../models/nft_card_identity";
import { INftCardPrediction } from "../../models/nft_card_prediction";
import { INftCardTrigger } from "../../models/nft_card_trigger";
import { useMonthContext } from "../../context";
import { IdentitySelectCardSection } from "./IdentitySelectCardSection";

// Reusable CraftCard component
const CraftCardComponent = ({
  cardType,
  heading,
  selectedCard,
  onCraftChanged,
}: {
  cardType: string;
  heading: string;
  selectedCard: any;
  onCraftChanged: (key: string) => void;
}) => {

  function formatCategory(category: string) {
    const words = category.split(" ");

    const formattedCategory = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-");

    return formattedCategory;
  }

  function checkRarity(rarity: number) {
    if (rarity === 0) {
      return "Core";
    } else if (rarity === 1) {
      return "Rare";
    } else if (rarity === 2) {
      return "Uncommon";
    }
  }

  return (
    <CraftCardWrapper key={cardType}>
      <h6>{heading}</h6>
      {selectedCard ? (
        <CraftCard
          onClick={() => onCraftChanged(cardType)}
          className="crafting-card"
        >
          {cardType === "category" ? (
            <img
              src={`/assets/nfts/rarity/${formatCategory(
                selectedCard.category
              )}-${checkRarity(selectedCard.rarity)}.png`}
              alt="nft"
            />
          ) : cardType === "dayMonth" ? (
            <img
              src={`/assets/nfts/rarity/Month-Day-${checkRarity(
                selectedCard.rarity
              )}-copy.png`}
              alt="nft"
            />
          ) : (
            <img
              src={`/assets/nfts/rarity/${cardType}-${checkRarity(
                selectedCard.rarity
              )}-copy.png`}
              alt="nft"
            />
          )}
          <div className="info-nft info-nft-day-month">
            {cardType === "dayMonth" && selectedCard.day && selectedCard.month && (
              <h3>
                {selectedCard.day} {selectedCard.month}
              </h3>
            )}
            {cardType === "year" && selectedCard.year && <h3>{selectedCard.year}</h3>}
          </div>
        </CraftCard>
      ) : (
        <EmptyCraftCard onClick={() => onCraftChanged(cardType)}>
          <img src="/assets/empty-crafting.png" alt="" />
        </EmptyCraftCard>
      )}
    </CraftCardWrapper>
  );
};

export const IdentityCraftSection: React.FC<{
  selectedCards: {
    crafting: INftCardCrafting | null;
    year: INftCardYear | null;
    dayMonth: INftCardDayMonth | null;
    category: INftCardCategory | null;
  };
  onCraftChanged: (key: string) => void;
  onCraft: () => void;
  selectedCraft: string;
  clickedCard: number | string | null;
  selectedCard: any;
  onCardClicked: any;
  onSelectCardCrafting: any;
  onSelectCardCategory: any;
  onSelectCardDayMonth: any;
  onSelectCardYear: any;
  myNfts: any;
  setMyNfts: any;
}> = ({
  onCraftChanged,
  selectedCraft,
  selectedCards,
  onCraft,
  clickedCard,
  selectedCard,
  onCardClicked,
  onSelectCardCrafting,
  onSelectCardCategory,
  onSelectCardDayMonth,
  onSelectCardYear,
  myNfts,
  setMyNfts,
}) => {
  const { monthContext } = useMonthContext();

  function formatCategory(category: string) {
    const words = category.split(" ");

    const formattedCategory = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-");

    return formattedCategory;
  }

  return (
    <CraftSectionWrapper>
      <TitleWrapper>
        <h3>Craft an Identity</h3>
        <Button
          className="craft-button"
          disabled={
            !(
              selectedCards.crafting != null &&
              selectedCards.dayMonth != null &&
              selectedCards.category != null &&
              selectedCards.year != null
            )
          }
          onClick={() => onCraft()}
        >
          Craft Identity
        </Button>
      </TitleWrapper>
      <CraftSectionContainer>
        <p>
          Select an identity and then add at least one trigger to craft a
          prediction.
        </p>
        <CraftCardGroup>
          <CraftCardWrapper key="crafting">
            <CraftCardComponent
              cardType="crafting"
              heading="Crafting"
              selectedCard={selectedCards.crafting}
              onCraftChanged={onCraftChanged}
            />
          </CraftCardWrapper>
          <CraftCardWrapper key="dayMonth">
            <CraftCardComponent
              cardType="dayMonth"
              heading="Day/Month"
              selectedCard={selectedCards.dayMonth}
              onCraftChanged={onCraftChanged}
            />
          </CraftCardWrapper>
          <CraftCardWrapper key="year">
            <CraftCardComponent
              cardType="year"
              heading="Year"
              selectedCard={selectedCards.year}
              onCraftChanged={onCraftChanged}
            />
          </CraftCardWrapper>
          <CraftCardWrapper key="category">
            <CraftCardComponent
              cardType="category"
              heading="Category"
              selectedCard={selectedCards.category}
              onCraftChanged={onCraftChanged}
            />
          </CraftCardWrapper>
        </CraftCardGroup>
        <IdentitySelectCardSection
          clickedCard={clickedCard}
          selectedCard={selectedCard}
          selectedCraft={selectedCraft}
          onCardClicked={onCardClicked}
          onSelectCardCrafting={onSelectCardCrafting}
          onSelectCardCategory={onSelectCardCategory}
          onSelectCardDayMonth={onSelectCardDayMonth}
          onSelectCardYear={onSelectCardYear}
          myNfts={myNfts}
          setMyNfts={setMyNfts}
        />
      </CraftSectionContainer>
    </CraftSectionWrapper>
  );
};

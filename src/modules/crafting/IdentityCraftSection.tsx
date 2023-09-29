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
import { identityCraft, predictionCraft } from "./data";
import {
  nft_card_category_data,
  nft_card_crafting_data,
  nft_card_day_month_data,
  nft_card_identity_data,
  nft_card_trigger_data,
  nft_card_year_data,
} from "../../data/nfts";

import { INftCardCrafting } from "../../models/nft_card_crafting";
import { INftCardCategory } from "../../models/nft_card_category";
import { INftCardDayMonth } from "../../models/nft_card_day_month";
import { INftCardYear } from "../../models/nft_card_year";
import { INftCardIdentity } from "../../models/nft_card_identity";
import { INftCardPrediction } from "../../models/nft_card_prediction";
import { INftCardTrigger } from "../../models/nft_card_trigger";
import { useMonthContext } from "../../context";
import { IdentitySelectCardSection } from "./IdentitySelectCardSection";

export const IdentityCraftSection: React.FC<{
  selectedCards: {
    crafting: INftCardCrafting | null;
    year: INftCardYear | null;
    dayMonth: INftCardDayMonth | null;
    category: INftCardCategory | null;
    // [key: string]: string | number | null | Array<string | number | null>;
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
            <h6>Crafting</h6>
            {selectedCards.crafting != null ? (
              <CraftCard
                onClick={() => onCraftChanged("crafting")}
                bg={"/assets/nfts/1.png"}
                className="crafting-card"
              >
                {selectedCards.crafting.rarity === 0 && <span>Common</span>}
                {selectedCards.crafting.rarity === 1 && <span>Uncommon</span>}
                {selectedCards.crafting.rarity === 2 && <span>Rare</span>}
                <p>Crafting</p>
              </CraftCard>
            ) : (
              // <EmptyCraftCard
              //   active={selectedCraft === "crafting" ? "true" : undefined}
              //   onClick={() => onCraftChanged("crafting")}
              // />
              <EmptyCraftCardWrapper onClick={() => onCraftChanged("crafting")}>
                <img src="/assets/empty-crafting.png" alt="" />
              </EmptyCraftCardWrapper>
            )}
          </CraftCardWrapper>
          <CraftCardWrapper key="dayMonth">
            <h6>Day/Month</h6>
            {selectedCards.dayMonth != null ? (
              <CraftCard
                onClick={() => onCraftChanged("dayMonth")}
                bg={"/assets/nfts/1.png"}
                className="crafting-card"
              >
                {selectedCards.dayMonth.rarity === 0 && <span>Common</span>}
                {selectedCards.dayMonth.rarity === 1 && <span>Uncommon</span>}
                {selectedCards.dayMonth.rarity === 2 && <span>Rare</span>}
                <p>
                  {selectedCards.dayMonth.day}{" "}
                  {(monthContext as Map<number, string>).get(
                    selectedCards.dayMonth.month
                  )}
                </p>
              </CraftCard>
            ) : (
              // <EmptyCraftCard
              //   active={selectedCraft === "dayMonth" ? "true" : undefined}
              //   onClick={() => onCraftChanged("dayMonth")}
              // />
              <EmptyCraftCardWrapper onClick={() => onCraftChanged("dayMonth")}>
                <img src="/assets/empty-crafting.png" alt="" />
              </EmptyCraftCardWrapper>
            )}
          </CraftCardWrapper>
          <CraftCardWrapper key="year">
            <h6>Year</h6>
            {selectedCards.year != null ? (
              <CraftCard
                onClick={() => onCraftChanged("year")}
                bg={"/assets/nfts/1.png"}
                className="crafting-card"
              >
                {selectedCards.year.rarity === 0 && <span>Common</span>}
                {selectedCards.year.rarity === 1 && <span>Uncommon</span>}
                {selectedCards.year.rarity === 2 && <span>Rare</span>}
                <p>{selectedCards.year.year}</p>
              </CraftCard>
            ) : (
              <EmptyCraftCardWrapper onClick={() => onCraftChanged("year")}>
                <img src="/assets/empty-crafting.png" alt="" />
              </EmptyCraftCardWrapper>
              // <EmptyCraftCard
              //   active={selectedCraft === "year" ? "true" : undefined}
              //   onClick={() => onCraftChanged("year")}
              // />
            )}
          </CraftCardWrapper>
          <CraftCardWrapper key="category">
            <h6>Category</h6>
            {selectedCards.category != null ? (
              <CraftCard
                onClick={() => onCraftChanged("category")}
                bg={"/assets/nfts/1.png"}
                className="crafting-card"
              >
                {selectedCards.category.rarity === 0 && <span>Common</span>}
                {selectedCards.category.rarity === 1 && <span>Uncommon</span>}
                {selectedCards.category.rarity === 2 && <span>Rare</span>}
                <p>{selectedCards.category.category}</p>
              </CraftCard>
            ) : (
              // <EmptyCraftCard
              //   active={selectedCraft === "category" ? "true" : undefined}
              //   onClick={() => onCraftChanged("category")}
              // />
              <EmptyCraftCardWrapper onClick={() => onCraftChanged("category")}>
                <img src="/assets/empty-crafting.png" alt="" />
              </EmptyCraftCardWrapper>
            )}
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

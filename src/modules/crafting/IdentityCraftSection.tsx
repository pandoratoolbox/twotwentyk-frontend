import React, { useEffect, useState } from "react";
import {
  EmptyCraftCard,
  CraftCardGroup,
  CraftCardWrapper,
  CraftSectionWrapper,
  TitleWrapper,
  CraftCard,
  AddTrigger,
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
}> = ({ onCraftChanged, selectedCraft, selectedCards, onCraft }) => {
  const [isAdd, setIsAdd] = useState(false);

  type CardProps = {
    id: number;
    rarity: number;
    image: string;
    name: string | number;
  }[];

  type NFTData = {
    crafting: CardProps;
    dayMonth: CardProps;
    year: CardProps;
    category: CardProps;
    identity: CardProps;
    trigger: CardProps;
  } & any;

  const [nftData, setNftData] = useState<NFTData>({
    crafting: [],
    dayMonth: [],
    year: [],
    category: [],
    identity: [],
    trigger: [],
  });

  useEffect(() => {
    let tempData: NFTData = {
      category: [],
      crafting: [],
      dayMonth: [],
      year: [],
      identity: [],
      trigger: [],
    };
    // if (selectedCraft === "crafting") {
    tempData.crafting = nft_card_crafting_data
      .filter((f) => !f.is_crafted)
      .map((item) => {
        return {
          id: item.id,
          rarity: item.rarity,
          image: item.image,
          name: "Crafting",
        };
      });
    // } else if (selectedCraft === "dayMonth") {
    tempData.dayMonth = nft_card_day_month_data
      .filter((f) => !f.is_crafted)
      .map((item) => {
        return {
          id: item.id,
          rarity: item.rarity,
          image: item.image,
          name: item.day + "/" + item.month,
        };
      });
    // } else if (selectedCraft === "year") {
    tempData.year = nft_card_year_data
      .filter((f) => !f.is_crafted)
      .map((item) => {
        return {
          id: item.id,
          rarity: item.rarity,
          image: item.image,
          name: item.year,
        };
      });
    // } else if (selectedCraft === "category") {
    tempData.category = nft_card_category_data
      .filter((f) => !f.is_crafted)
      .map((item) => {
        return {
          id: item.id,
          rarity: item.rarity,
          image: item.image,
          name: item.category,
        };
      });
    // } else if (selectedCraft === "identity") {
    tempData.identity = nft_card_identity_data
      .filter((f) => !f.is_crafted)
      .map((item) => {
        return {
          id: item.id,
          rarity: item.rarity,
          image: item.image,
          name: item.category,
        };
      });
    // } else if (selectedCraft === "trigger") {
    tempData.trigger = nft_card_trigger_data
      .filter((f) => !f.is_crafted)
      .map((item) => {
        return {
          id: item.id,
          rarity: item.rarity,
          image: item.image,
          name: item.trigger,
        };
      });
    // }
    setNftData(tempData);
    setIsAdd(false);
  }, [selectedCards]);

  const { monthContext } = useMonthContext();

  return (
    <CraftSectionWrapper>
      <TitleWrapper>
        <h3>
          Craft an Identity
        </h3>
          <Button
            className="craft-button"
            disabled={
              !(
                Number(selectedCards.crafting) != null &&
                Number(selectedCards.dayMonth) != null &&
                Number(selectedCards.category) != null &&
                Number(selectedCards.year) != null
              )
            }
            onClick={() => onCraft()}
          >
            Craft Identity
          </Button>
      </TitleWrapper>

      <p>
        Identities are cards crafted by combining a Day-Month card, a Year card and a Category card. Select one card of each type to craft an Identity.
      </p>
      <CraftCardGroup>
            <CraftCardWrapper key="crafting">
              <h6>Crafting</h6>
              {selectedCards.crafting != null ? (
                <CraftCard
                  bg={
                    "/assets/nfts/1.png"
                  }
                  className="crafting-card"
                >
                  {selectedCards.crafting.rarity === 0 && <span>Common</span>}
                  {selectedCards.crafting.rarity === 1 && <span>Uncommon</span>}
                  {selectedCards.crafting.rarity === 2 && <span>Rare</span>}
                  <p>
                  Crafting
                  </p>
                </CraftCard>
              ) : (
                <EmptyCraftCard
                  active={selectedCraft === "crafting" ? "true" : undefined}
                  onClick={() => onCraftChanged("crafting")}
                />
              )}
            </CraftCardWrapper>
            <CraftCardWrapper key="dayMonth">
              <h6>Day/Month</h6>
              {selectedCards.dayMonth != null ? (
                <CraftCard
                  bg={
                    "/assets/nfts/1.png"
                  }
                  className="crafting-card"
                >
                  {selectedCards.dayMonth.rarity === 0 && <span>Common</span>}
                  {selectedCards.dayMonth.rarity === 1 && <span>Uncommon</span>}
                  {selectedCards.dayMonth.rarity === 2 && <span>Rare</span>}
                  <p>
                  {selectedCards.dayMonth.day} {(monthContext as Map<number, string>).get(selectedCards.dayMonth.month)}
                  </p>
                </CraftCard>
              ) : (
                <EmptyCraftCard
                  active={selectedCraft === "dayMonth" ? "true" : undefined}
                  onClick={() => onCraftChanged("dayMonth")}
                />
              )}
            </CraftCardWrapper>
            <CraftCardWrapper key="year">
              <h6>Year</h6>
              {selectedCards.year != null ? (
                <CraftCard
                  bg={
                    "/assets/nfts/1.png"
                  }
                  className="crafting-card"
                >
                  {selectedCards.year.rarity === 0 && <span>Common</span>}
                  {selectedCards.year.rarity === 1 && <span>Uncommon</span>}
                  {selectedCards.year.rarity === 2 && <span>Rare</span>}
                  <p>
                  {selectedCards.year.year}
                  </p>
                </CraftCard>
              ) : (
                <EmptyCraftCard
                  active={selectedCraft === "year" ? "true" : undefined}
                  onClick={() => onCraftChanged("year")}
                />
              )}
            </CraftCardWrapper>
            <CraftCardWrapper key="category">
              <h6>Category</h6>
              {selectedCards.category != null ? (
                <CraftCard
                  bg={
                    "/assets/nfts/1.png"
                  }
                  className="crafting-card"
                >
                  {selectedCards.category.rarity === 0 && <span>Common</span>}
                  {selectedCards.category.rarity === 1 && <span>Uncommon</span>}
                  {selectedCards.category.rarity === 2 && <span>Rare</span>}
                  <p>
                  {selectedCards.category.category}
                  </p>
                </CraftCard>
              ) : (
                <EmptyCraftCard
                  active={selectedCraft === "category" ? "true" : undefined}
                  onClick={() => onCraftChanged("category")}
                />
              )}
            </CraftCardWrapper>
      </CraftCardGroup>
    </CraftSectionWrapper>
  );
};

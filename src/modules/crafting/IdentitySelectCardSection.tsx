import React, { useEffect, useState } from "react";
import {
  CardGridWrapper,
  CraftCard,
  CraftingCardWrapper,
  FilterWrapper,
  SelectBoxWrapper,
  SelectButton,
  SelectCardSectionContainer,
  SelectCardSectionWrapper,
} from "./styles";
import { Button, IconSort, SelectBox } from "../../components";
import { craftingCardData, raritiesOption, statusOption } from "./data";
import { SortButton } from "../app/dates/styles";
import {
  useMarketplaceListContext,
  useMyNFTsContext,
  useStatusContext,
  useAllRaritiesContext,
} from "../../context";
import { EmptyCards } from "../../pages/app/category/styles";
import { useNavigate } from "react-router-dom";
import {
  nft_card_category_data,
  nft_card_crafting_data,
  nft_card_day_month_data,
  nft_card_identity_data,
  nft_card_trigger_data,
  nft_card_year_data,
} from "../../data/nfts";

import { getMyNftCardCrafting } from "../../actions/nft_card_crafting";
import { getMyNftCardDayMonth } from "../../actions/nft_card_day_month";
import { getMyNftCardCategory } from "../../actions/nft_card_category";
import { getMyNftCardYear } from "../../actions/nft_card_year";
import { getMyNftCardIdentity } from "../../actions/nft_card_identity";
import { getMyNftCardTrigger } from "../../actions/nft_card_trigger";
import { INftCardCrafting } from "../../models/nft_card_crafting";
import { INftCardDayMonth } from "../../models/nft_card_day_month";
import { INftCardYear } from "../../models/nft_card_year";
import { INftCardCategory } from "../../models/nft_card_category";

export const IdentitySelectCardSection: React.FC<{
  page: "identity" | "prediction";
  selectedCraft: string;
  clickedCard: number | string | null;
  selectedCard: number | string | null;
  onCardClicked: (key: number | string) => void;
  onCardSelected: (key: number | string, craft: string) => void;
  onSelectCardCrafting: (card: INftCardCrafting) => void;
  onSelectCardCategory: (card: INftCardCategory) => void;
  onSelectCardDayMonth: (card: INftCardDayMonth) => void;
  onSelectCardYear: (card: INftCardYear) => void;
}> = ({
  page,
  selectedCraft,
  clickedCard,
  selectedCard,
  onCardClicked,
  onCardSelected,
  onSelectCardCategory,
  onSelectCardCrafting,
  onSelectCardDayMonth,
  onSelectCardYear
}) => {
  const { statusContext } = useStatusContext();
  const { allRaritiesContext } = useAllRaritiesContext();
  const { myNFTsContext, setMyNFTsContext } = useMyNFTsContext();

  const navigate = useNavigate();
  // const { marketplaceListContext } = useMarketplaceListContext();
  const [nftData, setNftData] = useState<
    {
      id: number;
      rarity: number;
      image: string;
      name: string | number;
    }[]
  >([]);

  const [nftCardCraftingData, setNftCardCraftingData] = useState<INftCardCrafting[] | null>(null)
  const [nftCardCategoryData, setNftCardCategoryData] = useState<INftCardCategory[] | null>(null)
  const [nftCardDayMonthData, setNftCardDayMonthData] = useState<INftCardDayMonth[] | null>(null)
  const [nftCardYearData, setNftCardYearData] = useState<INftCardYear[] | null>(null)

  const getNFTCrafting = async () => {
    const token = localStorage.auth;
    let tempData: {
      id: number;
      rarity: number;
      image: string;
      name: string | number;
      is_crafted: boolean;
      day: number;
      month: number;
      year: number;
    }[] = [];

    if (selectedCraft === "crafting") {
      const response = await getMyNftCardCrafting(token);
      if (response.data) {
        setNftCardCraftingData(response.data)
      }
    } else if (selectedCraft === "dayMonth") {
      const response = await getMyNftCardDayMonth(token);
      if (response.data) {
        setNftCardDayMonthData(response.data)
      }
    } else if (selectedCraft === "year") {
      const response = await getMyNftCardYear(token);
      if (response.data) {
        setNftCardYearData(response.data)
      }
    } else if (selectedCraft === "category") {
      const response = await getMyNftCardCategory(token);
      if (response.data) {
        setNftCardCategoryData(response.data)
      }
    }
  };

  useEffect(() => {
    getNFTCrafting();
  }, [selectedCraft]);

  useEffect(() => {
    if (Array.isArray(myNFTsContext)) {
      setNftData(myNFTsContext);
    }
  }, [myNFTsContext]);

  return (
    <SelectCardSectionWrapper>
      <SelectCardSectionContainer>
        {nftCardCraftingData != null && selectedCraft === "crafting" ? (
          <>
            <h2>
              Select a <span>{selectedCraft}</span> Card
            </h2>
            <FilterWrapper>
              <SelectBoxWrapper>
                <SelectBox
                  isFilter
                  newData={allRaritiesContext}
                  placeholder="All Rarities"
                />
              </SelectBoxWrapper>
              <SelectBoxWrapper>
                <SelectBox
                  isFilter
                  newData={statusContext}
                  placeholder="Status"
                />
              </SelectBoxWrapper>
              <SortButton>
                <IconSort />
              </SortButton>
            </FilterWrapper>
            <CardGridWrapper>
              {nftCardCraftingData.map((item, key) => (
                <CraftingCardWrapper
                  key={key}
                  active={clickedCard === item.id ? "true" : undefined}
                >
                  <CraftCard
                    onClick={() => onCardClicked(Number(item.id))}
                    bg="/assets/nfts/1.png"
                  >
                    {item.rarity === 0 && <span>Common</span>}
                    {item.rarity === 1 && <span>Uncommon</span>}
                    {item.rarity === 2 && <span>Rare</span>}
                    <p>{item.name}</p>
                  </CraftCard>
                   <SelectButton
                    className="select-button"
                    disabled={
                      clickedCard !== item.id || selectedCard === item.id
                      // ? "true"
                      // : undefined
                    }
                    onClick={
                      clickedCard !== item.id || selectedCard === item.id
                        ? () => {}
                        : () => onSelectCardCrafting(item)
                    }
                  >
                    Select
                  </SelectButton>
                </CraftingCardWrapper>
              ))}
            </CardGridWrapper>
          </>
        ) : (
          <EmptyCards>
            <h3>
              No <span className="capitalize">{selectedCraft}</span> Cards
            </h3>
            <p style={{ maxWidth: "243px" }}>
              It looks like you don’t have any{" "}
              <span className="capitalize">{selectedCraft}</span> cards yet.
            </p>
            <Button className="buy-button" onClick={() => navigate("/buy")}>
              Buy Packs
            </Button>
            <Button
              className="buy-button"
              onClick={() => navigate("/marketplace")}
            >
              Go to Marketplace
            </Button>
          </EmptyCards>
        )}
      </SelectCardSectionContainer>
    </SelectCardSectionWrapper>
  );
};

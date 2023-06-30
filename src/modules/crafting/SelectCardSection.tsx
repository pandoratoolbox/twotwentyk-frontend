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
// import { useMarketplaceListContext, useMyNFTsContext } from "../../context";
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

export const SelectCardSection: React.FC<{
  page: "identity" | "prediction";
  selectedCraft: string;
  clickedCard: number | string | null;
  selectedCard: number | string | null;
  onCardClicked: (key: number | string) => void;
  onCardSelected: (key: number | string, craft: string) => void;
}> = ({
  page,
  selectedCraft,
  clickedCard,
  selectedCard,
  onCardClicked,
  onCardSelected,
}) => {
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
      tempData =
        response?.data
          ?.filter((f) => !f.is_crafted)
          ?.map((item) => {
            return {
              id: item.id || 0,
              rarity: item.rarity || 0,
              image: item.image || "",
              name: item.name || "",
              is_crafted: Boolean(item.is_crafted),
              day: 0,
              month: 0,
              year: 0,
            };
          }) ?? [];
    } else if (selectedCraft === "dayMonth") {
      const response = await getMyNftCardDayMonth(token);
      tempData =
        response?.data
          ?.filter((f) => !f.is_crafted)
          ?.map((item) => {
            return {
              id: item.id || 0,
              rarity: item.rarity || 0,
              image: item.image || "",
              is_crafted: Boolean(item.is_crafted),
              name: item.day + "/" + item.month || 0,
              day: item.day || 0,
              month: item.month || 0,
              year: 0,
            };
          }) ?? [];
    } else if (selectedCraft === "year") {
      const response = await getMyNftCardYear(token);
      tempData =
        response?.data
          ?.filter((f) => !f.is_crafted)
          ?.map((item) => {
            return {
              id: item.id || 0,
              rarity: item.rarity || 0,
              image: item.image || "",
              is_crafted: Boolean(item.is_crafted),
              name: item.year || "",
              year: item.year || 0,
              day: 0,
              month: 0,
            };
          }) ?? [];
    } else if (selectedCraft === "category") {
      const response = await getMyNftCardCategory(token);
      tempData =
        response?.data
          ?.filter((f) => !f.is_crafted)
          ?.map((item) => {
            return {
              id: item.id || 0,
              rarity: item.rarity || 0,
              image: item.image || "",
              is_crafted: Boolean(item.is_crafted),
              name: item.category || "",
              year: 0,
              day: 0,
              month: 0,
            };
          }) ?? [];
    } else if (selectedCraft === "identity") {
      const response = await getMyNftCardIdentity(token);
      tempData =
        response?.data
          ?.filter((f) => !f.is_crafted)
          ?.map((item) => {
            return {
              id: item.id || 0,
              rarity: item.rarity || 0,
              image: item.image || "",
              is_crafted: Boolean(item.is_crafted),
              name: item.category || "",
              year: 0,
              day: 0,
              month: 0,
            };
          }) ?? [];
    } else if (selectedCraft === "trigger") {
      const response = await getMyNftCardTrigger(token);
      tempData =
        response?.data
          ?.filter((f) => !f.is_crafted)
          ?.map((item) => {
            return {
              id: item.id || 0,
              rarity: item.rarity || 0,
              image: item.image || "",
              is_crafted: Boolean(item.is_crafted),
              name: "",
              year: 0,
              day: 0,
              month: 0,
            };
          }) ?? [];
    }
    setNftData(tempData);
  };

  useEffect(() => {
    getNFTCrafting();
  }, [selectedCraft]);

  return (
    <SelectCardSectionWrapper>
      <SelectCardSectionContainer>
        {nftData?.length > 0 ? (
          <>
            <h2>
              Select a <span>{selectedCraft}</span> Card
            </h2>
            <FilterWrapper>
              <SelectBoxWrapper>
                <SelectBox
                  isFilter
                  options={raritiesOption}
                  placeholder="All Rarities"
                />
              </SelectBoxWrapper>
              <SelectBoxWrapper>
                <SelectBox
                  isFilter
                  options={statusOption}
                  placeholder="Status"
                />
              </SelectBoxWrapper>
              <SortButton>
                <IconSort />
              </SortButton>
            </FilterWrapper>
            <CardGridWrapper>
              {nftData.map((item, key) => (
                <CraftingCardWrapper
                  key={key}
                  active={clickedCard === item.id ? "true" : undefined}
                >
                  <CraftCard
                    onClick={() => onCardClicked(item.id)}
                    bg={item.image}
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
                        : () => onCardSelected(item.id, selectedCraft)
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

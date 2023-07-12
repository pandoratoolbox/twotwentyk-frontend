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
import { Button, IconSort, SelectBox, Loader } from "../../components";
import { SortButton } from "../app/dates/styles";
import { useStatusContext, useAllRaritiesContext } from "../../context";
import { EmptyCards } from "../../pages/app/category/styles";
import { useNavigate } from "react-router-dom";

import { getMyNftCardCrafting } from "../../actions/nft_card_crafting";
import { getMyNftCardDayMonth } from "../../actions/nft_card_day_month";
import { getMyNftCardCategory } from "../../actions/nft_card_category";
import { getMyNftCardYear } from "../../actions/nft_card_year";
import { INftCardCrafting } from "../../models/nft_card_crafting";
import { INftCardDayMonth } from "../../models/nft_card_day_month";
import { INftCardYear } from "../../models/nft_card_year";
import { INftCardCategory } from "../../models/nft_card_category";
import { useMonthContext } from "../../context";

export const IdentitySelectCardSection: React.FC<{
  selectedCraft: string;
  clickedCard: number | string | null;
  selectedCard: number | string | null;
  onCardClicked: (key: number | string) => void;
  onSelectCardCrafting: (card: INftCardCrafting) => void;
  onSelectCardCategory: (card: INftCardCategory) => void;
  onSelectCardDayMonth: (card: INftCardDayMonth) => void;
  onSelectCardYear: (card: INftCardYear) => void;
}> = ({
  selectedCraft,
  clickedCard,
  selectedCard,
  onCardClicked,

  onSelectCardCategory,
  onSelectCardCrafting,
  onSelectCardDayMonth,
  onSelectCardYear,
}) => {
  const { statusContext } = useStatusContext();
  const { allRaritiesContext } = useAllRaritiesContext();
  const [isLoadingCrating, setIsLoadingCrating] = useState(true);
  const [isLoadingDayMonth, setIsLoadingDayMonth] = useState(true);
  const [isLoadingYear, setIsLoadingYear] = useState(true);
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);

  const { monthContext } = useMonthContext();

  const navigate = useNavigate();

  const [nftCardCraftingData, setNftCardCraftingData] = useState<
    INftCardCrafting[] | null
  >(null);
  const [nftCardCategoryData, setNftCardCategoryData] = useState<
    INftCardCategory[] | null
  >(null);
  const [nftCardDayMonthData, setNftCardDayMonthData] = useState<
    INftCardDayMonth[] | null
  >(null);
  const [nftCardYearData, setNftCardYearData] = useState<INftCardYear[] | null>(
    null
  );

  const getNFTCrafting = async () => {
    setIsLoadingCrating(true);
    setIsLoadingDayMonth(true);
    setIsLoadingYear(true);
    setIsLoadingCategory(true);

    if (selectedCraft === "crafting") {
      const response = await getMyNftCardCrafting(null);
      if (response.data) {
        setNftCardCraftingData(response.data);
      }
      setIsLoadingCrating(false);
    } else if (selectedCraft === "dayMonth") {
      const response = await getMyNftCardDayMonth(null);
      if (response.data) {
        setNftCardDayMonthData(response.data);
      }
      setIsLoadingDayMonth(false);
    } else if (selectedCraft === "year") {
      const response = await getMyNftCardYear(null);
      if (response.data) {
        setNftCardYearData(response.data);
      }
      setIsLoadingYear(false);
    } else if (selectedCraft === "category") {
      const response = await getMyNftCardCategory(null);
      if (response.data) {
        setNftCardCategoryData(response.data);
      }
      setIsLoadingCategory(false);
    }
  };

  useEffect(() => {
    getNFTCrafting();
  }, [selectedCraft]);

  return (
    <SelectCardSectionWrapper>
      {selectedCraft === "crafting" && (
        <SelectCardSectionContainer>
          {nftCardCraftingData != null ? (
            <>
              <h2>Select a Crafting card</h2>
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
                      <p>Crafting</p>
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
          ) : !isLoadingCrating ? (
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
          ) : (
            <Loader />
          )}
        </SelectCardSectionContainer>
      )}

      {selectedCraft === "dayMonth" && (
        <SelectCardSectionContainer>
          {nftCardDayMonthData != null ? (
            <>
              <h2>Select a Day-Month card</h2>
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
                {nftCardDayMonthData.map((item, key) => (
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
                      <p>
                        {item.day}{" "}
                        {(monthContext as Map<number, string>).get(item.month)}
                      </p>
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
                          : () => onSelectCardDayMonth(item)
                      }
                    >
                      Select
                    </SelectButton>
                  </CraftingCardWrapper>
                ))}
              </CardGridWrapper>
            </>
          ) : !isLoadingDayMonth ? (
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
          ) : (
            <Loader />
          )}
        </SelectCardSectionContainer>
      )}
      {selectedCraft === "year" && (
        <SelectCardSectionContainer>
          {nftCardYearData != null ? (
            <>
              <h2>Select a Year card</h2>
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
                {nftCardYearData.map((item, key) => (
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
                      <p>{item.year}</p>
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
                          : () => onSelectCardYear(item)
                      }
                    >
                      Select
                    </SelectButton>
                  </CraftingCardWrapper>
                ))}
              </CardGridWrapper>
            </>
          ) : !isLoadingYear ? (
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
          ) : (
            <Loader />
          )}
        </SelectCardSectionContainer>
      )}
      {selectedCraft === "category" && (
        <SelectCardSectionContainer>
          {nftCardCategoryData != null ? (
            <>
              <h2>Select a Category card</h2>
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
                {nftCardCategoryData.map((item, key) => (
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
                      <p>{item.category}</p>
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
                          : () => onSelectCardCategory(item)
                      }
                    >
                      Select
                    </SelectButton>
                  </CraftingCardWrapper>
                ))}
              </CardGridWrapper>
            </>
          ) : !isLoadingCategory ? (
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
          ) : (
            <Loader />
          )}
        </SelectCardSectionContainer>
      )}
    </SelectCardSectionWrapper>
  );
};

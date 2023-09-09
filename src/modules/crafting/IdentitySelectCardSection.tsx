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
import { SelectOptionProps } from "../../types";

export const IdentitySelectCardSection: React.FC<{
  selectedCraft: string;
  clickedCard: number | string | null;
  selectedCard: number | string | null;
  onCardClicked: (key: number | string) => void;
  onSelectCardCrafting: (card: INftCardCrafting) => void;
  onSelectCardCategory: (card: INftCardCategory) => void;
  onSelectCardDayMonth: (card: INftCardDayMonth) => void;
  onSelectCardYear: (card: INftCardYear) => void;
  myNfts: {
    dayMonth: INftCardDayMonth[] | null;
    category: INftCardCategory[] | null;
    year: INftCardYear[] | null;
    crafting: INftCardCrafting[] | null;
  };
  setMyNfts: React.Dispatch<
    React.SetStateAction<{
      crafting: INftCardCrafting[] | null;
      category: INftCardCategory[] | null;
      dayMonth: INftCardDayMonth[] | null;
      year: INftCardYear[] | null;
    }>
  >;
}> = ({
  selectedCraft,
  clickedCard,
  selectedCard,
  onCardClicked,
  myNfts,
  setMyNfts,
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

  const setNftCardCraftingData = (data: INftCardCrafting[]) => {
    setMyNfts({
      dayMonth: myNfts.dayMonth,
      year: myNfts.year,
      category: myNfts.category,
      crafting: myNfts.crafting,
    });
  };

  const setNftCardCategoryData = (data: INftCardCategory[]) => {
    setMyNfts({
      dayMonth: myNfts.dayMonth,
      year: myNfts.year,
      category: data,
      crafting: myNfts.crafting,
    });
  };

  const setNftCardDayMonthData = (data: INftCardDayMonth[]) => {
    setMyNfts({
      dayMonth: data,
      year: myNfts.year,
      category: myNfts.category,
      crafting: myNfts.crafting,
    });
  };

  const setNftCardYearData = (data: INftCardYear[]) => {
    setMyNfts({
      dayMonth: myNfts.dayMonth,
      category: myNfts.category,
      year: data,
      crafting: myNfts.crafting,
    });
  };

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

  const [optionsStatus, setOptionsStatus] = useState<SelectOptionProps[]>([]);
  const [optionsRarities, setOptionsRarities] = useState<SelectOptionProps[]>([]);
  const [optionsCollection, setOptionsCollection] = useState<SelectOptionProps[]>([]);
  const [optionsTriggers, setOptionsTriggers] = useState<SelectOptionProps[]>([]);
  const [optionsTiers, setOptionsTiers] = useState<SelectOptionProps[]>([]);
  const [optionsCategories, setOptionsCategories] = useState<SelectOptionProps[]>([]);

  useEffect(() => {
    if (statusContext && allRaritiesContext) {
      setOptionsStatus(Array.from((statusContext as Map<number, {id: number, name: string}>).values()).map(v => {
        return {checked: false, value: v.id.toString(), label: v.name}
      }))

      setOptionsRarities(Array.from((allRaritiesContext as Map<number, {id: number, name: string}>).values()).map(v => {
        return {checked: false, value: v.id.toString(), label: v.name}
      }))

    }
  }, [statusContext, allRaritiesContext])


  return (
    <SelectCardSectionWrapper>
      {selectedCraft === "crafting" && (
        <SelectCardSectionContainer>
          {myNfts.crafting != null ? (
            <>
              <h2>Select a Crafting card</h2>
              <FilterWrapper>
                <SelectBoxWrapper>
                  <SelectBox
                    isFilter
                    options={optionsRarities}
                    placeholder="All Rarities"
                  />
                </SelectBoxWrapper>
                <SelectBoxWrapper>
                  <SelectBox
                    isFilter
                    options={optionsStatus}
                    placeholder="Status"
                  />
                </SelectBoxWrapper>
                <SortButton>
                  <IconSort />
                </SortButton>
              </FilterWrapper>
              <CardGridWrapper>
                {myNfts.crafting.map((item, key) => (
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
              <h3>No {selectedCraft} Cards</h3>
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
          {myNfts.dayMonth != null ? (
            <>
              <h2>Select a Day-Month card</h2>
              <FilterWrapper>
                <SelectBoxWrapper>
                  <SelectBox
                    isFilter
                    options={optionsRarities}
                    placeholder="All Rarities"
                  />
                </SelectBoxWrapper>
                <SelectBoxWrapper>
                  <SelectBox
                    isFilter
                    options={optionsStatus}
                    placeholder="Status"
                  />
                </SelectBoxWrapper>
                <SortButton>
                  <IconSort />
                </SortButton>
              </FilterWrapper>
              <CardGridWrapper>
                {myNfts.dayMonth.map((item, key) => (
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
              <h3>No {selectedCraft} Cards</h3>
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
          {myNfts.year != null ? (
            <>
              <h2>Select a Year card</h2>
              <FilterWrapper>
                <SelectBoxWrapper>
                  <SelectBox
                    isFilter
                    options={optionsRarities}
                    placeholder="All Rarities"
                  />
                </SelectBoxWrapper>
                <SelectBoxWrapper>
                  <SelectBox
                    isFilter
                    options={optionsStatus}
                    placeholder="Status"
                  />
                </SelectBoxWrapper>
                <SortButton>
                  <IconSort />
                </SortButton>
              </FilterWrapper>
              <CardGridWrapper>
                {myNfts.year.map((item, key) => (
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
              <h3>No {selectedCraft} Cards</h3>
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
          {myNfts.category != null ? (
            <>
              <h2>Select a Category card</h2>
              <FilterWrapper>
                <SelectBoxWrapper>
                  <SelectBox
                    isFilter
                    options={optionsRarities}
                    placeholder="All Rarities"
                  />
                </SelectBoxWrapper>
                <SelectBoxWrapper>
                  <SelectBox
                    isFilter
                    options={optionsStatus}
                    placeholder="Status"
                  />
                </SelectBoxWrapper>
                <SortButton>
                  <IconSort />
                </SortButton>
              </FilterWrapper>
              <CardGridWrapper>
                {myNfts.category.map((item, key) => (
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
              <h3>No {selectedCraft} Cards</h3>
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

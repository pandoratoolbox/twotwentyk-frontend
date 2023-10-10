import React, { useEffect, useState, useMemo } from "react";
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
import { Button, IconSort, SelectBox, Loader, getImagePath } from "../../components";
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
import { useMonthContext, useCardCollectionContext } from "../../context";
import { SelectOptionProps } from "../../types";
import { NftCardCategoryFilters, NftCardCraftingFilters, NftCardDayMonthFilters, NftCardYearFilters } from "../../models/filters";
import { randomInt } from "crypto";
import { DateCardWrapper } from "../../components/DateCard/styles";
import { CardImgWrapper } from "../../components/MarketCard/styles";
import { CardBottomWrapper } from "../../components/PredictionCard/styles";
import {
  CardButton,
  CardButtonGroup,
  CardOverlayWrapper,
  CardTooltip,
  TooltipContent,
  TooltipItem,
} from "../../components/CraftingCard/styles";

function formatCategory(category: string) {
  const words = category.split(' ');

  const formattedCategory = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-');

  return formattedCategory;
}

const captilizeEachLetterOfWord = (data: string) => {
  let words = data.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1) + " "
  }
  return words
}

export const IdentitySelectCardSection: React.FC<{
  selectedCraft: string;
  clickedCard: number | string | null;
  selectedCard: number | string | null;
  onCardClicked: (key: number | string, item: INftCardCrafting | INftCardCategory | INftCardDayMonth | INftCardYear) => void;
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
    const { cardCollectionContext } = useCardCollectionContext();
    const [isLoadingCrating, setIsLoadingCrating] = useState(true);
    const [isLoadingDayMonth, setIsLoadingDayMonth] = useState(true);
    const [isLoadingYear, setIsLoadingYear] = useState(true);
    const [isLoadingCategory, setIsLoadingCategory] = useState(true);
    const [rarities, setRarity] = useState<number[]>([])
    const [status, setStatus] = useState<number[]>([])
    const [collection, setCollection] = useState<number>()

    const { monthContext } = useMonthContext();

    const navigate = useNavigate();

    const setNftCardCraftingData = (data: INftCardCrafting[]) => {
      setMyNfts({
        dayMonth: myNfts.dayMonth,
        year: myNfts.year,
        category: myNfts.category,
        crafting: data,
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

    const filter = useMemo(() => {
      return {
        rarities,
        card_collection_id: collection
      }
    }, [rarities, collection])

    const getNFTCrafting = async (filter: any) => {
      setIsLoadingCrating(true);
      setIsLoadingDayMonth(true);
      setIsLoadingYear(true);
      setIsLoadingCategory(true);

      if (selectedCraft === "crafting") {
        const response = await getMyNftCardCrafting(filter as NftCardCraftingFilters);
        if (response.data) {
          setNftCardCraftingData(response.data);
        }
        setIsLoadingCrating(false);
      } else if (selectedCraft === "dayMonth") {
        const response = await getMyNftCardDayMonth(filter as NftCardDayMonthFilters);
        if (response.data) {
          setNftCardDayMonthData(response.data);
        }
        setIsLoadingDayMonth(false);
      } else if (selectedCraft === "year") {
        const response = await getMyNftCardYear(filter as NftCardYearFilters);
        if (response.data) {
          setNftCardYearData(response.data);
        }
        setIsLoadingYear(false);
      } else if (selectedCraft === "category") {
        const response = await getMyNftCardCategory(filter as NftCardCategoryFilters);
        if (response.data) {
          setNftCardCategoryData(response.data);
        }
        setIsLoadingCategory(false);
      }
    };

    useEffect(() => {
      setRarity([])
      setCollection(undefined)
    }, [selectedCraft])

    useEffect(() => {
      getNFTCrafting(filter);
    }, [filter]);

    const [optionsStatus, setOptionsStatus] = useState<SelectOptionProps[]>([]);
    const [optionsRarities, setOptionsRarities] = useState<SelectOptionProps[]>([]);
    const [optionsCollection, setOptionsCollection] = useState<SelectOptionProps[]>([]);
    const [optionsTriggers, setOptionsTriggers] = useState<SelectOptionProps[]>([]);
    const [optionsTiers, setOptionsTiers] = useState<SelectOptionProps[]>([]);
    const [optionsCategories, setOptionsCategories] = useState<SelectOptionProps[]>([]);

    useEffect(() => {
      if (statusContext && cardCollectionContext) {
        // setOptionsStatus(Array.from((statusContext as Map<number, { id: number, name: string }>).values()).map(v => {
        //   return { checked: false, value: v.id.toString(), label: v.name }
        // }))
        setOptionsCollection(cardCollectionContext.map((v) => {
          return {
            value: v.id?.toString(),
            label: v.name
          } as SelectOptionProps
        }))

        setOptionsRarities(Array.from((allRaritiesContext as Map<number, { id: number, name: string }>).values()).map(v => {
          return { checked: false, value: v.id.toString(), label: v.name }
        }))

      }
    }, [cardCollectionContext, allRaritiesContext])

    const handleClick = (filterType: string, selectedOptions: string[]) => {
      if (filterType === "All Rarities") setRarity(selectedOptions.map(v => Number(v)));
      if (filterType === "Status") setStatus(selectedOptions.map(v => Number(v)))
      if (filterType === "Collections") setCollection(selectedOptions.length && Number(selectedOptions[0]))
    }


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
                      onClick={handleClick}
                    />
                  </SelectBoxWrapper>
                  <SelectBoxWrapper>
                    <SelectBox
                      options={optionsCollection}
                      placeholder="Collections"
                      onClick={handleClick}
                    />
                  </SelectBoxWrapper>
                  <SortButton>
                    <IconSort />
                  </SortButton>
                </FilterWrapper>
                <CardGridWrapper>
                  {myNfts.crafting.map((item) => (
                    <DateCardWrapper key={`crafting-${item.id}`}>
                      <CardImgWrapper>
                        {item.rarity === 0 && (
                          <img
                            src="/assets/nfts/rarity/Crafting-Core-copy.png"
                            alt="nft"
                          />
                        )}
                        {item.rarity === 1 && (
                          <img
                            src="/assets/nfts/rarity/Crafting-Rare-copy.png"
                            alt="nft"
                          />
                        )}
                        {item.rarity === 2 && (
                          <img
                            src="/assets/nfts/rarity/Crafting-Uncommon-copy.png"
                            alt="nft"
                          />
                        )}
                      </CardImgWrapper>
                      <CardBottomWrapper>Crafting</CardBottomWrapper>

                      <CardOverlayWrapper className="overlay" onClick={() => onCardClicked(Number(item.id), item)}>
                        <CardButtonGroup>
                          <CardButton
                            // disabled={
                            //   clickedCard !== item.id || selectedCard === item.id
                            // ? "true"
                            // : undefined
                            // }
                            onClick={() => onSelectCardCrafting(item)
                            }
                          >
                            Select
                          </CardButton>
                        </CardButtonGroup>
                      </CardOverlayWrapper>

                      <CardOverlayWrapper />
                    </DateCardWrapper>
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
                      onClick={handleClick}
                    />
                  </SelectBoxWrapper>
                  <SelectBoxWrapper>
                    <SelectBox
                      options={optionsCollection}
                      placeholder="Collections"
                      onClick={handleClick}
                    />
                  </SelectBoxWrapper>
                  <SortButton>
                    <IconSort />
                  </SortButton>
                </FilterWrapper>
                <CardGridWrapper>
                  {myNfts.dayMonth.map((item) => {
                    const imagePath = getImagePath(false, item?.rarity ?? 0, "Month-Day", false);

                    return (<DateCardWrapper key={`dayMonth-${item.id}`}>
                      <CardImgWrapper>
                        <img src={imagePath} alt="nft" />
                        <div className="info-nft info-nft-day-month">
                          {item.day && monthContext && (
                            <h3>
                              {item.day} {(monthContext as Map<number, string>).get(item.month)}
                            </h3>
                          )}
                        </div>
                      </CardImgWrapper>

                      {(
                        item.day &&
                        monthContext && (
                          <CardBottomWrapper>
                            {item.day} {(monthContext as Map<number, string>).get(item.month)}
                          </CardBottomWrapper>
                        )
                      )}

                      <CardOverlayWrapper className="overlay" onClick={() => onCardClicked(Number(item.id), item)}>
                        <CardButtonGroup>
                          <CardButton
                            // disabled={
                            //   clickedCard !== item.id || selectedCard === item.id
                            // ? "true"
                            // : undefined
                            // }
                            onClick={() => onSelectCardDayMonth(item)
                            }
                          >
                            Select
                          </CardButton>
                        </CardButtonGroup>
                      </CardOverlayWrapper>
                    </DateCardWrapper>
                    )
                  })}
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
                      onClick={handleClick}
                    />
                  </SelectBoxWrapper>
                  <SelectBoxWrapper>
                    <SelectBox
                      options={optionsCollection}
                      placeholder="Collections"
                      onClick={handleClick}
                    />
                  </SelectBoxWrapper>
                  <SortButton>
                    <IconSort />
                  </SortButton>
                </FilterWrapper>
                <CardGridWrapper>
                  {myNfts.year.map((item) => {
                    const imagePath = getImagePath(item.year, item?.rarity ?? 0, "Month-Day", true);

                    return (
                      <DateCardWrapper key={`year-${item.id}`}>
                        <CardImgWrapper>
                          <img src={imagePath} alt="nft" />
                          <div className="info-nft info-nft-day-month">
                            {item?.year && <h3>{item?.year}</h3>}
                          </div>
                        </CardImgWrapper>

                        {item?.year && <CardBottomWrapper>{item?.year}</CardBottomWrapper>}
                        <CardOverlayWrapper className="overlay" onClick={() => onCardClicked(Number(item.id), item)}>
                          <CardButtonGroup>


                            <CardButton onClick={() => onSelectCardYear(item)}>Select</CardButton>

                          </CardButtonGroup>
                        </CardOverlayWrapper>
                      </DateCardWrapper>
                    )
                  })}
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
                      onClick={handleClick}
                    />
                  </SelectBoxWrapper>
                  <SelectBoxWrapper>
                    <SelectBox
                      options={optionsCollection}
                      placeholder="Collections"
                      onClick={handleClick}
                    />
                  </SelectBoxWrapper>
                  <SortButton>
                    <IconSort />
                  </SortButton>
                </FilterWrapper>
                <CardGridWrapper>
                  {myNfts.category.map((item, key) => {

                    return (
                      <DateCardWrapper key={`category-${item.id}`}>
                        <CardImgWrapper>
                          {item.rarity === 0 && (
                            <img src={`/assets/nfts/rarity/${formatCategory(item?.category ?? "")}-Core.png`} alt="nft" />
                          )}
                          {item.rarity === 1 && (
                            <img src={`/assets/nfts/rarity/${formatCategory(item?.category ?? "")}-Rare.png`} alt="nft" />
                          )}
                          {item.rarity === 2 && (
                            <img src={`/assets/nfts/rarity/${formatCategory(item?.category ?? "")}-Uncommon.png`} alt="nft" />
                          )}
                        </CardImgWrapper>
                        <CardBottomWrapper>{item.category}</CardBottomWrapper>
                        <CardOverlayWrapper className="overlay" onClick={() => onCardClicked(Number(item.id), item)}>
                          <CardButtonGroup>
                            <CardButton onClick={() => onSelectCardCategory(item)}>Select</CardButton>
                          </CardButtonGroup>
                        </CardOverlayWrapper>
                      </DateCardWrapper>
                    )
                  })}
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

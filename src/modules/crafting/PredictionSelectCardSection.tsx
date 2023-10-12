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
import {
  Button,
  IconSort,
  SelectBox,
  Loader,
  IdentityCard,
} from "../../components";
import { SortButton } from "../app/dates/styles";
import {
  useStatusContext,
  useAllRaritiesContext,
  useCelebritiesContext,
  useCardCollectionContext,
} from "../../context";
import { EmptyCards } from "../../pages/app/category/styles";
import { useNavigate } from "react-router-dom";

import { getMyNftCardCrafting } from "../../actions/nft_card_crafting";
import { getMyNftCardIdentity } from "../../actions/nft_card_identity";
import { getMyNftCardTrigger } from "../../actions/nft_card_trigger";
import { INftCardIdentity } from "../../models/nft_card_identity";
import { INftCardTrigger } from "../../models/nft_card_trigger";
import { INftCardCrafting } from "../../models/nft_card_crafting";
import { SelectOption } from "../../components/SelectBox/SelectOption";
import { SelectOptionProps } from "../../types";
import { updateMyNftCardIdentity } from "../../actions/nft_card_identity";
import { ICelebrity } from "../../models/celebrity";
import {
  NftCardCraftingFilters,
  NftCardIdentityFilters,
  NftCardTriggerFilters,
} from "../../models/filters";
import { DateCardWrapper } from "../../components/DateCard/styles";
import { CardImgWrapper } from "../../components/MarketCard/styles";
import {
  CardBottomWrapper,
  PredictionCardWrapper,
} from "../../components/IdentityCard/styles";
import {
  CardButton,
  CardButtonGroup,
  CardOverlayWrapper,
  CardTooltip,
  TooltipContent,
  TooltipItem,
} from "../../components/CraftingCard/styles";
import { checkRarity } from "../../utils/helperFunctions";

export const PredictionSelectCardSection: React.FC<{
  selectedCraft: string;
  clickedCard: number | string | null;
  selectedCard: number | string | null;
  onCardClicked: (
    key: number | string,
    item: INftCardCrafting | INftCardIdentity | INftCardTrigger
  ) => void;
  onSelectCardCrafting: (card: INftCardCrafting) => void;
  onSelectCardTrigger: (card: INftCardTrigger) => void;
  onSelectCardIdentity: (card: INftCardIdentity) => void;
}> = ({
  selectedCraft,
  clickedCard,
  selectedCard,
  onCardClicked,
  onSelectCardCrafting,
  onSelectCardIdentity,
  onSelectCardTrigger,
}) => {
  const { statusContext } = useStatusContext();
  const { allRaritiesContext } = useAllRaritiesContext();
  const { celebritiesContext } = useCelebritiesContext();
  const { cardCollectionContext } = useCardCollectionContext();

  const [isLoadingCrafting, setIsLoadingCrafting] = useState(true);
  const [isLoadingIdentity, setIsLoadingIdentity] = useState(true);
  const [isLoadingTrigger, setIsLoadingTrigger] = useState(true);

  const navigate = useNavigate();

  const [nftCardCraftingData, setNftCardCraftingData] = useState<
    INftCardCrafting[] | null
  >(null);
  const [nftCardIdentityData, setNftCardIdentityData] = useState<
    INftCardIdentity[] | null
  >(null);
  const [nftCardTriggerData, setNftCardTriggerData] = useState<
    INftCardTrigger[] | null
  >(null);
  const [rarities, setRarity] = useState<number[]>([]);
  const [status, setStatus] = useState<number[]>([]);
  const [collection, setCollection] = useState<number>();

  const filter = useMemo(() => {
    return {
      rarities,
      card_collection_id: collection,
    };
  }, [rarities, collection]);

  const getNFTCrafting = async () => {
    setIsLoadingCrafting(true);
    setIsLoadingIdentity(true);
    setIsLoadingTrigger(true);

    if (selectedCraft === "crafting") {
      const response = await getMyNftCardCrafting(
        filter as NftCardCraftingFilters
      );
      if (response.data) {
        setNftCardCraftingData(response.data);
      }
      setIsLoadingCrafting(false);
    } else if (selectedCraft === "trigger") {
      const response = await getMyNftCardTrigger(
        filter as NftCardTriggerFilters
      );
      if (response.data) {
        setNftCardTriggerData(response.data);
      }
      setIsLoadingIdentity(false);
    } else if (selectedCraft === "identity") {
      const response = await getMyNftCardIdentity(
        filter as NftCardIdentityFilters
      );
      if (response.data) {
        setNftCardIdentityData(response.data);
      }
      setIsLoadingTrigger(false);
    }
  };

  useEffect(() => {
    setRarity([]);
    setCollection(undefined);
  }, [selectedCraft]);

  useEffect(() => {
    getNFTCrafting();
  }, [filter]);

  const chooseCelebrity = async (v: SelectOptionProps) => {
    let c = (celebritiesContext as Map<number, ICelebrity>).get(
      Number(v.value)
    );

    if (c) {
      let res = await updateMyNftCardIdentity(c?.id, c?.name);
      if (res?.data && Array.isArray(res.data)) {
        console.log(res?.data);
      }
    }
  };

  const [optionsStatus, setOptionsStatus] = useState<SelectOptionProps[]>([]);
  const [optionsRarities, setOptionsRarities] = useState<SelectOptionProps[]>(
    []
  );
  const [optionsCollection, setOptionsCollection] = useState<
    SelectOptionProps[]
  >([]);
  const [optionsTriggers, setOptionsTriggers] = useState<SelectOptionProps[]>(
    []
  );
  const [optionsTiers, setOptionsTiers] = useState<SelectOptionProps[]>([]);
  const [optionsCategories, setOptionsCategories] = useState<
    SelectOptionProps[]
  >([]);

  useEffect(() => {
    if (statusContext && cardCollectionContext) {
      // setOptionsStatus(Array.from((statusContext as Map<number, { id: number, name: string }>).values()).map(v => {
      //   return { checked: false, value: v.id.toString(), label: v.name }
      // }))
      setOptionsCollection(
        cardCollectionContext.map((v) => {
          return {
            value: v.id?.toString(),
            label: v.name,
          } as SelectOptionProps;
        })
      );

      setOptionsRarities(
        Array.from(
          (
            allRaritiesContext as Map<number, { id: number; name: string }>
          ).values()
        ).map((v) => {
          return { checked: false, value: v.id.toString(), label: v.name };
        })
      );
    }
  }, [cardCollectionContext, allRaritiesContext]);

  const handleClick = (filterType: string, selectedOptions: string[]) => {
    if (filterType === "All Rarities")
      setRarity(selectedOptions.map((v) => Number(v)));
    if (filterType === "Status")
      setStatus(selectedOptions.map((v) => Number(v)));
    if (filterType === "Collections")
      setCollection(selectedOptions.length && Number(selectedOptions[0]));
  };

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
                {nftCardCraftingData.map((item) => (
                  <DateCardWrapper key={`craft-${item.id}`}>
                    <CardImgWrapper>
                      {item.rarity || item.rarity === 0 ? (
                        <img
                          src={`/assets/nfts/rarity/Crafting-${checkRarity(
                            item?.rarity
                          )}-copy.png`}
                          alt="nft"
                        />
                      ) : (
                        <Loader />
                      )}
                    </CardImgWrapper>
                    <CardBottomWrapper>Crafting</CardBottomWrapper>

                    <CardOverlayWrapper
                      className="overlay"
                      onClick={() => onCardClicked(Number(item.id), item)}
                    >
                      <CardButtonGroup>
                        <CardButton onClick={() => onSelectCardCrafting(item)}>
                          Select
                        </CardButton>
                      </CardButtonGroup>
                    </CardOverlayWrapper>

                    <CardOverlayWrapper />
                  </DateCardWrapper>
                ))}
              </CardGridWrapper>
            </>
          ) : !isLoadingCrafting ? (
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
      {selectedCraft === "identity" && (
        <SelectCardSectionContainer>
          {nftCardIdentityData != null ? (
            <>
              <h2>Select an Identity card</h2>
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
                {nftCardIdentityData.map((item) => (
                  <IdentityCard
                    cardType="identity"
                    height={293}
                    isNotHover={true}
                    key={`identity-${item.id}`}
                    item={item}
                    {...item}
                    forCraft={true}
                    onCardClicked={onCardClicked}
                    onSelectCardIdentity={onSelectCardIdentity}
                  />
                ))}
              </CardGridWrapper>
            </>
          ) : !isLoadingIdentity ? (
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
      {selectedCraft === "trigger" && (
        <SelectCardSectionContainer>
          {nftCardTriggerData != null ? (
            <>
              <h2>Select a Trigger card</h2>
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
                {nftCardTriggerData.map((item, key) => (
                  <DateCardWrapper key={`trigger-${item.id}`}>
                    <CardImgWrapper>
                      {item.rarity || item.rarity === 0 ? (
                        <img
                          src={`/assets/nfts/rarity/Trigger-${checkRarity(
                            item?.rarity
                          )}-No-Text.png`}
                          alt="nft"
                        />
                      ) : (
                        <Loader />
                      )}
                    </CardImgWrapper>
                    <CardBottomWrapper>{item.trigger}</CardBottomWrapper>
                    <CardOverlayWrapper
                      className="overlay"
                      onClick={() => onCardClicked(Number(item.id), item)}
                    >
                      <CardButtonGroup>
                        <CardButton onClick={() => onSelectCardTrigger(item)}>
                          Select
                        </CardButton>
                      </CardButtonGroup>
                    </CardOverlayWrapper>
                  </DateCardWrapper>
                ))}
              </CardGridWrapper>
            </>
          ) : !isLoadingTrigger ? (
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

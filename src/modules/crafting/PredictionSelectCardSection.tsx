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
import {
  useStatusContext,
  useAllRaritiesContext,
  useCelebritiesContext,
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

export const PredictionSelectCardSection: React.FC<{
  selectedCraft: string;
  clickedCard: number | string | null;
  selectedCard: number | string | null;
  onCardClicked: (key: number | string) => void;
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

  const getNFTCrafting = async () => {
    setIsLoadingCrafting(true);
    setIsLoadingIdentity(true);
    setIsLoadingTrigger(true);

    if (selectedCraft === "crafting") {
      const response = await getMyNftCardCrafting(null);
      if (response.data) {
        setNftCardCraftingData(response.data);
      }
      setIsLoadingCrafting(false);
    } else if (selectedCraft === "trigger") {
      const response = await getMyNftCardTrigger(null);
      if (response.data) {
        setNftCardTriggerData(response.data);
      }
      setIsLoadingIdentity(false);
    } else if (selectedCraft === "identity") {
      const response = await getMyNftCardIdentity(null);
      if (response.data) {
        setNftCardIdentityData(response.data);
      }
      setIsLoadingTrigger(false);
    }
  };

  useEffect(() => {
    getNFTCrafting();
  }, [selectedCraft]);

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
          {nftCardCraftingData != null ? (
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
                {nftCardIdentityData.map((item, key) => (
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

                      {item?.celebrity_name ? (
                        <p>{item.celebrity_name}</p>
                      ) : (
                        celebritiesContext && (
                          <p>
                            <SelectOption
                              options={Array.from<[number, any]>(
                                celebritiesContext
                              ).map(([key, value]) => {
                                return {
                                  label: value.name,
                                  value: String(value.id),
                                };
                              })}
                              placeholder="Identity Matches"
                              onSelect={chooseCelebrity}
                            />
                          </p>
                        )
                      )}
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
                          : () => onSelectCardIdentity(item)
                      }
                    >
                      Select
                    </SelectButton>
                  </CraftingCardWrapper>
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
                {nftCardTriggerData.map((item, key) => (
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
                      <p>{item.trigger}</p>
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
                          : () => onSelectCardTrigger(item)
                      }
                    >
                      Select
                    </SelectButton>
                  </CraftingCardWrapper>
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

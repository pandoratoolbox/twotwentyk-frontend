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
import { getMyNftCardIdentity } from "../../actions/nft_card_identity";
import { getMyNftCardTrigger } from "../../actions/nft_card_trigger";
import { INftCardIdentity } from "../../models/nft_card_identity";
import { INftCardTrigger } from "../../models/nft_card_trigger";
import { INftCardCrafting } from "../../models/nft_card_crafting";

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
      const response = await getMyNftCardCrafting();
      if (response.data) {
        setNftCardCraftingData(response.data);
      }
      setIsLoadingCrafting(false);
    } else if (selectedCraft === "trigger") {
      const response = await getMyNftCardTrigger();
      if (response.data) {
        setNftCardTriggerData(response.data);
      }
      setIsLoadingIdentity(false);
    } else if (selectedCraft === "identity") {
      const response = await getMyNftCardIdentity();
      if (response.data) {
        setNftCardIdentityData(response.data);
      }
      setIsLoadingTrigger(false);
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
          ) : !isLoadingCrafting ? (
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
      {selectedCraft === "identity" && (
        <SelectCardSectionContainer>
          {nftCardIdentityData != null ? (
            <>
              <h2>Select an Identity card</h2>
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
                      <p>{item.celebrity_name}</p>
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
      {selectedCraft === "trigger" && (
        <SelectCardSectionContainer>
          {nftCardTriggerData != null ? (
            <>
              <h2>Select a Trigger card</h2>
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

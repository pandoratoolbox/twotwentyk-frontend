import React, { useState } from "react";
import {
  EmptyCraftCard,
  CraftCardGroup,
  CraftCardWrapper,
  CraftSectionWrapper,
  TitleWrapper,
  CraftCard,
  AddTrigger,
  CraftSectionContainer,
  EmptyCraftCardWrapper,
} from "./styles";
import { Button } from "../../components";

import { INftCardCrafting } from "../../models/nft_card_crafting";
import { INftCardIdentity } from "../../models/nft_card_identity";
import { INftCardTrigger } from "../../models/nft_card_trigger";
import { PredictionSelectCardSection } from "./PredictionSelectCardSection";

export const PredictionCraftSection: React.FC<{
  selectedCards: {
    crafting: INftCardCrafting | null;
    identity: INftCardIdentity | null;
    triggers: Array<INftCardTrigger> | null;
  };
  onCraftChanged: (key: string) => void;
  onCraft: () => void;
  selectedCraft: string;
  selectedCard: any;
  clickedCard: any;
  onCardClicked: any;
  onSelectCardCrafting: any;
  onSelectCardIdentity: any;
  onSelectCardTrigger: any;
}> = ({
  onCraftChanged,
  selectedCraft,
  selectedCards,
  onCraft,
  selectedCard,
  clickedCard,
  onCardClicked,
  onSelectCardCrafting,
  onSelectCardIdentity,
  onSelectCardTrigger,
}) => {
  const [isAdd, setIsAdd] = useState(false);

  return (
    <CraftSectionWrapper>
      <TitleWrapper>
        <h3>Craft a Prediction</h3>
        <Button
          className="craft-button"
          disabled={
            !(
              selectedCards.crafting !== null &&
              selectedCards.identity !== null &&
              selectedCards.triggers !== null
            )
          }
          onClick={() => onCraft()}
        >
          Craft Prediction
        </Button>
      </TitleWrapper>
      <CraftSectionContainer>
        <p>
          Select an Identity and then add at least one trigger to craft a
          Prediction.
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
              <EmptyCraftCardWrapper onClick={() => onCraftChanged("crafting")}>
                <img src="/assets/empty-crafting.png" alt="" />
              </EmptyCraftCardWrapper>
            )}
          </CraftCardWrapper>
          <CraftCardWrapper key="identity">
            <h6>Identity</h6>
            {selectedCards.identity != null ? (
              <CraftCard
                onClick={() => onCraftChanged("identity")}
                bg={"/assets/nfts/1.png"}
                className="crafting-card"
              >
                {selectedCards.identity.rarity === 0 && <span>Common</span>}
                {selectedCards.identity.rarity === 1 && <span>Uncommon</span>}
                {selectedCards.identity.rarity === 2 && <span>Rare</span>}
                <p>{selectedCards.identity.celebrity_name}</p>
              </CraftCard>
            ) : (
              <EmptyCraftCardWrapper onClick={() => onCraftChanged("identity")}>
                <img src="/assets/empty-crafting.png" alt="" />
              </EmptyCraftCardWrapper>
            )}
          </CraftCardWrapper>
          {selectedCards.triggers != null &&
          selectedCards.triggers.length > 0 ? (
            selectedCards.triggers.map((tItem, key) => (
              <CraftCardWrapper key={key}>
                <h6>Trigger</h6>
                <CraftCard
                  onClick={() => onCraftChanged("trigger")}
                  bg={"/assets/nfts/2.png"}
                  className="crafting-card"
                >
                  {tItem.rarity === 0 && <span>Common</span>}
                  {tItem.rarity === 1 && <span>Uncommon</span>}
                  {tItem.rarity === 2 && <span>Rare</span>}
                  <p>{tItem.trigger}</p>
                </CraftCard>
              </CraftCardWrapper>
            ))
          ) : (
            <CraftCardWrapper key="trigger">
              <h6>Trigger</h6>
              <EmptyCraftCardWrapper onClick={() => onCraftChanged("trigger")}>
                <img src="/assets/empty-crafting.png" alt="" />
              </EmptyCraftCardWrapper>
            </CraftCardWrapper>
          )}
          {isAdd && (
            <CraftCardWrapper key={"trigger"}>
              <h6>Trigger</h6>

              <EmptyCraftCardWrapper onClick={() => onCraftChanged("trigger")}>
                <img src="/assets/empty-crafting.png" alt="" />
              </EmptyCraftCardWrapper>
            </CraftCardWrapper>
          )}
          {selectedCards.triggers != null &&
            selectedCards.triggers.length > 0 && (
              <AddTrigger onClick={() => setIsAdd(true)}>
                <span>+</span>
                <p>Add Trigger</p>
              </AddTrigger>
            )}
        </CraftCardGroup>
        <PredictionSelectCardSection
          selectedCard={selectedCard}
          clickedCard={clickedCard}
          selectedCraft={selectedCraft}
          onCardClicked={onCardClicked}
          onSelectCardCrafting={onSelectCardCrafting}
          onSelectCardIdentity={onSelectCardIdentity}
          onSelectCardTrigger={onSelectCardTrigger}
        />
      </CraftSectionContainer>
    </CraftSectionWrapper>
  );
};

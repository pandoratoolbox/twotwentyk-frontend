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
import { Button, Loader } from "../../components";

import { INftCardCrafting } from "../../models/nft_card_crafting";
import { INftCardIdentity } from "../../models/nft_card_identity";
import { INftCardTrigger } from "../../models/nft_card_trigger";
import { PredictionSelectCardSection } from "./PredictionSelectCardSection";
import { checkRarity } from "../../utils/helperFunctions";

// Reusable CraftCard component
const CraftCardComponent = ({
  cardType,
  heading,
  selectedCard,
  onCraftChanged,
}: {
  cardType: string;
  heading: string;
  selectedCard: any;
  onCraftChanged: (key: string) => void;
}) => {
  return (
    <CraftCardWrapper key={cardType}>
      <h6>{heading}</h6>
      {selectedCard ? (
        <CraftCard
          onClick={() => onCraftChanged(cardType)}
          className="crafting-card"
        >
          {cardType === "identity" ? (
            <img
              src={`/assets/nfts/rarity/Identity-Card-Blank-${checkRarity(
                selectedCard.rarity
              )}.png`}
              alt="nft"
            />
          ) : (
            <img
              src={`/assets/nfts/rarity/${cardType}-${checkRarity(
                selectedCard.rarity
              )}-copy.png`}
              alt="nft"
            />
          )}
          <div className="info-nft info-nft-identity" style={{ height: "56%" }}>
            {cardType === "identity" && (
              <div className="nft-info-detail">
                <img
                  src={`/assets/nfts/rarity/${checkRarity(
                    selectedCard?.rarity
                  )}-Torso.gif`}
                  alt="gif"
                />
                <h4 className={checkRarity(selectedCard.rarity)}>
                  {selectedCard?.day} {selectedCard?.month} {selectedCard?.year}
                </h4>
                <h4 className={checkRarity(selectedCard.rarity)}>
                  {selectedCard?.category}
                </h4>
              </div>
            )}
          </div>
        </CraftCard>
      ) : (
        <EmptyCraftCard onClick={() => onCraftChanged(cardType)}>
          <img src="/assets/empty-crafting.png" alt="" />
        </EmptyCraftCard>
      )}
    </CraftCardWrapper>
  );
};

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
            <CraftCardComponent
              cardType="crafting"
              heading="Crafting"
              selectedCard={selectedCards.crafting}
              onCraftChanged={onCraftChanged}
            />
          </CraftCardWrapper>
          <CraftCardWrapper key="identity">
            <CraftCardComponent
              cardType="identity"
              heading="Identity"
              selectedCard={selectedCards.identity}
              onCraftChanged={onCraftChanged}
            />
          </CraftCardWrapper>
          {selectedCards.triggers != null &&
          selectedCards.triggers.length > 0 ? (
            selectedCards.triggers.map((tItem, key) => (
              <CraftCardWrapper key={key}>
                <h6>Trigger</h6>

                <CraftCard
                  onClick={() => onCraftChanged("trigger")}
                  className="crafting-card"
                >
                  {tItem.rarity || tItem.rarity === 0 ? (
                    <img
                      src={`/assets/nfts/rarity/Trigger-${checkRarity(
                        tItem?.rarity
                      )}-No-Text.png`}
                      alt="nft"
                    />
                  ) : (
                    <Loader />
                  )}

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

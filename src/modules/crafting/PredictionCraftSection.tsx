import React, { useEffect, useState } from "react";
import {
  EmptyCraftCard,
  CraftCardGroup,
  CraftCardWrapper,
  CraftSectionWrapper,
  TitleWrapper,
  CraftCard,
  AddTrigger,
} from "./styles";
import { Button } from "../../components";
import { identityCraft, predictionCraft } from "./data";
import {
  nft_card_category_data,
  nft_card_crafting_data,
  nft_card_day_month_data,
  nft_card_identity_data,
  nft_card_trigger_data,
  nft_card_year_data,
} from "../../data/nfts";

import { INftCardCrafting } from "../../models/nft_card_crafting";
import { INftCardCategory } from "../../models/nft_card_category";
import { INftCardDayMonth } from "../../models/nft_card_day_month";
import { INftCardYear } from "../../models/nft_card_year";
import { INftCardIdentity } from "../../models/nft_card_identity";
import { INftCardPrediction } from "../../models/nft_card_prediction";
import { INftCardTrigger } from "../../models/nft_card_trigger";

export const PredictionCraftSection: React.FC<{
  selectedCards: {
    crafting: INftCardCrafting | null;
    identity: INftCardIdentity | null;
    triggers: Array<INftCardTrigger> | null;
  };
  onCraftChanged: (key: string) => void;
  onCraft: () => void;
  selectedCraft: string;
}> = ({ onCraftChanged, selectedCraft, selectedCards, onCraft }) => {
  const [isAdd, setIsAdd] = useState(false);


  return (
    <CraftSectionWrapper>
      <TitleWrapper>
        <h3>
          Craft a Prediction
        </h3>
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

      <p>
        Select an Identity and then add at least one trigger to craft a Prediction.
      </p>
      <CraftCardGroup>
      <CraftCardWrapper key="crafting">
              <h6>Crafting</h6>
              {selectedCards.crafting != null ? (
                <CraftCard
                  bg={
                    "/assets/nfts/1.png"
                  }
                  className="crafting-card"
                >
                  {selectedCards.crafting.rarity === 0 && <span>Common</span>}
                  {selectedCards.crafting.rarity === 1 && <span>Uncommon</span>}
                  {selectedCards.crafting.rarity === 2 && <span>Rare</span>}
                  <p>
                  Crafting
                  </p>
                </CraftCard>
              ) : (
                <EmptyCraftCard
                  active={selectedCraft === "crafting" ? "true" : undefined}
                  onClick={() => onCraftChanged("crafting")}
                />
              )}
            </CraftCardWrapper>
            <CraftCardWrapper key="identity">
              <h6>Identity</h6>
              {selectedCards.identity != null ? (
                <CraftCard
                  bg={
                    "/assets/nfts/1.png"
                  }
                  className="crafting-card"
                >
                  {selectedCards.identity.rarity === 0 && <span>Common</span>}
                  {selectedCards.identity.rarity === 1 && <span>Uncommon</span>}
                  {selectedCards.identity.rarity === 2 && <span>Rare</span>}
                  <p>
                  Identity
                  </p>
                </CraftCard>
              ) : (
                <EmptyCraftCard
                  active={selectedCraft === "identity" ? "true" : undefined}
                  onClick={() => onCraftChanged("identity")}
                />
              )}
            </CraftCardWrapper>
            {selectedCards.triggers != null && selectedCards.triggers.length > 0 ? (
                      selectedCards.triggers.map((tItem, key) => (
                        <CraftCardWrapper key={key}>
                          <h6>Trigger</h6>
                          <CraftCard
                            bg={
                              "/assets/nfts/2.png"
                            }
                            className="crafting-card"
                          >
                            {tItem.rarity === 0 && <span>Common</span>}
                            {tItem.rarity === 1 && <span>Uncommon</span>}
                            {tItem.rarity === 2 && <span>Rare</span>}
                            <p>
                              {
                                tItem.trigger
                              }
                            </p>
                          </CraftCard>
                        </CraftCardWrapper>
                      ))
                    ) : (
                      <CraftCardWrapper key="trigger">
                        <h6>Trigger</h6>
                        <EmptyCraftCard
                          active={
                            selectedCraft === "trigger" ? "true" : undefined
                          }
                          onClick={() => {
                            onCraftChanged("trigger");
                          }}
                        />
                      </CraftCardWrapper>
                    )}
                    {isAdd && (
                      <CraftCardWrapper key={"trigger"}>
                        <h6>Trigger</h6>
                        <EmptyCraftCard
                          active={
                            selectedCraft === "trigger" ? "true" : undefined
                          }
                          onClick={() => {
                            onCraftChanged("trigger");
                          }}
                        />
                      </CraftCardWrapper>
                    )}
            {selectedCards.triggers != null && selectedCards.triggers.length > 0 && (
              <AddTrigger onClick={() => setIsAdd(true)}>
                <span>+</span>
                <p>Add Trigger</p>
              </AddTrigger>
            )}
      </CraftCardGroup>
    </CraftSectionWrapper>
  );
};

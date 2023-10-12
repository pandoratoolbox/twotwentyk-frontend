import React, { useState } from "react";
import { CardSidebarProps } from "../../types";
import { MSidebarContainer, MSidebarWrapper, ViewCardWrapper } from "./styles";
import {
  CloseButton,
  PriceItem,
  PropertiesContent,
  PropertiesHeader,
  PropertiesWrapper,
  PropertyCardPacks,
  PropertyItem,
  SetPriceWrapper,
} from "../app/dates/styles";
import {
  Button,
  IconArrowDown,
  IconArrowDown1,
  IconCardAthlete,
  Input,
  MarketCard,
  PredictionCard,
  SellConfirmModal,
} from "../../components";
import { useCardSeriesContext, useTiersContext } from "../../context";
import { ITier } from "../../models/tier";

export const MSellCardSection: React.FC<CardSidebarProps> = ({
  open,
  page,
  onClose,
  selectedItem,
  collection
}) => {
  const [modal, setModal] = useState(false);

  const { tiersContext }: { tiersContext: Map<number, ITier> } = useTiersContext()
  const { cardSeriesContext } = useCardSeriesContext();
  // for check rarity
  const checkRarity = (selectedItem: any) => {
    if (
      selectedItem?.nft_card_day_month?.rarity === 0 ||
      selectedItem?.nft_card_trigger?.rarity === 0 ||
      selectedItem?.nft_card_crafting?.rarity === 0 ||
      selectedItem?.nft_card_identity?.rarity === 0 ||
      selectedItem?.nft_card_prediction?.rarity === 0 ||
      selectedItem?.nft_card_year?.rarity === 0 ||
      selectedItem?.nft_card_category?.rarity === 0
    ) {
      return "Common";
    } else if (
      selectedItem?.nft_card_day_month?.rarity === 1 ||
      selectedItem?.nft_card_trigger?.rarity === 1 ||
      selectedItem?.nft_card_crafting?.rarity === 1 ||
      selectedItem?.nft_card_identity?.rarity === 1 ||
      selectedItem?.nft_card_prediction?.rarity === 1 ||
      selectedItem?.nft_card_year?.rarity === 1 ||
      selectedItem?.nft_card_category?.rarity === 1
    ) {
      return "Uncommon";
    } else if (
      selectedItem?.nft_card_day_month?.rarity === 2 ||
      selectedItem?.nft_card_trigger?.rarity === 2 ||
      selectedItem?.nft_card_crafting?.rarity === 2 ||
      selectedItem?.nft_card_identity?.rarity === 2 ||
      selectedItem?.nft_card_prediction?.rarity === 2 ||
      selectedItem?.nft_card_year?.rarity === 2 ||
      selectedItem?.nft_card_category?.rarity === 2
    ) {
      return "Rare";
    }

    return undefined;
  };

  //for check type
  const checkType = (selectedItem: any) => {
    if (selectedItem?.nft_card_day_month) {
      return "Day/Month";
    } else if (selectedItem?.nft_card_trigger) {
      return "Trigger";
    } else if (selectedItem?.nft_card_crafting) {
      return "Crafting";
    } else if (selectedItem?.nft_card_identity) {
      return "Identity";
    } else if (selectedItem?.nft_card_prediction) {
      return "Prediction";
    } else if (selectedItem?.nft_card_year) {
      return "Year";
    } else if (selectedItem?.nft_card_category) {
      return "Category"
    }

    return undefined;
  };

  //for check type value
  const checkTypeValue = (selectedItem: any) => {
    if (selectedItem?.nft_card_day_month) {
      return `${selectedItem?.nft_card_day_month?.day}/${selectedItem?.nft_card_day_month?.month}`;
    } else if (selectedItem?.nft_card_trigger) {
      return selectedItem?.nft_card_trigger?.trigger;
    } else if (selectedItem?.nft_card_crafting) {
      return "Crafting";
    } else if (selectedItem?.nft_card_identity) {
      return selectedItem?.nft_card_identity?.celebrity_name;
    } else if (selectedItem?.nft_card_prediction) {
      return selectedItem?.nft_card_prediction?.celebrity_name;
    } else if (selectedItem?.nft_card_year) {
      return selectedItem?.nft_card_year?.year;
    } else if (selectedItem?.nft_card_category) {
      return selectedItem?.nft_card_category?.category
    }

    return undefined;
  };

  const packData = React.useMemo(() => {
    if (page === "packs" && selectedItem?.card_pack) {
      // let rarity = selectedItem.card_pack?.tier ? tiersContext.get(selectedItem.card_pack.tier)?.name : ""
      let rarity = tiersContext.get(selectedItem.card_pack.tier ?? 0)?.name ?? ""
      let collection = selectedItem.card_pack?.card_series_id ? cardSeriesContext?.find(
        (value) => value.id === selectedItem.card_pack?.card_series_id
      )?.card_collection?.name : "";
      const cardsLength = !selectedItem.card_pack?.cards ? 0 : Object.values(selectedItem.card_pack?.cards).reduce((prev, value) => value && value?.length ? prev += value.length : prev, 0)
      const packContents = []
      if (selectedItem.card_pack?.cards?.crafting?.length) {
        packContents.push(`${selectedItem.card_pack.cards.crafting.length} Crafting Card`)
      }
      if (selectedItem.card_pack?.cards?.category?.length) {
        packContents.push(`${selectedItem.card_pack.cards.category.length} Category Card`)
      }
      if (selectedItem.card_pack?.cards?.trigger?.length) {
        packContents.push(`${selectedItem.card_pack.cards.trigger.length} Trigger Card`)
      }
      if (selectedItem.card_pack?.cards?.year?.length) {
        packContents.push(`${selectedItem.card_pack.cards.year.length} Year Card`)
      }
      if (selectedItem.card_pack?.cards?.day_month?.length) {
        packContents.push(`${selectedItem.card_pack.cards.day_month.length} Day/Month Card`)
      }
      return { rarity, collection, cardsLength, packContents }
    } else return {}
  }, [tiersContext, cardSeriesContext, selectedItem.id])
  
  return (
    <>
      <SellConfirmModal
        open={modal}
        // onConfirm={() => setModal(false)}
        onClose={() => {
          setModal(false);
          onClose();
        }}
        isMarket={true}
      />
      <MSidebarWrapper open={open}>
        <MSidebarContainer>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <h2>Sell Date Card</h2>
          <ViewCardWrapper>
            {!page && (
              <MarketCard
                type=""
                item={selectedItem}
              />
            )}
            {page === "packs" && (
              <MarketCard
                type=""
                item={selectedItem}
              />
            )}
            {page === "identities" && (
              <PredictionCard
                icon={<IconCardAthlete />}
                iconText="Athlete"
                category=""
                rarity={2}
                height={298}
              />
            )}
            {page === "predictions" && (
              <PredictionCard
                image="/assets/nfts/2.png"
                category="Tom Brady"
                rarity={2}
                height={298}
              />
            )}
          </ViewCardWrapper>
          {!page && (
          <PropertiesWrapper>
            <PropertiesHeader>
              <span>Properties</span>
              <IconArrowDown1 />
            </PropertiesHeader>
            <PropertiesContent>
              <PropertyItem>
                <p>Rarity</p>
                <span>{checkRarity(selectedItem)}</span>
              </PropertyItem>
              <PropertyItem>
                <p>Type</p>
                <span>{checkType(selectedItem)}</span>
              </PropertyItem>
              <PropertyItem>
                <p>{checkType(selectedItem)}</p>
                {checkTypeValue(selectedItem)}
              </PropertyItem>
              <PropertyItem>
                <p>Collection</p>
                <span></span>
              </PropertyItem>
            </PropertiesContent>
          </PropertiesWrapper>
        )}
        {page === "packs" && (
          <>
            <PropertiesWrapper>
              <PropertiesHeader>
                <span>Properties</span>
                <IconArrowDown1 />
              </PropertiesHeader>
              <PropertiesContent>
                <PropertyItem>
                  <p>Pack Rarity</p>
                  <span>{packData?.rarity}</span>
                </PropertyItem>
                <PropertyItem>
                  <p>Collection</p>
                  <span>{packData?.collection}</span>
                </PropertyItem>
              </PropertiesContent>
            </PropertiesWrapper>
            <PropertiesWrapper>
              <PropertiesHeader>
                <span>Pack Contents</span>
                <PropertyCardPacks>{packData?.cardsLength} Cards<IconArrowDown1 />
                </PropertyCardPacks>
              </PropertiesHeader>
              <PropertiesContent>
                {packData && packData?.packContents && packData?.packContents.length > 0 && <>
                  {packData.packContents.map((value, key) => <PropertyItem key={key}>
                    <p>{value}</p>
                  </PropertyItem>)}
                </>}

              </PropertiesContent>
            </PropertiesWrapper>
          </>
        )}
        {page === "identities" && (
          <PropertiesWrapper>
            <PropertiesHeader>
              <span>Properties</span>
              <IconArrowDown1 />
            </PropertiesHeader>
            <PropertiesContent>
              <PropertyItem>
                <p>Identity Match</p>
                <span>{selectedItem?.nft_card_identity?.celebrity_name}</span>
              </PropertyItem>
              <PropertyItem>
                <p>Rarity</p>
                <span>{selectedItem?.nft_card_identity?.rarity}</span>
              </PropertyItem>
              <PropertyItem>
                <p>Day/Month</p>
                <span>
                  {selectedItem?.nft_card_identity?.day}/
                  {selectedItem?.nft_card_identity?.month}
                </span>
              </PropertyItem>
              <PropertyItem>
                <p>Year</p>
                <span>{selectedItem?.nft_card_identity?.year}</span>
              </PropertyItem>
              <PropertyItem>
                <p>Category</p>
                <span>{selectedItem?.nft_card_identity?.category}</span>
              </PropertyItem>
              <PropertyItem>
                <p>Collection</p>
                <span>{collection ?? ""}</span>
              </PropertyItem>
            </PropertiesContent>
          </PropertiesWrapper>
        )}
        {page === "predictions" && (
          <PropertiesWrapper>
            <PropertiesHeader>
              <span>Properties</span>
              <IconArrowDown1 />
            </PropertiesHeader>
            <PropertiesContent>
              <PropertyItem>
                <p>Rarity</p>
                <span>{checkRarity(selectedItem)}</span>
              </PropertyItem>
              <PropertyItem>
                <p>Type</p>
                <span>{checkType(selectedItem)}</span>
              </PropertyItem>
              <PropertyItem>
                <p>{checkType(selectedItem)}</p>
                {checkTypeValue(selectedItem)}
              </PropertyItem>
              <PropertyItem>
                <p>Collection</p>
                <span>{collection ?? ""}</span>
              </PropertyItem>
            </PropertiesContent>
          </PropertiesWrapper>
        )}
          <SetPriceWrapper>
            <p>Enter the listing price for your card</p>
            <Input value={"$1,000"} onChange={() => {}} />
          </SetPriceWrapper>
          <PropertiesWrapper>
            <PropertiesHeader>
              <span>Price Summary</span>
              <IconArrowDown />
            </PropertiesHeader>
            <PropertiesContent>
              <PriceItem>
                <p>Asking price</p>
                <span>$1,000 USD</span>
              </PriceItem>
              <PriceItem>
                <p>Marketplace fee (3%)</p>
                <span className="weak">$140 USD</span>
              </PriceItem>

              <PriceItem>
                <p>Net amount to seller</p>
                <span>$1,140 USD</span>
              </PriceItem>
              <PriceItem>
                <p>Prize Pool Replenishment Fee</p>
                <span className="weak">--</span>
              </PriceItem>
            </PropertiesContent>
          </PropertiesWrapper>
          <Button
            className="sell-confirm-button"
            onClick={() => setModal(true)}
          >
            Confirm
          </Button>
        </MSidebarContainer>
      </MSidebarWrapper>
    </>
  );
};

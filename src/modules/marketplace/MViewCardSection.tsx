import React from "react";
import { CardSidebarProps } from "../../types";
import { MSidebarContainer, MSidebarWrapper, ViewCardWrapper } from "./styles";
import {
  CloseButton,
  PropertiesContent,
  PropertiesHeader,
  PropertiesWrapper,
  PropertyCardPacks,
  PropertyItem,
} from "../app/dates/styles";
import {
  IconArrowDown1,
  IconCardAthlete,
  MarketCard,
  PredictionCard,
} from "../../components";
import { useCardSeriesContext, useTiersContext } from "../../context";
import { ITier } from "../../models/tier";
import { ItemContent } from "../crafting/styles";

export const MViewCardSection: React.FC<CardSidebarProps> = ({
  selectedItem,
  onClose,
  open,
  page,
  collection,
}) => {
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
      selectedItem?.nft_card_year?.rarity === 0
    ) {
      return "Common";
    } else if (
      selectedItem?.nft_card_day_month?.rarity === 1 ||
      selectedItem?.nft_card_trigger?.rarity === 1 ||
      selectedItem?.nft_card_crafting?.rarity === 1 ||
      selectedItem?.nft_card_identity?.rarity === 1 ||
      selectedItem?.nft_card_prediction?.rarity === 1 ||
      selectedItem?.nft_card_year?.rarity === 1
    ) {
      return "Uncommon";
    } else if (
      selectedItem?.nft_card_day_month?.rarity === 2 ||
      selectedItem?.nft_card_trigger?.rarity === 2 ||
      selectedItem?.nft_card_crafting?.rarity === 2 ||
      selectedItem?.nft_card_identity?.rarity === 2 ||
      selectedItem?.nft_card_prediction?.rarity === 2 ||
      selectedItem?.nft_card_year?.rarity === 2
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
    <MSidebarWrapper open={open} key={selectedItem.id}>
      <MSidebarContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>View Card</h2>
        <ViewCardWrapper>
          {!page && <MarketCard item={selectedItem} {...selectedItem} />}
          {page === "packs" && (
            <MarketCard item={selectedItem} {...selectedItem} />
          )}
          {page === "identities" && (
            <PredictionCard
              item={selectedItem}
              {...selectedItem?.nft_card_identity}
            />
          )}
          {page === "predictions" && (
            <PredictionCard
              item={selectedItem}
              {...selectedItem?.nft_card_prediction}
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
                <span>{collection}</span>
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
                <span>{collection}</span>
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
                <p>Year</p>
                <span>{selectedItem?.nft_card_identity?.year}</span>
              </PropertyItem>
              <PropertyItem>
                <p>Collection</p>
                <span>{collection}</span>
              </PropertyItem>
            </PropertiesContent>
          </PropertiesWrapper>
        )}
      </MSidebarContainer>
    </MSidebarWrapper>
  );
};

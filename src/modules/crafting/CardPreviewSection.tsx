import React, { useEffect, useState } from "react";
import { CardPreviewSectionWrapper, CraftCard } from "./styles";
import {
  PropertiesContent,
  PropertiesHeader,
  PropertiesWrapper,
  PropertyItem,
} from "../app/dates/styles";
import { IconArrowDown } from "../../components";
import {
  nft_card_category_data,
  nft_card_crafting_data,
  nft_card_day_month_data,
  nft_card_identity_data,
  nft_card_trigger_data,
  nft_card_year_data,
} from "../../data/nfts";
import { INftCardCrafting } from "../../models/nft_card_crafting";
import { INftCardIdentity } from "../../models/nft_card_identity";
import { INftCardTrigger } from "../../models/nft_card_trigger";
import { useCardSeriesContext } from "../../context";

export const CardPreviewSection: React.FC<{
  selectedCraft: string;
  page: "identity" | "prediction";
  clickedCard: string | number | null;
  clickedNft?: INftCardCrafting | INftCardIdentity | INftCardTrigger;
}> = ({ page, clickedCard, clickedNft, selectedCraft }) => {
  type CardProps = {
    id: number;
    rarity: number;
    image: string;
    name: string | number;
  }[];

  const [nftData, setNftData] = useState<CardProps>([]);

  useEffect(() => {
    let tempData: CardProps = [
      ...nft_card_crafting_data
        .filter((f) => !f.is_crafted)
        .map((item) => {
          return {
            id: item.id,
            rarity: item.rarity,
            image: item.image,
            name: "Crafting",
          };
        }),
      ...nft_card_day_month_data
        .filter((f) => !f.is_crafted)
        .map((item) => {
          return {
            id: item.id,
            rarity: item.rarity,
            image: item.image,
            name: item.day + "/" + item.month,
          };
        }),
      ...nft_card_year_data
        .filter((f) => !f.is_crafted)
        .map((item) => {
          return {
            id: item.id,
            rarity: item.rarity,
            image: item.image,
            name: item.year,
          };
        }),
      ...nft_card_category_data
        .filter((f) => !f.is_crafted)
        .map((item) => {
          return {
            id: item.id,
            rarity: item.rarity,
            image: item.image,
            name: item.category,
          };
        }),
      ...nft_card_identity_data
        .filter((f) => !f.is_crafted)
        .map((item) => {
          return {
            id: item.id,
            rarity: item.rarity,
            image: item.image,
            name: item.category,
          };
        }),
      ...nft_card_trigger_data
        .filter((f) => !f.is_crafted)
        .map((item) => {
          return {
            id: item.id,
            rarity: item.rarity,
            image: item.image,
            name: item.trigger,
          };
        }),
    ];
    console.log(tempData);
    // }
    setNftData(tempData);
  }, []);

  return (
    <CardPreviewSectionWrapper>
      <h2>Preview</h2>
      {Number(clickedCard) > -1 ? (
        <>
          <CraftCard
            // bg={
            //   nftData.filter((f: any) => f.id === Number(clickedCard))[0]?.image
            // }
            className="preview"
          >
            {nftData.filter((f: any) => f.id === Number(clickedCard))[0]
              ?.rarity === 0 && <span>Common</span>}
            {nftData.filter((f: any) => f.id === Number(clickedCard))[0]
              ?.rarity === 1 && <span>Uncommon</span>}
            {nftData.filter((f: any) => f.id === Number(clickedCard))[0]
              ?.rarity === 2 && <span>Rare</span>}
            <p>
              {
                nftData.filter((f: any) => f.id === Number(clickedCard))[0]
                  ?.name
              }
            </p>
          </CraftCard>
          <PropertiesWrapper>
            <PropertiesHeader noborder>
              <span>Properties</span>
              {/* <IconArrowDown /> */}
            </PropertiesHeader>
            <PropertiesContent>
              {clickedNft ? (
                <>
                  {selectedCraft === "trigger" && (
                    <TriggerContent item={clickedNft} />
                  )}
                  {selectedCraft === "identity" && (
                    <IdentityContent item={clickedNft} />
                  )}
                  {selectedCraft !== "identity" &&
                    selectedCraft !== "trigger" && (
                      <CraftingContent
                        item={clickedNft}
                        craft={selectedCraft}
                      />
                    )}
                </>
              ) : (
                <NoContent />
              )}
            </PropertiesContent>
          </PropertiesWrapper>
        </>
      ) : (
        <p>Click on a card from your inventory to see its properties.</p>
      )}
    </CardPreviewSectionWrapper>
  );
};

const NoContent = () => {
  return (
    <>
      <PropertyItem>
        <p>Type</p>
        <span></span>
      </PropertyItem>
      <PropertyItem>
        <p>Collection</p>
        <span></span>
      </PropertyItem>
      <PropertyItem>
        <p>Rarity</p>
        <span></span>
      </PropertyItem>
    </>
  );
};

const IdentityContent = ({ item }: { item: INftCardIdentity }) => {
  const { cardSeriesContext } = useCardSeriesContext();
  const collection = cardSeriesContext?.find(
    (value) => value.id === item.card_series_id
  )?.card_collection?.name;

  const timestamp = item.created_at;
  const date = new Date(timestamp);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  const rarity =
    item?.rarity === 2 ? "Rare" : item?.rarity === 1 ? "Uncommon" : "Common";

  return (
    <>
      <PropertyItem>
        <p>Type</p>
        <span>Identity</span>
      </PropertyItem>
      <PropertyItem>
        <p>Day/Month</p>
        <span>{`${month} ${day}`}</span>
      </PropertyItem>
      <PropertyItem>
        <p>Year</p>
        <span>{year ?? ""}</span>
      </PropertyItem>
      <PropertyItem>
        <p>Category</p>
        <span>{item?.category ?? ""}</span>
      </PropertyItem>
      <PropertyItem>
        <p>Collection</p>
        <span>{collection ?? ""}</span>
      </PropertyItem>
      <PropertyItem>
        <p>Rarity</p>
        <span>{rarity}</span>
      </PropertyItem>
      <PropertyItem>
        <p>Identity Match</p>
        <span>{item?.celebrity_name ?? ""}</span>
      </PropertyItem>
    </>
  );
};

const TriggerContent = ({ item }: { item: INftCardTrigger }) => {
  const { cardSeriesContext } = useCardSeriesContext();
  const collection = cardSeriesContext?.find(
    (value) => value.id === item.card_series_id
  )?.card_collection?.name;
  const rarity =
    item?.rarity === 2 ? "Rare" : item?.rarity === 1 ? "Uncommon" : "Common";

  return (
    <>
      <PropertyItem>
        <p>Trigger</p>
        <span>{item?.trigger ?? ""}</span>
      </PropertyItem>
      <PropertyItem>
        <p>Trigger Tier</p>
        <span>{item?.tier ?? ""}</span>
      </PropertyItem>
      <PropertyItem>
        <p>Collection</p>
        <span>{collection ?? ""}</span>
      </PropertyItem>
      <PropertyItem>
        <p>Rarity</p>
        <span>{rarity}</span>
      </PropertyItem>
    </>
  );
};

const CraftingContent = ({
  item,
  craft,
}: {
  craft: string;
  item: INftCardIdentity;
}) => {
  const { cardSeriesContext } = useCardSeriesContext();
  const collection = cardSeriesContext?.find(
    (value) => value.id === item.card_series_id
  )?.card_collection?.name;
  const rarity =
    item?.rarity === 2 ? "Rare" : item?.rarity === 1 ? "Uncommon" : "Common";

  return (
    <>
      <PropertyItem>
        <p>Type</p>
        <span>{craft}</span>
      </PropertyItem>
      <PropertyItem>
        <p>Collection</p>
        <span>{collection ?? ""}</span>
      </PropertyItem>
      <PropertyItem>
        <p>Rarity</p>
        <span>{rarity}</span>
      </PropertyItem>
    </>
  );
};

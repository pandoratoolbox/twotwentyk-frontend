import React, { useState } from "react";
import { ICardPackCards } from "../../../models/card_pack";
import { IconArrowBack } from "../../../components";
import {
  OpenCardPackModalWrapper,
  OpenCard,
  OpenCardContent,
  FrontBackCard,
  BackCardPacks,
} from "./styles";

import { useMonthContext } from "../../../context";

type Props = {
  cardsToAnimation: ICardPackCards;
  onClose: () => void;
};

const FrontCardComponent: React.FC<{ rarity: number }> = ({ rarity }) => (
  <FrontBackCard className="front">
    {rarity >= 0 && rarity <= 2 && (
      <img
        src={`/assets/nfts/rarity/${
          rarity === 0 ? "Core" : rarity === 1 ? "Rare" : "Uncommon"
        }-Card-Back.png`}
        alt="nft"
      />
    )}
  </FrontBackCard>
);

const OpenCardPack: React.FC<Props> = ({ cardsToAnimation, onClose }) => {
  const { monthContext } = useMonthContext();

  const [flipActive, setFlipActive] = useState({
    crafting: Array(cardsToAnimation.crafting?.length).fill(false),
    category: Array(cardsToAnimation.category?.length).fill(false),
    year: Array(cardsToAnimation.year?.length).fill(false),
    day_month: Array(cardsToAnimation.day_month?.length).fill(false),
  });

  function formatCategory(category: string) {
    const words = category.split(" ");

    const formattedCategory = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-");

    return formattedCategory;
  }

  return (
    <>
      <OpenCardPackModalWrapper>
        {cardsToAnimation?.crafting?.map((item, index) => (
          <OpenCard
            key={index}
            onClick={() => {
              const newFlipActive = { ...flipActive };
              newFlipActive.crafting[index] = !newFlipActive.crafting[index];
              setFlipActive(newFlipActive);
            }}
          >
            <OpenCardContent
              className={flipActive.crafting[index] ? "active" : ""}
            >
              {item?.rarity && <FrontCardComponent rarity={item?.rarity} />}

              <FrontBackCard className="back">
                {item?.rarity === 0 && (
                  <img
                    src="/assets/nfts/rarity/Crafting-Core-copy.png"
                    alt="nft"
                  />
                )}
                {item?.rarity === 1 && (
                  <img
                    src="/assets/nfts/rarity/Crafting-Rare-copy.png"
                    alt="nft"
                  />
                )}
                {item?.rarity === 2 && (
                  <img
                    src="/assets/nfts/rarity/Crafting-Uncommon-copy.png"
                    alt="nft"
                  />
                )}
              </FrontBackCard>
            </OpenCardContent>
          </OpenCard>
        ))}

        {cardsToAnimation?.category?.map((item, index) => (
          <OpenCard
            key={index}
            onClick={() => {
              const newFlipActive = { ...flipActive };
              newFlipActive.category[index] = !newFlipActive.category[index];
              setFlipActive(newFlipActive);
            }}
          >
            <OpenCardContent
              className={flipActive.category[index] ? "active" : ""}
            >
              {item?.rarity && <FrontCardComponent rarity={item?.rarity} />}

              <FrontBackCard className="back">
                {item?.rarity === 0 && item?.category && (
                  <img
                    src={`/assets/nfts/rarity/${formatCategory(
                      item?.category
                    )}-Core.png`}
                    alt="nft"
                  />
                )}
                {item?.rarity === 1 && item?.category && (
                  <img
                    src={`/assets/nfts/rarity/${formatCategory(
                      item?.category
                    )}-Rare.png`}
                    alt="nft"
                  />
                )}
                {item?.rarity === 2 && item?.category && (
                  <img
                    src={`/assets/nfts/rarity/${formatCategory(
                      item?.category
                    )}-Uncommon.png`}
                    alt="nft"
                  />
                )}
              </FrontBackCard>
            </OpenCardContent>
          </OpenCard>
        ))}

        {cardsToAnimation?.day_month?.map((item, index) => (
          <OpenCard
            key={index}
            onClick={() => {
              const newFlipActive = { ...flipActive };
              newFlipActive.year[index] = !newFlipActive.year[index];
              setFlipActive(newFlipActive);
            }}
          >
            <OpenCardContent className={flipActive.year[index] ? "active" : ""}>
              {item?.rarity && <FrontCardComponent rarity={item?.rarity} />}
              <FrontBackCard className="back">
                {item?.rarity === 0 && (
                  <img
                    src={`/assets/nfts/rarity/Month-Day-Core-copy.png`}
                    alt="nft"
                  />
                )}
                {item?.rarity === 1 && (
                  <img
                    src={`/assets/nfts/rarity/Month-Day-Rare-copy.png`}
                    alt="nft"
                  />
                )}
                {item?.rarity === 2 && (
                  <img
                    src={`/assets/nfts/rarity/Month-Day-Uncommon-copy.png`}
                    alt="nft"
                  />
                )}
                <div className="gif">
                  {item?.day && item?.month && monthContext && (
                    <h3>
                      {item?.day}{" "}
                      {(monthContext as Map<number, string>).get(item.month)}
                    </h3>
                  )}
                </div>
              </FrontBackCard>
            </OpenCardContent>
          </OpenCard>
        ))}

        {cardsToAnimation?.year?.map((item, index) => (
          <OpenCard
            key={index}
            onClick={() => {
              const newFlipActive = { ...flipActive };
              newFlipActive.day_month[index] = !newFlipActive.day_month[index];
              setFlipActive(newFlipActive);
            }}
          >
            <OpenCardContent
              className={flipActive.day_month[index] ? "active" : ""}
            >
              {item?.rarity && <FrontCardComponent rarity={item?.rarity} />}
              <FrontBackCard className="back">
                {item?.rarity === 0 && (
                  <img
                    src={`/assets/nfts/rarity/Year-Core-copy.png`}
                    alt="nft"
                  />
                )}
                {item?.rarity === 1 && (
                  <img
                    src={`/assets/nfts/rarity/Year-Rare-copy.png`}
                    alt="nft"
                  />
                )}
                {item?.rarity === 2 && (
                  <img
                    src={`/assets/nfts/rarity/Year-Uncommon-copy.png`}
                    alt="nft"
                  />
                )}
                <div className="gif">{item?.year && <h3>{item?.year}</h3>}</div>
              </FrontBackCard>
            </OpenCardContent>
          </OpenCard>
        ))}
      </OpenCardPackModalWrapper>

      <BackCardPacks onClick={onClose}>
        <IconArrowBack />
        Back to Card packs
      </BackCardPacks>
    </>
  );
};

export default OpenCardPack;

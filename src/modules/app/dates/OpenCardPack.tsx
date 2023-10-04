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

type Props = {
  cardsToAnimation: ICardPackCards;
  onClose: () => void;
};

const OpenCardPack: React.FC<Props> = ({ cardsToAnimation, onClose }) => {
  const [flipActive, setFlipActive] = useState({
    crafting: Array(cardsToAnimation.crafting?.length).fill(false),
    category: Array(cardsToAnimation.category?.length).fill(false),
    year: Array(cardsToAnimation.year?.length).fill(false),
    day_month: Array(cardsToAnimation.day_month?.length).fill(false),
  });

  //   console.log(cardsToAnimation);

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
              <FrontBackCard className="front">
                <img
                  src="https://user-images.githubusercontent.com/29821340/271224792-d46756c4-7aa7-4739-9fdf-4ea909e153f5.svg"
                  alt=""
                />
              </FrontBackCard>
              <FrontBackCard className="back">
                <img
                  src="https://user-images.githubusercontent.com/29821340/271226281-28d66500-a306-4cfa-af5d-9abd2a59203d.svg"
                  alt=""
                />
                <div className="gif">
                  <img
                    src="https://user-images.githubusercontent.com/29821340/271261346-7facc6f8-419c-40a5-b684-9a2f659c29e1.gif"
                    alt=""
                  />
                </div>
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
              <FrontBackCard className="front">
                <img
                  src="https://user-images.githubusercontent.com/29821340/271224792-d46756c4-7aa7-4739-9fdf-4ea909e153f5.svg"
                  alt=""
                />
              </FrontBackCard>
              <FrontBackCard className="back">
                <img
                  src="https://user-images.githubusercontent.com/29821340/271226281-28d66500-a306-4cfa-af5d-9abd2a59203d.svg"
                  alt=""
                />
                <div className="gif">
                  <img
                    src="https://user-images.githubusercontent.com/29821340/271261346-7facc6f8-419c-40a5-b684-9a2f659c29e1.gif"
                    alt=""
                  />
                </div>
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
              <FrontBackCard className="front">
                <img
                  src="https://user-images.githubusercontent.com/29821340/271224792-d46756c4-7aa7-4739-9fdf-4ea909e153f5.svg"
                  alt=""
                />
              </FrontBackCard>
              <FrontBackCard className="back">
                <img
                  src="https://user-images.githubusercontent.com/29821340/271226281-28d66500-a306-4cfa-af5d-9abd2a59203d.svg"
                  alt=""
                />
                <div className="gif">
                  <img
                    src="https://user-images.githubusercontent.com/29821340/271261346-7facc6f8-419c-40a5-b684-9a2f659c29e1.gif"
                    alt=""
                  />
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
              <FrontBackCard className="front">
                <img
                  src="https://user-images.githubusercontent.com/29821340/271224792-d46756c4-7aa7-4739-9fdf-4ea909e153f5.svg"
                  alt=""
                />
              </FrontBackCard>
              <FrontBackCard className="back">
                <img
                  src="https://user-images.githubusercontent.com/29821340/271226281-28d66500-a306-4cfa-af5d-9abd2a59203d.svg"
                  alt=""
                />
                <div className="gif">
                  <img
                    src="https://user-images.githubusercontent.com/29821340/271261346-7facc6f8-419c-40a5-b684-9a2f659c29e1.gif"
                    alt=""
                  />
                </div>
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

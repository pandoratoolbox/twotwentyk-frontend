import React, { useState } from "react";
import { ModalProps } from "../../types";
import { Modal as ModalWrapper } from "./Modal";
import { ICardPackCards } from "../../models/card_pack";
import {
  OpenCardPackModalWrapper,
  OpenCard,
  OpenCardContent,
  FrontBackCard,
} from "./styles";

type OpenCardPackModalProps = {
  cardsToAnimation: ICardPackCards;
} & ModalProps;

export const OpenCardPackModal: React.FC<OpenCardPackModalProps> = ({
  cardsToAnimation,
  onClose,
  open,
}) => {
  const [flipActive, setFlipActive] = useState(false);

  console.log(cardsToAnimation);
  return (
    <ModalWrapper open={open} onClose={onClose} width={1400}>
      <OpenCardPackModalWrapper>
        {cardsToAnimation?.crafting?.map((item, index) => (
          <OpenCard
            key={index}
            onClick={() => {
              setFlipActive(!flipActive);
            }}
          >
            <OpenCardContent className={flipActive ? "active" : ""}>
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
              setFlipActive(!flipActive);
            }}
          >
            <OpenCardContent className={flipActive ? "active" : ""}>
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
              setFlipActive(!flipActive);
            }}
          >
            <OpenCardContent className={flipActive ? "active" : ""}>
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
              setFlipActive(!flipActive);
            }}
          >
            <OpenCardContent className={flipActive ? "active" : ""}>
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
    </ModalWrapper>
  );
};

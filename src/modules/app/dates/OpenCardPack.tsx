import React, { useState, useEffect } from "react";
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
import { checkRarity, formatCategory } from "../../../utils/helperFunctions";
import { Loader } from "../../../components";

type Props = {
  cardsToAnimation: ICardPackCards;
  onClose: () => void;
  flipActive: any;
  setFlipActive: (value: any) => void;
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

const OpenCardPack: React.FC<Props> = ({
  cardsToAnimation,
  onClose,
  flipActive,
  setFlipActive,
}) => {
  const { monthContext } = useMonthContext();

  const [videoPlayed, setVideoPlayed] = useState(false);

  // Use useEffect to play the video when the component mounts
  useEffect(() => {
    if (!videoPlayed) {
      // Get the video element by its ID (replace 'your-video-id' with the actual ID)
      const video = document.getElementById(
        "your-video-id"
      ) as HTMLVideoElement;

      if (video) {
        video.play().then(() => {
          setVideoPlayed(true);
        });
      }
    }
  }, [videoPlayed]);

  return (
    <>
      {!videoPlayed ? (
        <video id="your-video-id" width="1000" height="1000" controls>
          <source
            src="/assets/nfts/Card-Pack-Opening-Final-720.mov"
            type="video/mp4"
          />
        </video>
      ) : (
        <>
          <OpenCardPackModalWrapper>
            {cardsToAnimation?.crafting?.map((item, index) => (
              <OpenCard
                key={index}
                onClick={() => {
                  const newFlipActive = { ...flipActive };
                  newFlipActive.crafting[index] =
                    !newFlipActive.crafting[index];
                  setFlipActive(newFlipActive);
                }}
              >
                <OpenCardContent
                  className={flipActive.crafting[index] ? "active" : ""}
                >
                  {item?.rarity ? (
                    <>
                      <FrontCardComponent rarity={item?.rarity} />
                      <FrontBackCard className="back">
                        <img
                          src={`/assets/nfts/rarity/Crafting-${checkRarity(
                            item?.rarity
                          )}-copy.png`}
                          alt="nft"
                        />
                      </FrontBackCard>
                    </>
                  ) : (
                    <Loader />
                  )}
                </OpenCardContent>
              </OpenCard>
            ))}

            {cardsToAnimation?.category?.map((item, index) => (
              <OpenCard
                key={index}
                onClick={() => {
                  const newFlipActive = { ...flipActive };
                  newFlipActive.category[index] =
                    !newFlipActive.category[index];
                  setFlipActive(newFlipActive);
                }}
              >
                <OpenCardContent
                  className={flipActive.category[index] ? "active" : ""}
                >
                  {item?.rarity && item?.category ? (
                    <>
                      <FrontCardComponent rarity={item?.rarity} />
                      <FrontBackCard className="back">
                        <img
                          src={`/assets/nfts/rarity/${formatCategory(
                            item?.category
                          )}-${checkRarity(item?.rarity)}.png`}
                          alt="nft"
                        />
                      </FrontBackCard>
                    </>
                  ) : (
                    <Loader />
                  )}
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
                <OpenCardContent
                  className={flipActive.year[index] ? "active" : ""}
                >
                  {item?.rarity && item?.day && item?.month ? (
                    <>
                      <FrontCardComponent rarity={item?.rarity} />
                      <FrontBackCard className="back">
                        <img
                          src={`/assets/nfts/rarity/Month-Day-${checkRarity(
                            item?.rarity
                          )}-copy.png`}
                          alt="nft"
                        />
                        <div className="gif">
                          {monthContext && (
                            <h3>
                              {item?.day}{" "}
                              {(monthContext as Map<number, string>).get(
                                item.month
                              )}
                            </h3>
                          )}
                        </div>
                      </FrontBackCard>
                    </>
                  ) : (
                    <Loader />
                  )}
                </OpenCardContent>
              </OpenCard>
            ))}

            {cardsToAnimation?.year?.map((item, index) => (
              <OpenCard
                key={index}
                onClick={() => {
                  const newFlipActive = { ...flipActive };
                  newFlipActive.day_month[index] =
                    !newFlipActive.day_month[index];
                  setFlipActive(newFlipActive);
                }}
              >
                <OpenCardContent
                  className={flipActive.day_month[index] ? "active" : ""}
                >
                  {item?.rarity && item?.year ? (
                    <>
                      <FrontCardComponent rarity={item?.rarity} />
                      <FrontBackCard className="back">
                        <img
                          src={`/assets/nfts/rarity/Year-${checkRarity(
                            item?.rarity
                          )}-copy.png`}
                          alt="nft"
                        />
                        <div className="gif">
                          <h3>{item?.year}</h3>
                        </div>
                      </FrontBackCard>
                    </>
                  ) : (
                    <Loader />
                  )}
                </OpenCardContent>
              </OpenCard>
            ))}
          </OpenCardPackModalWrapper>

          <BackCardPacks onClick={onClose}>
            <IconArrowBack />
            Back to Card packs
          </BackCardPacks>
        </>
      )}
    </>
  );
};

export default OpenCardPack;

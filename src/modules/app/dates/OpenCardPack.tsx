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

  const handleVideoEnded = () => {
    setVideoPlayed(true);
  };

  return (
    <>
      {!videoPlayed ? (
        <video
          id="your-video-id"
          width="1000"
          height="1000"
          controls
          autoPlay
          onEnded={handleVideoEnded}
        >
          <source
            src="https://rr5---sn-4g5lznlz.c.drive.google.com/videoplayback?expire=1697023168&ei=kFomZcyED4-G8wSA6I7wDw&ip=78.109.18.227&cp=QVROWUFfUlFUSVhPOmRpSTNzR1pQZ2hGM0VNcndmbUZzNFowRlJPbE83dGZIYXp0OWc4ZS1kajQ&id=a50f594437b29e67&itag=18&source=webdrive&requiressl=yes&xpc=EghotM6WJ3oBAQ==&mh=QA&mm=32&mn=sn-4g5lznlz&ms=su&mv=u&mvi=5&pl=24&ttl=transient&susc=dr&driveid=1Sq1WG-HMY4jIBZT_fDdizkMdM4JvpSGk&app=explorer&mime=video/mp4&vprv=1&prv=1&dur=5.085&lmt=1696957003619958&mt=1697010668&subapp=DRIVE_WEB_FILE_VIEWER&txp=0001224&sparams=expire,ei,ip,cp,id,itag,source,requiressl,xpc,ttl,susc,driveid,app,mime,vprv,prv,dur,lmt&sig=AGM4YrMwRQIgEKtWl4tYSlk1aCzL7hUOqMdNNsC_WrImS-M2a-bcA34CIQDq3wwxRRqml8nk1w9OeUsTG-w6V1bJ2aLS3J1u-e0iqQ==&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AK1ks_kwRQIhALOR5F8CKPNKqvj_1BfEWswHTsMqsGttrxJ-krOi-0oTAiAmDM7sMeV6U6Sm-ZGcdU7WA48dqFaiD6vEcw2t8nXzAQ==&cpn=Wqu9lNiGd-nw86s7&c=WEB_EMBEDDED_PLAYER&cver=1.20231008.00.00"
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

import React, { useEffect, useRef, useState } from "react";
import { AppLayout } from "../../../layout/AppLayout";
import {
  CraftLeftWrapper,
  CraftRightWrapper,
  CraftingWrapper,
} from "../identities/styles";
import { PredictionMatchListSection } from "../../../modules/crafting/PredictionMatchListSection";
import { CardPreviewSection } from "../../../modules";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, CraftPredictionModal } from "../../../components";
import { ToastContainer, toast } from "react-toastify";
import { craftingPrediction } from "../../../actions";
// import { useMyNFTsContext } from "../../../context";
// import { myNFTsData } from "../../../data/nfts";
// import { INftCardDayMonth } from "../../../models/nft_card_day_month";
// import { INftCardYear } from "../../../models/nft_card_year";
// import { INftCardCategory } from "../../../models/nft_card_category";
import { INftCardIdentity } from "../../../models/nft_card_identity";
import { INftCardTrigger } from "../../../models/nft_card_trigger";
import { INftCardCrafting } from "../../../models/nft_card_crafting";
import { PredictionCraftSection } from "../../../modules/crafting/PredictionCraftSection";
import { PredictionSelectCardSection } from "../../../modules/crafting/PredictionSelectCardSection";
import { getMyNftCardCrafting } from "../../../actions/nft_card_crafting";
import { getMyNftCardTrigger } from "../../../actions/nft_card_trigger";
import { getMyNftCardIdentity } from "../../../actions/nft_card_identity";
import { useAuthContext } from "../../../context";

interface ISelectedCards {
  crafting: INftCardCrafting | null;
  identity: INftCardIdentity | null;
  triggers: Array<INftCardTrigger> | null;
}

export const CraftingPredictionsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authContext } = useAuthContext();
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [selectedCraft, setSelectedCraft] = useState("crafting");
  const [clickedCard, setClickedCard] = useState<number | string | null>(-1);
  const [selectedCard, setSelectedCard] = useState<number | string | null>(-1);
  const [selectedCards, setSelectedCards] = useState<ISelectedCards>({
    crafting: null,
    identity: null,
    triggers: null,
  });
  const [clickedNft, setClickedNft] = useState<
    INftCardCrafting | INftCardIdentity | INftCardTrigger
  >();
  const [clickedCraft, setClickedCraft] = useState("crafting");
  const inCrafting = useRef<boolean>(false);

  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    setCurrentUser(localStorage.getItem("auth"));
  }, []);

  const handleVideoEnded = () => {
    setPlayVideo(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("selectedCraft") && params.get("id")) {
      const getNFTCrafting = async () => {
        const idd = params.get("id");
        const craft = params.get("selectedCraft") as string;

        if (craft === "crafting") {
          const response = await getMyNftCardCrafting(null);
          if (response.data?.length) {
            const crafting = response.data.find(
              (value) => value?.id?.toString() === idd
            );
            setSelectedCards({ crafting } as ISelectedCards);
          }
        } else if (craft === "trigger") {
          const response = await getMyNftCardTrigger(null);
          if (response.data) {
            const triggers = response.data.filter(
              (value) => value?.id?.toString() === idd
            );
            setSelectedCards({ triggers } as ISelectedCards);
          }
        } else if (craft === "identity") {
          const response = await getMyNftCardIdentity(null);
          if (response.data) {
            const identity = response.data.find(
              (value) => value?.id?.toString() === idd
            );
            setSelectedCards({ identity } as ISelectedCards);
          }
        }
        setSelectedCraft(selectedCraft);
        setClickedCard(idd);
      };
      getNFTCrafting();
    }
  }, [location.search]);

  const handleCardClick = (
    key: string | number | null,
    item: INftCardCrafting | INftCardIdentity | INftCardTrigger
  ) => {
    if (key === clickedCard) {
      setClickedCard(-1);
      setClickedNft(undefined);
    } else {
      setClickedCard(key);
      setClickedNft(item);
      setClickedCraft(selectedCraft);
    }
  };

  const handleCardSelected = (id: string | number | null, craft: string) => {
    // if (craft === "trigger" && selectedCards.trigger != null) {
    //   setSelectedCards((prev) => ({ ...prev, trigger: [...prev.trigger, id] }));
    // } else {
    //   setSelectedCards((prev) => ({ ...prev, [craft]: id }));
    // }
    // setSelectedCard(id);
  };

  const handleSelectCardCrafting = (card: INftCardCrafting) => {
    setSelectedCards((prev) => ({
      triggers: prev.triggers,
      crafting: card,
      identity: prev.identity,
    }));
    if (card.id) setSelectedCard(card.id);
  };

  const handleSelectCardIdentity = (card: INftCardIdentity) => {
    setSelectedCards((prev) => ({
      triggers: prev.triggers,
      crafting: prev.crafting,
      identity: card,
    }));
    if (card.id) setSelectedCard(card.id);
  };

  const handleSelectCardTrigger = (card: INftCardTrigger) => {
    let tr = selectedCards.triggers;
    if (tr) {
      tr.push(card);
    } else {
      tr = [card];
    }

    setSelectedCards((prev) => ({
      triggers: tr,
      crafting: prev.crafting,
      identity: prev.identity,
    }));
    if (card.id) setSelectedCard(card.id);
  };

  const handleCraft = () => {
    setCraftPopup(true);
    // craftPrediction();
  };

  const craftPrediction = async () => {
    if (inCrafting.current) {
      return;
    }
    if (selectedCards.identity === null) {
      toast.error("Select an Identity card");
      return;
    }

    if (selectedCards.triggers === null || selectedCards.triggers.length < 1) {
      toast.error("Select atleast one Trigger card");
      return;
    }

    if (selectedCards.crafting === null) {
      toast.error("Select a Crafting card");
      return;
    }

    let trigger_ids: number[] = [];

    selectedCards.triggers.forEach((v) => {
      if (v.id) {
        trigger_ids.push(v.id);
      }
    });

    const newCraft = {
      nft_card_trigger_ids: trigger_ids,
      nft_card_identity_id: Number(selectedCards.identity.id),
      nft_card_crafting_id: Number(selectedCards.crafting?.id),
    };
    inCrafting.current = true;
    const res = await craftingPrediction(newCraft);
    if (res.success) {
      toast.success("Crafted Successfully.");
      closePopup();

      setPlayVideo(true);
    } else {
      toast.error(res.message);
    }
    inCrafting.current = false;
  };

  const [craftPopup, setCraftPopup] = useState<boolean>(false);

  const closePopup = () => {
    setCraftPopup(false);
  };

  return (
    <AppLayout noFooter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <CraftPredictionModal
        open={craftPopup}
        onClose={closePopup}
        onBurn={craftPrediction}
      />
      {playVideo ? (
        <video
          width="1000"
          height="1000"
          controls
          autoPlay
          onEnded={handleVideoEnded}
        >
          <source
            src="https://rr3---sn-4g5edndl.c.drive.google.com/videoplayback?expire=1697023942&ei=ll0mZZLZGfikpb0Pt9-FQA&ip=78.109.18.227&cp=QVROWUFfUllSQ1hPOmRpSTNhRVRQZ2hGM0VNenV6bUZzNFowRlpNZk83dGZIYXpiN2E4ZS1kajQ&id=24a54694ad3565dd&itag=18&source=webdrive&requiressl=yes&xpc=EghotM6WJ3oBAQ==&mh=yY&mm=32&mn=sn-4g5edndl&ms=su&mv=m&mvi=3&pl=24&ttl=transient&susc=dr&driveid=1RYAQzpiTfz19j75p0SESJaEv1QcO0C8H&app=explorer&mime=video/mp4&vprv=1&prv=1&dur=24.125&lmt=1696560162912228&mt=1697012720&subapp=DRIVE_WEB_FILE_VIEWER&txp=0001224&sparams=expire,ei,ip,cp,id,itag,source,requiressl,xpc,ttl,susc,driveid,app,mime,vprv,prv,dur,lmt&sig=AGM4YrMwRQIgVRMz933zsMaBrMdGB-qaLuS9DJQqsWFYMn5yoHFcC1QCIQD_osNRhic-F95_oPuRF6yielk8Svlm3wrIHfVIC-xJLw==&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AK1ks_kwRAIgQhNrZiGOKdqzRF5P1fXTPCNM89D4uWTQ_SAQoWU8KX4CIA2tKHChw2H7Cwcn3mtLikH1rkJSmrXyZiS6_ESpJSI4&cpn=hWxomT7dSwBlirX_&c=WEB_EMBEDDED_PLAYER&cver=1.20231008.00.00"
            type="video/mp4"
          />
        </video>
      ) : (
        <CraftingWrapper>
          {authContext?.isAuthenticated ? (
            <>
              <CraftLeftWrapper>
                <PredictionCraftSection
                  onCraft={handleCraft}
                  onCraftChanged={setSelectedCraft}
                  selectedCards={selectedCards}
                  selectedCraft={selectedCraft}
                  selectedCard={selectedCard}
                  clickedCard={clickedCard}
                  onCardClicked={handleCardClick}
                  onSelectCardCrafting={handleSelectCardCrafting}
                  onSelectCardIdentity={handleSelectCardIdentity}
                  onSelectCardTrigger={handleSelectCardTrigger}
                />
                {/* <PredictionSelectCardSection
              selectedCard={selectedCard}
              clickedCard={clickedCard}
              selectedCraft={selectedCraft}
              onCardClicked={handleCardClick}
              onSelectCardCrafting={handleSelectCardCrafting}
              onSelectCardIdentity={handleSelectCardIdentity}
              onSelectCardTrigger={handleSelectCardTrigger}
            /> */}
              </CraftLeftWrapper>
              <CraftRightWrapper>
                <PredictionMatchListSection selectedCards={selectedCards} />
                <CardPreviewSection
                  page="prediction"
                  clickedCard={clickedCard}
                  selectedCraft={clickedCraft}
                  clickedNft={clickedNft}
                />
              </CraftRightWrapper>
            </>
          ) : (
            <>
              <div className="unAuth-display">
                <p>
                  Identities are cards crafted by combining an Identity with at
                  least one trigger.
                </p>
                <h4>Log in to start playing.</h4>
                <Button
                  className="login-button"
                  onClick={() => navigate("/signin")}
                >
                  Login Now
                </Button>
              </div>
            </>
          )}
        </CraftingWrapper>
      )}
    </AppLayout>
  );
};

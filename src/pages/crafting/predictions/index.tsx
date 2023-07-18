import React, { useEffect, useState } from "react";
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

export const CraftingPredictionsPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [selectedCraft, setSelectedCraft] = useState("crafting");
  const [clickedCard, setClickedCard] = useState<number | string | null>(-1);
  const [selectedCard, setSelectedCard] = useState<number | string | null>(-1);
  const [selectedCards, setSelectedCards] = useState<{
    crafting: INftCardCrafting | null;
    identity: INftCardIdentity | null;
    triggers: Array<INftCardTrigger> | null;
  }>({
    crafting: null,
    identity: null,
    triggers: null,
  });

  useEffect(() => {
    setCurrentUser(localStorage.getItem("auth"));
  }, []);

  useEffect(() => {
    if (params.get("id")) {
      setClickedCard(params.get("id"));
    }
  }, [params]);

  const handleCardClick = (key: string | number | null) => {
    if (key === clickedCard) {
      setClickedCard(-1);
    } else {
      setClickedCard(key);
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
    const res = await craftingPrediction(newCraft);
    if (res.success) {
      toast.success("Crafted Successfully.");
      closePopup();
    } else {
      toast.error(res.message);
    }
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
      <CraftingWrapper>
        {currentUser ? (
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
                selectedCraft={selectedCraft}
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
    </AppLayout>
  );
};

import React, { useEffect, useState } from "react";
import { AppLayout } from "../../../layout/AppLayout";
import { CraftLeftWrapper, CraftRightWrapper, CraftingWrapper } from "./styles";
import { CardPreviewSection, IdentityMatchListSection } from "../../../modules";
import { Button, CraftIdentityModal, IconArrowDown } from "../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { craftingIdentity, getMyNFTs } from "../../../actions";
import { ToastContainer, toast } from "react-toastify";
import { useMyNFTsContext } from "../../../context";
import { ICelebrity } from "../../../models/celebrity";
import { INftCardDayMonth } from "../../../models/nft_card_day_month";
import { INftCardYear, NftCardYear } from "../../../models/nft_card_year";
import { INftCardCategory } from "../../../models/nft_card_category";
import { INftCardIdentity } from "../../../models/nft_card_identity";
import { INftCardTrigger } from "../../../models/nft_card_trigger";
import { INftCardCrafting } from "../../../models/nft_card_crafting";
import { IdentitySelectCardSection } from "../../../modules/crafting/IdentitySelectCardSection";
import { IdentityCraftSection } from "../../../modules/crafting/IdentityCraftSection";
import { CloseButton } from "../../../components/Modals/styles";
import { OpenPreview } from "../../../modules/crafting/styles";
import api from "../../../config/api";
import { getMyNftCardCrafting } from "../../../actions/nft_card_crafting";
import { getMyNftCardCategory } from "../../../actions/nft_card_category";
import { getMyNftCardYear } from "../../../actions/nft_card_year";
import { getMyNftCardDayMonth } from "../../../actions/nft_card_day_month";

export const CraftingIdentitesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [selectedCraft, setSelectedCraft] = useState("crafting");
  const [clickedCard, setClickedCard] = useState<number | string | null>(-1);
  const [selectedCard, setSelectedCard] = useState<number | string | null>(-1);
  const [selectedCards, setSelectedCards] = useState<{
    crafting: INftCardCrafting | null;
    year: INftCardYear | null;
    dayMonth: INftCardDayMonth | null;
    category: INftCardCategory | null;
  }>({
    crafting: null,
    category: null,
    dayMonth: null,
    year: null,
  });
  const [confirm, setConfirm] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedCelebrity, setSelectedCelebrity] = useState<ICelebrity | null>(
    null
  );

  const [myNfts, setMyNfts] = useState<{
    crafting: INftCardCrafting[] | null;
    category: INftCardCategory[] | null;
    dayMonth: INftCardDayMonth[] | null;
    year: INftCardYear[] | null;
  }>({
    crafting: null,
    category: null,
    dayMonth: null,
    year: null,
  });

  const loadMyNfts = async () => {
    try {
      let crafting = await getMyNftCardCrafting(null);
      if (!crafting.data) {
        throw "Error getting crafting cards";
      }

      let category = await getMyNftCardCategory(null);
      if (!category.data) {
        throw "Error getting category cards";
      }

      let dayMonth = await getMyNftCardDayMonth(null);
      if (!dayMonth.data) {
        throw "Error getting day-month cards";
      }

      let year = await getMyNftCardYear(null);
      if (!year.data) {
        throw "Error getting year cards";
      }

      setMyNfts({
        crafting: crafting.data,
        category: category.data,
        dayMonth: dayMonth.data,
        year: year.data,
      });
    } catch (e: any) {
      toast.error(e);
    }
  };

  useEffect(() => {
    setCurrentUser(localStorage.getItem("auth"));
    loadMyNfts();
  }, []);

  useEffect(() => {
    if (params.get("id")) {
      console.log(params.get("id"));
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
    setSelectedCards((prev) => ({ ...prev, [craft]: id }));
    setSelectedCard(id);
  };

  const handleSelectCardCategory = (card: INftCardCategory) => {
    setSelectedCards((prev) => ({
      category: card,
      dayMonth: prev.dayMonth,
      year: prev.year,
      crafting: prev.crafting,
    }));
    if (card.id) setSelectedCard(card.id);
  };

  const handleSelectCardCrafting = (card: INftCardCrafting) => {
    setSelectedCards((prev) => ({ ...prev, crafting: card }));
    // if (card.id) setSelectedCard(card.id);
  };

  const handleSelectCardDayMonth = (card: INftCardDayMonth) => {
    setSelectedCards((prev) => ({ ...prev, dayMonth: card }));
    if (card.id) setSelectedCard(card.id);
  };

  const handleSelectCardYear = (card: INftCardYear) => {
    setSelectedCards((prev) => ({ ...prev, year: card }));
    if (card.id) setSelectedCard(card.id);
  };

  const handleCraft = () => {
    // craftIdentity();
    setConfirm(true);
  };

  const craftIdentity = async () => {
    if (selectedCards.dayMonth === null) {
      toast.error("Select a Day-Month card");
      return;
    }

    if (selectedCards.year === null) {
      toast.error("Select a Year card");
      return;
    }

    if (selectedCards.category === null) {
      toast.error("Select a Category card");
      return;
    }

    if (selectedCards.crafting === null) {
      toast.error("Select a Crafting card");
      return;
    }

    let newCraft: {
      nft_card_day_month_id: number;
      nft_card_year_id: number;
      nft_card_crafting_id: number;
      nft_card_category_id: number;
      celebrity_id: number | null;
    } = {
      nft_card_day_month_id: Number(selectedCards.dayMonth.id),
      nft_card_year_id: Number(selectedCards.year.id),
      nft_card_crafting_id: Number(selectedCards.crafting?.id),
      nft_card_category_id: Number(selectedCards.category?.id),
      celebrity_id: null,
    };

    if (selectedCelebrity !== null) {
      newCraft.celebrity_id = Number(selectedCelebrity?.id);
    }

    const res = await craftingIdentity(newCraft);
    if (res.success) {
      toast.success("Crafted Successfully.");
      setConfirm(false);
    } else {
      toast.error(res.message);
    }
  };

  const handleSelectCelebrity = (c: ICelebrity | null) => {
    setSelectedCelebrity(c);
  };

  return (
    <AppLayout noFooter>
      <OpenPreview onClick={() => setIsOpen(true)}>
        <IconArrowDown />
      </OpenPreview>
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
      <CraftIdentityModal
        selectCelebrity={handleSelectCelebrity}
        open={confirm}
        onClose={() => setConfirm(false)}
        onCraft={craftIdentity}
        selectedCards={selectedCards}
      />
      <CraftingWrapper>
        {currentUser ? (
          <>
            <CraftLeftWrapper>
              <IdentityCraftSection
                onCraft={handleCraft}
                onCraftChanged={setSelectedCraft}
                selectedCards={selectedCards}
                selectedCraft={selectedCraft}
                clickedCard={clickedCard}
                selectedCard={selectedCard}
                onCardClicked={handleCardClick}
                onSelectCardCrafting={handleSelectCardCrafting}
                onSelectCardCategory={handleSelectCardCategory}
                onSelectCardDayMonth={handleSelectCardDayMonth}
                onSelectCardYear={handleSelectCardYear}
                myNfts={myNfts}
                setMyNfts={setMyNfts}
              />
              {/* <IdentitySelectCardSection
                clickedCard={clickedCard}
                selectedCard={selectedCard}
                selectedCraft={selectedCraft}
                onCardClicked={handleCardClick}
                onSelectCardCrafting={handleSelectCardCrafting}
                onSelectCardCategory={handleSelectCardCategory}
                onSelectCardDayMonth={handleSelectCardDayMonth}
                onSelectCardYear={handleSelectCardYear}
                myNfts={myNfts}
                setMyNfts={setMyNfts}
              /> */}
            </CraftLeftWrapper>
            <CraftRightWrapper open={isOpen ? "true" : undefined}>
              <CloseButton
                className="close-button"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </CloseButton>
              <IdentityMatchListSection
                page="identity"
                selectedCards={selectedCards}
                myNfts={myNfts}
                onSelectCardDayMonth={handleSelectCardDayMonth}
                onSelectCardYear={handleSelectCardYear}
                onSelectCardCategory={handleSelectCardCategory}
              />
              <CardPreviewSection
                page="identity"
                clickedCard={clickedCard}
                selectedCraft={selectedCraft}
              />
            </CraftRightWrapper>
          </>
        ) : (
          <div className="unAuth-display">
            <p>
              Identities are cards crafted by combining a Day-Month card, a Year
              card and a Category card
            </p>
            <h4>Log in to start playing.</h4>
            <Button
              className="login-button"
              onClick={() => navigate("/signin")}
            >
              Login Now
            </Button>
          </div>
        )}
      </CraftingWrapper>
    </AppLayout>
  );
};

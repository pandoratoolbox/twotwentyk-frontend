import React, { useEffect, useState } from "react";
import { AppLayout } from "../../../layout/AppLayout";
import {
  ButtonGroup,
  DatePageContainer,
  DatePageTitleWrapper,
  DatesPageWrapper,
  EmptyCards,
} from "./styles";
import { Button, SellConfirmModal, Loader } from "../../../components";
import {
  CardGridSection,
  CardPackFilterSection,
  SellDateCardSection,
  ViewDateCardSection,
} from "../../../modules";
import { useNavigate } from "react-router-dom";
import { getMyNftCardPack } from "../../../actions/nft_card_pack";
import { newMarketplaceList } from "../../../actions/marketplace_listing";
import {
  getFilterCardType,
  getFilterRarities,
  getFilterStatus,
  getFilterCollection,
  getFilterCategory,
  getFilterPackType,
  getFilterTriggerType,
} from "../../../actions/filtering";
import { EmptyCards as LoginCard } from "../dates/styles";
import { DatePageContent } from "../category/styles";
import { ICardSeries } from "../../../models/card_series";
import { ICardPack } from "../../../models/card_pack";

export const CardPackPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [isView, setIsView] = useState<"view" | "sell" | "">("");
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFilter, setIsLoadingFilter] = useState(false);

  const [nftCardPack, setNftCardPack] = useState<ICardPack[] | null>(
    null
  );

  const getPageData = async () => {
    setIsLoading(true);

    const response = await getMyNftCardPack();
    if (response?.data) {
      console.log(response?.data);
      setNftCardPack(response?.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPageData();
  }, []);

  useEffect(() => {
    setCurrentUser(localStorage.getItem("auth"));
  }, []);

  const handleSellConfirm = async (
    id: number | string,
    collection_id: string | number,
    price: string | number
  ) => {
    const newMarketplace = {
      nft_collection_id: collection_id,
      nft_id: id,
      price: price,
    };
    const response = await newMarketplaceList(newMarketplace);
    if (response.success) {
      setModal(true);
      setIsView("");
    }
  };

  const handleView = (item: any) => {
    console.log(item);
    setSelectedItem(item);
    setIsView("view");
  };

  const handleCraft = (id: string | number) => {
    navigate("/crafting/identities");
  };

  const handleSell = (item: any) => {
    setSelectedItem(item);
    setIsView("sell");
  };

  // filter option click
  const handleOptionClick = async (
    filterType: string,
    selectedOptions: string[]
  ) => {
    setIsLoadingFilter(true);

    let res;
    if (filterType === "Card Types") {
      res = await getFilterCardType(selectedOptions);
    } else if (filterType === "All Rarities") {
      res = await getFilterRarities(selectedOptions);
    } else if (filterType === "Status") {
      res = await getFilterStatus(selectedOptions);
    } else if (filterType === "Category") {
      res = await getFilterCategory(selectedOptions);
    } else if (filterType === "Pack Types") {
      res = await getFilterPackType(selectedOptions);
    } else if (filterType === "Triggers Type") {
      res = await getFilterTriggerType(selectedOptions);
    } else if (filterType === "Collections") {
      res = await getFilterCollection(selectedOptions[0]);
    }
    if (res?.data) {
      setNftCardPack(res?.data as ICardPack[]);
    }
    setIsLoadingFilter(false);
  };
  return (
    <AppLayout>
      <SellConfirmModal open={modal} onClose={() => setModal(false)} />
      {currentUser ? (
        nftCardPack && nftCardPack?.length > 0 ? (
          <DatesPageWrapper isview={isView ? "true" : undefined}>
            <DatePageContainer>
              <DatePageTitleWrapper>
                <h3>Card Packs</h3>
              </DatePageTitleWrapper>
              <DatePageContent>
                <ButtonGroup>
                  <Button
                    className="buy-button"
                    onClick={() => navigate("/buy")}
                  >
                    Buy Packs
                  </Button>
                </ButtonGroup>
                <CardPackFilterSection onClick={handleOptionClick} />
                {!isLoadingFilter ? (
                  <CardGridSection
                    cardType="cardPacks"
                    data={nftCardPack}
                    onCraft={handleCraft}
                    onSell={handleSell}
                    onView={handleView}
                  />
                ) : (
                  <Loader />
                )}
                <ViewDateCardSection
                  cardType="cardPacks"
                  isView={isView === "view"}
                  item={selectedItem}
                  onClose={() => setIsView("")}
                />
                <SellDateCardSection
                  cardType="cardPacks"
                  onSellConfirm={handleSellConfirm}
                  isView={isView === "sell"}
                  item={selectedItem}
                  onClose={() => setIsView("")}
                />
              </DatePageContent>
            </DatePageContainer>
          </DatesPageWrapper>
        ) : !isLoading ? (
          <EmptyCards>
            <h3>No Card Packs</h3>
            <p>It looks like you don’t have any cards packs to open.  </p>
            <Button className="buy-button" onClick={() => navigate("/buy")}>
              Buy Packs
            </Button>
          </EmptyCards>
        ) : (
          <Loader />
        )
      ) : (
        <LoginCard className="login">
          <p className="login">Log in to start playing</p>
          <Button className="buy-button" onClick={() => navigate("/signin")}>
            Login Now
          </Button>
        </LoginCard>
      )}
    </AppLayout>
  );
};

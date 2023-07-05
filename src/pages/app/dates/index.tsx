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
  DatesFilterSection,
  SellDateCardSection,
  ViewDateCardSection,
} from "../../../modules";
import { useNavigate } from "react-router-dom";
import { getMyNftCardDayMonth } from "../../../actions/nft_card_day_month";
import { newMarketplaceList } from "../../../actions/marketplace_listing";
import { INftCardDayMonth } from "../../../models/nft_card_day_month";
import {
  getFilterCardType,
  getFilterRarities,
  getFilterStatus,
  getFilterCollection,
  getFilterCategory,
  getFilterPackType,
  getFilterTriggerType,
} from "../../../actions/filtering";

export const DatesPage: React.FC = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [isView, setIsView] = useState<"view" | "sell" | "">("");
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [nftCardDayMonthData, setNftCardDayMonthData] = useState<
    INftCardDayMonth[] | null
  >(null);

  useEffect(() => {
    setCurrentUser(localStorage.getItem("auth"));
  }, []);

  const getPageData = async () => {
    setIsLoading(true);
    const token = localStorage.auth;
    const response = await getMyNftCardDayMonth(token);
    if (response?.data) {
      setNftCardDayMonthData(response?.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPageData();
  }, []);

  const handleSellConfirm = async (
    id: number | string,
    collection_id: string | number,
    price: string | number
  ) => {
    const token = localStorage.auth;
    const newMarketplace = {
      nft_collection_id: collection_id,
      nft_id: id,
      price: price,
    };
    const response = await newMarketplaceList(newMarketplace, token);

    if (response.success) {
      setModal(true);
      setIsView("");
    }
  };

  const handleView = (item: any) => {
    setSelectedItem(item);
    setIsView("view");
  };

  const handleCraft = (item: any) => {
    navigate("/crafting/identities?id=" + item.id);
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
    setNftCardDayMonthData(null);
    setIsLoading(true);
    const token = localStorage.auth;

    let res;
    if (filterType === "Card Types") {
      res = await getFilterCardType(selectedOptions, token);
    } else if (filterType === "All Rarities") {
      res = await getFilterRarities(selectedOptions, token);
    } else if (filterType === "Status") {
      res = await getFilterStatus(selectedOptions, token);
    } else if (filterType === "Category") {
      res = await getFilterCategory(selectedOptions, token);
    } else if (filterType === "Pack Types") {
      res = await getFilterPackType(selectedOptions, token);
    } else if (filterType === "Triggers Type") {
      res = await getFilterTriggerType(selectedOptions, token);
    } else if (filterType === "Collections") {
      res = await getFilterTriggerType(selectedOptions, token);
    }
    if (res?.data) {
      setNftCardDayMonthData(res?.data as INftCardDayMonth[]);
    }
    setIsLoading(false);
  };

  return (
    <AppLayout>
      <SellConfirmModal open={modal} onClose={() => setModal(false)} />

      {currentUser ? (
        nftCardDayMonthData && nftCardDayMonthData?.length > 0 ? (
          <DatesPageWrapper isview={isView ? "true" : undefined}>
            <DatePageContainer>
              <DatePageTitleWrapper>
                <h3>Date Cards</h3>
                <ButtonGroup>
                  <Button className="buy-button">Buy Cards</Button>
                  <Button
                    className="buy-button"
                    onClick={() => navigate("/buy")}
                  >
                    Buy Packs
                  </Button>
                </ButtonGroup>
              </DatePageTitleWrapper>
              <DatesFilterSection onClick={handleOptionClick} />
              <CardGridSection
                cardType="date"
                data={nftCardDayMonthData}
                onCraft={handleCraft}
                onSell={handleSell}
                onView={handleView}
              />
              <ViewDateCardSection
                cardType="date"
                isView={isView === "view"}
                item={selectedItem}
                onClose={() => setIsView("")}
              />
              <SellDateCardSection
                cardType="date"
                onSellConfirm={handleSellConfirm}
                isView={isView === "sell"}
                item={selectedItem}
                onClose={() => setIsView("")}
              />
            </DatePageContainer>
          </DatesPageWrapper>
        ) : !isLoading ? (
          <EmptyCards>
            <h3>No Date Cards</h3>
            <p>It looks like you don’t have any date cards yet. </p>
            <Button
              className="buy-button"
              onClick={() => navigate("/marketplace")}
            >
              Buy Cards
            </Button>
            <Button className="buy-button" onClick={() => navigate("/buy")}>
              Buy Packs
            </Button>
          </EmptyCards>
        ) : (
          <Loader />
        )
      ) : (
        <EmptyCards className="login">
          <p>Explanatory text. Log in to start playing.</p>
          <Button className="buy-button" onClick={() => navigate("/signin")}>
            Login Now
          </Button>
        </EmptyCards>
      )}
    </AppLayout>
  );
};

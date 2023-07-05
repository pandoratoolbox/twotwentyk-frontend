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
  CategoryFilterSection,
  SellDateCardSection,
  ViewDateCardSection,
} from "../../../modules";
import { useNavigate } from "react-router-dom";
import { getMyNftCardCategory } from "../../../actions/nft_card_category";
import { newMarketplaceList } from "../../../actions/marketplace_listing";
import { INftCardCategory } from "../../../models/nft_card_category";
import {
  getFilterCardType,
  getFilterRarities,
  getFilterStatus,
  getFilterCollection,
  getFilterCategory,
  getFilterPackType,
  getFilterTriggerType,
} from "../../../actions/filtering";

export const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [isView, setIsView] = useState<"view" | "sell" | "">("");
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nftCardCategoryData, setNftCardCategoryData] = useState<
    INftCardCategory[] | null
  >(null);

  useEffect(() => {
    setCurrentUser(localStorage.getItem("auth"));
  }, []);

  const getPageData = async () => {
    setIsLoading(true);

    const response = await getMyNftCardCategory();
    if (response?.data) {
      setNftCardCategoryData(response?.data);
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
    setSelectedItem(item);
    setIsView("view");
  };

  const handleCraft = (id: string | number) => {
    navigate("/crafting/identities?id=" + id);
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
    setNftCardCategoryData([]);
    setIsLoading(true);

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
      setNftCardCategoryData(res?.data as INftCardCategory[]);
    }
    setIsLoading(false);
  };

  return (
    <AppLayout>
      <SellConfirmModal open={modal} onClose={() => setModal(false)} />
      {currentUser ? (
        nftCardCategoryData && nftCardCategoryData?.length > 0 ? (
          <DatesPageWrapper isview={isView ? "true" : undefined}>
            <DatePageContainer>
              <DatePageTitleWrapper>
                <h3>Category Cards</h3>
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
              <CategoryFilterSection onClick={handleOptionClick} />
              <CardGridSection
                cardType="category"
                data={nftCardCategoryData}
                onCraft={handleCraft}
                onSell={handleSell}
                onView={handleView}
              />
              <ViewDateCardSection
                cardType={"category"}
                isView={isView === "view"}
                item={selectedItem}
                onClose={() => setIsView("")}
              />
              <SellDateCardSection
                cardType={"category"}
                onSellConfirm={handleSellConfirm}
                isView={isView === "sell"}
                item={selectedItem}
                onClose={() => setIsView("")}
              />
            </DatePageContainer>
          </DatesPageWrapper>
        ) : !isLoading ? (
          <EmptyCards>
            <h3>No Category Cards</h3>
            <p>It looks like you don’t have any category cards yet.  </p>
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

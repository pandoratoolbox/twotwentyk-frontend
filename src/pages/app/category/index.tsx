import React, { useEffect, useState } from "react";
import { AppLayout } from "../../../layout/AppLayout";
import {
  ButtonGroup,
  DatePageContainer,
  DatePageContent,
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
import { NftCardCategoryFilters } from "../../../models/filters";
import { EmptyCards as LoginCards } from "../dates/styles";
import { INftCardCrafting } from "../../../models/nft_card_crafting";
import { INftCardDayMonth } from "../../../models/nft_card_day_month";
import { INftCardYear } from "../../../models/nft_card_year";
import { INftCardPrediction } from "../../../models/nft_card_prediction";
import { INftCardIdentity } from "../../../models/nft_card_identity";
import { INftCardTrigger } from "../../../models/nft_card_trigger";

export const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [isView, setIsView] = useState<"view" | "sell" | "">("");
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFilter, setIsLoadingFilter] = useState(false);

  const [nftCardCategoryData, setNftCardCategoryData] = useState<
    INftCardCategory[] | null
  >(null);

  useEffect(() => {
    setCurrentUser(localStorage.getItem("auth"));
  }, []);

  const getPageData = async () => {
    setIsLoading(true);

    const response = await getMyNftCardCategory(null);
    if (response?.data) {
      setNftCardCategoryData(response?.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPageData();
  }, []);

  const handleSellConfirm = async (
    id: number,
    collection_id: number,
    price: number,
    // card: INftCardCategory | INftCardCrafting | INftCardDayMonth | INftCardYear | INftCardPrediction | INftCardIdentity | INftCardTrigger
  ) => {
    const newMarketplace = {
      nft_type_id: collection_id,
      nft_card_category_id: id,
      price: price*100,
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

  const [filters, setFilters] = useState<NftCardCategoryFilters>({
    card_series_id: null,
    categories: null,
    rarities: null,
    status: null,
  });

  // filter option click
  const handleOptionClick = async (
    filterType: string,
    selectedOptions: string[]
  ) => {
    setIsLoadingFilter(true);

    let newFilters: NftCardCategoryFilters = {
      card_series_id: filters.card_series_id,
      status: filters.status,
      rarities: filters.rarities,
      categories: filters.categories,
    };

    switch (filterType) {
      case "Category":
        newFilters.categories = selectedOptions.map((v) => {
          return Number(v);
        });
        break;
      case "All Rarities":
        newFilters.rarities = selectedOptions.map((v) => {
          return Number(v);
        });
        break;
      case "Status":
        newFilters.status = selectedOptions.map((v) => {
          return Number(v);
        });
        break;
      case "Collections":
        newFilters.card_series_id = Number(selectedOptions[0]);
        break;
    }

    setFilters(newFilters);

    let res = await getMyNftCardCategory(newFilters);
    if (res?.data) {
      setNftCardCategoryData(res?.data as INftCardCategory[]);
    }

    setIsLoadingFilter(false);
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
              </DatePageTitleWrapper>
              <DatePageContent>
                <ButtonGroup>
                  <Button
                    className="buy-button"
                    onClick={() => navigate("/marketplace")}
                  >
                    Buy Cards
                  </Button>
                  <Button
                    className="buy-button"
                    onClick={() => navigate("/buy")}
                  >
                    Buy Packs
                  </Button>
                </ButtonGroup>
                <CategoryFilterSection onClick={handleOptionClick} />
                {!isLoadingFilter ? (
                  <CardGridSection
                    cardType="category"
                    data={nftCardCategoryData}
                    // data={[]}
                    onCraft={handleCraft}
                    onSell={handleSell}
                    onView={handleView}
                  />
                ) : (
                  <Loader />
                )}
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
              </DatePageContent>
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
            <Button
              className="buy-button"
              variant="outlined"
              onClick={() => navigate("/buy")}
            >
              Buy Packs
            </Button>
          </EmptyCards>
        ) : (
          <Loader />
        )
      ) : (
        <LoginCards className="login">
          <p className="login">Log in to start playing</p>
          <Button className="buy-button" onClick={() => navigate("/signin")}>
            Login Now
          </Button>
        </LoginCards>
      )}
    </AppLayout>
  );
};

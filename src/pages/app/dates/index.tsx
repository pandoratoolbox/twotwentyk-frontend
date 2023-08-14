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
  DatesFilterSection,
  SellDateCardSection,
  ViewDateCardSection,
} from "../../../modules";
import { useNavigate } from "react-router-dom";
import { getMyNftCardDayMonth } from "../../../actions/nft_card_day_month";
import { getMyNftCardYear } from "../../../actions/nft_card_year";
import { newMarketplaceList } from "../../../actions/marketplace_listing";
import { INftCardDayMonth } from "../../../models/nft_card_day_month";
import { INftCardYear } from "../../../models/nft_card_year";
import {
  NftCardDayMonthFilters,
  NftCardYearFilters,
} from "../../../models/filters";
import {
  getFilterCardType,
  getFilterRarities,
  getFilterStatus,
  getFilterCollection,
  getFilterCategory,
  getFilterPackType,
  getFilterTriggerType,
} from "../../../actions/filtering";

interface DateFilters {
  card_types: number[];
  card_series_id: number | null;
  rarities: number[] | null;
  status: number[] | null;
}

export const DatesPage: React.FC = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [isView, setIsView] = useState<"view" | "sell" | "">("");
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFilter, setIsLoadingFilter] = useState(false);
  const [filters, setFilters] = useState<DateFilters>({
    card_types: [0, 1],
    card_series_id: null,
    rarities: null,
    status: null,
  });

  const [nftCardDayMonthData, setNftCardDayMonthData] = useState<
    INftCardDayMonth[] | INftCardYear[]
  >([]);

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
    // for loader
    setNftCardDayMonthData([]);
    setIsLoadingFilter(true);

    let newFilters: DateFilters = {
      card_series_id: filters.card_series_id,
      status: filters.status,
      rarities: filters.rarities,
      card_types: filters.card_types,
    };

    switch (filterType) {
      case "Card Types":
        newFilters.card_types = selectedOptions.map((v) => {
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
  };

  // filter Api Call
  const handleFilterAPICall = async () => {
    let newFilters: DateFilters = {
      card_series_id: filters.card_series_id,
      status: filters.status,
      rarities: filters.rarities,
      card_types: filters.card_types,
    };

    if (filters.card_types.includes(0)) {
      let dayMonthFilters: NftCardDayMonthFilters = {
        rarities: newFilters.rarities,
        card_series_id: newFilters.card_series_id,
        status: newFilters.status,
        day: null,
        month: null,
      };

      let res = await getMyNftCardDayMonth(dayMonthFilters);
      if (res?.data && Array.isArray(res.data)) {
        console.log("refreshed nft card day-month data");
        setNftCardDayMonthData(res.data);
      }
    }

    if (filters.card_types.includes(1)) {
      let yearFilters: NftCardYearFilters = {
        card_series_id: newFilters.card_series_id,
        year: null,
        rarities: newFilters.rarities,
        status: newFilters.status,
      };

      let res = await getMyNftCardYear(yearFilters);
      if (res?.data && Array.isArray(res.data)) {
        console.log("refreshed nft card year data");
        setNftCardDayMonthData(res.data);
      }
    }

    setIsLoadingFilter(false);
  };

  useEffect(() => {
    if (filters.card_types.length > 0) {
      handleFilterAPICall();
    }
  }, [filters]);

  return (
    <AppLayout>
      <SellConfirmModal open={modal} onClose={() => setModal(false)} />

      {currentUser ? (
        nftCardDayMonthData && nftCardDayMonthData?.length > 0 ? (
          <DatesPageWrapper isview={isView ? "true" : undefined}>
            <DatePageContainer>
              <DatePageTitleWrapper>
                <h3>Date Cards</h3>
              </DatePageTitleWrapper>
              <DatePageContent>
                <ButtonGroup>
                  <Button className="buy-button">Buy Cards</Button>
                  <Button
                    className="buy-button"
                    onClick={() => navigate("/buy")}
                  >
                    Buy Packs
                  </Button>
                </ButtonGroup>
                <DatesFilterSection onClick={handleOptionClick} />
                {!isLoadingFilter ? (
                  <CardGridSection
                    cardType="date"
                    data={nftCardDayMonthData}
                    onCraft={handleCraft}
                    onSell={handleSell}
                    onView={handleView}
                  />
                ) : (
                  <Loader />
                )}

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
              </DatePageContent>
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
          <p className="login">Log in to start playing</p>
          <Button className="buy-button" onClick={() => navigate("/signin")}>
            Login Now
          </Button>
        </EmptyCards>
      )}
    </AppLayout>
  );
};

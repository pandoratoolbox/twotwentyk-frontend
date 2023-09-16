import React, { useEffect, useState } from "react";
import { AppLayout } from "../../../layout/AppLayout";
import {
  ButtonGroup,
  DatePageContainer,
  DatePageTitleWrapper,
  DatesPageWrapper,
  EmptyCards,
} from "../dates/styles";
import { Button, SellConfirmModal, Loader } from "../../../components";
import {
  CardGridSection,
  PredictionsFilterSection,
  SellDateCardSection,
  ViewDateCardSection,
} from "../../../modules";
import { useLocation, useNavigate } from "react-router-dom";
import { getMyNftCardPrediction } from "../../../actions/nft_card_prediction";
import { newMarketplaceList } from "../../../actions/marketplace_listing";
import { INftCardPrediction } from "../../../models/nft_card_prediction";
import {
  getFilterCardType,
  getFilterRarities,
  getFilterStatus,
  getFilterCollection,
  getFilterCategory,
  getFilterPackType,
  getFilterTriggerType,
} from "../../../actions/filtering";
import { NftCardPredictionFilters } from "../../../models/filters";
import { DatePageContent } from "../category/styles";

export const PredictionsPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [isView, setIsView] = useState<"view" | "sell" | "">("");
  const [predictionNfts, setPredictionNfts] = useState<INftCardPrediction[]>(
    []
  );
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFilter, setIsLoadingFilter] = useState(false);

  useEffect(() => {
    if (params.get("id")) {
      setIsView("view");
    }
  }, [params]);

  useEffect(() => {
    setCurrentUser(localStorage.getItem("auth"));
  }, []);

  const getPageData = async () => {
    setIsLoading(true);

    const response = await getMyNftCardPrediction(null);
    if (response?.data) {
      setPredictionNfts(response.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getPageData();
  }, []);

  const [modal, setModal] = useState(false);

  const handleSellConfirm = async (
    id: number,
    collection_id: number,
    price: number
  ) => {
    const newMarketplace = {
      nft_type_id: 7,
      nft_card_prediction_id: id,
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
    navigate("/crafting/predictions?id=" + id);
  };

  const handleSell = (item: any) => {
    setSelectedItem(item);
    setIsView("sell");
  };

  const [filters, setFilters] = useState<NftCardPredictionFilters>({
    card_series_id: null,
    rarities: null,
    status: null,
    triggers: null,
    celebrities: null,
  });

  // filter option click
  const handleOptionClick = async (
    filterType: string,
    selectedOptions: string[]
  ) => {
    setIsLoadingFilter(true);

    let newFilters: NftCardPredictionFilters = {
      card_series_id: filters.card_series_id,
      status: filters.status,
      rarities: filters.rarities,
      triggers: filters.triggers,
      celebrities: filters.celebrities,
    };

    switch (filterType) {
      case "Triggers":
        newFilters.triggers = selectedOptions.map((v) => {
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

    let res = await getMyNftCardPrediction(newFilters);
    if (res?.data) {
      setPredictionNfts(res?.data as INftCardPrediction[]);
    }

    setIsLoadingFilter(false);
  };

  return (
    <AppLayout>
      <SellConfirmModal open={modal} onClose={() => setModal(false)} />
      {currentUser ? (
        predictionNfts && predictionNfts?.length > 0 ? (
          <DatesPageWrapper isview={isView ? "true" : undefined}>
            <DatePageContainer>
              <DatePageTitleWrapper>
                <h3>Predictions</h3>
              </DatePageTitleWrapper>
              <DatePageContent>
                <ButtonGroup>
                  <Button
                    className="craft-button"
                    onClick={() => navigate("/crafting/predictions")}
                  >
                    Craft Prediction
                  </Button>
                </ButtonGroup>
                <PredictionsFilterSection onClick={handleOptionClick} />
                {!isLoadingFilter ? (
                  <CardGridSection
                    identityData={predictionNfts}
                    onCraft={handleCraft}
                    onSell={handleSell}
                    cardType="prediction"
                    onView={handleView}
                  />
                ) : (
                  <Loader />
                )}
                <ViewDateCardSection
                  isView={isView === "view"}
                  cardType="prediction"
                  item={selectedItem}
                  onClose={() => {
                    setIsView("");
                    navigate("/dashboard/predictions");
                  }}
                />
                <SellDateCardSection
                  onSellConfirm={handleSellConfirm}
                  cardType="prediction"
                  isView={isView === "sell"}
                  item={selectedItem}
                  onClose={() => {
                    setIsView("");
                    navigate("/dashboard/predictions");
                  }}
                />
              </DatePageContent>
            </DatePageContainer>
          </DatesPageWrapper>
        ) : !isLoading ? (
          <EmptyCards>
            <h3>No Predictions Yet</h3>
            <p>
              Predictions are created by combining an Identity and one or more
              Trigger cards
            </p>
            <Button
              className="buy-button"
              onClick={() => navigate("/crafting/identities")}
            >
              Craft Prediction
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

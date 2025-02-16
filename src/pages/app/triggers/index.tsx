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
  TriggerFilterSection,
  SellDateCardSection,
  ViewDateCardSection,
} from "../../../modules";
import { useNavigate } from "react-router-dom";
import { getMyNftCardTrigger } from "../../../actions/nft_card_trigger";
import { newMarketplaceList } from "../../../actions/marketplace_listing";
import { INftCardTrigger } from "../../../models/nft_card_trigger";
import { NftCardTriggerFilters } from "../../../models/filters";
import { DatePageContent } from "../category/styles";
import { useAuthContext } from "../../../context";
export const TriggersPage: React.FC = () => {
  const navigate = useNavigate();
  const { authContext } = useAuthContext();
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [isView, setIsView] = useState<"view" | "sell" | "">("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFilter, setIsLoadingFilter] = useState(false);

  const [nftCardTriggerData, setNftCardTriggerData] = useState<
    INftCardTrigger[] | null
  >(null);

  useEffect(() => {
    setCurrentUser(localStorage.getItem("auth"));
  }, []);

  const getPageData = async () => {
    setIsLoading(true);
    const response = await getMyNftCardTrigger(null);

    if (response?.data) {
      setNftCardTriggerData(response?.data);
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
      nft_type_id: collection_id,
      nft_card_trigger_id: id,
      price: Math.round(price * 100),
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
    navigate(`/crafting/predictions?id=${item?.id}&selectedCraft=trigger`);
  };

  const handleSell = (item: any) => {
    setSelectedItem(item);
    setIsView("sell");
  };

  const [filters, setFilters] = useState<NftCardTriggerFilters>({
    tiers: null,
    rarities: null,
    status: null,
    card_collection_id: 1,
    // categories: null,
    triggers: null,
    card_series_id: 1,
  });

  // filter option click
  const handleOptionClick = async (
    filterType: string,
    selectedOptions: string[]
  ) => {
    console.log("click");

    setIsLoadingFilter(true);

    let newFilters: NftCardTriggerFilters = {
      // categories: filters.categories,
      status: filters.status,
      triggers: filters.triggers,
      rarities: filters.rarities,
      tiers: filters.tiers,
      card_collection_id: 1,
      card_series_id: 1,
    };

    console.log(filterType);

    switch (filterType) {
      case "Trigger Tier":
        newFilters.tiers = selectedOptions.map((v) => {
          return v;
        });
        break;
      // case "Categories":
      //   newFilters.categories = selectedOptions.map((v) => {
      //     return v;
      //   });
      //   break;
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
    }

    setFilters(newFilters);

    let res = await getMyNftCardTrigger(newFilters);
    if (res?.data) {
      setNftCardTriggerData(res?.data as INftCardTrigger[]);
    }

    setIsLoadingFilter(false);
  };

  const getTimeStemp = (date: string) => {
    const now = new Date(date);
    const timestamp = now.getTime();
    return timestamp;
  };

  const clickSelect = async (sortSelectOption: string) => {
    setIsLoading(true);
    if (sortSelectOption == "Date-High-Low") {
      setIsLoading(true);
      const response = await getMyNftCardTrigger(null);
      if (response?.data) {
        response?.data.sort(
          (a: any, b: any) =>
            getTimeStemp(a.created_at) - getTimeStemp(b.created_at)
        );
        setNftCardTriggerData(response?.data);
        setIsLoading(false);
      }
    } else if (sortSelectOption == "Date-Low-High") {
      setIsLoading(true);
      const response = await getMyNftCardTrigger(null);
      if (response?.data) {
        response?.data.sort(
          (a: any, b: any) =>
            getTimeStemp(b.created_at) - getTimeStemp(a.created_at)
        );
        setNftCardTriggerData(response?.data);
        setIsLoading(false);
      }
    } else if (sortSelectOption == "Rearity") {
      setIsLoading(true);
      const response = await getMyNftCardTrigger(null);
      if (response?.data) {
        response?.data.sort((a: any, b: any) => b.rarity - a.rarity);
        setNftCardTriggerData(response?.data);
        setIsLoading(false);
      }
    }
  };

  return (
    <AppLayout>
      <SellConfirmModal open={modal} onClose={() => setModal(false)} />
      {authContext?.isAuthenticated ? (
        <DatesPageWrapper isview={isView ? "true" : undefined}>
          <DatePageContainer>
            <DatePageTitleWrapper>
              <h3>Triggers</h3>
            </DatePageTitleWrapper>
            <DatePageContent>
              {!isLoadingFilter &&
                nftCardTriggerData &&
                nftCardTriggerData?.length > 0 ? (
                <>
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
                  <TriggerFilterSection
                    onClick={handleOptionClick}
                    clickSelect={clickSelect}
                  />
                  <CardGridSection
                    data={nftCardTriggerData}
                    // data={[]}
                    cardType={"trigger"}
                    onCraft={handleCraft}
                    onSell={handleSell}
                    onView={handleView}
                  />
                </>
              ) : !isLoading &&
                !isLoadingFilter &&
                nftCardTriggerData?.length == 0 ? (
                <>
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
                  <TriggerFilterSection
                    onClick={handleOptionClick}
                    clickSelect={clickSelect}
                  />
                  <CardGridSection
                    data={nftCardTriggerData}
                    // data={[]}
                    cardType={"trigger"}
                    onCraft={handleCraft}
                    onSell={handleSell}
                    onView={handleView}
                  />
                </>
              ) : !isLoading && nftCardTriggerData == null ? (
                <EmptyCards>
                  <div className="trigeres">
                    <h3>No Triggers</h3>
                    <p>It looks like you don’t have any triggers yet.   </p>
                    <Button className="buy-button">Buy Cards</Button>
                    <Button
                      className="buy-button"
                      onClick={() => navigate("/buy")}
                    >
                      Buy Packs
                    </Button>
                  </div>
                </EmptyCards>
              ) : isLoading ? (
                <Loader />
              ) : null}
            </DatePageContent>
            {nftCardTriggerData && nftCardTriggerData?.length > 0 ? (
              <>
                <ViewDateCardSection
                  isView={isView === "view"}
                  cardType="trigger"
                  item={selectedItem}
                  onClose={() => setIsView("")}
                />
                <SellDateCardSection
                  onSellConfirm={handleSellConfirm}
                  isView={isView === "sell"}
                  cardType="trigger"
                  item={selectedItem}
                  onClose={() => setIsView("")}
                />
              </>
            ) : isLoadingFilter ? (
              <h1 className="setText" hidden>
                No Records Found
              </h1>
            ) : null}
          </DatePageContainer>
        </DatesPageWrapper>
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

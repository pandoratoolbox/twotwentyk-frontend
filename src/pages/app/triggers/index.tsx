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
export const TriggersPage: React.FC = () => {
  const navigate = useNavigate();
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

  const handleCraft = (item: any) => {
    navigate("/crafting/predictions?id=" + item?.id);
  };

  const handleSell = (item: any) => {
    setSelectedItem(item);
    setIsView("sell");
  };

  const [filters, setFilters] = useState<NftCardTriggerFilters>({
    tiers: null,
    rarities: null,
    status: null,
    nft_collection_id: 1,
    // categories: null,
    triggers: null,
    card_series_id: 1
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
      nft_collection_id: 1,
      card_series_id: 1
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

  return (
    <AppLayout>
      <SellConfirmModal open={modal} onClose={() => setModal(false)} />
      {currentUser ? (
        nftCardTriggerData && nftCardTriggerData?.length > 0 ? (
          <DatesPageWrapper isview={isView ? "true" : undefined}>
            <DatePageContainer>
              <DatePageTitleWrapper>
                <h3>Triggers</h3>
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
                <TriggerFilterSection onClick={handleOptionClick} />
                {!isLoadingFilter ? (
                  <CardGridSection
                    data={nftCardTriggerData}
                    // data={[]}
                    cardType={"trigger"}
                    onCraft={handleCraft}
                    onSell={handleSell}
                    onView={handleView}
                  />
                ) : (
                  <Loader />
                )}
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
              </DatePageContent>
            </DatePageContainer>
          </DatesPageWrapper>
        ) : !isLoading ? (
          <EmptyCards>
            <h3>No Triggers</h3>
            <p>It looks like you don’t have any triggers yet.   </p>
            <Button className="buy-button">Buy Cards</Button>
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

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
  IdentitiesFilterSection,
  SellDateCardSection,
  ViewDateCardSection,
} from "../../../modules";
import { useNavigate, useLocation } from "react-router-dom";
import { getMyNftCardIdentity } from "../../../actions/nft_card_identity";
import { newMarketplaceList } from "../../../actions/marketplace_listing";
import { INftCardIdentity } from "../../../models/nft_card_identity";
import {
  getFilterCardType,
  getFilterRarities,
  getFilterStatus,
  getFilterCollection,
  getFilterCategory,
  getFilterPackType,
  getFilterTriggerType,
} from "../../../actions/filtering";

import { identitiesData } from "./data";
import { NftCardIdentityFilters } from "../../../models/filters";
import { DatePageContent } from "../category/styles";
import { CancelListingModal } from "../../../components/Modals/CancelListing";
import { INftCardPrediction } from "../../../models/nft_card_prediction";
import { ICardPack } from "../../../models/card_pack";

export const IdentitiesPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [isView, setIsView] = useState<"view" | "sell" | "">("");
  const [modal, setModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null);
  const [identityNfts, setIdentityNfts] = useState<INftCardIdentity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFilter, setIsLoadingFilter] = useState(false);
  const [cancelIdentityNft, setCancelIdentityNft] = useState<INftCardIdentity>()

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

    const response = await getMyNftCardIdentity(null);
    if (response?.data) {
      setIdentityNfts(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPageData();
  }, []);

  const handleSellConfirm = async (
    id: number,
    collection_id: number,
    price: number
  ) => {
    const newMarketplace = {
      nft_type_id: 6,
      nft_card_identity_id: id,
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
    if (item?.id) navigate(`/crafting/predictions?selectedCraft=identity&id=${item.id}`);
  };

  const handleSell = (item: any) => {
    setSelectedItem(item);
    setIsView("sell");
  };

  const handleCancel = (item: INftCardIdentity | INftCardPrediction | ICardPack) => {
    setCancelIdentityNft(item as INftCardIdentity)
    setCancelModal(true)
  }

  const [filters, setFilters] = useState<NftCardIdentityFilters>({
    card_series_id: null,
    status: null,
    rarities: null,
    celebrities: null,
    categories: null,
  });

  // filter option click
  const handleOptionClick = async (
    filterType: string,
    selectedOptions: string[]
  ) => {
    setIsLoadingFilter(true);

    let newFilters: NftCardIdentityFilters = {
      card_series_id: filters.card_series_id,
      status: filters.status,
      rarities: filters.rarities,
      categories: filters.categories,
      celebrities: filters.celebrities,
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

    let res = await getMyNftCardIdentity(newFilters);
    if (res?.data) {
      setIdentityNfts(res?.data as INftCardIdentity[]);
    }

    setIsLoadingFilter(false);
  };

  return (
    <AppLayout>
      <SellConfirmModal open={modal} onClose={() => setModal(false)} />
      {cancelIdentityNft && <CancelListingModal open={cancelModal} onClose={() => setCancelModal(false)} nftCard={cancelIdentityNft} cardType="Identity"/>}
      {currentUser ? (
        identityNfts && identityNfts?.length > 0 ? (
          <DatesPageWrapper isview={isView ? "true" : undefined}>
            <DatePageContainer>
              <DatePageTitleWrapper>
                <h3>Identities</h3>
              </DatePageTitleWrapper>
              <DatePageContent>
                <ButtonGroup>
                  <Button
                    className="craft-button"
                    onClick={() => navigate("/crafting/identities")}
                  >
                    Craft Identity
                  </Button>
                </ButtonGroup>
                <IdentitiesFilterSection onClick={handleOptionClick} />
                {!isLoadingFilter ? (
                  <CardGridSection
                    identityData={identityNfts}
                    onCraft={handleCraft}
                    onSell={handleSell}
                    cardType="identity"
                    onView={handleView}
                    onCancel={handleCancel}
                  />
                ) : (
                  <Loader />
                )}
                <ViewDateCardSection
                  isView={isView === "view"}
                  cardType="identity"
                  item={selectedItem}
                  onClose={() => {
                    setIsView("");
                    navigate("/dashboard/identities");
                  }}
                />
                <SellDateCardSection
                  onSellConfirm={handleSellConfirm}
                  cardType="identity"
                  isView={isView === "sell"}
                  item={selectedItem}
                  onClose={() => {
                    setIsView("");
                    navigate("/dashboard/identities");
                  }}
                />
              </DatePageContent>
            </DatePageContainer>
          </DatesPageWrapper>
        ) : !isLoading ? (
          <EmptyCards>
            <h3>No Identities Yet</h3>
            <p>
              Identities are cards created by combining a Day-Month card, a Year
              card and a Category card. Identities are combined with Trigger
              cards to craft Predictions.
            </p>
            <Button
              className="buy-button"
              onClick={() => navigate("/crafting/identities")}
            >
              Craft Identity
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

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

import { identitiesData } from "./data";

export const IdentitiesPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [isView, setIsView] = useState<"view" | "sell" | "">("");
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [identityNfts, setIdentityNfts] = useState<INftCardIdentity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

    const token = localStorage.auth;
    const response = await getMyNftCardIdentity(token);
    if (response?.data) {
      setIdentityNfts(response.data);
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

  const handleCraft = (id: string | number) => {
    navigate("/crafting/predictions?id=" + id);
  };

  const handleSell = (item: any) => {
    setSelectedItem(item);
    setIsView("sell");
  };
  return (
    <AppLayout>
      <SellConfirmModal open={modal} onClose={() => setModal(false)} />
      {currentUser ? (
        identityNfts && identityNfts?.length > 0 ? (
          <DatesPageWrapper isview={isView ? "true" : undefined}>
            <DatePageContainer>
              <DatePageTitleWrapper>
                <h3>Identities</h3>
                <ButtonGroup>
                  <Button
                    className="craft-button"
                    onClick={() => navigate("/crafting/identities")}
                  >
                    Craft Identity
                  </Button>
                </ButtonGroup>
              </DatePageTitleWrapper>
              <IdentitiesFilterSection />
              <CardGridSection
                identityData={identityNfts}
                onCraft={handleCraft}
                onSell={handleSell}
                cardType="identity"
                onView={handleView}
              />
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
          <p>Explanatory text. Log in to start playing.</p>
          <Button className="buy-button" onClick={() => navigate("/signin")}>
            Login Now
          </Button>
        </EmptyCards>
      )}
    </AppLayout>
  );
};

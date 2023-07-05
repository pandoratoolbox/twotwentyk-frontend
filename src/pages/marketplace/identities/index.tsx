import React, { useEffect, useState } from "react";
import { CardActionTypes } from "../../../types";
import { AppLayout } from "../../../layout/AppLayout";
import {
  MarketplacePageContainer,
  MarketplacePageWrapper,
} from "../cards/styles";
import {
  DatesFilterSection,
  MBuyCardSection,
  MCardGridSection,
  MSellCardSection,
  MViewCardSection,
} from "../../../modules";
import { useNavigate } from "react-router-dom";
import { EmptyCards } from "../../app/category/styles";
import { Button, Loader } from "../../../components";
import { getMarketplaceList } from "../../../actions/marketplace_listing";
import { IMarketplaceListing } from "../../../models/marketplace_listing";

export const MarketplaceIdentitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [side, setSide] = useState<CardActionTypes>("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [nftMarketplaceData, setNftMarketplaceData] = useState<
    IMarketplaceListing[] | null
  >(null);

  const handleCardClick = (item: any, action: CardActionTypes) => {
    setSelectedItem(item);
    setSide(action);
  };

  const handleSideClose = () => {
    setSide("");
  };

  const getPageData = async () => {
    setIsLoading(true);
    const token = localStorage.auth;
    const response = await getMarketplaceList(6, 20, token);

    if (response?.data) {
      setNftMarketplaceData(response?.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPageData();
  }, []);
  return (
    <AppLayout>
      {nftMarketplaceData && nftMarketplaceData?.length > 0 ? (
        <MarketplacePageWrapper sidebar={side !== "" ? "true" : undefined}>
          <MarketplacePageContainer>
            <h2>Identities</h2>
            <DatesFilterSection />
            <MCardGridSection
              data={nftMarketplaceData}
              onCardClick={handleCardClick}
              page="identities"
            />
          </MarketplacePageContainer>
        </MarketplacePageWrapper>
      ) : !isLoading ? (
        <EmptyCards>
          <p style={{ maxWidth: "253px" }}>
            Wow, can you believe no one wants to sell even a single card?
          </p>
          <Button
            className="buy-button"
            onClick={() => navigate("/marketplace")}
          >
            Sell Card
          </Button>
        </EmptyCards>
      ) : (
        <Loader />
      )}
      <MViewCardSection
        selectedItem={selectedItem}
        open={side === "view"}
        onClose={handleSideClose}
        page="identities"
      />
      <MBuyCardSection
        selectedItem={selectedItem}
        open={side === "buy"}
        onClose={handleSideClose}
        page="identities"
      />
      <MSellCardSection
        open={side === "sell"}
        onClose={handleSideClose}
        page="identities"
      />
    </AppLayout>
  );
};

import React, { useEffect, useState } from "react";
import { AppLayout } from "../../../layout/AppLayout";
import { MarketplacePageContainer, MarketplacePageWrapper } from "./styles";
import {
  MBuyCardSection,
  MCardGridSection,
  MFilterSection,
  MOfferCardSection,
  MSellCardSection,
  MViewCardSection,
} from "../../../modules";
import { CardActionTypes } from "../../../types";
import { EmptyCards } from "../../app/category/styles";
import { Button, Loader } from "../../../components";
import { useNavigate } from "react-router-dom";
import { IMarketplaceListing } from "../../../models/marketplace_listing";
import { getMarketplaceList } from "../../../actions/marketplace_listing";

export const MarketplacePage: React.FC = () => {
  const navigate = useNavigate();
  const [side, setSide] = useState<CardActionTypes>("");
  const [isLoading, setIsLoading] = useState(true);
  const [nftMarketplaceData, setNftMarketplaceData] = useState<
    IMarketplaceListing[] | null
  >(null);

  const handleCardClick = (id: string | number, action: CardActionTypes) => {
    setSide(action);
  };

  const handleSideClose = () => {
    setSide("");
  };

  const getPageData = async () => {
    setIsLoading(true);
    const token = localStorage.auth;
    const response = await getMarketplaceList(3, 20, token);

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
      <MarketplacePageWrapper sidebar={side !== "" ? "true" : undefined}>
        {nftMarketplaceData && nftMarketplaceData?.length > 0 ? (
          <MarketplacePageContainer>
            <h2>Dates</h2>
            <MFilterSection />
            <MCardGridSection
              data={nftMarketplaceData}
              onCardClick={handleCardClick}
            />
          </MarketplacePageContainer>
        ) : !isLoading ? (
          <EmptyCards>
            <p style={{ maxWidth: "253px" }}>
              Wow, can you believe no one wants to sell even a single card?
            </p>
            <Button
              className="buy-button"
              onClick={() => navigate("/dashboard/dates")}
            >
              Sell Card
            </Button>
          </EmptyCards>
        ) : (
          <Loader />
        )}
      </MarketplacePageWrapper>
      <MViewCardSection open={side === "view"} onClose={handleSideClose} />
      <MBuyCardSection open={side === "buy"} onClose={handleSideClose} />
      <MSellCardSection open={side === "sell"} onClose={handleSideClose} />
      <MOfferCardSection open={side === "offer"} onClose={handleSideClose} />
    </AppLayout>
  );
};

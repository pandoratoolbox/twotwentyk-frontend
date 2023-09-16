import React, { useEffect, useState } from "react";
import { AppLayout } from "../../../layout/AppLayout";
import {
  MarketplaceContentWrapper,
  MarketplacePageContainer,
  MarketplacePageWrapper,
} from "../cards/styles";
import {
  MFilterSection,
  MBuyCardSection,
  MCardGridSection,
  MSellCardSection,
  MViewCardSection,
} from "../../../modules";
import { CardActionTypes } from "../../../types";
import { EmptyCards } from "../../app/category/styles";
import { Button, Loader } from "../../../components";
import { useNavigate } from "react-router-dom";
import { IMarketplaceListing } from "../../../models/marketplace_listing";
import { getMarketplaceList } from "../../../actions/marketplace_listing";

export const MarketplacePredictionPage: React.FC = () => {
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
    const response = await getMarketplaceList({nft_collection_id: 1, nft_type_ids: [7]});

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
            <h2>Predictions</h2>
            <MarketplaceContentWrapper>
              <MFilterSection page="predictions" 
              // onSelectTrigger={}
              // onSelectCategory={}
              // onSelectRarity={}
              // onSelectStatus={}
              // onSelectNftCollection={}
              />
              <MCardGridSection
                data={nftMarketplaceData}
                onCardClick={handleCardClick}
                page="predictions"
              />
            </MarketplaceContentWrapper>
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
      {selectedItem && <div id="sidebar"><MViewCardSection
        selectedItem={selectedItem}
        open={side === "view"}
        onClose={handleSideClose}
        page="predictions"
      />
      <MBuyCardSection
        selectedItem={selectedItem}
        open={side === "buy"}
        onClose={handleSideClose}
        page="predictions"
      />
      <MSellCardSection
        open={side === "sell"}
        onClose={handleSideClose}
        page="predictions"
        selectedItem={selectedItem}
      /></div>}
    </AppLayout>
  );
};

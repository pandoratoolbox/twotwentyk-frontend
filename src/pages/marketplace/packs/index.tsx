import React, { useEffect, useState } from "react";
import { AppLayout } from "../../../layout/AppLayout";
import {
  MarketplaceContentWrapper,
  MarketplacePageContainer,
  MarketplacePageWrapper,
} from "../cards/styles";
import {
  MBuyCardSection,
  MCardGridSection,
  MFilterSection,
  MSellCardSection,
  MViewCardSection,
} from "../../../modules";
import { CardActionTypes } from "../../../types";
import { useNavigate } from "react-router-dom";
import { EmptyCards } from "../../app/category/styles";
import { Button, Loader } from "../../../components";
import { IMarketplaceListing } from "../../../models/marketplace_listing";
import { getMarketplaceList } from "../../../actions/marketplace_listing";

export const MarketplacePacksPage: React.FC = () => {
  const navigate = useNavigate();
  const [side, setSide] = useState<CardActionTypes>("");
  const [isLoading, setIsLoading] = useState(true);
  const [nftMarketplaceData, setNftMarketplaceData] = useState<
    IMarketplaceListing[] | null
  >(null);
  const [selectedItem, setSelectedItem] = useState<IMarketplaceListing | null>(null);
  const [selectedNftCollectionId, setSelectedNftCollectionId] = useState<number>(0)
  const [selectedRarity, setSelectedRarity] = useState<number[] | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<number[] | null>(null);

  const handleCardClick = (item: any, action: CardActionTypes) => {
    console.log(item);

    setSide(action);
  };

  const handleSideClose = () => {
    setSide("");
  };

  const getPageData = async () => {
    setIsLoading(true);
    const response = await getMarketplaceList(selectedNftCollectionId, [0], 20);

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
            <h2>Card Packs</h2>
            <MarketplaceContentWrapper>
              <MFilterSection
              page="packs"
              onSelectRarity={(selected) => {setSelectedRarity(selected)}}
              onSelectNftCollection={(selected) => {setSelectedNftCollectionId(selected)}}
              onSelectStatus={(selected) => {setSelectedStatus(selected)}}
              />
              <MCardGridSection
                data={nftMarketplaceData}
                onCardClick={handleCardClick}
                page="packs"
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
{selectedItem && <div>
      <MViewCardSection
        open={side === "view"}
        onClose={handleSideClose}
        page="packs"
        selectedItem={selectedItem}
      />
      <MBuyCardSection
        open={side === "buy"}
        onClose={handleSideClose}
        page="packs"
        selectedItem={selectedItem}
      />
      <MSellCardSection
        open={side === "sell"}
        onClose={handleSideClose}
        page="packs"
        selectedItem={selectedItem}
      />
      </div>}
    </AppLayout>
  );
};

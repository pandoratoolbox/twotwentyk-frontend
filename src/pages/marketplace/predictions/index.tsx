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
  MOfferCardSection,
} from "../../../modules";
import { CardActionTypes } from "../../../types";
import { EmptyCards } from "../../app/category/styles";
import { Button, Loader } from "../../../components";
import { useNavigate } from "react-router-dom";
import { IMarketplaceListing } from "../../../models/marketplace_listing";
import { getMarketplaceList } from "../../../actions/marketplace_listing";
import { useMyOfferContext } from "../../../context";
import { toast } from "react-toastify";
import { INftCardPrediction } from "../../../models/nft_card_prediction";

export const MarketplacePredictionPage: React.FC = () => {
  const navigate = useNavigate();
  const [side, setSide] = useState<CardActionTypes>("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<IMarketplaceListing>();
  const [nftMarketplaceData, setNftMarketplaceData] = useState<
    IMarketplaceListing[] | null
  >(null);
  const { myOfferContext, setMyOfferContext } = useMyOfferContext();

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
    const response = await getMarketplaceList({ card_collection_id: 1, nft_type_ids: [7] });

    if (response?.data) {
      setNftMarketplaceData(response?.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPageData();
  }, []);

  const handleOfferConfirm = () => {
    if (selectedItem) {
      const offerCard = nftMarketplaceData?.filter(
        (f) => f.id === Number(selectedItem.id)
      )[0];
      if (offerCard) {
        setMyOfferContext([...myOfferContext, offerCard]);
        handleSideClose();
      } else {
        toast.error("Something went wrong!!!");
      }
    }
  };

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
            onClick={() => navigate("/dashboard/predictions")}
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
        />
        <MOfferCardSection
          open={side === "offer"}
          onClose={handleSideClose}
          onConfirm={handleOfferConfirm}
          selectedItem={selectedItem}
          page="predictions"
        />
      </div>}
    </AppLayout>
  );
};

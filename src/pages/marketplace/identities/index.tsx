import React, { useEffect, useState } from "react";
import { CardActionTypes } from "../../../types";
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
  // MOfferCardSection,
  MSellCardSection,
  MViewCardSection,
} from "../../../modules";
import { useNavigate } from "react-router-dom";
import { EmptyCards } from "../../app/category/styles";
import { Button, Loader } from "../../../components";
import { getMarketplaceList } from "../../../actions/marketplace_listing";
import { IMarketplaceListing } from "../../../models/marketplace_listing";
// import { useMyOfferContext } from "../../../context";
// import { ToastContainer, toast } from "react-toastify";

export const MarketplaceIdentitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [side, setSide] = useState<CardActionTypes>("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [nftMarketplaceData, setNftMarketplaceData] = useState<
    IMarketplaceListing[] | null
  >(null);
  // const { myOfferContext, setMyOfferContext } = useMyOfferContext();

  // const [selectedId, setSelectedId] = useState<number | string>("");

  const handleCardClick = (item: any, action: CardActionTypes) => {
    setSelectedItem(item);
    setSide(action);
  };

  const handleSideClose = () => {
    setSide("");
    // setSelectedId("");
  };

  const getPageData = async () => {
    setIsLoading(true);
    const token = localStorage.auth;
    const response = await getMarketplaceList({nft_collection_id: 1, nft_type_ids: [6]});

    if (response?.data) {
      setNftMarketplaceData(response?.data);
    }
    setIsLoading(false);
  };

  // const handleOfferConfirm = () => {
  //   const offerCard = nftMarketplaceData?.filter(
  //     (f) => f.id === Number(selectedId)
  //   )[0];
  //   if (offerCard) {
  //     setMyOfferContext([...myOfferContext, offerCard]);
  //     handleSideClose();
  //   } else {
  //     toast.error("Something went wrong!!!");
  //   }
  // };

  useEffect(() => {
    getPageData();
  }, []);
  return (
    <AppLayout>
      {nftMarketplaceData && nftMarketplaceData?.length > 0 ? (
        <MarketplacePageWrapper sidebar={side !== "" ? "true" : undefined}>
          <MarketplacePageContainer>
            <h2>Identities</h2>
            <MarketplaceContentWrapper>
              <MFilterSection page="identities" />
              <MCardGridSection
                data={nftMarketplaceData}
                onCardClick={handleCardClick}
                page="identities"
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
      {selectedItem && <div><MViewCardSection
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
      selectedItem={selectedItem}
        open={side === "sell"}
        onClose={handleSideClose}
        page="identities"
      /></div>}
      {/* <MOfferCardSection
        open={side === "offer"}
        onClose={handleSideClose}
        onConfirm={handleOfferConfirm}
      /> */}
    </AppLayout>
  );
};

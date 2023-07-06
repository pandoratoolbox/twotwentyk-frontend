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
  const [nftMarketplaceData, setNftMarketplaceData] = useState<
    IMarketplaceListing[] | null
  >(null);
  // const { myOfferContext, setMyOfferContext } = useMyOfferContext();

  // const [selectedId, setSelectedId] = useState<number | string>("");

  const handleCardClick = (id: string | number, action: CardActionTypes) => {
    // setSelectedId(id);
    setSide(action);
  };

  const handleSideClose = () => {
    setSide("");
    // setSelectedId("");
  };

  const getPageData = async () => {
    setIsLoading(true);
    const token = localStorage.auth;
    const response = await getMarketplaceList(token);

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
      {/* <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */}
      <MarketplacePageWrapper sidebar={side !== "" ? "true" : undefined}>
        {nftMarketplaceData && nftMarketplaceData?.length > 0 ? (
          <MarketplacePageContainer>
            <h2>Identities</h2>
            <DatesFilterSection />
            <MCardGridSection
              data={nftMarketplaceData}
              onCardClick={handleCardClick}
              page="identities"
            />
          </MarketplacePageContainer>
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
      </MarketplacePageWrapper>
      <MViewCardSection
        open={side === "view"}
        onClose={handleSideClose}
        page="identities"
      />
      <MBuyCardSection
        open={side === "buy"}
        onClose={handleSideClose}
        page="identities"
      />
      <MSellCardSection
        open={side === "sell"}
        onClose={handleSideClose}
        page="identities"
      />
      {/* <MOfferCardSection
        open={side === "offer"}
        onClose={handleSideClose}
        onConfirm={handleOfferConfirm}
      /> */}
    </AppLayout>
  );
};

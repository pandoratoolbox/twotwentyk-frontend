import React, { useEffect, useState } from "react";
import { AppLayout } from "../../../layout/AppLayout";
import {
  MarketplaceContentWrapper,
  MarketplacePageContainer,
  MarketplacePageWrapper,
} from "./styles";
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
import { useMyInfoContext, useMyOfferContext } from "../../../context";
import { ToastContainer, toast } from "react-toastify";

export const MarketplacePage: React.FC = () => {
  const navigate = useNavigate();
  const [side, setSide] = useState<CardActionTypes>("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [nftMarketplaceData, setNftMarketplaceData] = useState<
    IMarketplaceListing[] | null
  >(null);
  const { myOfferContext, setMyOfferContext } = useMyOfferContext();
  const { myInfoContext } = useMyInfoContext();
  const [selectedId, setSelectedId] = useState<number | string>("");

  useEffect(() => {
    getPageData();
  }, []);

  const handleCardClick = (item: any, action: CardActionTypes) => {
    setSelectedId(item.id);
    setSelectedItem(item);
    setSide(action);
  };

  const handleSideClose = () => {
    setSide("");
    setSelectedId("");
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

  const handleOfferConfirm = () => {
    const offerCard = nftMarketplaceData?.filter(
      (f) => f.id === Number(selectedId)
    )[0];
    if (offerCard) {
      setMyOfferContext([
        ...myOfferContext,
        {
          ...offerCard,
          buyer: myInfoContext?.username,
          buyer_id: myInfoContext?.id,
          date: Date.now(),
          status: 0,
        },
      ]);
      handleSideClose();
    } else {
      toast.error("Something went wrong!!!");
    }
  };

  return (
    <AppLayout>
      <ToastContainer
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
      />
      {nftMarketplaceData && nftMarketplaceData?.length > 0 ? (
        <MarketplacePageWrapper sidebar={side !== "" ? "true" : undefined}>
          <MarketplacePageContainer>
            <h2>Cards</h2>
            <MarketplaceContentWrapper>
              <MFilterSection />
              <MCardGridSection
                data={nftMarketplaceData}
                onCardClick={handleCardClick}
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
            onClick={() => navigate("/dashboard/dates")}
          >
            Sell Card
          </Button>
        </EmptyCards>
      ) : (
        <Loader />
      )}
      <MViewCardSection
        open={side === "view"}
        selectedItem={selectedItem}
        onClose={handleSideClose}
      />
      <MBuyCardSection
        open={side === "buy"}
        selectedItem={selectedItem}
        onClose={handleSideClose}
      />
      <MSellCardSection open={side === "sell"} onClose={handleSideClose} />
      <MOfferCardSection
        open={side === "offer"}
        onConfirm={handleOfferConfirm}
        selectedItem={selectedItem}
        onClose={handleSideClose}
      />
    </AppLayout>
  );
};

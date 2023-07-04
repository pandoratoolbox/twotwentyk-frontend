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
  TriggerFilterSection,
  SellDateCardSection,
  ViewDateCardSection,
} from "../../../modules";
import { useNavigate } from "react-router-dom";
import { useInventoryNFTsContext } from "../../../context";
import { getMyNftCardTrigger } from "../../../actions/nft_card_trigger";
import { newMarketplaceList } from "../../../actions/marketplace_listing";
import { INftCardTrigger } from "../../../models/nft_card_trigger";

export const TriggersPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [isView, setIsView] = useState<"view" | "sell" | "">("");
  const { inventoryNFTsContext, setInventoryNftsContext } =
    useInventoryNFTsContext();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nftCardTriggerData, setNftCardTriggerData] = useState<
    INftCardTrigger[] | null
  >(null);
  useEffect(() => {
    setCurrentUser(localStorage.getItem("auth"));
  }, []);

  const getPageData = async () => {
    setIsLoading(true);

    const token = localStorage.auth;
    const response = await getMyNftCardTrigger(token);

    if (response?.data) {
      setNftCardTriggerData(response?.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPageData();
  }, []);

  const [modal, setModal] = useState(false);

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

  const handleCraft = (item: any) => {
    navigate("/crafting/predictions?id=" + item?.id);
  };

  const handleSell = (item: any) => {
    setSelectedItem(item);
    setIsView("sell");
  };

  return (
    <AppLayout>
      <SellConfirmModal open={modal} onClose={() => setModal(false)} />
      {currentUser ? (
        nftCardTriggerData && nftCardTriggerData?.length > 0 ? (
          <DatesPageWrapper isview={isView ? "true" : undefined}>
            <DatePageContainer>
              <DatePageTitleWrapper>
                <h3>Triggers</h3>
                <ButtonGroup>
                  <Button
                    className="buy-button"
                    onClick={() => navigate("/marketplace")}
                  >
                    Buy Cards
                  </Button>
                  <Button
                    className="buy-button"
                    onClick={() => navigate("/buy")}
                  >
                    Buy Packs
                  </Button>
                </ButtonGroup>
              </DatePageTitleWrapper>
              <TriggerFilterSection />
              <CardGridSection
                data={nftCardTriggerData}
                cardType={"trigger"}
                onCraft={handleCraft}
                onSell={handleSell}
                onView={handleView}
              />
              <ViewDateCardSection
                isView={isView === "view"}
                cardType="trigger"
                item={selectedItem}
                onClose={() => setIsView("")}
              />
              <SellDateCardSection
                onSellConfirm={handleSellConfirm}
                isView={isView === "sell"}
                cardType="trigger"
                item={selectedItem}
                onClose={() => setIsView("")}
              />
            </DatePageContainer>
          </DatesPageWrapper>
        ) : !isLoading ? (
          <EmptyCards>
            <h3>No Triggers</h3>
            <p>It looks like you don’t have any triggers yet.   </p>
            <Button className="buy-button">Buy Cards</Button>
            <Button className="buy-button" onClick={() => navigate("/buy")}>
              Buy Packs
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

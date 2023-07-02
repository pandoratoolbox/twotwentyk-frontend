import React, { useEffect, useState } from "react";
import { AppLayout } from "../../../layout/AppLayout";
import {
  ButtonGroup,
  DatePageContainer,
  DatePageTitleWrapper,
  DatesPageWrapper,
  EmptyCards,
} from "./styles";
import { Button, SellConfirmModal } from "../../../components";
import {
  CardGridSection,
  DatesFilterSection,
  SellDateCardSection,
  ViewDateCardSection,
} from "../../../modules";
import { useNavigate } from "react-router-dom";
import { useInventoryNFTsContext } from "../../../context";
import { getMyNftCardDayMonth } from "../../../actions/nft_card_day_month";
import { newMarketplaceList } from "../../../actions/marketplace_listing";

export const DatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { inventoryNFTsContext, setInventoryNftsContext } =
    useInventoryNFTsContext();

  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [isView, setIsView] = useState<"view" | "sell" | "">("");
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setCurrentUser(localStorage.getItem("auth"));
  }, []);

  const getPageData = async () => {
    const token = localStorage.auth;
    const response = await getMyNftCardDayMonth(token);
    setInventoryNftsContext(response?.data);
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

  const handleCraft = (item: any) => {
    navigate("/crafting/identities?id=" + item.id);
  };

  const handleSell = (item: any) => {
    setSelectedItem(item);
    setIsView("sell");
  };

  return (
    <AppLayout>
      <SellConfirmModal open={modal} onClose={() => setModal(false)} />
      {currentUser ? (
        inventoryNFTsContext?.length > 0 ? (
          <DatesPageWrapper isview={isView ? "true" : undefined}>
            <DatePageContainer>
              <DatePageTitleWrapper>
                <h3>Date Cards</h3>
                <ButtonGroup>
                  <Button className="buy-button">Buy Cards</Button>
                  <Button
                    className="buy-button"
                    onClick={() => navigate("/buy")}
                  >
                    Buy Packs
                  </Button>
                </ButtonGroup>
              </DatePageTitleWrapper>
              <DatesFilterSection />
              <CardGridSection
                cardType="date"
                data={inventoryNFTsContext}
                onCraft={handleCraft}
                onSell={handleSell}
                onView={handleView}
              />
              <ViewDateCardSection
                cardType="date"
                isView={isView === "view"}
                item={selectedItem}
                onClose={() => setIsView("")}
              />
              <SellDateCardSection
                cardType="date"
                onSellConfirm={handleSellConfirm}
                isView={isView === "sell"}
                item={selectedItem}
                onClose={() => setIsView("")}
              />
            </DatePageContainer>
          </DatesPageWrapper>
        ) : (
          <EmptyCards>
            <h3>No Date Cards</h3>
            <p>It looks like you don’t have any date cards yet. </p>
            <Button
              className="buy-button"
              onClick={() => navigate("/marketplace")}
            >
              Buy Cards
            </Button>
            <Button className="buy-button" onClick={() => navigate("/buy")}>
              Buy Packs
            </Button>
          </EmptyCards>
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

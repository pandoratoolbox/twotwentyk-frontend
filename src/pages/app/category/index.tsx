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
  CategoryFilterSection,
  SellDateCardSection,
  ViewDateCardSection,
} from "../../../modules";
import { useNavigate } from "react-router-dom";
import { useInventoryNFTsContext } from "../../../context";
import { getMyNftCardCategory } from "../../../actions/nft_card_category";
import { newMarketplaceList } from "../../../actions/marketplace_listing";

export const CategoriesPage: React.FC = () => {
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
    const response = await getMyNftCardCategory(token);
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
    console.log(response);

    setModal(true);
    setIsView("");
  };

  const handleView = (item: any) => {
    setSelectedItem(item);
    setIsView("view");
  };

  const handleCraft = (id: string | number) => {
    navigate("/crafting/identities?id=" + id);
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
                <h3>Category Cards</h3>
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
              <CategoryFilterSection />
              <CardGridSection
                cardType="category"
                data={inventoryNFTsContext}
                onCraft={handleCraft}
                onSell={handleSell}
                onView={handleView}
              />
              <ViewDateCardSection
                cardType={"category"}
                isView={isView === "view"}
                item={selectedItem}
                onClose={() => setIsView("")}
              />
              <SellDateCardSection
                cardType={"category"}
                onSellConfirm={handleSellConfirm}
                isView={isView === "sell"}
                item={selectedItem}
                onClose={() => setIsView("")}
              />
            </DatePageContainer>
          </DatesPageWrapper>
        ) : (
          <EmptyCards>
            <h3>No Category Cards</h3>
            <p>It looks like you don’t have any category cards yet.  </p>
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

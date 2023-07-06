import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResponsivePagination from "react-responsive-pagination";
import { AppLayout } from "../../../layout/AppLayout";
import {
  CardTitle,
  DashboardCardGrid,
  DashboardCardWrapper,
  DashboardListGrid,
  DashboardPageWrapper,
  EmptyCardWrapper,
  SeeMoreButton,
} from "./styles";
// import { identitiesData, predictionData } from "./data";
import {
  Button,
  FeedItem,
  MarketCard,
  PredictionCard,
  SellConfirmModal,
} from "../../../components";
import { IArticle } from "../../../types/actions";
import { ToastContainer } from "react-toastify";
import {
  useFeedContext,
  // useMarketplaceListContext,
  // useMonthContext,
  useMyFeedContext,
  useMyNFTsContext,
  useMyOfferContext,
} from "../../../context";
import { SellDateCardSection, ViewDateCardSection } from "../../../modules";
import { newMarketplaceList } from "../../../actions/marketplace_listing";
import { getMyNftCardIdentity } from "../../../actions/nft_card_identity";
import { INftCardIdentity } from "../../../models/nft_card_identity";
import { INftCardPrediction } from "../../../models/nft_card_prediction";
import { getMyNftCardPrediction } from "../../../actions/nft_card_prediction";

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { feedContext } = useFeedContext();
  const { myFeedContext } = useMyFeedContext();
  const { myNFTsContext } = useMyNFTsContext();
  const { myOfferContext } = useMyOfferContext();

  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [pageAllFeeds, setPageAllFeeds] = useState<IArticle[]>([]);
  const [afCurrentPage, setAFCurrentPage] = useState(1);
  const [pageMyFeeds, setPageMyFeeds] = useState<IArticle[]>([]);
  const [myCurrentPage, setMYCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isView, setIsView] = useState<"view" | "sell" | "">("");
  const [modal, setModal] = useState(false);
  const [identityNfts, setIdentityNfts] = useState<INftCardIdentity[]>([]);
  const [predictionNfts, setPredictionNfts] = useState<INftCardPrediction[]>(
    []
  );

  useEffect(() => {
    setCurrentUser(localStorage.getItem("auth"));
  }, []);

  useEffect(() => {
    setPageAllFeeds(feedContext.slice(0, 5));
  }, [feedContext]);

  useEffect(() => {
    setPageMyFeeds(myFeedContext?.slice(0, 5));
  }, [myFeedContext]);

  const handlePagination = (number: number, key: string) => {
    if (key === "all") {
      setAFCurrentPage(number);
      setPageAllFeeds(
        feedContext.slice(5 * (number - 1), 5 * (number - 1) + 5)
      );
    } else if (key === "my") {
      setMYCurrentPage(number);
      setPageMyFeeds(
        myFeedContext.slice(5 * (number - 1), 5 * (number - 1) + 5)
      );
    }
  };

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

  const handleSell = (item: any) => {
    setSelectedItem(item);
    setIsView("sell");
  };

  const loadNfts = async () => {
    const token = localStorage.auth;
    const p_resp = await getMyNftCardPrediction(token);
    if (p_resp?.data) {
      setPredictionNfts(p_resp.data);
    }

    const i_resp = await getMyNftCardIdentity(token);
    if (i_resp?.data) {
      setIdentityNfts(i_resp.data);
    }
  };

  useEffect(() => {
    loadNfts();
  }, []);

  return (
    <AppLayout>
      <SellConfirmModal open={modal} onClose={() => setModal(false)} />

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
      <DashboardPageWrapper>
        <DashboardCardWrapper>
          <CardTitle>My Identities</CardTitle>
          {identityNfts?.length > 0 && currentUser ? (
            <React.Fragment>
              <DashboardCardGrid>
                {identityNfts
                  ?.slice(0, 4) //////////////////// Have to add some filter by collection id
                  .map((item: any, key: number) => (
                    <PredictionCard
                      isNotHover={true}
                      day={item.day}
                      month={item.month}
                      year={item.year}
                      rarity={item.rarity}
                      {...item}
                      // onClick={() =>
                      //   navigate("/dashboard/identities?id=" + item.nft_id)
                      // }
                      key={key}
                      onSell={handleSell}
                      cardType="identity"
                      onView={handleView}
                    />
                  ))}
              </DashboardCardGrid>

              <ViewDateCardSection
                isView={isView === "view"}
                cardType="identity"
                item={selectedItem}
                onClose={() => {
                  setIsView("");
                }}
              />
              <SellDateCardSection
                onSellConfirm={handleSellConfirm}
                cardType="identity"
                isView={isView === "sell"}
                item={selectedItem}
                onClose={() => {
                  setIsView("");
                }}
              />
              <SeeMoreButton onClick={() => navigate("/dashboard/identities")}>
                See More
              </SeeMoreButton>
            </React.Fragment>
          ) : (
            <EmptyCardWrapper>
              <p>
                Combine a Year card, a Day & Month, and a Category card to craft
                an Identity.
              </p>
              <img src="/assets/identities-empty.png" alt="" />
              {currentUser && (
                <Button
                  className="dashboard-card-button"
                  onClick={() => navigate("/crafting/identities")}
                >
                  Craft an Identity Now
                </Button>
              )}
            </EmptyCardWrapper>
          )}
        </DashboardCardWrapper>
        {myOfferContext?.length > 0 && (
          <DashboardCardWrapper>
            <CardTitle>My Offers</CardTitle>
            {/* */}
            <React.Fragment>
              <DashboardCardGrid>
                {myOfferContext
                  ?.filter((f: any) => f.status === 0)
                  .slice(0, 4) //////////////////// Have to add some filter by collection id
                  .map((item: any, key: number) => (
                    <MarketCard
                      // {...cardData[key]}
                      key={key}
                      {...item}
                      onCard={() =>
                        navigate("/dashboard/myoffer?id=" + item.nft_id)
                      }
                    />
                  ))}
              </DashboardCardGrid>
              <SeeMoreButton onClick={() => navigate("/dashboard/myoffer")}>
                See More
              </SeeMoreButton>
            </React.Fragment>
          </DashboardCardWrapper>
        )}
        <DashboardCardWrapper>
          <CardTitle>My Predictions</CardTitle>
          {predictionNfts.length > 0 && currentUser ? (
            <React.Fragment>
              <DashboardCardGrid>
                {predictionNfts
                  ?.slice(0, 4) //////////////////// Have to add some filter by collection id
                  .map((item: any, key: number) => (
                    <PredictionCard
                      // onClick={() =>
                      //   navigate("/dashboard/predictions?id=" + item.nft_id)
                      // }
                      isNotHover={true}
                      {...item}
                      rarity={item.rarity}
                      key={key}
                      onSell={handleSell}
                      cardType="prediction"
                      onView={handleView}
                    />
                  ))}
              </DashboardCardGrid>
              <SeeMoreButton onClick={() => navigate("/dashboard/predictions")}>
                See More
              </SeeMoreButton>
            </React.Fragment>
          ) : (
            <EmptyCardWrapper>
              <p>
                Add one or more Triggers to an Identity to craft a Prediction
              </p>
              <img src="/assets/prediction-empty.png" alt="" />
              {currentUser && (
                <Button
                  className="dashboard-card-button"
                  onClick={() => navigate("/crafting/predictions")}
                >
                  Craft a Prediction Now
                </Button>
              )}
            </EmptyCardWrapper>
          )}
        </DashboardCardWrapper>
        {currentUser && myFeedContext?.length > 0 && (
          <DashboardCardWrapper>
            <CardTitle>My Feed</CardTitle>
            <DashboardListGrid>
              {pageMyFeeds.map((item, key) => (
                <FeedItem {...item} key={key} />
              ))}
            </DashboardListGrid>
            <ResponsivePagination
              maxWidth={272}
              current={myCurrentPage}
              total={Math.round(Number(myFeedContext?.length / 5))}
              onPageChange={(page) => handlePagination(page, "my")}
            />
          </DashboardCardWrapper>
        )}
        {currentUser && feedContext?.length > 0 && (
          <DashboardCardWrapper>
            <CardTitle>TwoTwentyK News Feed</CardTitle>
            <DashboardListGrid>
              {pageAllFeeds?.map((item, key) => (
                <FeedItem {...item} key={key} />
              ))}
            </DashboardListGrid>
            <ResponsivePagination
              maxWidth={272}
              current={afCurrentPage}
              total={Math.round(Number(feedContext.length / 5))}
              onPageChange={(page) => handlePagination(page, "all")}
            />
          </DashboardCardWrapper>
        )}
        {!currentUser && (
          <Button className="login-button" onClick={() => navigate("/signin")}>
            Login Now
          </Button>
        )}
      </DashboardPageWrapper>
    </AppLayout>
  );
};

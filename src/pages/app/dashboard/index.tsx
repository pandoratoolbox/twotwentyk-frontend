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
import {
  Button,
  FeedItem,
  MarketCard,
  PredictionCard,
  SellConfirmModal,
  Loader,
} from "../../../components";
import { IArticle } from "../../../types/actions";
import { ToastContainer, toast } from "react-toastify";
import {
  // useFeedContext,
  // useMarketplaceListContext,
  useMonthContext,
  // useMyFeedContext,
  // useMyNFTsContext,
  // useMyOfferContext,
} from "../../../context";
import { SellDateCardSection, ViewDateCardSection } from "../../../modules";
import { newMarketplaceList } from "../../../actions/marketplace_listing";
import { getMyNftCardIdentity } from "../../../actions/nft_card_identity";
import { INftCardIdentity } from "../../../models/nft_card_identity";
import { INftCardPrediction } from "../../../models/nft_card_prediction";
import { getMyNftCardPrediction } from "../../../actions/nft_card_prediction";
import api from "../../../config/api";

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  // const { feedContext } = useFeedContext();
  // const { myFeedContext } = useMyFeedContext();
  // const { myNFTsContext } = useMyNFTsContext();
  // const { myOfferContext } = useMyOfferContext();

  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [pageAllFeeds, setPageAllFeeds] = useState<IArticle[]>([]);
  const [afCurrentPage, setAFCurrentPage] = useState(1);
  const [pageMyFeeds, setPageMyFeeds] = useState<IArticle[]>([]);
  const [myCurrentPage, setMYCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isView, setIsView] = useState<"view" | "sell" | "">("");
  const [cardType, setCardType] = useState("");

  const [modal, setModal] = useState(false);
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(false);
  const [isLoadingIdentity, setIsLoadingIdentity] = useState(false);
  const [isLoadingOffers, setIsLoadingOffers] = useState(false);
  const [isLoadingFeed, setIsLoadingFeed] = useState(false);
  const [isLoadingMyFeed, setIsLoadingMyFeed] = useState(false);

  const [identityNfts, setIdentityNfts] = useState<INftCardIdentity[]>([]);
  const [predictionNfts, setPredictionNfts] = useState<INftCardPrediction[]>(
    []
  );
  const [marketplaceOffers, setMarketplaceOffers] = useState<any[]>([]);
  const [feedData, setFeedData] = useState<IArticle[]>([]);
  const [myFeedData, setMyFeedData] = useState<IArticle[]>([]);

  const { monthContext } = useMonthContext();

  useEffect(() => {
    setCurrentUser(localStorage.getItem("auth"));
  }, []);

  useEffect(() => {

    setPageAllFeeds(feedData.slice(0, 5));
  }, [feedData]);

  useEffect(() => {
    setPageMyFeeds(myFeedData?.slice(0, 5));
  }, [myFeedData]);

  const handlePagination = (number: number, key: string) => {
    if (key === "all") {
      setAFCurrentPage(number);
      setPageAllFeeds(
        feedData.slice(5 * (number - 1), 5 * (number - 1) + 5)
      );
    } else if (key === "my") {
      setMYCurrentPage(number);
      setPageMyFeeds(
        myFeedData.slice(5 * (number - 1), 5 * (number - 1) + 5)
      );
    }
  };

  const handleSellConfirm = async (
    id: number | string,
    collection_id: string | number,
    price: string | number
  ) => {
    const newMarketplace = {
      nft_collection_id: collection_id,
      nft_id: id,
      price: price,
    };
    const response = await newMarketplaceList(newMarketplace);
    console.log(response);

    setModal(true);
    setIsView("");
  };

  const handleView = (item: any) => {
    console.log(item);
    setSelectedItem(item);
    setCardType(item?.triggers ? "prediction" : "identity");
    setIsView("view");
  };

  const handleSell = (item: any) => {
    setSelectedItem(item);
    setCardType(item?.triggers ? "prediction" : "identity");
    setIsView("sell");
  };

  const loadIdentities = async () => {
    setIsLoadingIdentity(true);
    let p_resp = await getMyNftCardIdentity(null);
    if (p_resp?.data) {
      setIdentityNfts(p_resp.data);
    }
    setIsLoadingIdentity(false);
  };

  const loadPredictions = async () => {
    setIsLoadingPrediction(true);
    let p_resp = await getMyNftCardPrediction(null);
    if (p_resp?.data) {
      setPredictionNfts(p_resp.data);
    }
    setIsLoadingPrediction(false);
  };

  const loadOffers = async () => {
    setIsLoadingOffers(true);

    try {
      let res = await api.get("/me/marketplace_offer")
      if (res.data) {
        setMarketplaceOffers(res.data)
      }
    } catch (e: any) {
      toast.error(e)
    }

    setIsLoadingOffers(false);
  }

  const loadFeed = async () => {
    setIsLoadingFeed(true);

    try {
      let res = await api.get("/feed")
      if (res.data) {
        setFeedData(res.data)
      }
    }catch (e: any) {
      toast.error(e)
    }


    setIsLoadingFeed(false);
  }

  const loadMyFeed = async () => {
    setIsLoadingMyFeed(true);

    try {
      let res = await api.get("/feed/personalised")
      if (res.data) {
        setMyFeedData(res.data)
      }
    }catch (e: any) {
      toast.error(e)
    }



    setIsLoadingMyFeed(false);
  }

  const loadNfts = async () => {
    loadIdentities();
    loadPredictions();
    loadFeed();
    loadMyFeed();
    loadOffers();
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) loadNfts();
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
          {identityNfts?.length > 0 && currentUser && monthContext ? (
            <React.Fragment>
              <DashboardCardGrid>
                {/* {identityNfts */}
                {identityNfts
                  ?.slice(0, 4) //////////////////// Have to add some filter by collection id
                  .map((item: any, key: number) => (
                    <PredictionCard
                      dashbordstyle={"true"}
                      height={"225"}
                      isNotHover={true}
                      day={item.day}
                      month={item.month}
                      year={item.year}
                      rarity={item.rarity}
                      item={item}
                      {...item}
                      key={key}
                      onSell={handleSell}
                      cardType="identity"
                      onView={handleView}
                    />
                  ))}
              </DashboardCardGrid>

              <ViewDateCardSection
                isView={isView === "view"}
                cardType={cardType}
                item={selectedItem}
                onClose={() => {
                  setIsView("");
                }}
              />
              <SellDateCardSection
                onSellConfirm={handleSellConfirm}
                cardType={cardType}
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
          ) : !isLoadingIdentity ? (
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
          ) : (
            <Loader />
          )}
        </DashboardCardWrapper>
        <DashboardCardWrapper>
          <CardTitle>My Predictions</CardTitle>
          {predictionNfts.length > 0 && currentUser ? (
            <React.Fragment>
              <DashboardCardGrid>
                {predictionNfts
                  ?.slice(0, 4) //////////////////// Have to add some filter by collection id
                  .map((item: any, key: number) => (
                    <PredictionCard
                      dashbordstyle={"true"}
                      height={"225"}
                      isNotHover={true}
                      item={item}
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
          ) : !isLoadingPrediction ? (
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
          ) : (
            <Loader />
          )}
        </DashboardCardWrapper>
        {currentUser &&
          marketplaceOffers?.length > 0 ? (
            <DashboardCardWrapper>
              <CardTitle>My Offers</CardTitle>
              {/* */}
              <React.Fragment>
                <DashboardCardGrid>
                  {marketplaceOffers
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
          ) : !isLoadingOffers ? (
            <DashboardCardWrapper>
              <CardTitle>My Offers</CardTitle>
              <EmptyCardWrapper>
                <p>There is no card to offer</p>
                <img src="/assets/prediction-empty.png" alt="" />
                {currentUser && (
                  <Button
                    className="dashboard-card-button"
                    onClick={() => navigate("/marketplace")}
                  >
                    Go to Marketplace
                  </Button>
                )}
              </EmptyCardWrapper>
            </DashboardCardWrapper>
          ) : (
            <Loader />
          )}
        {currentUser && myFeedData?.length > 0 && (
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
              total={Math.ceil(Number(myFeedData?.length / 5))}
              onPageChange={(page) => handlePagination(page, "my")}
            />
          </DashboardCardWrapper>
        )}
        {currentUser && feedData?.length > 0 && (
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
              total={Math.ceil(Number(feedData.length / 5))}
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

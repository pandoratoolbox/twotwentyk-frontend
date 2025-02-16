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
import {
  RequestSearchMarketplaceListingParams,
  getMarketplaceList,
  cardCollection,
} from "../../../actions/marketplace_listing";
import { useMyInfoContext, useMyOfferContext } from "../../../context";
import { ToastContainer, toast } from "react-toastify";
import { loadMoonPay } from "@moonpay/moonpay-js";
import api from "../../../config/api";



export const MarketplacePage: React.FC = () => {
  const nftCollections = new Map<number, string>([[1, ""]]);
  const navigate = useNavigate();
  const [side, setSide] = useState<CardActionTypes>("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [collection, setCollection] = useState(null);
  const [nftMarketplaceData, setNftMarketplaceData] = useState<
    IMarketplaceListing[] | null
  >(null);
  const { myOfferContext, setMyOfferContext } = useMyOfferContext();
  const { myInfoContext } = useMyInfoContext();
  const [selectedId, setSelectedId] = useState<number | string>("");
  const [selectedNftCollectionId, setSelectedNftCollectionId] =
    useState<number>(1);
  const [selectedNftTypeIds, setSelectedNftTypeIds] = useState<number[]>([
    1, 2, 3, 4, 5,
  ]);
  const [selectedStatus, setSelectedStatus] = useState<number[]>([0]);


  const showMoonpay = async () => {
    let moonPay = await loadMoonPay();
    if (moonPay) {
      
      const moonPaySdk = moonPay({
        flow: 'nft',
        environment: 'sandbox',
        variant: 'overlay',  
        params: {  
          apiKey: 'pk_test_PaUTi3HVAHvclaZTMJS0TNTfMIrpPj',
          contractAddress: "6",
          tokenId: "109",
          walletAddress: "test",
          signature: "",
        },
        debug: true
      });
      
  
      if (moonPaySdk) {
        const urlForSignature = moonPaySdk.generateUrlForSigning();
        api.post("/webhook/moonpay/sign", {url: urlForSignature}).then((res) => {
          console.log(res);
          moonPaySdk.updateSignature(res.data.signature);
          moonPaySdk.show();
        }).catch((err) => {
          console.log(err);
        }
        )

       
      } else {
        console.log("error showing moonpay")
      }
  }
}

useEffect(() => {
  // showMoonpay()
}, []);


  useEffect(() => {
    getPageData({
      card_collection_id: selectedNftCollectionId,
      nft_type_ids: selectedNftTypeIds,
      status: selectedStatus,
    });
    getCollection();
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

  const getPageData = async (params: RequestSearchMarketplaceListingParams) => {
    setIsLoading(true);
    if (selectedNftTypeIds) {
      const response = await getMarketplaceList(params);

      if (response?.data) {
        setNftMarketplaceData(response?.data);
      }
    }

    setIsLoading(false);
  };

  const getCollection = async () => {
    const response = await cardCollection();
    if (response?.data) {
      let n = response.data.find((i: any) => i.id == selectedNftCollectionId);
      if (n) {
        setCollection(n.name);
      }
    }
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
              <MFilterSection
                onSelectNftCollection={(selected) => {
                  setSelectedNftCollectionId(selected);
                }}
                onSelectStatus={(selected) => {
                  setSelectedStatus(selected);
                }}
                onSelectCardTypes={(selected) => {
                  setSelectedNftTypeIds(selected);
                  getPageData({
                    card_collection_id: selectedNftCollectionId,
                    nft_type_ids: selected,
                    status: selectedStatus,
                  });
                }}
              />
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
            onClick={() => navigate("/dashboard/categories")}
          >
            Sell Card
          </Button>
        </EmptyCards>
      ) : (
        <Loader />
      )}
      {selectedItem && (
        <div id="sideview">
          <MViewCardSection
            open={side === "view"}
            selectedItem={selectedItem}
            onClose={handleSideClose}
            collection={collection}
          />
          <MBuyCardSection
            open={side === "buy"}
            selectedItem={selectedItem}
            onClose={handleSideClose}
            data={nftMarketplaceData}
            setData={setNftMarketplaceData}
            collection={collection}
          />
          <MSellCardSection
            open={side === "sell"}
            onClose={handleSideClose}
            selectedItem={selectedItem}
            collection={collection}
          />
          <MOfferCardSection
            open={side === "offer"}
            onConfirm={handleOfferConfirm}
            selectedItem={selectedItem}
            onClose={handleSideClose}
            collection={collection}
          />
        </div>
      )}
    </AppLayout>
  );
};

import React, { useEffect, useState } from "react";
import { AppLayout } from "../../../layout/AppLayout";
import {
  ButtonGroup,
  DatePageContainer,
  DatePageContent,
  DatePageTitleWrapper,
  DatesPageWrapper,
  EmptyCards,
} from "./styles";
import { Button, SellConfirmModal, Loader } from "../../../components";
import {
  CardGridSection,
  CraftingFilterSection,
  SellDateCardSection,
  ViewDateCardSection,
} from "../../../modules";
import { useNavigate } from "react-router-dom";
import { getMyNftCardDayMonth } from "../../../actions/nft_card_day_month";
import { getMyNftCardYear } from "../../../actions/nft_card_year";
import { newMarketplaceList } from "../../../actions/marketplace_listing";
import { INftCardDayMonth } from "../../../models/nft_card_day_month";
import { INftCardYear } from "../../../models/nft_card_year";
import {
  NftCardDayMonthFilters,
  NftCardYearFilters,
} from "../../../models/filters";
import api from "../../../config/api";
import { NFT_TYPE_ID_DAY_MONTH, NFT_TYPE_ID_YEAR } from "../../../models/nft";
import { toast, ToastContainer } from "react-toastify";
import { AnyComponent } from "styled-components/dist/types";
import { IMarketplaceListing } from "../../../models/marketplace_listing";

interface DateFilters {
  //card_types: number[];
  card_series_id: number | null;
  rarities: number[] | null;
  status: number[] | null;
}

export const CraftingPage: React.FC = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [isView, setIsView] = useState<"view" | "sell" | "">("");
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFilter, setIsLoadingFilter] = useState(false);
  const [filters, setFilters] = useState<DateFilters>({
    //card_types: [3, 4],
    card_series_id: null,
    rarities: null,
    status: null,
  });

  const [nftCraftingData, setNftCraftingData] = useState<
    (INftCardDayMonth | INftCardYear)[] | null
  >(null);

  useEffect(() => {
    setCurrentUser(localStorage.getItem("auth"));
    getCratfinData();
  }, []);

  const getCratfinData = async () => {
    setIsLoading(true);
    let response: any = await api.get(`/me/nft_card_crafting`);
    if (response.status === 200) {
      setNftCraftingData(response.data);
    }
    setIsLoading(false);
  };

  const handleSellConfirm = async (
    id: number,
    collection_id: number,
    price: number
  ) => {
    try {
      let params: IMarketplaceListing = {
        nft_type_id: collection_id,
        price: price * 100,
      };
      switch (collection_id) {
        case NFT_TYPE_ID_DAY_MONTH:
          params.nft_card_day_month_id = id;
          break;
        case NFT_TYPE_ID_YEAR:
          params.nft_card_year_id = id;
          break;
      }
      let res = await api.post(`/marketplace_listing`, params);
      if (res.status === 200) {
        toast.success("You listed a card for sale!");
        setModal(true);
        setIsView("");
      }
    } catch (e: any) {
      toast.error(e.response.data);
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

  // filter option click
  const handleOptionClick = async (
    filterType: string,
    selectedOptions: string[]
  ) => {
    console.log(filterType, selectedOptions);
    // for loader
    setIsLoadingFilter(true);

    let newFilters: DateFilters = {
      card_series_id: filters.card_series_id,
      status: filters.status,
      rarities: filters.rarities,
      //card_types: filters.card_types,
    };

    switch (filterType) {
      // case "Card Types":
      //   //newFilters.card_types = selectedOptions.map((v) => {
      //    // return Number(v);
      //   //});
      //   break;
      case "All Rarities":
        newFilters.rarities = selectedOptions.map((v) => {
          return Number(v);
        });
        break;
      case "Status":
        newFilters.status = selectedOptions.map((v) => {
          return Number(v);
        });
        break;
      case "Collections":
        newFilters.card_series_id = Number(selectedOptions[0]);
        break;
    }

    setIsLoadingFilter(false);
    setFilters(newFilters);
  };

  // filter Api Call
  const handleFilterAPICall = async () => {
    let newFilters: DateFilters = {
      card_series_id: filters.card_series_id,
      status: filters.status,
      rarities: filters.rarities,
      //card_types: filters.card_types,
    };

    let n: (INftCardDayMonth | INftCardYear)[] = [];

    // if (filters.card_types.includes(3)) {
    //   let dayMonthFilters: NftCardDayMonthFilters = {
    //     rarities: newFilters.rarities,
    //     card_series_id: newFilters.card_series_id,
    //     status: newFilters.status,
    //     day: null,
    //     month: null,
    //   };

    //   let res = await getMyNftCardDayMonth(dayMonthFilters);
    //   if (res?.data && Array.isArray(res.data)) {
    //     console.log("refreshed nft card day-month data");
    //     n.push(...res.data);
    //   }
    // }

    // if (filters.card_types.includes(4)) {
    //   let yearFilters: NftCardYearFilters = {
    //     card_series_id: newFilters.card_series_id,
    //     year: null,
    //     rarities: newFilters.rarities,
    //     status: newFilters.status,
    //   };

    //   let res = await getMyNftCardYear(yearFilters);
    //   if (res?.data && Array.isArray(res.data)) {
    //     console.log("refreshed nft card year data");
    //     n.push(...res.data);
    //   }
    // }

    //setNftCraftingData(n);

    // setIsLoadingFilter(false);
  };

  // useEffect(() => {
  //   // if (filters.card_types.length > 0) {
  //   //   handleFilterAPICall();
  //   // }
  // }, [filters]);

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
      <SellConfirmModal open={modal} onClose={() => setModal(false)} />
      {currentUser ? (
        <DatesPageWrapper isview={isView ? "true" : undefined}>
          <DatePageContainer>
            <DatePageTitleWrapper>
              <h3>Crafting</h3>
            </DatePageTitleWrapper>
            <DatePageContent>
              {!isLoadingFilter &&
              nftCraftingData &&
              nftCraftingData?.length > 0 ? (
                <>
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
                  <CraftingFilterSection onClick={handleOptionClick} />
                  <CardGridSection
                    cardType="date"
                    buttonText={"Crafting"}
                    data={nftCraftingData}
                    onCraft={handleCraft}
                    onSell={handleSell}
                    onView={handleView}
                  />
                </>
              ) : !isLoading &&
                !isLoadingFilter &&
                nftCraftingData?.length == 0 ? (
                <>
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
                  <CraftingFilterSection onClick={handleOptionClick} />
                  <CardGridSection
                    cardType="date"
                    buttonText={"Crafting"}
                    data={nftCraftingData}
                    onCraft={handleCraft}
                    onSell={handleSell}
                    onView={handleView}
                  />
                </>
              ) : !isLoading && nftCraftingData == null ? (
                <EmptyCards>
                  <div className="trigeres">
                    <h3>No Date Cards</h3>
                    <p>It looks like you don’t have any date cards yet. </p>
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
                  </div>
                </EmptyCards>
              ) : isLoading ? (
                <Loader />
              ) : null}
            </DatePageContent>
            {nftCraftingData && nftCraftingData?.length > 0 ? (
              <>
                <ViewDateCardSection
                  cardType="crafting"
                  isView={isView === "view"}
                  item={selectedItem}
                  onClose={() => setIsView("")}
                />
                <SellDateCardSection
                  cardType="crafting"
                  onSellConfirm={handleSellConfirm}
                  isView={isView === "sell"}
                  item={selectedItem}
                  onClose={() => setIsView("")}
                />
              </>
            ) : isLoadingFilter ? (
              <h1 className="setText" hidden>
                No Records Found
              </h1>
            ) : null}
          </DatePageContainer>
        </DatesPageWrapper>
      ) : (
        <EmptyCards className="login">
          <p className="login">Log in to start playing</p>
          <Button className="buy-button" onClick={() => navigate("/signin")}>
            Login Now
          </Button>
        </EmptyCards>
      )}
    </AppLayout>
  );
};

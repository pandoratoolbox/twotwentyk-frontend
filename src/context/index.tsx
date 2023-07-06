import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
// import jwt_decode from "jwt-decode";
import {
  getFeed,
  getPersonalizedFeed,
  getMyInfo,
  getMyNFTs,
  getMarketplaceList,
  getTriggers,
  getCelebrities,
  getCategories,
} from "../actions";
import {
  IArticle,
  IMarketplaceListing,
  IUser,
  ITrigger,
  ICelebrity,
  ICategory,
} from "../types/actions";

const AuthContext = createContext<any>({});
const FeedContext = createContext<any>([]);
const MyFeedContext = createContext<any>([]);
const MyInfoContext = createContext<any>(null);
const MyNFTsContext = createContext<any>(null);
const MarketplaceListContext = createContext<any>([]);
const MonthContext = createContext<any>([]);
const CardTypesContext = createContext<any>([]);
const AllRaritiesContext = createContext<any>([]);
const StatusContext = createContext<any>([]);
const CategoriesContext = createContext<any>([]);
const CelebritiesContext = createContext<any>([]);
const TriggersContext = createContext<any>([]);
const InventoryNftsContext = createContext<any>([]);
const MyOfferContext = createContext<any>([]);

export const AppWrapper: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  // const navigate = useNavigate();
  const location = useLocation();
  const [authContext, setAuthContext] = useState<any>({
    isAuthenticated: false,
    user: "",
  });
  const [feedContext, setFeedContext] = useState<IArticle[]>([]);
  const [myFeedContext, setMyFeedContext] = useState<IArticle[]>([]);
  const [myInfoContext, setMyInfoContext] = useState<IUser>();
  const [myNFTsContext, setMyNFTsContext] = useState<any>();
  const [myOfferContext, setMyOfferContext] = useState<any>();
  const [categoriesContext, setCategoriesContext] =
    useState<Map<number, ICategory>>();
  const [triggersContext, setTriggersContext] =
    useState<Map<number, ITrigger>>();
  const [celebritiesContext, setCelebritiesContext] =
    useState<Map<number, ICelebrity>>();
  const [marketplaceListContext, setMarketplaceListContext] = useState<any>([]);
  const [monthContext, setMonthContext] = useState<Map<number, string>>();
  const [cardTypesContext, setCardTypesContext] =
    useState<Map<number, ICategory>>();
  const [allRaritiesContext, setAllRaritiesContext] =
    useState<Map<number, ICategory>>();
  const [statusContext, setStatusContext] = useState<Map<number, ICategory>>();
  const [inventoryNFTsContext, setInventoryNftsContext] = useState<any>();

  const celebritiesValue = useMemo(
    () => ({ celebritiesContext, setCelebritiesContext }),
    [celebritiesContext]
  );

  const triggersValue = useMemo(
    () => ({ triggersContext, setTriggersContext }),
    [triggersContext]
  );

  const categoriesValue = useMemo(
    () => ({ categoriesContext, setCategoriesContext }),
    [categoriesContext]
  );

  const monthValue = useMemo(
    () => ({ monthContext, setMonthContext }),
    [monthContext]
  );

  const cardTypeValue = useMemo(
    () => ({ cardTypesContext, setCardTypesContext }),
    [cardTypesContext]
  );
  const allRaritiesValue = useMemo(
    () => ({ allRaritiesContext, setAllRaritiesContext }),
    [allRaritiesContext]
  );
  const statusValue = useMemo(
    () => ({ statusContext, setStatusContext }),
    [statusContext]
  );

  const authValue = useMemo(
    () => ({ authContext, setAuthContext }),
    [authContext]
  );

  const feedValue = useMemo(
    () => ({ feedContext, setFeedContext }),
    [feedContext]
  );

  const myFeedValue = useMemo(
    () => ({ myFeedContext, setMyFeedContext }),
    [myFeedContext]
  );

  const myInfoValue = useMemo(
    () => ({ myInfoContext, setMyInfoContext }),
    [myInfoContext]
  );

  const myOfferValue = useMemo(
    () => ({ myOfferContext, setMyOfferContext }),
    [myOfferContext]
  );

  const myNFTsValue = useMemo(
    () => ({ myNFTsContext, setMyNFTsContext }),
    [myNFTsContext]
  );

  const marketplaceListValue = useMemo(
    () => ({ marketplaceListContext, setMarketplaceListContext }),
    [marketplaceListContext]
  );

  const inventoryNFTsValue = useMemo(
    () => ({ inventoryNFTsContext, setInventoryNftsContext }),
    [inventoryNFTsContext]
  );

  const setContext = async () => {
    const token = localStorage.auth;
    if (token) {
      // const decoded = jwt_decode(String(token));
      //   if (decoded?.exp < Date.now() / 1000) {
      //     localStorage.removeItem("user");
      //     setAuthContext({
      //       ...authContext,
      //       isAuthenticated: false,
      //       user: "",
      //     });
      //   } else {
      setAuthContext({
        ...authContext,
        isAuthenticated: true,
        user: localStorage.getItem("auth"),
      });

      const myinfo = await getMyInfo(token);
      if (myinfo.data) setMyInfoContext(myinfo.data);

      const allFeedData = await getFeed();
      if (allFeedData.data) setFeedContext(allFeedData.data);

      const myFeedData = await getPersonalizedFeed();
      if (myFeedData.data) setMyFeedContext(myFeedData.data);

      const myNFTsData = await getMyNFTs(token);
      if (myNFTsData.data) setMyNFTsContext(myNFTsData.data);

      const triggersData = await getTriggers();
      if (triggersData.data) {
        let triggers = new Map<number, ITrigger>();
        triggersData.data.forEach((v) => {
          if (v.id) {
            triggers.set(v.id, v);
          }
        });
        setTriggersContext(triggers);
      }

      const celebritiesData = await getCelebrities();
      if (celebritiesData.data) {
        let celebrities = new Map<number, ICelebrity>();
        celebritiesData.data.forEach((v) => {
          if (v.id) {
            celebrities.set(v.id, v);
          }
        });
        setCelebritiesContext(celebrities);
      }

      const categoriesData = await getCategories();
      if (categoriesData.data) {
        let categories = new Map<number, ICategory>();
        categoriesData.data.forEach((v) => {
          if (v.id) {
            categories.set(v.id, v);
          }
        });
        setCategoriesContext(categories);
      }

      setMonthContext(
        new Map<number, string>([
          [1, "January"],
          [2, "February"],
          [3, "March"],
          [4, "April"],
          [5, "May"],
          [6, "June"],
          [7, "July"],
          [8, "August"],
          [9, "September"],
          [10, "October"],
          [11, "November"],
          [12, "December"],
        ])
      );

      setCardTypesContext(
        new Map<number, ICategory>([
          [1, { id: 1, name: "Day/Month" }],
          [2, { id: 2, name: "Year" }],
        ])
      );
      setAllRaritiesContext(
        new Map<number, ICategory>([
          [1, { id: 1, name: "Free to Play" }],
          [2, { id: 2, name: "Core" }],
          [3, { id: 3, name: "Uncommon" }],
          [4, { id: 4, name: "Rare" }],
        ])
      );
      setStatusContext(
        new Map<number, ICategory>([
          [1, { id: 1, name: "For sale" }],
          [2, { id: 2, name: "New for sale" }],
        ])
      );

      const marketplaceListingData = await getMarketplaceList(token);
      if (marketplaceListingData.data)
        setMarketplaceListContext(marketplaceListingData.data);
      // }
    } else {
      //   if (!isPrivateUrl(location.pathname, false)) {
      //     navigate("/");
      //   }
    }
  };

  useEffect(() => {
    setContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadFunc = async () => {
      await setContext();
    };
    loadFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={authValue}>
      <CategoriesContext.Provider value={categoriesValue}>
        <TriggersContext.Provider value={triggersValue}>
          <CelebritiesContext.Provider value={celebritiesValue}>
            <MonthContext.Provider value={monthValue}>
              <CardTypesContext.Provider value={cardTypeValue}>
                <AllRaritiesContext.Provider value={allRaritiesValue}>
                  <StatusContext.Provider value={statusValue}>
                    <FeedContext.Provider value={feedValue}>
                      <MyFeedContext.Provider value={myFeedValue}>
                        <MyInfoContext.Provider value={myInfoValue}>
                          <MyNFTsContext.Provider value={myNFTsValue}>
                            <InventoryNftsContext.Provider
                              value={inventoryNFTsValue}
                            >
                              <MarketplaceListContext.Provider
                                value={marketplaceListValue}
                              >
                                <MyOfferContext.Provider value={myOfferValue}>
                                  {children}
                                </MyOfferContext.Provider>
                              </MarketplaceListContext.Provider>
                            </InventoryNftsContext.Provider>
                          </MyNFTsContext.Provider>
                        </MyInfoContext.Provider>
                      </MyFeedContext.Provider>
                    </FeedContext.Provider>
                  </StatusContext.Provider>
                </AllRaritiesContext.Provider>
              </CardTypesContext.Provider>
            </MonthContext.Provider>
          </CelebritiesContext.Provider>
        </TriggersContext.Provider>
      </CategoriesContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const useFeedContext = () => {
  return useContext(FeedContext);
};

export const useMyFeedContext = () => {
  return useContext(MyFeedContext);
};

export const useMyInfoContext = () => {
  return useContext(MyInfoContext);
};

export const useMyNFTsContext = () => {
  return useContext(MyNFTsContext);
};

export const useInventoryNFTsContext = () => {
  return useContext(InventoryNftsContext);
};

export const useMarketplaceListContext = () => {
  return useContext(MarketplaceListContext);
};

export const useMonthContext = () => {
  return useContext(MonthContext);
};

export const useCardTypesContext = () => {
  return useContext(CardTypesContext);
};
export const useAllRaritiesContext = () => {
  return useContext(AllRaritiesContext);
};
export const useStatusContext = () => {
  return useContext(StatusContext);
};

export const useTriggersContext = () => {
  return useContext(TriggersContext);
};

export const useCelebritiesContext = () => {
  return useContext(CelebritiesContext);
};

export const useCategoriesContext = () => {
  return useContext(CategoriesContext);
};

export const useMyOfferContext = () => {
  return useContext(MyOfferContext);
};

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
import { ITier } from "../models/tier";
import { IArticle } from "../models/article";
import { ITrigger } from "../models/trigger";
import { ICategory } from "../models/category";
import { ICelebrity } from "../models/celebrity";
import { IUser } from "../models/user";

const AuthContext = createContext<any>({});
const FeedContext = createContext<any>([]);
const MyFeedContext = createContext<any>([]);
const MyInfoContext = createContext<any>(null);
const MyNFTsContext = createContext<any>(null);
const MarketplaceListContext = createContext<any>([]);
const MonthContext = createContext<any>([]);
const MarketCardTypesContext = createContext<any>([]);
const CardTypesContext = createContext<any>([]);
const AllRaritiesContext = createContext<any>([]);
const StatusContext = createContext<any>([]);
const CategoriesContext = createContext<any>([]);
const CelebritiesContext = createContext<any>([]);
const TriggersContext = createContext<any>([]);
const TiersContext = createContext<any>([]);
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
  const [tiersContext, setTiersContext] = useState<Map<number, ITier>>();
  const [triggersContext, setTriggersContext] =
    useState<Map<number, ITrigger>>();
  const [celebritiesContext, setCelebritiesContext] =
    useState<Map<number, ICelebrity>>();
  const [marketplaceListContext, setMarketplaceListContext] = useState<any>([]);

  const [monthContext, setMonthContext] = useState<Map<number, string>>(
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
  const [cardTypesContext, setCardTypesContext] =
    useState<Map<number, ICategory>>();
  const [marketCardTypesContext, setMarketCardTypesContext] =
    useState<Map<number, ICategory>>();
  const [allRaritiesContext, setAllRaritiesContext] =
    useState<Map<number, ICategory>>();
  const [statusContext, setStatusContext] = useState<Map<number, ICategory>>();
  const [inventoryNFTsContext, setInventoryNftsContext] = useState<any>();

  const tiersValue = useMemo(
    () => ({ tiersContext, setTiersContext }),
    [tiersContext]
  );

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

  const marketCardTypeValue = useMemo(
    () => ({ marketCardTypesContext, setMarketCardTypesContext }),
    [marketCardTypesContext]
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
      // setAuthContext({
      //   ...authContext,
      //   isAuthenticated: true,
      //   user: localStorage.getItem("auth"),
      // });
    } else {
      //   if (!isPrivateUrl(location.pathname, false)) {
      //     navigate("/");
      //   }
    }
  };

  const setCache = async () => {
    let token = localStorage.getItem("auth");
    if (token) {
      setAuthContext({
        ...authContext,
        isAuthenticated: true,
        user: token,
      });

      const myinfo = await getMyInfo();
      if (myinfo.data) setMyInfoContext(myinfo.data);

      const allFeedData = await getFeed();
      if (allFeedData.data) setFeedContext(allFeedData.data);

      const myFeedData = await getPersonalizedFeed();
      if (myFeedData.data) setMyFeedContext(myFeedData.data);
    } else {
      setAuthContext({
        ...authContext,
        isAuthenticated: false,
      });
    }

    // setTiersContext(
    //   new Map<number, ICategory>([
    //     [0, { id: 0, name: "Day/Month" }],
    //     [1, { id: 1, name: "Year" }],
    //     [2, { id: 2, name: "Trigger" }],
    //     [3, { id: 3, name: "Category" }],
    //     [4, { id: 4, name: "Crafting" }],
    //   ])
    // );

    setMarketCardTypesContext(
      new Map<number, ICategory>([
        [0, { id: 0, name: "Day/Month" }],
        [1, { id: 1, name: "Year" }],
        [2, { id: 2, name: "Trigger" }],
        [3, { id: 3, name: "Category" }],
        [4, { id: 4, name: "Crafting" }],
      ])
    );

    setCardTypesContext(
      new Map<number, ICategory>([
        [3, { id: 3, name: "Day/Month" }],
        [4, { id: 4, name: "Year" }],
      ])
    );
    setAllRaritiesContext(
      new Map<number, ICategory>([
        [0, { id: 0, name: "Common" }],
        [1, { id: 1, name: "Uncommon" }],
        [2, { id: 2, name: "Rare" }],
      ])
    );
    setStatusContext(
      new Map<number, ICategory>([
        [0, { id: 0, name: "Not for sale" }],
        [1, { id: 1, name: "For sale" }],
      ])
    );

    setTiersContext(
      new Map<number, ITier>([
        [0, { id: "minor_1", name: "Minor 1" }],
        [1, { id: "minor_2", name: "Minor 2" }],
        [3, { id: "major", name: "Major" }],
      ])
    );
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
  };

  useEffect(() => {
    setCache();
    setContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadFunc = async () => {
      await setContext();
    };
    loadFunc();
    addScript(
      `https://static.moonpay.com/web-sdk/v1/moonpay-web-sdk.min.js`,
      "moonpay-script",
      () => {
        console.log("moonpay script loaded!");
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // useExternalScripts("https://static.moonpay.com/web-sdk/v1/moonpay-web-sdk.min.js")

  const addScript = (src: string, id: string, onLoad: () => void) => {
    const existing = document.getElementById(id);
    if (existing) {
      return existing;
    } else {
      const script = document.createElement("script");
      script.src = src;
      script.id = id;
      script.async = true;
      script.onload = () => {
        if (onLoad) {
          onLoad();
        }
      };
      document.body.appendChild(script);
      return script;
    }
  };
  // moonpaySdk.show()

  return (
    <TiersContext.Provider value={tiersValue}>
      <MonthContext.Provider value={monthValue}>
        <AuthContext.Provider value={authValue}>
          <CategoriesContext.Provider value={categoriesValue}>
            <TriggersContext.Provider value={triggersValue}>
              <CelebritiesContext.Provider value={celebritiesValue}>
                <MarketCardTypesContext.Provider value={marketCardTypeValue}>
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
                                    <MyOfferContext.Provider
                                      value={myOfferValue}
                                    >
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
                </MarketCardTypesContext.Provider>
              </CelebritiesContext.Provider>
            </TriggersContext.Provider>
          </CategoriesContext.Provider>
        </AuthContext.Provider>
      </MonthContext.Provider>
    </TiersContext.Provider>
  );
};

export const useTiersContext = () => {
  return useContext(TiersContext);
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

export const useMonthContext = () => {
  return useContext(MonthContext);
};
export const useMarketCardTypesContext = () => {
  return useContext(MarketCardTypesContext);
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

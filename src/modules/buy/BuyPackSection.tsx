import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  BuyPackCollectionWrapper,
  BuyPackSectionWrapper,
  BuyPackSlider,
  BuyPackTextWrapper,
  BuyPackWrapper,
} from "./styles";
import { Navigation } from "swiper";
import { BuyCard } from "../../components";
import { BuyDetailsSection } from "./BuyDetailsSection";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import { ICardSeries } from "../../models/card_series";
import { toast, ToastContainer } from "react-toastify";
import { ICardPack } from "../../models/card_pack";
import { ICardCollection } from "../../models/card_collection";

export const BuyPackSection: React.FC = () => {
  const navigate = useNavigate();
  const [detailsView, setDetailsView] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [selectedCardSeries, setSelectedCardSeries] =
    useState<ICardSeries | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<number>(0);
  // const [cardSeriesList, setCardSeriesList] = useState<ICardSeries[]>([]);
  const [cardCollectionList, setCardCollectionList] = useState<
    ICardCollection[]
  >([]);

  useEffect(() => {
    setCurrentUser(localStorage.getItem("auth"));
  }, []);

  const handleBuyCardSeries = async (
    cardSeries: ICardSeries,
    quantity: number,
    payment_method_id: number
  ) => {
    try {
      let res = await api.post<ICardPack>(`/card_series/${cardSeries.id}/buy`, {
        quantity,
        payment_method_id,
      });
      if (res.data) {
        toast.success(`You bought a ${cardSeries.card_collection ? cardSeries.card_collection.name : ""} ${cardSeries.name || "new"} card pack!`);
        setDetailsView(false);
      }
    } catch (e: any) {
      toast.error(e);
    }
  };

  const handleCardClick = (cardSeries: ICardSeries) => {
    setSelectedCardSeries(cardSeries);
    currentUser ? setDetailsView(true) : navigate("/signup");
  };

  const handleDetailsClose = () => {
    setDetailsView(false);
  };

  const listCardSeries = async () => {
    try {
      let res = await api.get<ICardSeries[]>("/card_series");
      if (res.data) {
        // setCardSeriesList(res.data);
        let m = new Map<number, ICardCollection>();
        let l: ICardCollection[] = [];
        res.data.forEach((v) => {
          let s = v
          // s.card_collection = undefined;
          let o = m.get(v.card_collection_id);
          if (o) {
            o.card_series.push(s);
            m.set(v.card_collection_id, o);
          } else {
            if (v.card_collection) {
              let n = v.card_collection;
              n.card_series = [s]
              m.set(s.card_collection_id, n);
            }
          }
        });

        m.forEach(v => {
          l.push(v)
        })

        setCardCollectionList(l);
        console.log(res.data)
        console.log(l)
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    listCardSeries();
  }, []);

  return (
    <BuyPackSectionWrapper isview={detailsView ? "true" : undefined}>
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
      <BuyPackWrapper>
        <h2>Buy Card Packs</h2>
        {cardCollectionList.map((item, key) => (
          <BuyPackCollectionWrapper>
            <BuyPackTextWrapper>
              <h3>{item.name}</h3>
              <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam lorem ipsum lia. aliqua dolor do amet sint.
                Velit officit.
              </p>
            </BuyPackTextWrapper>
            <BuyPackSlider>
              <Swiper
                slidesPerView={1}
                spaceBetween={42}
                navigation={true}
                modules={[Navigation]}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 42,
                  },
                }}
                className="mySwiper"
              >
                {item.card_series.map((item, key) => (
                  <SwiperSlide key={key}>
                    <BuyCard
                      cardSeries={item}
                      rarity={1}
                      cardType="standard"
                      price={50}
                      onCardClick={handleCardClick}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </BuyPackSlider>
          </BuyPackCollectionWrapper>
        ))}
        {selectedCardSeries && (
          <BuyDetailsSection
            id={selectedCardSeries?.id || 0}
            isView={detailsView && selectedCardSeries != null}
            onClose={handleDetailsClose}
            onBuyClick={handleBuyCardSeries}
            cardSeries={selectedCardSeries}
            rarity={selectedRarity}
          />
        )}
      </BuyPackWrapper>
    </BuyPackSectionWrapper>
  );
};

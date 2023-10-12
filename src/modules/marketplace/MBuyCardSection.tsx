import React, { useState } from "react";
import { CardSidebarProps } from "../../types";
import {
  MSidebarContainer,
  MSidebarWrapper,
  ViewCardWrapper,
  SummaryCard,
} from "./styles";
import {
  CloseButton,
  PropertiesContent,
  PropertiesHeader,
  PropertiesWrapper,
  PropertyCardPacks,
  PropertyItem,
  SetPriceWrapper,
} from "../app/dates/styles";
import {
  BalanceBuyConfirmModal,
  Button,
  BuyPackConfirmModal,
  IconArrowDown,
  IconArrowDown1,
  IconCardAthlete,
  IconCoins,
  IconPay,
  MarketCard,
  PredictionCard,
  UseBalanceBuyModal,
} from "../../components";
import {
  BackButton,
  PaymentMethodWrapper,
  SummaryContent,
  SummaryWrapper,
} from "../buy/styles";
import { buyMarketplaceById } from "../../actions/marketplace_listing";
import api from "../../config/api";
import { toast } from "react-toastify";
import { useCardSeriesContext, useMyInfoContext, useTiersContext } from "../../context";
import { getMyInfo } from "../../actions";
import { ITier } from "../../models/tier";

export const MBuyCardSection: React.FC<CardSidebarProps> = ({
  selectedItem,
  onClose,
  open,
  page,
  data,
  setData,
  collection
}) => {
  const { setMyInfoContext } = useMyInfoContext();
  const { tiersContext }: { tiersContext: Map<number, ITier> } = useTiersContext()
  const { cardSeriesContext } = useCardSeriesContext();

  const [step, setStep] = useState(0);
  const [useBalance, setUseBalance] = useState(false);
  const [balanceConfirm, setBalanceConfirm] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleUseBalance = () => {
    setUseBalance(true);
  };

  const handleFromAccount = () => {
    setConfirm(true);
  };

  const handleBalanceBuy = () => {
    setBalanceConfirm(true);
    setUseBalance(false);
  };

  const handleBuyConfirm = async () => {
    setBalanceConfirm(false);
    try {
      let res = await api.post(`/marketplace_listing/${selectedItem.id}/buy`, {
        payment_method_id: 1,
      });
      if (res.status === 200) {
        toast.success("You bought a card from the marketplace!");
        setConfirm(true);
        if (setData && data) {
          let n = data?.filter((v) => v.id !== selectedItem.id);
          if (n) setData(n);
        }
        const myinfo = await getMyInfo();
        if (myinfo.data) setMyInfoContext(myinfo.data);
      }
    } catch (e: any) {
      console.log(e);
      // toast.error(e.response.data);
    }
  };

  const handleConfirmClose = () => {
    setConfirm(false);
    onClose();
  };

  // for check rarity
  const checkRarity = (selectedItem: any) => {
    if (
      selectedItem?.nft_card_day_month?.rarity === 0 ||
      selectedItem?.nft_card_trigger?.rarity === 0 ||
      selectedItem?.nft_card_crafting?.rarity === 0 ||
      selectedItem?.nft_card_identity?.rarity === 0 ||
      selectedItem?.nft_card_prediction?.rarity === 0 ||
      selectedItem?.nft_card_year?.rarity === 0 ||
      selectedItem?.nft_card_category?.rarity === 0
    ) {
      return "Common";
    } else if (
      selectedItem?.nft_card_day_month?.rarity === 1 ||
      selectedItem?.nft_card_trigger?.rarity === 1 ||
      selectedItem?.nft_card_crafting?.rarity === 1 ||
      selectedItem?.nft_card_identity?.rarity === 1 ||
      selectedItem?.nft_card_prediction?.rarity === 1 ||
      selectedItem?.nft_card_year?.rarity === 1 ||
      selectedItem?.nft_card_category?.rarity === 1
    ) {
      return "Uncommon";
    } else if (
      selectedItem?.nft_card_day_month?.rarity === 2 ||
      selectedItem?.nft_card_trigger?.rarity === 2 ||
      selectedItem?.nft_card_crafting?.rarity === 2 ||
      selectedItem?.nft_card_identity?.rarity === 2 ||
      selectedItem?.nft_card_prediction?.rarity === 2 ||
      selectedItem?.nft_card_year?.rarity === 2 ||
      selectedItem?.nft_card_category?.rarity === 2
    ) {
      return "Rare";
    }

    return undefined;
  };

  //for check type
  const checkType = (selectedItem: any) => {
    if (selectedItem?.nft_card_day_month) {
      return "Day/Month";
    } else if (selectedItem?.nft_card_trigger) {
      return "Trigger";
    } else if (selectedItem?.nft_card_crafting) {
      return "Crafting";
    } else if (selectedItem?.nft_card_identity) {
      return "Identity";
    } else if (selectedItem?.nft_card_prediction) {
      return "Prediction";
    } else if (selectedItem?.nft_card_year) {
      return "Year";
    } else if (selectedItem?.nft_card_category) {
      return "Category"
    }

    return undefined;
  };

  //for check type value
  const checkTypeValue = (selectedItem: any) => {
    if (selectedItem?.nft_card_day_month) {
      return `${selectedItem?.nft_card_day_month?.day}/${selectedItem?.nft_card_day_month?.month}`;
    } else if (selectedItem?.nft_card_trigger) {
      return selectedItem?.nft_card_trigger?.trigger;
    } else if (selectedItem?.nft_card_crafting) {
      return "Crafting";
    } else if (selectedItem?.nft_card_identity) {
      return selectedItem?.nft_card_identity?.celebrity_name;
    } else if (selectedItem?.nft_card_prediction) {
      return selectedItem?.nft_card_prediction?.celebrity_name;
    } else if (selectedItem?.nft_card_year) {
      return selectedItem?.nft_card_year?.year;
    } else if (selectedItem?.nft_card_category) {
      return selectedItem?.nft_card_category?.category
    }

    return undefined;
  };

  const packData = React.useMemo(() => {
    if (page === "packs" && selectedItem?.card_pack) {
      // let rarity = selectedItem.card_pack?.tier ? tiersContext.get(selectedItem.card_pack.tier)?.name : ""
      let rarity = tiersContext.get(selectedItem.card_pack.tier ?? 0)?.name ?? ""
      let collection = selectedItem.card_pack?.card_series_id ? cardSeriesContext?.find(
        (value) => value.id === selectedItem.card_pack?.card_series_id
      )?.card_collection?.name : "";
      const cardsLength = !selectedItem.card_pack?.cards ? 0 : Object.values(selectedItem.card_pack?.cards).reduce((prev, value) => value && value?.length ? prev += value.length : prev, 0)
      const packContents = []
      if (selectedItem.card_pack?.cards?.crafting?.length) {
        packContents.push(`${selectedItem.card_pack.cards.crafting.length} Crafting Card`)
      }
      if (selectedItem.card_pack?.cards?.category?.length) {
        packContents.push(`${selectedItem.card_pack.cards.category.length} Category Card`)
      }
      if (selectedItem.card_pack?.cards?.trigger?.length) {
        packContents.push(`${selectedItem.card_pack.cards.trigger.length} Trigger Card`)
      }
      if (selectedItem.card_pack?.cards?.year?.length) {
        packContents.push(`${selectedItem.card_pack.cards.year.length} Year Card`)
      }
      if (selectedItem.card_pack?.cards?.day_month?.length) {
        packContents.push(`${selectedItem.card_pack.cards.day_month.length} Day/Month Card`)
      }
      return { rarity, collection, cardsLength, packContents }
    } else return {}
  }, [tiersContext, cardSeriesContext, selectedItem.id])

  return (
    <>
      <MSidebarWrapper open={open} key={`buy-card-sectoin-${selectedItem.id}`}>
        {step === 0 && (
          <MSidebarContainer>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <h2>Buy Card</h2>
            <ViewCardWrapper>
              {!page && <MarketCard item={selectedItem} />}
              {page === "packs" && (
                <MarketCard item={selectedItem} {...selectedItem} />
              )}
              {page === "identities" && (
                <PredictionCard
                  item={selectedItem}
                  {...selectedItem?.nft_card_identity}
                />
              )}
              {page === "predictions" && (
                <PredictionCard
                  item={selectedItem}
                  {...selectedItem?.nft_card_prediction}
                />
              )}
            </ViewCardWrapper>
            {!page && (
              <PropertiesWrapper>
                <PropertiesHeader>
                  <span>Properties</span>
                  <IconArrowDown1 />
                </PropertiesHeader>
                <PropertiesContent>
                  <PropertyItem>
                    <p>Rarity</p>
                    <span>{checkRarity(selectedItem)}</span>
                  </PropertyItem>
                  <PropertyItem>
                    <p>Type</p>
                    <span>{checkType(selectedItem)}</span>
                  </PropertyItem>
                  <PropertyItem>
                    <p>{checkType(selectedItem)}</p>
                    {checkTypeValue(selectedItem)}
                  </PropertyItem>
                  <PropertyItem>
                    <p>Collection</p>
                    <span></span>
                  </PropertyItem>
                </PropertiesContent>
              </PropertiesWrapper>
            )}
            {page === "packs" && (
              <>
                <PropertiesWrapper>
                  <PropertiesHeader>
                    <span>Properties</span>
                    <IconArrowDown1 />
                  </PropertiesHeader>
                  <PropertiesContent>
                    <PropertyItem>
                      <p>Pack Rarity</p>
                      <span>{packData?.rarity}</span>
                    </PropertyItem>
                    <PropertyItem>
                      <p>Collection</p>
                      <span>{packData?.collection}</span>
                    </PropertyItem>
                  </PropertiesContent>
                </PropertiesWrapper>
                <PropertiesWrapper>
                  <PropertiesHeader>
                    <span>Pack Contents</span>
                    <PropertyCardPacks>{packData?.cardsLength} Cards<IconArrowDown1 />
                    </PropertyCardPacks>
                  </PropertiesHeader>
                  <PropertiesContent>
                    {packData && packData?.packContents && packData?.packContents.length > 0 && <>
                      {packData.packContents.map((value, key) => <PropertyItem key={key}>
                        <p>{value}</p>
                      </PropertyItem>)}
                    </>}

                  </PropertiesContent>
                </PropertiesWrapper>
              </>
            )}
            {page === "identities" && (
              <PropertiesWrapper>
                <PropertiesHeader>
                  <span>Properties</span>
                  <IconArrowDown1 />
                </PropertiesHeader>
                <PropertiesContent>
                  <PropertyItem>
                    <p>Identity Match</p>
                    <span>{selectedItem?.nft_card_identity?.celebrity_name}</span>
                  </PropertyItem>
                  <PropertyItem>
                    <p>Rarity</p>
                    <span>{selectedItem?.nft_card_identity?.rarity}</span>
                  </PropertyItem>
                  <PropertyItem>
                    <p>Day/Month</p>
                    <span>
                      {selectedItem?.nft_card_identity?.day}/
                      {selectedItem?.nft_card_identity?.month}
                    </span>
                  </PropertyItem>
                  <PropertyItem>
                    <p>Year</p>
                    <span>{selectedItem?.nft_card_identity?.year}</span>
                  </PropertyItem>
                  <PropertyItem>
                    <p>Category</p>
                    <span>{selectedItem?.nft_card_identity?.category}</span>
                  </PropertyItem>
                  <PropertyItem>
                    <p>Collection</p>
                    <span>{collection ?? ""}</span>
                  </PropertyItem>
                </PropertiesContent>
              </PropertiesWrapper>
            )}
            {page === "predictions" && (
              <PropertiesWrapper>
                <PropertiesHeader>
                  <span>Properties</span>
                  <IconArrowDown1 />
                </PropertiesHeader>
                <PropertiesContent>
                  <PropertyItem>
                    <p>Rarity</p>
                    <span>{checkRarity(selectedItem)}</span>
                  </PropertyItem>
                  <PropertyItem>
                    <p>Type</p>
                    <span>{checkType(selectedItem)}</span>
                  </PropertyItem>
                  <PropertyItem>
                    <p>{checkType(selectedItem)}</p>
                    {checkTypeValue(selectedItem)}
                  </PropertyItem>
                  <PropertyItem>
                    <p>Collection</p>
                    <span>{collection ?? ""}</span>
                  </PropertyItem>
                </PropertiesContent>
              </PropertiesWrapper>
            )}
            <SetPriceWrapper>
              <div className="price">
                <h5>Current Price</h5>
                <h4>${selectedItem.price ? selectedItem.price / 100 : 0}</h4>
              </div>
              <Button
                className="sell-confirm-button"
                // onClick={() => setStep(1)}
                onClick={handleUseBalance}
              >
                Buy Now
              </Button>
            </SetPriceWrapper>
          </MSidebarContainer>
        )}
        {step === 1 && (
          <MSidebarContainer>
            <CloseButton onClick={onClose}>&times;</CloseButton>{" "}
            <BackButton onClick={() => setStep(0)}>{"< Back"}</BackButton>
            <SummaryWrapper>
              <h3>Summary</h3>
              <SummaryContent>
                <SummaryCard bg={"/assets/nfts/1.png"}>
                  <span>{checkRarity(selectedItem)}</span>
                </SummaryCard>
                <div>
                  <div>
                    <p>{checkTypeValue(selectedItem)}</p>
                    <span>{checkType(selectedItem)}</span>
                  </div>
                  <div>
                    <p>Total Price</p>
                    <span>${selectedItem?.price} USD</span>
                  </div>
                </div>
              </SummaryContent>
            </SummaryWrapper>
            <PaymentMethodWrapper>
              <h3>Payment Method</h3>
              <Button className="pay-button" onClick={handleUseBalance}>
                <IconCoins />
                <span>Use my TwoTwentyK Balance</span>
              </Button>
              <Button className="pay-button" onClick={handleFromAccount}>
                <IconPay />
                <span>Pay from Account</span>
              </Button>
            </PaymentMethodWrapper>
          </MSidebarContainer>
        )}
      </MSidebarWrapper>
      <BuyPackConfirmModal
        isMarket
        open={confirm}
        onClose={handleConfirmClose}
      />
      <UseBalanceBuyModal
        price={selectedItem.price ? selectedItem.price / 100 : 0}
        onBuyClick={handleBalanceBuy}
        open={useBalance}
        onClose={() => setUseBalance(false)}
      />
      <BalanceBuyConfirmModal
        price={selectedItem.price ? selectedItem.price / 100 : 0}
        onConfirm={handleBuyConfirm}
        open={balanceConfirm}
        onClose={() => setBalanceConfirm(false)}
      />
    </>
  );
};

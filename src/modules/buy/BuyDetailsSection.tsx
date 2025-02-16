import React, { useState } from "react";
import {
  BackButton,
  BuyCounterWrapper,
  BuyDetailsContainer,
  BuyDetailsWrapper,
  Counter,
  PaymentMethodWrapper,
  PreviewCard,
  SummaryContent,
  SummaryWrapper,
  TotalPrice,
} from "./styles";
import { BuyDetailsProps } from "../../types";
import {
  CloseButton,
  PropertiesContent,
  PropertiesHeader,
  PropertiesWrapper,
  PropertyItem,
} from "../app/dates/styles";
import {
  BalanceBuyConfirmModal,
  Button,
  BuyCard,
  BuyPackConfirmModal,
  IconArrowDown,
  IconCoins,
  IconPay,
  UseBalanceBuyModal,
} from "../../components";

export const BuyDetailsSection: React.FC<BuyDetailsProps> = ({
  id,
  isView,
  onClose,
  cardSeries,
  rarity,
  onBuyClick,
}) => {
  const [step, setStep] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [balanceConfirm, setBalanceConfirm] = useState(false);
  const [useBalance, setUseBalance] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleBuy = () => {
    if (step === 0) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBuyConfirm = () => {
    setBalanceConfirm(false);
    setConfirm(true);
  };

  const handleBalanceBuy = () => {
    setBalanceConfirm(true);
    setUseBalance(false);
  };

  const handleUseBalance = () => {
    setUseBalance(true);
  };

  const handleFromAccount = () => {
    setConfirm(true);
  };

  const handleConfirmClose = () => {
    setConfirm(false);
    onClose();
  };

  return (
    <BuyDetailsWrapper isview={isView ? "true" : undefined}>
      {step === 0 && (
        <BuyDetailsContainer>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <BuyCard
            cardType={cardSeries.name}
            price={50}
            preview={true}
            onCardClick={() => {}}
            cardSeries={cardSeries}
            rarity={rarity}
          />
          <PropertiesWrapper>
            <PropertiesHeader>
              <span>Properties</span>
              <IconArrowDown />
            </PropertiesHeader>
            <PropertiesContent>
              <PropertyItem>
                <p>Pack Rarity</p>
                <span>{cardSeries.name}</span>
              </PropertyItem>
              <PropertyItem>
                <p>Collection</p>
                <span>{cardSeries.card_collection?.name}</span>
              </PropertyItem>
            </PropertiesContent>
          </PropertiesWrapper>
          <PropertiesWrapper>
            <PropertiesHeader>
              <span>Pack Contents</span>
              <IconArrowDown />
            </PropertiesHeader>
            <PropertiesContent>
              <PropertyItem>
                <p>2 Rare Guaranteed</p>
              </PropertyItem>
              <PropertyItem>
                <p>1 Uncommon with chance of Core</p>
              </PropertyItem>
              <PropertyItem>
                <p>1 Core Card</p>
              </PropertyItem>
              <PropertyItem>
                <p>1 Crafting Card</p>
              </PropertyItem>
            </PropertiesContent>
          </PropertiesWrapper>

          <BuyCounterWrapper>
            <p>
              Price <span>${cardSeries.cost_usd / 100} USD</span>
            </p>
            <Counter>
              <div
                onClick={() => {
                  if (quantity > 1) setQuantity(quantity - 1);
                }}
              >
                -
              </div>
              <span>{quantity}</span>
              <div
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </div>
            </Counter>
          </BuyCounterWrapper>

          <PropertiesWrapper>
            <PropertiesHeader>
              <span>Price Summary</span>
              <IconArrowDown />
            </PropertiesHeader>
            <PropertiesContent>
              <PropertyItem>
                <p>Asking price</p>
                <span>${cardSeries.cost_usd / 100} USD</span>
              </PropertyItem>
              <PropertyItem>
                <p>Quantity</p>
                <span>{quantity}</span>
              </PropertyItem>
            </PropertiesContent>
          </PropertiesWrapper>
          <TotalPrice>
            <p>Total</p>
            <span>${(quantity * cardSeries.cost_usd) / 100}</span>
          </TotalPrice>
          <Button className="buy-confirm-button" onClick={handleBuy}>
            Buy Now
          </Button>
        </BuyDetailsContainer>
      )}
      {step === 1 && (
        <BuyDetailsContainer>
          <BackButton onClick={() => setStep(0)}>{"< Back"}</BackButton>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <SummaryWrapper>
            <h3>Summary</h3>
            <SummaryContent>
              <img src="/assets/buy.png" alt="" />
              <div>
                <div>
                  <p>Card Pack Name</p>
                  <span>Qty: {quantity}</span>
                </div>
                <div>
                  <p>Total Price</p>
                  <span>${(quantity * cardSeries.cost_usd) / 100} USD</span>
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
            {/* <Button className="pay-button" onClick={handleFromAccount}>
              <IconPay />
              <span>Pay from Account</span>
            </Button> */}
          </PaymentMethodWrapper>
        </BuyDetailsContainer>
      )}
      <BuyPackConfirmModal open={confirm} onClose={handleConfirmClose} />
      <UseBalanceBuyModal
        onBuyClick={handleBalanceBuy}
        open={useBalance}
        onClose={() => setUseBalance(false)}
        price={(quantity * cardSeries.cost_usd) / 100}
      />
      <BalanceBuyConfirmModal
        price={(quantity * cardSeries.cost_usd) / 100}
        onConfirm={() => {
          onBuyClick(cardSeries, quantity, 1);
          setBalanceConfirm(false);
        }}
        open={balanceConfirm}
        onClose={() => setBalanceConfirm(false)}
      />
    </BuyDetailsWrapper>
  );
};

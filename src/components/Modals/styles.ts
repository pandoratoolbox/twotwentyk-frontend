import { styled } from "styled-components";

export const ModalWrapper = styled.div<{ open?: boolean }>`
  position: fixed;
  width: 100%;
  height: 100vh;
  padding: 50px 0;
  left: 0;
  top: 0;
  display: flex;
  z-index: 100;
  align-items: center;
  justify-content: center;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
`;

export const ModalHeaderWrapper = styled.div<{ bg?: string }>`
  width: 100%;
  background: ${({ bg }) => (bg ? bg : "#ffffff")};
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`;

export const ModalOverlay = styled.div`
  background: rgba(36, 36, 36, 0.5);
  backdrop-filter: blur(2px);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalContainer = styled.div<{ width?: number }>`
  position: absolute;
  padding: 30px 35px;
  z-index: 1;
  background: #ffffff;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  width: 95%;
  max-width: ${({ width }) => (width ? width + "px" : "768px")};

  &.removePadding {
    padding: 0;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 21px;
  cursor: pointer;
  right: 21px;
  font-size: 30px;
  line-height: 20px;
  color: #898989;
`;

export const SellConfirmModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: #0f4fba;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
  }
  p {
    padding-top: 6px;
    color: rgba(15, 79, 186, 0.7);
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    margin-bottom: 16px;
    text-align: center;
    max-width: 299px;
  }
`;

export const CraftIdentifyModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 35px;

  p {
    padding-top: 14px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
    text-align: center;
  }
`;

export const CraftIdentifyModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 35px;
  p {
    padding-top: 14px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
    text-align: center;
  }
  > div {
    max-width: 230px;
  }
`;

export const IconWrapper = styled.div`
  margin-bottom: 10px;
`;

export const ButtonGroup = styled.div`
  width: 100%;
  max-width: 342px;
  & > :not(:first-child) {
    margin-top: 16px;
  }
  & > div {
    height: 42px;
  }
`;

export const BuyPackConfirmModalWrapper = styled.div`
  padding-top: 15px;
  text-align: center;
  h3 {
    color: #0f4fba;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    margin-bottom: 6px;
  }
  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    max-width: 299px;
    margin: auto;
    margin-bottom: 24px;
    width: 100%;
  }
`;

export const UseBalanceBuyModalWrapper = styled.div`
  text-align: center;
  color: #0e4fbc;
  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }
  h3 {
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    margin-bottom: 32px;
    span {
      line-height: 24px;
      font-weight: 400;
      font-size: 20px;
    }
  }
`;

export const BalanceBuyConfirmModalWrapper = styled.div`
  padding-top: 15px;
  text-align: center;
  h3 {
    color: #0f4fba;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    margin-bottom: 8px;
  }
  p {
    color: rgba(15, 79, 186, 0.7);
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;

    margin-bottom: 24px;
  }
  h4 {
    color: #0e4fbc;
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    span {
      font-weight: 400;
    }
    margin-bottom: 22px;
  }
`;

export const BuyActionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  &::after {
    position: absolute;
    content: "";
    top: 0;
    bottom: -30px;
    left: -35px;
    right: -35px;
    background: #f2f5ff;
    border-radius: 0 0 20px 20px;
  }
  .current-price {
    margin-bottom: 16px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    h5 {
      color: #0e4fbc;
    }
  }
  .buy-button {
    width: 100%;
    height: 45px;
  }
  & > * {
    display: relative;
    z-index: 1;
  }
  & > div:first-child {
    h4 {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      margin-bottom: 2px;
      color: #000;
    }
    span {
      color: #027fee;
      display: flex;
      margin-left: auto;
      width: fit-content;
      cursor: pointer;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
    }
  }
`;

export const BalanceForWithdrawModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #0e4fbc;
  h3 {
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 24px;
    line-height: 25px;
    margin-top: 30px;
  }
  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    margin: 8px 0;
  }
  h4 {
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    span {
      font-size: 20px;
      line-height: 24px;
      font-weight: 400;
    }
  }
  .withdraw-button {
    height: 45px;
    margin-top: 40px;
  }
`;

export const WithdrawModalWrapper = styled.div`
  h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 24px;
  }
`;

export const WithdrawInputGroup = styled.div`
  & > :not(:first-child) {
    margin-top: 20px;
  }
`;

export const AvailableAmount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 15px;
  line-height: 32px;
  span {
    opacity: 0.5;
  }
`;

export const WithdrawConfirmModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #0f4fba;
  text-align: center;
  h3 {
    font-weight: 600;
    font-size: 24px;
    line-height: 129.02%;
  }
  p {
    margin: 20px auto;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: rgba(15, 79, 186, 0.7);
    a {
      color: rgba(15, 79, 186, 0.7);
    }
    max-width: 299px;
  }
  .confirm-button {
    height: 42px;
  }
`;
export const CardsWrapper = styled.div`
  h3 {
    width: 280px;
    margin: 0 auto;
    color: #000;
    text-align: center;
    font-size: 14px;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
  }
`;

export const CardGridWrapper = styled.div`
  padding-top: 30px;
  max-width: 400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const CraftingCardWrapper = styled.div<{ active?: string }>`
  padding: 10px;
  border-radius: 16px;
  background: ${({ active }) => (active ? "#dbdee8" : "transparent")};
  box-shadow: ${({ active }) =>
    active ? "0px 0px 14.9405px rgba(0, 0, 0, 0.05)" : "none"};
  /* .select-button {
    opacity: ${({ active }) => (active ? 1 : 0.15)};
  } */
`;

export const CraftCard = styled.div<{ bg: string }>`
  position: relative;
  width: 100%;
  height: 137px;
  border-radius: 5px;
  contain: content;
  background-blend-mode: luminosity, normal;
  background: ${({ bg }) => `url(${bg}) no-repeat, #fff`};
  background-size: cover;
  background-position: center;
  &.preview {
    max-width: 230px;
    height: 278px;
    margin: auto;
    margin-bottom: 28px;
  }
  &.crafting-card {
    width: 100%;
    height: 178px;
    border: 1.61734px solid rgba(0, 0, 0, 0.25);
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.17);
    border-radius: 5px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  span {
    z-index: 1;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 22px;
    min-width: 60px;
    background: #615e5e;
    border-radius: 0px 5px;
    font-weight: 500;
    padding: 0 10px;
    font-size: 10.4583px;
    line-height: 13px;
    right: 0;
    color: #ffffff;
    top: 0;
  }
  p {
    position: absolute;
    bottom: 0;
    background: #d2d4dd;
    font-weight: 400;
    font-size: 11.9981px;
    text-transform: capitalize;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    line-height: 15px;
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  span {
    color: #cf3d3d;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
  }
`;

export const Checkbox = styled.div`
  height: 16px;
  position: relative;
  width: 16px;
  margin-right: 10px;
  label {
    background-color: #fff;
    border: 1.5px solid #cf3d3d;
    border-radius: 4px;
    cursor: pointer;
    height: 16px;
    left: 0;
    position: absolute;
    top: 0;
    width: 16px;
    &::after {
      border: 2px solid #cf3d3d;
      border-top: none;
      border-right: none;
      content: "";
      height: 4px;
      left: 1px;
      opacity: 0;
      position: absolute;
      top: 2px;
      transform: rotate(-45deg);
      width: 10px;
    }
  }
  input {
    visibility: hidden;
  }
  input:checked + label {
    background-color: #fff;
    border-color: #cf3d3d;
  }

  input:checked + label:after {
    opacity: 1;
  }
`;

export const CraftPredictionModalWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 24px;
    max-width: 273px;
  }
`;

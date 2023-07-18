import { styled } from "styled-components";

export const BuyCardWrapper = styled.div`
  padding: 24px;
  cursor: pointer;
  background: none;
  &:hover {
    background: url("/assets/nfts/blur.png") no-repeat;
    background-size: 100% 100%;
  }
  cursor: pointer;
  position: relative;
`;

export const CardType = styled.div`
  height: 46px;
  min-width: 125px;
  position: absolute;
  width: fit-content;
  margin-left: auto;
  border-radius: 0px 11px;
  display: flex;
  align-items: center;
  color: #fff;
  justify-content: center;
  font-weight: 500;
  font-size: 18px;
  background: #615e5e;
  line-height: 22px;
`;

export const CardAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  margin-top: 11px;
  border-radius: 10px;
  background: rgba(14, 79, 188, 0.07);
  .buy-button {
    height: 46px;
    width: 137px;
  }
  div:first-child {
    p {
      color: rgba(14, 79, 188, 0.8);
      font-family: vipnagorgialla;
      font-size: 14px;
      font-weight: 100;
      text-transform: uppercase;
      margin-bottom: 7px;
    }
    h3 {
      color: #0e4fbc;
      text-align: center;
      font-family: vipnagorgialla;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 100%; /* 14px */
      text-transform: uppercase;
    }
  }
`;

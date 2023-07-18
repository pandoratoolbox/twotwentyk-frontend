import { styled } from "styled-components";

export const TransactionsWrapper = styled.div`
  margin-top: 62px;
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  max-width: 1100px;
  width: 95%;
  h2 {
    color: #fff;
    font-family: vipnagorgialla;
    font-size: 24px;
    font-weight: 300;
    line-height: 32px; /* 133.333% */
    text-transform: uppercase;
    background: url("/assets/title-bg.png") no-repeat;
    background-size: 100% 100%;
    height: 72px;
    padding: 0 40px;
    display: flex;
    margin-bottom: 16px;
    align-items: center;
  }
`;

export const TransactionActionWrapper = styled.div`
  width: 100%;
  border-top: 1px solid #e1e3e7;
  padding: 16px 40px;
  .withdraw-button {
    width: 335px;
    height: 42px;
    border-radius: 100px;
    color: #0e4fbc;
    background: #fff;
    border: 1px solid #0e4fbc;
    box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.15);
  }
`;

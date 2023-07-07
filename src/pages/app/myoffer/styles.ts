import { styled } from "styled-components";

export const OfferTabWrapper = styled.div`
  margin-bottom: 38px;
  margin-top: 16px;
  span {
    &.active {
      opacity: 1;
      font-weight: 700;
      text-decoration-line: underline;
    }
    font-size: 16px;
    opacity: 0.5;
    cursor: pointer;
    margin-right: 25px;
    color: #000;
    line-height: 100%;
  }
`;

export const OfferHistoryCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
`;

export const OfferHistoryCard = styled.div`
  border-radius: 8px;
  background: #fff;
  width: 100%;
  height: fit-content;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardWrapper = styled.div`
  width: 191px;
  margin-bottom: 16px;
`;

export const ViewOfferInfoWrapper = styled.div`
  width: 100%;
  padding: 14px 24px;
  background: #f9faff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  b {
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
  }
  p {
    margin-top: 12px;
    font-size: 12px;
    font-weight: 400;
    line-height: 24px;
  }
  h1 {
    font-size: 22px;
    font-weight: 700;
  }
`;

export const OfferStatus = styled.div`
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  &.approved {
    background-color: #e8fcf1;
    color: #00632b;
  }
  &.denied {
    background-color: #ffebeb;
    color: #b01212;
  }
`;

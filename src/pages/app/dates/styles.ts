import { styled } from "styled-components";

export const DatesPageWrapper = styled.div<{ isview?: string }>`
  margin-bottom: auto;
  position: relative;
  width: 100%;
  padding-right: ${({ isview }) => (isview ? "405px" : "0px")};
  @media screen and (max-width: 1300px) {
    padding-right: 0;
  }
`;

export const DatePageContainer = styled.div`
  max-width: 1100px;
  width: 95%;
  margin: auto;
  padding: 20px 0;
`;

export const DatePageTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > h3 {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
  }
  margin-bottom: 8px;
  @media screen and (max-width: 425px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;

  .buy-button {
    height: 51px;
    width: 118px;
  }
  .craft-button {
    width: 203px;
  }
  & > :not(:first-child) {
    margin-left: 19px;
  }
  @media screen and (max-width: 425px) {
    width: 100%;
    margin-top: 8px;
    .buy-button {
      height: 51px;
      width: 100%;
    }
  }
`;

export const EmptyCards = styled.div`
  padding: 72px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 635px;
  width: 100%;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(2px);
  text-align: center;
  h3 {
    color: #0e4fbc;
    font-family: vipnagorgialla;
    font-size: 24px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  p {
    &.login {
      color: #0e4fbc;
      text-align: center;
      font-family: vipnagorgialla;
      font-size: 24px;
      line-height: 100%; /* 24px */
      text-transform: uppercase;
    }
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    line-height: 24px;
  }
  .buy-button {
    height: 49px;
    width: 230px;
    margin-top: 20px;
    border-radius: 100px;
    border: 2px solid #1440b3;
    background: #fff;
    box-shadow: 0px 1px 25px 0px rgba(0, 0, 0, 0.2);
    color: #0e4fbc;
    text-transform: uppercase;
  }
`;

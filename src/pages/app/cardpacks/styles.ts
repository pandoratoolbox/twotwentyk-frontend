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
  justify-content: center;
  background: url("/assets/title-bg.png") no-repeat;
  background-size: 100% 100%;
  height: 114px;
  & > h3 {
    color: #fff;
    font-family: vipnagorgialla;
    font-size: 32px;
    text-transform: uppercase;
    font-weight: 100;
  }
  margin-bottom: 8px;
  @media screen and (max-width: 425px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  .buy-button {
    height: 49px;
    width: 163px;
    background: #fff;
    border: 2px solid #0e4fbc;
    color: #0e4fbc;
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
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    font-weight: 400;
    font-size: 16px;
    /* max-width: 341px; */
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
  &.login {
    p {
      max-width: 233px;
    }
  }
`;

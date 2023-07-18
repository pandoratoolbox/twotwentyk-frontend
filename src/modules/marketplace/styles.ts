import { styled } from "styled-components";

export const FilterSectionWrapper = styled.div`
  & > h3 {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 12px;
  }
`;

export const FilterSectionGrid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* & > :not(:first-child) {
    margin-left: 20px;
  } */
  gap: 20px;
  & > * {
    flex: 1;
    min-width: 192px;
  }
`;

export const CardGridWrapper = styled.div`
  margin-top: 36px;
  display: grid;
  grid-gap: 42px;
  grid-template-columns: repeat(4, 1fr);
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;

export const MSidebarWrapper = styled.div<{ open: boolean }>`
  position: fixed;
  top: 150px;
  width: 100%;
  max-width: 400px;
  height: calc(100% - 150px);
  right: ${({ open }) => (open ? "5px" : "-400px")};
  background: #fff;
  box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 1024px) {
    height: calc(100% - 76px);
    top: 76px;
  }
`;

export const MSidebarContainer = styled.div`
  position: relative;
  overflow-y: auto;
  padding: 33px 52px;
  width: 100%;
  h2 {
    color: #0e4fbc;
    font-family: vipnagorgialla;
    font-size: 24px;
    text-transform: uppercase;
    margin-bottom: 32px;
    font-weight: 100;
    width: 100%;
  }
  .sell-confirm-button {
    height: 45px;
    margin-top: 30px;
  }
  & > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    opacity: 0.5;
    margin-top: -15px;
    margin-bottom: 25px;
  }
  & > .owner {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    margin-top: 30px;
    opacity: 1;
  }
`;

export const ViewCardWrapper = styled.div`
  max-width: 250px;
  width: 100%;
  margin: auto;
`;

export const MyBalanceWrapper = styled.div`
  display: flex;
  margin-bottom: 33px;
  align-items: center;
  padding: 23px 0;
  position: relative;
  color: #0e4fbc;
  & > * {
    position: relative;
    z-index: 1;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: -52px;
    right: -52px;
    background: #f9faff;
    /* box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15); */
  }
`;

export const IconWRapper = styled.div`
  margin-right: 16px;
`;

export const BalanceInfo = styled.div`
  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 12px;
  }
  h3 {
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    span {
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
    }
  }
`;

export const SummaryCard = styled.div<{ bg: string }>`
  min-width: 97.03px;
  height: 117px;
  background: ${({ bg }) =>
    bg
      ? `url(${bg}) no-repeat, #CDCDCD`
      : "linear-gradient(0deg, #CDCDCD, #CDCDCD), url(.png), #FFFFFF"};
  background-blend-mode: luminosity, normal;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  margin-right: 25px;
  span {
    max-width: fit-content;
    height: 11.94px;
    border-radius: 0 2px;
    font-weight: 500;
    font-size: 5.57px;
    line-height: 6.75px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: #615e5e;
    margin-left: auto;
    padding: 3px 9px;
  }
`;

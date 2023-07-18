import { styled } from "styled-components";

export const MarketplacePageWrapper = styled.div<{ sidebar?: string }>`
  margin-bottom: auto;
  width: 100%;
  position: relative;
  padding-top: 25px;
  padding-right: ${({ sidebar }) => (sidebar ? "405px" : "0")};
  @media screen and (max-width: 1300px) {
    padding-right: 0;
  }
`;

export const MarketplacePageContainer = styled.div`
  width: 95%;
  max-width: 1340px;
  margin: auto;
  & > h2 {
    margin-bottom: 40px;
    background: url("/assets/title-bg.png") no-repeat;
    background-size: 100% 100%;
    height: 114px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-family: vipnagorgialla;
    font-size: 32px;
    text-transform: uppercase;
  }
`;

export const MarketplaceContentWrapper = styled.div`
  padding: 0 40px;
`;

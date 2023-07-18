import { styled } from "styled-components";

export const PredictionCardWrapper = styled.div<{
  cardType?: string;
  bg?: string;
  height?: number;
  isnothover?: string;
}>`
  padding: 23px 25px;
  text-transform: capitalize;
  cursor: pointer;
  position: relative;
  width: 100%;
  // contain: content;
  border-radius: 6px;
  box-shadow: 0px 0px 15.3925px rgba(0, 0, 0, 0.05);
  /* background: ${({ bg, cardType }) =>
    bg
      ? `url(${bg}) no-repeat, #CDCDCD `
      : cardType === "identity"
      ? "#FFFFFF"
      : "linear-gradient(0deg, #CDCDCD, #CDCDCD), #FFFFFF;"}; */
  /* background-blend-mode: luminosity; */
  background-size: cover;
  background-position: center;
  /* height: ${({ height }) => (height ? height + "px" : "293px")}; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ isnothover }) =>
    isnothover &&
    `
    &:hover {
      z-index: 2;
      .overlay {
        opacity: 1;
        visibility: visible;
      }
    }
  `}
`;

export const CardTopWrapper = styled.div`
  display: flex;
  color: #fff;
  /* align-items: center; */
  justify-content: space-between;
  & > div.trigger {
    font-weight: 600;
    font-size: 9.91751px;
    line-height: 10px;
    display: flex;
    align-items: center;
    padding: 9px;
    &::before {
      width: 4px;
      height: 4px;
      content: "";
      background-color: #fff;
      margin-right: 5px;
      border-radius: 4px;
    }
  }
`;

export const CardBottomWrapper = styled.div`
  text-transform: capitalize;
  background-color: #000;
  position: relative;
  border-radius: 4px;
  margin-top: 12px;
  color: #fff;
  display: flex;
  height: 36px;
  align-items: center;
  box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.2);
  justify-content: center;
  font-weight: 500;
  font-size: 10.7747px;
  line-height: 13px;
`;

export const CardDateWrapper = styled.div<{
  dashbordstyle?: boolean;
  cardType?: string;
}>`
  display: flex;
  span {
    font-weight: 600;
    padding: ${({ dashbordstyle }) =>
      dashbordstyle ? "6.927px 6.476px 7.162px 6.157px" : "8px 13px 11px 12px"};
    color: ${({ cardType }) => (cardType === "identity" ? "#000" : "#fff")};
    font-size: ${({ dashbordstyle }) => (dashbordstyle ? "8.47px" : "11px")};
    font-family: Inter;
    font-style: normal;
    line-height: ${({ dashbordstyle }) => (dashbordstyle ? "8.466px" : "11px")};
    letter-spacing: ${({ dashbordstyle }) =>
      dashbordstyle ? "0.169px" : "0.22px"};
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    opacity: ${({ cardType }) => (cardType === "identity" ? "0.5" : "1")};
  }
  .date {
    border-radius: ${({ dashbordstyle }) =>
      dashbordstyle ? "4.618px 0px" : "6px 0px"};
  }

  .year {
    border-radius: ${({ dashbordstyle }) =>
      dashbordstyle ? "0px 0px 4.618px 4.618px" : "0 0 5px 5px"};
    margin-left: ${({ dashbordstyle }) => (dashbordstyle ? "3.85px" : "5px")};
  }
`;

export const CardTypeWrapper = styled.div<{
  dashbordstyle?: boolean;
}>`
  height: 30px;
  max-width: fit-content;
  min-width: 62px;
  font-weight: 400;
  font-size: ${({ dashbordstyle }) =>
    dashbordstyle ? "10.775px" : "10.7747px"};
  line-height: normal;
  width: 100%;
  background-color: #615e5e;
  padding: ${({ dashbordstyle }) =>
    dashbordstyle ? "4.618px 15.099px 5.471px 15.24px" : "6px 15px 7px 15px"};
  display: flex;
  border-radius: ${({ dashbordstyle }) =>
    dashbordstyle ? "0px 4.618px" : "0 5px"};
  justify-content: center;
  align-items: center;
`;

export const AmountWrapper = styled.div`
  right: 4px;
  top: -18px;
  position: absolute;
  width: 14px;
  height: 14px;
  font-weight: 500;
  font-size: 8.46587px;
  line-height: 8px;
  border-radius: 3px;
  background: rgb(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export const CardBodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin-top: 20px;
    font-weight: 600;
    font-size: 8.4532px;
    line-height: 8px;
    text-transform: uppercase;
    color: #989898;
  }
`;

export const CardTooltip = styled.div<{
  dashbordstyle?: string;
}>`
  position: absolute;
  bottom: 20px;
  right: 20px;
  &.left {
    left: 4px;
    right: auto;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    .tooltip-content {
      opacity: 1;
      visibility: visible;
    }
  }

  span {
    display: inline-flex;
    padding: 3px 2px 4px 2px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #fff;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    font-size: ${({ dashbordstyle }) => (dashbordstyle ? "8.47px" : "11px")};
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    height: 18px;
    letter-spacing: 1.21px;
  }
`;

export const TooltipContent = styled.div`
  h3 {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin: 0 10px 5px;
  }
  & > div {
    overflow-y: scroll;
    height: 100%;
  }
  position: absolute;
  opacity: 0;
  visibility: hidden;
  background-color: #fff;
  right: -10px;
  top: -164px;
  z-index: 10;
  width: 226px;
  height: 151px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 15px 12px;
`;

export const TooltipItem = styled.div`
  padding: 5px 0;
  margin: 0 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;

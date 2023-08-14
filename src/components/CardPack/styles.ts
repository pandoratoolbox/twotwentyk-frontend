import { styled } from "styled-components";

export const PredictionCardWrapper = styled.div<{
  bg?: string;
  height?: number;
}>`
  padding: 23px 25px;

  text-transform: capitalize;
  cursor: pointer;
  position: relative;
  width: 100%;
  // contain: content;
  border-radius: 6px;
  box-shadow: 0px 0px 15.3925px rgba(0, 0, 0, 0.05);
  /* background: ${({ bg }) =>
    bg
      ? `url(${bg}) no-repeat, #CDCDCD `
      : "linear-gradient(0deg, #CDCDCD, #CDCDCD), #FFFFFF;"};
  background-blend-mode: luminosity;*/
  background-size: cover;
  background-position: center;
  // height: ${({ height }) => (height ? height + "px" : "293px")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    z-index: 2;
    .overlay {
      opacity: 1;
      visibility: visible;
    }
  }
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

export const CardOverlayWrapper = styled.div`
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("/assets/nfts/blur.png") no-repeat;
  background-size: 100% 100%;
  backdrop-filter: blur(2px);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

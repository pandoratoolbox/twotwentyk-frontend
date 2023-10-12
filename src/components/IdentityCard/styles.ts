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
  border-radius: 6px;
  box-shadow: 0px 0px 15.3925px rgba(0, 0, 0, 0.05);
  background-size: cover;
  background-position: center;
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
  @media (max-width:425px){
    padding: 0;
  }
`;

export const CardBottomWrapper = styled.div<{
  isSelect?: string;
}>`
  text-transform: capitalize;
  background-color: ${({ isSelect }) => isSelect ? 'white' : '#000'};
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

import { styled } from "styled-components";

export const DateCardWrapper = styled.div<{ isnothover?: string }>`
  padding: 23px 25px;
  cursor: pointer;
  width: 100%;
  position: relative;
  background-position: center;
  background-size: cover;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ isnothover }) =>
    !isnothover &&
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

export const CardButton = styled.div`
  width: 143px;
  height: 42px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0e4fbc;
  border: 2px solid #fff;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  &:hover {
    background: #fff;
    color: #000;
    color: #0e4fbc;
  }
`;

export const CardButtonGroup = styled.div`
  & > :not(:first-child) {
    margin-top: 13px;
  }
`;

export const CardTooltip = styled.div`
  position: absolute;
  top: 0;
  right: 0;
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

  .bg-black {
    background: url("/assets/nfts/personFrame.png") no-repeat;
    background-size: 100% 100%;
    width: 45px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
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
  top: 20px;
  z-index: 10;
  width: 255px;
  height: 290px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 15px 12px;
`;

export const TooltipItem = styled.div`
  padding: 7px 0;
  margin: 0 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  &:not(:last-child) {
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.15);
  }
`;

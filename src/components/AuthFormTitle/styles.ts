import { styled } from "styled-components";

export const TitleWrapper = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 125%;
  text-align: center;
  margin-bottom: 24px;
  position: relative;
  display: flex;
  height: 72px;
  align-items: center;
  justify-content: center;
  span {
    z-index: 1;
    font-family: vipnagorgialla;
    font-weight: 300;
    text-transform: uppercase;
    line-height: 32px;
    color: #fff;
    font-size: 20px;
    width: calc(100% + 64px);
    position: absolute;
  }
`;

export const TitleBGWrapper = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  left: -32px;
  display: flex;
  align-items: center;
`;

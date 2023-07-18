import { styled } from "styled-components";

export const CraftingWrapper = styled.div`
  width: 100%;
  display: flex;
  height: calc(100vh - 125px);
  padding-top: 24px;
  & > .unAuth-display {
    display: flex;
    flex-direction: column;
    height: fit-content;
    margin: 50px auto;
    align-items: center;
    justify-content: center;
    & > p,
    & > h4 {
      text-align: center;
      font-size: 16px;
      line-height: 125%;
      max-width: 315px;
      margin: auto;
    }
    & > p {
      font-weight: 400;
    }
    & > h4 {
      font-weight: 600;
      margin-top: 12px;
    }
    & > .login-button {
      width: 255px;
      margin-top: 28px;
      height: 51px;
    }
  }
  @media screen and (max-width: 1024px) {
    height: calc(100vh - 76px);
  }
`;

export const CraftLeftWrapper = styled.div`
  flex: 1;
  position: relative;
  overflow: auto;
  display: flex;
  max-width: 929px;
  height: 100%;
  box-sizing: content-box;
  margin: auto;
  padding-right: 405px;
  flex-direction: column;
  @media screen and (max-width: 1024px) {
    padding-right: 0;
  }
`;

export const CraftRightWrapper = styled.div<{ open?: string }>`
  position: fixed;
  max-width: 405px;
  width: 100%;
  border-radius: 8px;

  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  background: #f9faff;
  display: flex;
  flex-direction: column;
  right: 12px;
  height: calc(100% - 76px);
  .close-button {
    display: none;
  }
  @media screen and (max-width: 1024px) {
    right: ${({ open }) => (open ? 0 : "-100%")};
    z-index: 100;
    .close-button {
      display: flex;
    }
  }
`;

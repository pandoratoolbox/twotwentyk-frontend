import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const AppLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const HeaderWrapper = styled.div`
  position: fixed;
  width: 100vw;
  z-index: 10;
  backdrop-filter: blur(5px);
  top: 0;
  left: 0;
`;

export const MainHeaderWrapper = styled.div`
  background: linear-gradient(90deg, #0071d0 0%, #1f20a0 100%);
  height: 76px;
  display: flex;
  align-items: center;
`;

export const MainHeaderContainer = styled.div`
  max-width: 1280px;
  width: 95%;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

export const HeaderMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  & > :not(:first-child) {
    margin-left: 40px;
  }
  @media screen and (max-width: 1200px) {
    & > :not(:first-child) {
      margin-left: 20px;
    }
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const HeaderNavItem = styled(Link)<{ active?: string }>`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  color: #fff;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  text-decoration: none;
  position: relative;
  &:hover {
    opacity: ${({ active }) => (active ? 1 : 0.75)};
  }
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    left: 0;
    bottom: -8px;
    height: 1px;
    background: #fff;
    opacity: ${({ active }) => (active ? 0.5 : 0)};
  }
`;

export const SubHeaderWrapper = styled.div`
  width: 100%;
  background: #f6f6f6;
  /* opacity: 0.5; */
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const SubHeaderContainer = styled.div`
  width: fit-content;
  cursor: pointer;
  padding: 0 20px;
  overflow-x: hidden;
  display: flex;
  height: 49px;
  align-items: center;
  justify-content: center;
  margin: auto;
  & > :not(:first-child) {
    margin-left: 60px;
  }
  @media screen and (max-width: 1024px) {
    & > :not(:first-child) {
      margin-left: 20px;
    }
  }
`;

export const SubMenuItem = styled(Link)<{ active?: string }>`
  color: #0b55c0;
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;
  line-height: 100%;
  text-decoration: none;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  &:hover {
    opacity: ${({ active }) => (active ? 1 : 0.6)};
  }
`;

export const AppContainer = styled.div<{ issubmenu?: string }>`
  padding-top: ${({ issubmenu }) => (issubmenu ? "125px" : "76px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: center;
  @media screen and (max-width: 1024px) {
    padding-top: 76px;
  }
`;

export const HeaderButtonGroup = styled.div`
  display: flex;
  align-items: center;
  .login-button {
    width: 124px;
    height: 47px;
    & > :not(:first-child) {
      margin-left: 16px;
    }
  }
  & > :not(:first-child) {
    margin-left: 18px;
  }
  @media screen and (max-width: 1200px) {
    & > :not(:first-child) {
      margin-left: 10px;
    }
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const HeaderButton = styled.div<{ width?: number }>`
  height: 48px;
  width: ${({ width }) => (width ? width + "px" : "48px")};
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #323b89;
  box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.15);
  &.active {
    background: #4e5cd7;
    color: #fff;
  }
  box-shadow: 1px 1.5px 3px rgba(0, 0, 0, 0.2);
  border-radius: 7.04px;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  color: #fff;
  cursor: pointer;
  & > :not(:first-child) {
    margin-left: 7px;
  }
`;

export const Badge = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff5c00;
  right: -3px;
  top: -3px;
  border-radius: 100%;
  font-weight: 700;
  font-size: 8.27273px;
  line-height: 10px;
  color: #ffffff;
`;

export const MobileMenuButton = styled.div`
  display: none;
  @media screen and (max-width: 1024px) {
    display: flex;
  }
`;

export const CloseButton = styled.div`
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  right: 17px;
  top: 12px;
`;

export const NotificationWrapper = styled.div<{ open: boolean }>`
  position: absolute;
  right: 0;
  contain: content;
  z-index: 11;
  top: 60px;
  width: 400px;
  /* padding: 20px 25px; */
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  background: #ffffff;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  & > p {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 41px;
    margin-left: auto;
    background: rgba(14, 79, 188, 0.3);
  }
  & > h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    color: #000;
    margin-bottom: 11px;
    padding: 24px 24px 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
`;

export const NotificationsGroup = styled.div`
  padding: 0 24px 24px;
  & > :not(:first-child) {
    margin-top: 11px;
  }
`;

export const NotificationButtonWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const MobileMenuWrapper = styled.div<{ open?: string }>`
  opacity: ${({ open }) => (open ? 1 : 0)};
  right: ${({ open }) => (open ? "0" : "-100%")};
  position: fixed;
  top: 0;
  height: 100vh;
  overflow: auto;
  max-width: 450px;
  width: 100%;
  background: #fff;
  z-index: 1001;
`;

export const MobileMenuOverlay = styled.div<{ open?: string }>`
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: #00000080;
  backdrop-filter: blur(5px);
`;

export const MobileMenuContainer = styled.div`
  padding: 20px 30px;
`;

export const MobileMenuNavbar = styled.div`
  margin-top: 20px;
`;

export const MobileMenuItem = styled.div<{ active?: string }>`
  cursor: pointer;
  padding: 15px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #00000030;
  font-size: 16px;
  font-weight: ${({ active }) => (active ? "700" : "300")};
  /* background: ${({ active }) => (active ? "#00000005" : "transparent")}; */
`;

export const MobileSubMenuWrapper = styled.div`
  padding-left: 20px;
`;

export const MobileSubmenuItem = styled.div<{ active?: string }>`
  padding: 10px;
  font-weight: ${({ active }) => (active ? "700" : "300")};
  /* background: ${({ active }) => (active ? "#00000005" : "transparent")}; */
  border-bottom: 1px solid #00000030;
  cursor: pointer;
`;

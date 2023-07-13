import { styled } from "styled-components";

export const AdminLayoutWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const AdminHeaderWrapper = styled.div`
  background-color: #fff;
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  width: 240px;
  display: flex;
  font-weight: 400;
  font-size: 30px;
  font-family: "Jockey One";
  /* line-height: 43px; */
  cursor: pointer;
  justify-content: center;
`;

export const AdminHeaderContainer = styled.div`
  flex: 1;
  & > div {
    max-width: 1200px;
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
      justify-content: flex-end;
    }
  }
`;

export const AdminInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

export const AlarmIconWrapper = styled.div`
  cursor: pointer;
  margin-right: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 600px) {
    margin-right: 12px;
  }
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  flex: 1;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const AdminInfo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  img {
    width: 32px;
    height: 32px;
    border-radius: 32px;
    margin-right: 12px;
  }
  p {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    color: #475569;
    margin-right: 8px;
    line-height: 20px;
  }
  @media screen and (max-width: 768px) {
    p {
      display: none;
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
`;

export const AdminLayoutContainer = styled.div`
  flex: 1;
  height: calc(100% - 56px);
  width: 100%;
  display: flex;
`;

export const SidebarItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  cursor: pointer;
  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    margin-left: 8px;
  }
`;

export const AdminSidebarWrapper = styled.div`
  width: 240px;
  overflow: auto;
  padding: 20px 12px;
`;

export const AdminContentWrapper = styled.div`
  overflow: auto;
  flex: 1;
  & > div {
    padding: 32px 0;
    max-width: 1200px;
    width: 95%;
    margin: auto;
  }
`;

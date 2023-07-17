import { styled } from "styled-components";

export const DashboardPageWrapper = styled.div`
  padding-bottom: 28px;
  max-width: 1173px;
  width: 95%;
  margin: auto;
  & > div {
    margin-top: 28px;
  }
  .login-button {
    width: 255px;
    height: 51px;
    margin: auto;
    margin-top: 61px;
  }
`;

export const DashboardCardWrapper = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  /* padding: 38px 22px; */
  padding: 0 0 32px;
  .page-link {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1px;
    padding: 0;
  }
`;

export const DashboardContainer = styled.div`
  padding: 0 38px;
`;

export const DashboardCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 15px;
  grid-gap: 25px;
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;

export const CardTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  position: relative;
  line-height: 24px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    svg {
      height: 100%;
      width: 100%;
    }
  }
  span {
    position: absolute;
    color: #fff;
    font-family: vipnagorgialla;
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
    text-transform: uppercase;
  }
`;

export const SeeMoreButton = styled.div`
  cursor: pointer;
  width: fit-content;
  margin-left: auto;
  text-transform: capitalize;
  color: #000000;
  margin-bottom: 20px;
  color: #0e4fbc;
  font-size: 16px;
  font-weight: 600;
  text-decoration-line: underline;
  text-transform: capitalize;
`;

export const EmptyCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-weight: 400;
    text-align: center;
    font-size: 14px;
    line-height: 17px;
    opacity: 0.5;
    margin-bottom: 28px;
  }
  img {
    max-width: 860px;
    width: 100%;
    margin-bottom: 30px;
  }
  .dashboard-card-button {
    max-width: 206px;
    background: #fff;
    border: 2px solid #1440b3;
    color: #0e4fbc;
    height: 42px;
  }
`;

export const DashboardListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  margin-bottom: 20px;
`;

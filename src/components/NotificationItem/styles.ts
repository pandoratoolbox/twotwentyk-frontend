import { styled } from "styled-components";

export const NotificationItemWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  padding: 12px 0;
  p {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #000;
  }
  .notify-img {
    margin-right: 12px;
  }
  span {
    display: flex;
    height: 24px;
    width: 38px;
    align-items: center;
    justify-content: center;
    background: #17d190;
    border-radius: 4px;
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;
    color: #fff;
  }
`;

export const NotificationTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #000;
  h5 {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    color: #0e4fbc;
    b {
      font-weight: 500;
      font-size: 14px;
      line-height: 16.94px;
    }
    p {
      color: #0e4fbc;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
    }
  }
`;

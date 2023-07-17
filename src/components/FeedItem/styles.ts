import { styled } from "styled-components";

export const FeedItemWrapper = styled.div`
  border-radius: 4px;
  border: 1px solid #eaeaea;
  background: #fff;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
`;

export const FeedImage = styled.div`
  margin-right: 24px;
  width: 120px;
  height: 120px;
  display: flex;
  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    object-fit: cover;
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const FeedInfoWrapper = styled.div`
  position: relative;
  flex: 1;
  h3 {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 3px;
    width: calc(100% - 130px);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #535353;
    opacity: 0.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  div {
    & > :not(:first-child) {
      margin-left: 6px;
    }
    margin-top: 5px;
    span {
      opacity: 0.5;
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;
    }
  }
  h4 {
    position: absolute;
    right: 0;
    font-weight: 600;
    font-size: 16px;
    line-height: 17px;
    color: #0e4fbc;
    top: 0;
  }
  @media screen and (max-width: 500px) {
    h3 {
      font-size: 14px;
    }
    h4 {
      font-size: 12px;
    }
  }
`;

export const FeedReadMore = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  height: 70%;
  margin-left: 25px;
  padding-left: 25px;
  display: flex;
  color: #0e4fbc;
  font-size: 16px;
  font-weight: 600;
  align-items: center;
  span {
    cursor: pointer;
  }
`;

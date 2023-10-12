import { styled } from "styled-components";

export const LearnToPlayWrapper = styled.div`
  padding: 24px 0 50px;
  max-width: 1340px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.05);
  margin: 0 auto;
  width: 95%;
  & > h2 {
    margin-bottom: 32px;
    padding: 0 72px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-family: vipnagorgialla;
    font-size: 32px;
    text-transform: uppercase;
    background: url("/assets/title-bg.png") no-repeat;
    background-size: 100% 100%;
    height: 114px;
  }
  @media screen and (max-width: 768px) {
    & > h2 {
      padding: 0 30px;
    }
  }
`;

export const LearnPlaySectionWrap = styled.div`
  padding: 0 83px;

  h3 {
    color: #000;
    font-family: Montserrat;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: capitalize;
    margin-bottom: 16px;
  }
`;

export const UserDetail = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 24px;
  .user-detail {
    margin-left: 9px;
    h5 {
      color: #000;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    h6 {
      color: rgba(0, 0, 0, 0.7);
      font-family: Montserrat;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
`;

export const ReactionSection = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  .reactions {
    display: flex;
    align-items: center;
    gap: 20px;

    .reaction {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      span {
        color: #a3a3a3;
        font-family: Montserrat;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
`;

export const VideoSection = styled.div`
  padding-top: 24px;
  p {
    color: #000;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    padding-bottom: 30px;
  }

  iframe {
    width: 100%;
    border: none;
    height: 28vw;
  }
`;

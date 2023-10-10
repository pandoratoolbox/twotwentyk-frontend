import { styled } from "styled-components";

export const TermWrapper = styled.div`
  width: 100%;
  display: flex;
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

export const TermPageTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/assets/title-bg.png") no-repeat;
  background-size: 100% 100%;
  height: 110px;
  & > h3 {
    color: #fff;
    font-family: vipnagorgialla;
    font-size: 32px;
    text-transform: uppercase;
    font-weight: 100;
  }
  margin-bottom: 8px;
  @media screen and (max-width: 425px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TermPageContainer = styled.div`
max-width: 1340px;
width: 95%;
margin: auto;
`;

export const TermPageContent = styled.div`
  padding: 25px 2px;
`;

export const TermPeragraph = styled.p` 
padding: 23px  0;
text-align: justify;
line-height: 25px`

export const TermSubUnderlineHeading = styled.h5`
text-decoration: underline;
    display: initial;
    font-size: 16px;
    padding: 10px 0 0 0;
`
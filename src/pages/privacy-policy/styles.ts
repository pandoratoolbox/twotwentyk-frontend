import { styled } from "styled-components";



export const PrivayPolicyWrapper = styled.div`
  width: 100%;
  & > p, & > h4 {
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
  @media screen and (max-width: 1024px) {
    height: calc(100vh - 76px);
  }
`;

export const PolicyPageTitle = styled.div`
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

export const PolicyPageLastRevised = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
  padding: 25px 0px;
`;

export const PolicyPageContainer = styled.div`
  max-width: 1340px;
  width: 95%;
  margin: auto;
  padding: 20px 0;
`;

export const PolicyPageContent = styled.div`
  padding: 5px 0px;
`;

export const PolicyParagraph = styled.p` 
  padding: 15px 0;
  text-align: justify;
`

export const PolicyStrong = styled.span` 
  font-weight: bold;
`

export const PolicyPageSubTitle = styled.span`
  text-decoration: underline;
`

export const PolicypageSubTitle2 = styled.div`
  font-style: italic;
  padding-top: 10px;
`
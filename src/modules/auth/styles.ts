import { styled } from "styled-components";

export const AuthFormWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  border-radius: 20px 8px 8px;
  background: #fff;
  box-shadow: 0px 2px 20px 0px rgba(94, 113, 182, 0.25);
  padding: 0 32px 32px;
`;

export const ForgotPasswordText = styled.div`
  width: fit-content;
  margin-left: auto;
  a {
    color: #0e4fbc;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    text-decoration: none;

    &:hover {
      opacity: 1;
      text-decoration: underline;
    }
  }
`;

export const FormActionWrapper = styled.div`
  margin-top: 30px;
`;

export const FormActionText = styled.div`
  margin-top: 16px;
  text-align: center;
  color: #000;
  font-size: 12px;
  font-weight: 600;
  line-height: 150%;
  a {
    color: #0e4fbc;
    text-decoration: underline;
  }
`;

export const AuthFormDesc = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 17px;
  span {
    color: #000;
    display: flex;
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 12px; /* 171.429% */
  }
`;

export const CheckEmailWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  h3 {
    margin: 32px 0 16px;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #898989;
    max-width: 287px;
    width: 100%;
  }
`;

export const ResendEmail = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  margin-top: 32px;
  color: #000;
  span {
    text-decoration: underline;
    cursor: pointer;
    font-weight: 600;
    color: #1243b6;
  }
`;

export const SignUpCheckbox = styled.label`
  display: flex;
  align-items: flex-start;
  margin-top: 26px;
  input {
    min-width: 16px;
    height: 16px;
    margin: 0;
  }
  span {
    margin-left: 12px;
    word-break: break-all;
    font-weight: 400;
    font-size: 11px;
    line-height: 14px;
    color: rgba(0, 0, 0, 0.4);
    a {
      color: #000;
    }
  }
`;

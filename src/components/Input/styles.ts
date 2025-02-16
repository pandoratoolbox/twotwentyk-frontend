import { styled } from "styled-components";

export const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  p {
    color: #0e4fbc;
    font-size: 14px;
    font-weight: 600;
    line-height: 150%;
  }

  span {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #ff0000;
  }
`;

export const InputDescWrapper = styled.div`
  margin-top: 14px;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: rgba(12, 9, 42, 0.5);
`;

export const InputWrapper = styled.div<{ iserror?: string; suffix?: string }>`
  border: 1px solid
    ${({ iserror }) => (iserror ? "#ff0000" : "rgba(14, 79, 188, 0.4)")};
  border-radius: 6px;
  background: rgba(14, 79, 188, 0.05);
  display: flex;
  align-items: center;
  /* background-color: #fff; */
  position: relative;

  input {
    height: 40px;
    width: 100%;
    color: ${({ iserror }) => (iserror ? "#ff0000" : "#0e4fbc")};
    outline: none;
    padding: 0 16px;
    padding-right: ${({ suffix }) =>
      suffix === "code" ? "95px" : suffix === "password" ? "40px" : "16px"};
    border: none;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    background-color: transparent;
    &::placeholder {
      color: #0e4fbc;
      font-size: 14px;
      font-weight: 500;
      line-height: 24px; /* 171.429% */
      opacity: 0.4;
    }
  }
  div {
    position: absolute;
    display: flex;
    width: fit-content;
    cursor: pointer;
    right: 10px;
    &.code {
      width: 83px;
      font-weight: 700;
      font-size: 12px;
      line-height: 150%;
      color: #0c092a;
      opacity: 0.2;
    }

    &.currency {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: ${({ iserror }) => (iserror ? "#ff0000" : "#0e4fbc")};
    }
  }
`;

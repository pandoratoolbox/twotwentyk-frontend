import { styled } from "styled-components";

export const IconWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 8px;
`;

export const AdminSearchInputWrapper = styled.div<{
  bg: string;
}>`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  input {
    background: ${({ bg }) => (bg === "grey" ? "#f1f5f9" : "#fff")};
    ${({ bg }) =>
      bg === "white" &&
      `box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);`}
    max-width: 320px;
    width: 100%;
    height: 32px;
    border: 1px solid #00000000;
    border-radius: 32px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    outline: none;
    padding-left: 40px;
    flex: 1;
    &:focus {
      max-width: 100%;
      border: 1px solid #00000030;
    }
  }
`;

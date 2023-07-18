import { styled } from "styled-components";

export const ButtonWrapper = styled.div<{
  disabled?: boolean;
  variant?: string;
}>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ variant }) =>
    variant === "outlined" ? "#fff" : "#0e4fbc"};
  border: 1px solid
    ${({ variant }) => (variant === "outlined" ? "#000" : "#0e4fbc")};
  /* border-radius: 8px; */
  border-radius: 100px;
  /* background: #0e4fbc; */
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.15);
  height: 53px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ variant }) => (variant === "outlined" ? "#000" : "#fff")};
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  & > :not(:first-child) {
    margin-left: 10px;
  }
`;

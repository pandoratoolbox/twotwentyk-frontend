import { styled } from "styled-components";

export const SelectBoxWrapper = styled.div`
  width: 100%;
  position: relative;

  & > p {
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
    margin-bottom: 6px;
  }
`;

export const SelectBoxContainer = styled.div<{ border?: string }>`
  background: rgba(7, 98, 200, 0.04);
  border-radius: 4px;
  backdrop-filter: blur(50px);
  height: 40px;
  display: flex;
  border: 1px solid #0071d0;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 24px;
  cursor: pointer;
  /* border: 1px solid ${({ border }) =>
    border ? "#E4E4E4" : "transparent"}; */
  &.IMSelect {
    background: transparent;
    justify-content: space-around;
  }
`;

export const SelectBoxTextWrapper = styled.div`
  text-transform: capitalize;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  color: #2660c3;
  img {
    margin-right: 10px;
    width: 25px;
    height: 25px;
  }
  span {
    /* opacity: 0.5; */
  }
`;

export const SelectOptionsWrapper = styled.div<{ open?: boolean }>`
  text-transform: capitalize;
  position: absolute;
  padding: 10px 24px;
  margin-top: 10px;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  left: 0;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  width: 100%;
  z-index: 5;
  &.IMSelect {
    max-width: 216px;
    max-height: 200px;
    overflow: auto;
    padding: 11px 12px;
    left: unset;
    right: 0;
  }
`;

export const OptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  font-size: 13.5px;
  line-height: 17px;
  padding: 12px 0;
  cursor: pointer;
  text-transform: capitalize;
  div {
    display: flex;
    align-items: center;
    img {
      margin-right: 10px;
    }
  }

  &.IMSelect {
    font-size: 13px;
    font-weight: 500;
    padding: 0;
    padding-bottom: 10px;
    line-height: normal;
    border: none !important;
    &:last-child {
      padding: 0;
    }
  }
`;

export const OptionGroup = styled.div`
  & > :not(:last-child) {
    border-bottom: 1px solid #eaeaea;
  }
`;

export const CheckboxWrapper = styled.div`
  height: 24px;
  position: relative;
  width: 24px;
  label {
    background-color: #f0f0f0;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    cursor: pointer;
    height: 24px;
    left: 0;
    position: absolute;
    top: 0;
    width: 24px;
    &::after {
      border: 2px solid #000;
      border-top: none;
      border-right: none;
      content: "";
      height: 6px;
      left: 5px;
      opacity: 0;
      position: absolute;
      top: 6px;
      transform: rotate(-45deg);
      width: 12px;
    }
  }
  input {
    visibility: hidden;
  }
  input:checked + label {
    background-color: #f0f0f0;
    border-color: #f0f0f0;
  }

  input:checked + label:after {
    opacity: 1;
  }
`;

export const ClearAll = styled.div`
  width: fit-content;
  cursor: pointer;
  margin: 16px auto;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-decoration-line: underline;
`;

export const SelectAction = styled.div`
  .filter-apply-button {
    height: 45px;
  }
`;

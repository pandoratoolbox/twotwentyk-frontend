import { styled } from "styled-components";

export const CCTableContainerWrapper = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
`;
export const CCTableContainer = styled.table`
  width: 100%;
  white-space: nowrap;
  &,
  * {
    border-collapse: collapse;
  }
`;

export const CCTableHeaderWrapper = styled.thead`
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
  padding: 0 24px;
  height: 60px;
  th {
    color: #64748b;
    font-size: 12px;
    font-weight: 800;
    line-height: 20px;
    text-transform: uppercase;
    text-align: left;
    div {
      padding: 8px 11px;
      cursor: pointer;
      display: flex;
      align-items: center;
      span {
        display: flex;
        margin-left: 8px;
      }
    }
  }
`;

export const CCTableBodyWrapper = styled.tbody`
  tr {
    height: 51px;
    border-bottom: 1px solid #f1f5f9;
  }
  td {
    padding: 0 11px;
    color: #64748b;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    span {
      color: #0ea5e9;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
    }
    &:first-child {
      padding-left: 24px;
    }
    &:last-child {
      width: fit-content;
      text-align: center;
    }
  }
`;

export const AdminBadge = styled.div<{ color: string }>`
  background: ${({ color }) => `${color}3e`};
  width: fit-content;
  min-width: 66px;
  padding: 0px 8px;
  display: flex;
  font-size: 12px;
  border-radius: 24px;
  font-style: normal;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 18px;
  height: 24px;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};
`;

export const CMContainerWrapper = styled.div`
  padding-top: 32px;
  .upload {
    display: flex;
    flex-direction: column;
    width: 1104px;
    padding: 40px 0px 41px 0px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 2px dashed #3a424e;
    margin-bottom: 40px;

    h3 {
      color: #64748b;
      font-size: 14px;
      font-style: normal;
      font-weight: 800;
      line-height: 28px;
    }

    p {
      color: #64748b;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
      margin-top: 7px;
      margin-bottom: 13px;
    }

    label {
      display: flex;
      max-width: 140px;
      height: 48px;
      padding: 10px 24px;
      margin: 0 auto;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      background: #3a424e;
      outline: none;
      cursor: pointer;
      color: #fff;

      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px;
    }

    .custom-file-input {
      visibility: hidden;
    }

  }
`;


export const FooterButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 30px;

  button {
    cursor: pointer;
    display: flex;
    padding: 8px 16px;
    align-items: center;
    border-radius: 4px;
    border: none;

    color: #fff;

    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 20px;

    &.btn-submit {
      background: #05bd7b;
      box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1),
        0px 1px 3px 0px rgba(0, 0, 0, 0.1);
    }
 
    &.btn-discard {
      background: #ff6d6d;

      box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1),
        0px 1px 3px 0px rgba(0, 0, 0, 0.1);
    }
  }
`;
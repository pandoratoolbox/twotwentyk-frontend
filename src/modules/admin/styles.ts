import { styled } from "styled-components";

export const ClaimManagementTableWrapper = styled.div`
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const CMTableActionsWrapper = styled.div`
  height: 65px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 12px 0 23px;
`;

export const MultiChecker = styled.div`
  display: flex;
  align-items: center;
`;

export const TableFilter = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-left: 18px;
    cursor: pointer;
  }
`;

export const CCTableHeaderWrapper = styled.thead`
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
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
    // &:first-child {
    //   width: 32px;
    //   padding-left: 12px;
    // }
  }
`;

export const CMTableContainer = styled.table`
  width: 100%;
  white-space: nowrap;
  &,
  * {
    border-collapse: collapse;
  }
`;

export const CMTableHeaderWrapper = styled.thead`
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
  height: 36px;
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
    &:first-child {
      width: 32px;
      padding-left: 12px;
    }
  }
`;

export const CMTableBodyWrapper = styled.tbody`
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
      margin-left: 12px;
    }
    &:last-child {
      width: fit-content;
    }
  }
`;

export const TableActionButtonWrapper = styled.div`
  display: flex;
  width: fit-content;
`;

export const TableActionButton = styled.div`
  border-radius: 4px;
  width: 80px;
  height: 29px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  color: #fff;
  font-size: 14px;
  line-height: 18px;
  &.approve {
    background-color: #05bd7b;
  }
  &.reject {
    background-color: #ff6d6d;
    margin-left: 16px;
  }
  &.disabled {
    background: #cecece;
    cursor: not-allowed;
  }
`;

export const AdminBadge = styled.div<{ color: string }>`
  background: ${({ color }) => `${color}1e`};
  width: fit-content;
  display: flex;
  width: 80px;
  font-size: 12px;
  border-radius: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  height: 24px;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};
`;

export const CMTableFooter = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  color: #64748b;
  justify-content: space-between;
`;

export const PaginationButton = styled.div<{ disabled?: string }>`
  padding: 0 16px;
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  line-height: 18px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? "0.4" : "1")};
`;

export const PageCounter = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

export const CheckAllBox = styled.div`
  margin-right: 33px;
  display: flex;
  align-items: center;
  span {
    margin-right: 8px;
    display: flex;
    cursor: pointer;
  }
`;

export const TableActions = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-right: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    span {
      color: #64748b;
      font-size: 14px;
      font-weight: 700;
      line-height: 18px;
      margin: 0 6px;
    }
  }
`;

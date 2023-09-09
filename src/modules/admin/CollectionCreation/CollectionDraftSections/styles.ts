import { styled } from "styled-components";

export const CDContainerWrapper = styled.div``;

export const CDCollectionParameterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 28px;

  .cards {
    display: flex;
    gap: 20px;
  }
`;

export const CDHead = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
  margin-bottom: 28px;

  h3 {
    color: #64748b;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 20px;
  }
`;

export const Card = styled.div`
  border-radius: 8px;
  background: var(--Colors-white, #fff);

  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
export const CardHeader = styled.div`
  display: flex;
  padding: 12px;
  justify-content: start;
  align-items: center;
  align-self: stretch;
  border-bottom: 1px solid #e2e8f0;
  background: #fff;
  color: #64748b;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 35px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  svg {
    margin-left: 8px;
  }
`;
export const CardBody = styled.div``;
export const SaveButton = styled.button`
  display: flex;
  height: 29px;
  padding: 0px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #3a424e;
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  cursor: pointer;
  &.ml-auto {
    margin-left: auto;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  height: 51px;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
  padding: 0 24px;
  cursor: pointer;
  margin-top: auto;
  .newEntry {
    display: flex;
    align-items: center;
    gap: 16px;

    span {
      display: flex;
      width: 31px;
      height: 29px;
      padding: 0px 6px 0px 12px;
      align-items: center;
      gap: 56px;
      flex-shrink: 0;
      color: #64748b;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      border-radius: 4px;
      border: 1px solid #cbd5e1;
    }
    p {
      color: #64748b;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
    }
  }
`;

export const Entries = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    display: flex;
    justify-content: space-between;
    height: 44px;
    padding: 0 24px;
    align-items: center;
    flex-shrink: 0;
    align-self: stretch;
    border-bottom: 1px solid #f1f5f9;
    background: #fff;

    span {
      color: #64748b;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
    }

    input,
    select {
      color: #64748b;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      padding: 0 8px;
      border-radius: 4px;
      border: 1px solid #cbd5e1;
      height: 30px;

      &.input-text {
        max-width: 120px;
      }

      &.input-number {
        max-width: 85px;
      }
    }
  }
`;

export const EntryAction = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  .svg-btn {
    background-color: transparent;
    cursor: pointer;
    border: none;
    padding: 0;
  }
`;

export const CardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 6px 0;
`;

export const CardTableHead = styled.thead`
  width: 100%;
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
`;

export const CardTableBody = styled.tbody`
  width: 100%;
`;

export const CardTableTr = styled.tr`
  width: 100%;
  &.border-bottom {
    border-bottom: 1px solid #f1f5f9;
    height: 51px;
  }
  &.rowCollapsed td {
    vertical-align: top;
  }
`;

export const CardTableTh = styled.th`
  color: #64748b;
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  line-height: 20px;
  text-transform: uppercase;
  text-align: start;
  padding: 8px;
  transition: all 1s;

  &:first-child {
    padding-left: 24px;
  }

  &.TPPool-th {
    width: 200px;
  }
`;

export const CardTableTd = styled.td`
  color: #64748b;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  padding: 8px;
  transition: all 0.5s ease-in-out;

  .collapsible-row-content {
    max-height: 0;
    overflow: hidden;
    transform-origin: bottom;
    transition: all 0.5s ease-in-out;
  }

  .collapsible-row-content.expanded {
    max-height: 1000px;
    transform: translateY(0%);
  }

  &.col-btn {
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        padding: 8px;
        margin-bottom: 8px;

        &.edit-list {
          padding: 3px 0;
          input.input-number {
            max-width: 65px;
          }
        }
      }
    }
    button {
      background: transparent;
      border: none;
      cursor: pointer;
      color: #0ea5e9;
      font-weight: 600;
      svg {
        fill: #0ea5e9;
        width: 10px;
        path {
          fill: #0ea5e9;
        }
      }
      &.expanded {
        margin-bottom: 1rem;
      }
    }
  }

  &:first-child {
    padding-left: 24px;
  }

  &.col-action {
    display: flex;
    align-items: center;
    gap: 10px;
    .svg-btn {
      background-color: transparent;
      cursor: pointer;
      border: none;
      padding: 0;
      &.ml-auto {
        margin-left: auto;
      }
    }
  }

  input,
  select {
    color: #64748b;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    padding: 0 8px;
    border-radius: 4px;
    border: 1px solid #cbd5e1;
    height: 30px;

    &.input-text {
      max-width: 110px;
    }

    &.input-number {
      max-width: 85px;
    }
  }
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tabs-button {
    display: flex;

    .tab {
      display: flex;
      width: 129px;
      height: 52px;
      padding: 8px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border: none;
      border-right: 1px solid #e2e7ec;
      background-color: transparent;
      opacity: 0.4;
      color: #64748b;
      text-align: center;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.6px;
      text-transform: uppercase;

      &.active {
        background: rgba(14, 165, 233, 0.1);
        opacity: 1;
      }

      span {
        font-weight: 600;
      }
    }
  }
  .total-summary {
    color: #64748b;

    font-size: 12px;
    font-style: normal;
    font-weight: 800;
    line-height: 20px;
    padding: 0 24px;
    span {
      color: #05bd7b;
      font-weight: 700;
      text-transform: uppercase;
      margin-left: 8px;
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
    &.btn-save {
      background: #0ea5e9;
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

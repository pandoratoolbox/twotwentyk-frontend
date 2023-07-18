import { styled } from "styled-components";

export const ClaimsSectionWrapper = styled.div`
  margin-top: 62px;
  max-width: 1100px;
  width: 95%;
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  /* padding: 28px 24px 0; */
  h2 {
    color: #fff;
    font-family: vipnagorgialla;
    font-size: 24px;
    font-weight: 300;
    line-height: 32px; /* 133.333% */
    text-transform: uppercase;
    background: url("/assets/title-bg.png") no-repeat;
    background-size: 100% 100%;
    height: 72px;
    padding: 0 40px;
    display: flex;
    margin-bottom: 16px;
    align-items: center;
  }
`;

export const CliamsTableContainer = styled.div`
  padding: 0 40px;
  div {
    width: 100%;
    overflow: auto;
  }
`;

export const ClaimsTableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
  white-space: nowrap;
  tr:nth-child(even) {
    background: #f2f5ff;
  }
  span {
    color: #000;
  }
  span.amount-cell {
    color: #b01212;
  }
  tr:nth-child(odd) {
    background: #fff;
  }
  tr,
  td,
  th {
    border-collapse: collapse;
  }
  td.trigger {
    white-space: break-spaces;
  }
  td.identity {
    font-weight: 600;
  }
  th {
    border-bottom: 1px solid #e1e3e7;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #0e4fbc;
  }
  td {
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.8);
  }
  th,
  td {
    padding: 12px 15px;
    text-align: left;
  }
`;

export const Status = styled.div<{ color: string; bg: string }>`
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
  border-radius: 10px;
  font-weight: 500;
  text-align: center;
  font-size: 12px;
  line-height: 16px;
  padding: 2px 10px;
  width: fit-content;
`;

export const PaginatonWrapper = styled.div`
  /* margin-top: 26px; */
  padding: 12px 40px;
  margin-top: 32px;
  display: flex;
  width: 100%;
  align-items: center;
  border-top: 1px solid #e1e3e7;
  justify-content: space-between;
  & > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    opacity: 0.5;
  }
  .page-link {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 !important;
    color: #5a6689 !important;
    box-shadow: none;
    border-radius: 0 !important;
    font-family: Inter;
    font-size: 14px;
    line-height: 20px;
  }
  .page-item.active .page-link {
    border: 1px solid #0e4fbc !important;
    background: rgba(14, 79, 188, 0.6) !important;
    color: #fff !important;
  }
  & .page-item:not(:last-child):not(.active) {
    .page-link {
      border-right: none !important;
    }
  }
`;

export const EmptyData = styled.div`
  padding: 72px 0;
  max-width: 635px;
  text-align: center;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(2px);
  p {
    color: #000;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
  }
  h2 {
    margin-bottom: 16px;
    color: #0e4fbc;
    text-align: center;
    font-family: vipnagorgialla;
    font-size: 24px;
    line-height: 100%; /* 24px */
    text-transform: uppercase;
  }
  .empty-button {
    width: 230px;
    height: 49px;
    margin: auto;
    border: 2px solid #1440b3;
    margin-top: 20px;
    background: #fff;
    color: #0e4fbc;
    text-transform: uppercase;
  }
`;

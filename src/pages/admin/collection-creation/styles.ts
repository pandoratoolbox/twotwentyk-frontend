import { styled } from "styled-components";

export const CollectionCreationPageWrapper = styled.div`
  & > h1 {
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    color: #64748b;
    margin-bottom: 23px;
  }
`;

export const PageActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 23px;
`;

export const CreateButton = styled.div`
  width: auto;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: #0ea5e9;
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 800;
  line-height: 20px;
  margin-left: 20px;
  padding: 0 16px;
`;

export const CollectionHead = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  h1 {
    color: #64748b;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 20px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    margin-right: 12px;
  }
  .rightIcons {
    display: flex;
    gap: 20px;
  }

  span {
    display: flex;
    height: 24px;
    padding: 0px 8px;
    justify-content: center;
    align-items: center;
    border-radius: 999px;
    background: #fef9c3;
    color: #e3a31c;
    font-size: 12px;
    font-style: normal;
    font-weight: 800;
    line-height: 18px;
    text-transform: uppercase;
  }
`;

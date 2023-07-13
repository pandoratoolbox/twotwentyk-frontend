import { styled } from "styled-components";

export const ClaimManagementPageWrapper = styled.div`
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
  width: 110px;
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
`;

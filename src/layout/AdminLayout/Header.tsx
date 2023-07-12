import React, { useState } from "react";
import {
  AdminHeaderContainer,
  AdminHeaderWrapper,
  AdminInfo,
  AdminInfoWrapper,
  AlarmIconWrapper,
  LogoWrapper,
  SearchInputWrapper,
} from "./styles";
import {
  AdminSearchInput,
  IconAlarmOutlined,
  IconArrowDown,
} from "../../components";

export const AdminHeader: React.FC = () => {
  const [filter, setFilter] = useState("");
  return (
    <AdminHeaderWrapper>
      <LogoWrapper>TwoTwentyK</LogoWrapper>
      <AdminHeaderContainer>
        <div>
          <SearchInputWrapper>
            <AdminSearchInput
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              bg="grey"
            />
          </SearchInputWrapper>
          <AdminInfoWrapper>
            <AlarmIconWrapper>
              <IconAlarmOutlined />
            </AlarmIconWrapper>
            <AdminInfo>
              <img src="/assets/nfts/1.png" alt="" />
              <p>Username</p>
              <IconArrowDown />
            </AdminInfo>
          </AdminInfoWrapper>
        </div>
      </AdminHeaderContainer>
    </AdminHeaderWrapper>
  );
};

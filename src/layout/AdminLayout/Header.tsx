import React, { useState, useEffect } from "react";
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
import { useMyInfoContext } from "../../context";
import { useNavigate } from "react-router-dom";

export const AdminHeader: React.FC = () => {
  const [filter, setFilter] = useState("");
  const {myInfoContext} = useMyInfoContext();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login")
    }

    if (myInfoContext) {
      setUsername(myInfoContext.username);
      if (!myInfoContext.role_ids.includes(999)) {
        navigate("/")
      }
    }
  }, [myInfoContext]);

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
              <p>{username}</p>
              <IconArrowDown />
            </AdminInfo>
          </AdminInfoWrapper>
        </div>
      </AdminHeaderContainer>
    </AdminHeaderWrapper>
  );
};

import React from "react";
import {
  ItemAction,
  ItemInfo,
  MyProfileWrapper,
  ProfileItemWrapper,
  LogoutWrapper,
} from "./styles";
import { ProfileItemProps, ProfileProps } from "../../../types";
import { DashboardTitleBG, TitleBG } from "../../../components";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";

export const Profile: React.FC<ProfileProps> = ({
  email,
  name,
  password,
  phone,
  username,
  onEdit,
}) => {
  const navigate = useNavigate();

  //for logout
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/profile")
  };

  return (
    <MyProfileWrapper>
      <h2>
        <TitleBG />
        <span>My Profile</span>
      </h2>
      <ProfileItem
        id="username"
        label="Username"
        value={username}
        isRequired
        onEdit={onEdit}
      />
      <ProfileItem id="name" label="Name" value={name} onEdit={onEdit} />
      <ProfileItem
        id="phone"
        label="Phone Number"
        value={phone}
        onEdit={onEdit}
      />
      <ProfileItem
        id="email"
        label="Email Address"
        onEdit={onEdit}
        value={email}
        isRequired
        isEditable
      />
      <ProfileItem
        id="password"
        onEdit={onEdit}
        label="Password"
        value={password}
        type="password"
      />
      {localStorage.getItem("auth") && (
        <LogoutWrapper>
          <Button onClick={handleLogout}>
            Logout
          </Button>
        </LogoutWrapper>
      )}
    </MyProfileWrapper>
  );
};

const ProfileItem: React.FC<ProfileItemProps> = ({
  id,
  label,
  type,
  value,
  isRequired,
  isEditable,
  onEdit,
}) => {
  return (
    <ProfileItemWrapper>
      <ItemInfo>
        <p>
          {label}
          {isRequired ? " * " : ""}
        </p>
        {type === "password" ? (
          <input type="password" readOnly value={value} />
        ) : (
          <span>{value}</span>
        )}
      </ItemInfo>
      {!isEditable && (
        <ItemAction onClick={onEdit ? () => onEdit(id) : () => {}}>
          {value ? "Edit" : "Add"}
        </ItemAction>
      )}
    </ProfileItemWrapper>
  );
};

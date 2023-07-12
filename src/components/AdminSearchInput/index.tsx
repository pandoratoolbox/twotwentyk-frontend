import React from "react";
import { AdminSearchInputWrapper, IconWrapper } from "./styles";
import { IconSearch } from "../Icons";

export const AdminSearchInput: React.FC<{
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  bg?: "grey" | "white";
}> = ({ onChange, value, bg = "grey" }) => {
  return (
    <AdminSearchInputWrapper bg={bg}>
      <IconWrapper>
        <IconSearch />
      </IconWrapper>
      <input
        type="text"
        placeholder="Search"
        onChange={onChange}
        value={value}
      />
    </AdminSearchInputWrapper>
  );
};

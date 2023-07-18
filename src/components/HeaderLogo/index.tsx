import React from "react";
import { HeaderLogoWrapper } from "./styles";
import { useNavigate } from "react-router-dom";

export const HeaderLogo: React.FC<{ noLink?: boolean }> = ({ noLink }) => {
  const navigate = useNavigate();
  return (
    <HeaderLogoWrapper
      onClick={noLink ? () => {} : () => navigate("/dashboard")}
    >
      <img src="/assets/logo.png" />
    </HeaderLogoWrapper>
  );
};

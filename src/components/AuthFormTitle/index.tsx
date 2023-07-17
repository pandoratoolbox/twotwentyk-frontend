import React from "react";
import { TitleBGWrapper, TitleWrapper } from "./styles";
import { TitleBG } from "../Icons";

export const AuthFormTitle: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return (
    <TitleWrapper>
      <TitleBGWrapper>
        <TitleBG />
      </TitleBGWrapper>
      <span>{children}</span>
    </TitleWrapper>
  );
};

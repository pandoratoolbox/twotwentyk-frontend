import React from "react";
import { LoaderContainer, LoaderSpin } from "./styles";

export const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <LoaderSpin />
    </LoaderContainer>
  );
};

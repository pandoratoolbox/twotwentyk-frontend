import React from "react";
import { ModalHeaderProps } from "../../types";

import { CloseButton, ModalHeaderWrapper } from "./styles";

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  onClose,
  bg,
  children,
}) => {
  return (
    <ModalHeaderWrapper bg={bg}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      {children}
    </ModalHeaderWrapper>
  );
};

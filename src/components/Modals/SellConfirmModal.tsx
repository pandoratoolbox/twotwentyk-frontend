import React from "react";
import { SellModalProps } from "../../types";
import { Modal as ModalWrapper } from "./Modal";
import { ButtonGroup, IconWrapper, SellConfirmModalWrapper } from "./styles";
import { IconConfirm } from "../Icons";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

export const SellConfirmModal: React.FC<SellModalProps> = ({
  open,
  onClose,
  onConfirm,
  isMarket,
  isOffer,
}) => {
  const navigate = useNavigate();

  return (
    <ModalWrapper open={open} onClose={onClose} width={365}>
      <SellConfirmModalWrapper>
        <IconWrapper>
          <IconConfirm />
        </IconWrapper>
        <p>
          {isOffer
            ? "Success! How will you know if accepted or denied message"
            : "Congratulations! Your card is now listed for sale"}
        </p>
        <ButtonGroup>
          <Button onClick={onConfirm}>Done</Button>
          {!isMarket && (
            <Button onClick={() => navigate("/marketplace")}>
              View In Marketplace
            </Button>
          )}
        </ButtonGroup>
      </SellConfirmModalWrapper>
    </ModalWrapper>
  );
};

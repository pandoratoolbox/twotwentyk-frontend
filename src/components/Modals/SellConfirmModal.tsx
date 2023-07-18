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
    <ModalWrapper open={open} onClose={onClose} width={407}>
      <SellConfirmModalWrapper>
        <IconWrapper>
          <img src="/assets/buy-success.png" alt="" />
        </IconWrapper>
        <h3>{isOffer ? "Success!" : "Congratulations!"}</h3>
        <p>
          {isOffer
            ? "You will be notified whether your offer is accepted or declined."
            : "Your card is now listed for sale"}
        </p>
        <ButtonGroup>
          <Button onClick={onClose}>Done</Button>
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

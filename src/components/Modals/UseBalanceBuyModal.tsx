import React from "react";
import { Modal as ModalWrapper } from "./Modal";
import { UseBalanceBuyModalProps } from "../../types";
import {
  BuyActionWrapper,
  IconWrapper,
  UseBalanceBuyModalWrapper,
} from "./styles";
import { IconCoinsLarge, IconPigMoney } from "../Icons";
import { Button } from "../Button";

export const UseBalanceBuyModal: React.FC<UseBalanceBuyModalProps> = ({
  price,
  onClose,
  onBuyClick,
  open,
}) => {
  return (
    <ModalWrapper onClose={onClose} open={open} width={351}>
      <UseBalanceBuyModalWrapper>
        <IconWrapper>
          <IconCoinsLarge />
        </IconWrapper>
        <p>Your account balance is:</p>
        <h3>
          $1.325.00 <span>USD</span>
        </h3>
        <BuyActionWrapper>
          <div className="current-price">
            <h5>Current price:</h5>
            <div>
              <h4>${price} USD</h4>
              <span onClick={onClose}>View details</span>
            </div>
          </div>
          <Button className="buy-button" onClick={onBuyClick}>
            Buy
          </Button>
        </BuyActionWrapper>
      </UseBalanceBuyModalWrapper>
    </ModalWrapper>
  );
};

import React, {useState, useEffect} from "react";
import { Modal as ModalWrapper } from "./Modal";
import { UseBalanceBuyModalProps } from "../../types";
import {
  BalanceBuyConfirmModalWrapper,
  BuyActionWrapper,
  IconWrapper,
  UseBalanceBuyModalWrapper,
} from "./styles";
import { IconCoinsLarge, IconPigMoney } from "../Icons";
import { Button } from "../Button";
import { useMyInfoContext } from "../../context";

export const UseBalanceBuyModal: React.FC<UseBalanceBuyModalProps> = ({
  price,
  onClose,
  onBuyClick,
  open,
}) => {
  const [balance, setBalance] = useState<number>(0)
  const {myInfoContext} = useMyInfoContext()
  useEffect(() => {
    setBalance(myInfoContext?.balance ? myInfoContext?.balance / 100 : 0);
  }, [myInfoContext]);

  return (
    <ModalWrapper onClose={onClose} open={open} width={351}>
      <UseBalanceBuyModalWrapper>
        <IconWrapper>
          <IconCoinsLarge />
        </IconWrapper>
        <p>Your account balance is:</p>
        <h3>
          ${balance} <span>USD</span>
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

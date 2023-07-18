import React from "react";
import { Modal as ModalWrapper } from "./Modal";
import { IconWrapper, WithdrawConfirmModalWrapper } from "./styles";
import { WithdrawConfirmModalProps } from "../../types";
import { IconWarning, IconWithdraw } from "../Icons";
import { Button } from "../Button";
import { Link } from "react-router-dom";

export const WithdrawConfirmModal: React.FC<WithdrawConfirmModalProps> = ({
  onClose,
  status,
  open,
}) => {
  return (
    <ModalWrapper onClose={onClose} open={open} width={407}>
      <WithdrawConfirmModalWrapper>
        {status === "success" ? (
          <IconWrapper>
            <img src="/assets/success.png" alt="" />{" "}
          </IconWrapper>
        ) : (
          <img src="/assets/sorry.png" alt="" />
        )}

        {status === "success" ? <h3>Success</h3> : <h3>Sorry!</h3>}
        <p>
          {status === "success" ? (
            "Your withdrawal request has been submitted. Please allow up to 72 hours for processing"
          ) : (
            <>
              We are sorry, the withdrawal couldn’t be processed at this time,
              please try again in a few minutes or{" "}
              <Link to={"/contact-support"}>Contact Support</Link>.
            </>
          )}
        </p>
        <Button onClick={onClose} className="confirm-button">
          {status === "success" ? "Done" : "Ok"}
        </Button>
      </WithdrawConfirmModalWrapper>
    </ModalWrapper>
  );
};

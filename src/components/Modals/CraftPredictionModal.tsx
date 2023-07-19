import React, { useEffect, useState } from "react";
import { CraftPredictionModalProps } from "../../types";
import { Modal as ModalWrapper } from "./Modal";
import {
  ButtonGroup,
  Checkbox,
  CheckboxWrapper,
  CraftPredictionModalWrapper,
} from "./styles";
import { Button } from "../Button";

export const CraftPredictionModal: React.FC<CraftPredictionModalProps> = ({
  open,
  onClose,
  onBurn,
}) => {
  useEffect(() => {
    setChecked(false);
  }, [open]);

  const [checked, setChecked] = useState(false);
  return (
    <ModalWrapper open={open} onClose={onClose} width={400}>
      <CraftPredictionModalWrapper>
        <h3>
          Your Identity and Trigger cards will be turned to ash to craft this
          Prediction
        </h3>
        <ButtonGroup>
          <CheckboxWrapper>
            <Checkbox>
              <input
                id={"crafting"}
                type="checkbox"
                value={"crafting"}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <label htmlFor={"crafting"}></label>
            </Checkbox>
            <span>
              Creating this Identity will burn all selected cards. This process
              is irreversible.
            </span>
          </CheckboxWrapper>

          <Button disabled={!checked} onClick={onBurn}>
            Burn
          </Button>
          <Button variant={"outlined"}>Back</Button>
        </ButtonGroup>
      </CraftPredictionModalWrapper>
    </ModalWrapper>
  );
};

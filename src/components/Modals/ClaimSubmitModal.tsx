import { useState, useEffect } from "react";
import { ClaimModalProps } from "../../types";
import { Modal as ModalWrapper } from "./Modal";
import { ButtonGroup, IconWrapper, ClaimModalWrapper } from "./styles";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { PredictionModalCard } from "../PredictionCard/PredictionModalCard";

export const ClaimSubmitModal: React.FC<ClaimModalProps> = ({
  open,
  onClose,
  cardPrediction,
  handleClaim
}) => {
  const [triggerId, setTriggerId] = useState(cardPrediction?.nft_card_triggers && cardPrediction.nft_card_triggers?.length > 0 && cardPrediction.nft_card_triggers[0]?.id ? cardPrediction.nft_card_triggers[0].id : -1)

  const handleSubmitButton = () => {
    console.log(triggerId, cardPrediction)
    if (cardPrediction?.id && triggerId !== -1) handleClaim(cardPrediction.id, triggerId)
    onClose()
  }

  return (
    <>
      {cardPrediction?.nft_card_triggers && cardPrediction.nft_card_triggers?.length > 0 && <ModalWrapper open={open} onClose={onClose}>
        <ClaimModalWrapper>
          <div>
            <h3>Submit Claim</h3>
            <p>
              {cardPrediction.nft_card_triggers?.length > 1
                ? "Your identity has multiple Triggers. Pick the one you would like to claim."
                : `You are submitting a claim of ${cardPrediction.nft_card_triggers[0].id} for this Prediction`}
            </p>
          </div>
          {cardPrediction.nft_card_triggers?.length > 1 && cardPrediction.nft_card_triggers?.map((nftCardTrigger, key) => <>
            <PredictionModalCard nftCardTrigger={nftCardTrigger} triggerId={triggerId} key={`${nftCardTrigger.id}`} setTriggerId={setTriggerId} index={key + 1} />
          </>)}
          <div>

          </div>
          <ButtonGroup>
            <Button onClick={handleSubmitButton}>{cardPrediction.nft_card_triggers?.length > 1 ? "Submit" : "Confirm"}</Button>
            {cardPrediction.nft_card_triggers?.length < 2 && (
              <Button onClick={() => onClose()} variant="outlined">
                Cancel
              </Button>
            )}
          </ButtonGroup>
        </ClaimModalWrapper>
      </ModalWrapper>}
    </>
  );
};

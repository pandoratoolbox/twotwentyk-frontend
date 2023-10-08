import { useState, useEffect, useRef } from "react";
import { ClaimModalProps } from "../../types";
import { Modal as ModalWrapper } from "./Modal";
import { ButtonGroup, ClaimModalWrapper } from "./styles";
import { Button } from "../Button";
import { PredictionModalCard } from "../PredictionCard/PredictionModalCard";
import { submitClaim } from "../../actions";

export const ClaimSubmitModal: React.FC<ClaimModalProps> = ({
  open,
  onClose,
  cardPrediction
}) => {
  const [triggerId, setTriggerId] = useState(-1);
  const [isClaimSubmitted, setIsClaimSubmitted] = useState(false);
  const [readyConfirmed, setReadyConfirmed] = useState(false);
  const [message, setMessage] = useState('');
  const [claimStatus, setClaimStatus] = useState('');
  const apiRef = useRef(false)

  useEffect(() => {
    if (cardPrediction?.nft_card_triggers && cardPrediction.nft_card_triggers?.length === 1 && cardPrediction.nft_card_triggers[0]?.id) {
      setTriggerId(cardPrediction.nft_card_triggers[0].id);
      setReadyConfirmed(true);
    }
  }, [cardPrediction])

  const handleClaim = async (predictionId: number, triggerId: number) => {
    if (apiRef.current) return;
    apiRef.current = true;
    const res = await submitClaim(predictionId, triggerId);
    apiRef.current = false;
    if (res.success) {
      setClaimStatus("Claim Submitted");
      setMessage("Your claim was submitted successfully, and will be reviewed shortly.");
    } else {
      setClaimStatus("Claim Failed");
      setMessage("You claim was not submitted. Please try again");
    }
    setIsClaimSubmitted(true);
  }

  const handleSubmitButton = () => {
    if (cardPrediction?.id && triggerId !== -1) {
      handleClaim(cardPrediction.id, triggerId);
    }
  }

  return (
    <>
      {cardPrediction?.nft_card_triggers && cardPrediction.nft_card_triggers?.length > 1 && !readyConfirmed && <ModalWrapper open={open} onClose={onClose}>
        <ClaimModalWrapper>
          <div>
            <h3>Submit Claim</h3>
            <p>
              Your identity has multiple Triggers. Pick the one you would like to claim.
            </p>
          </div>
          {cardPrediction.nft_card_triggers?.length > 1 && <div className="prediction-modal-card-wrapper">
            {cardPrediction.nft_card_triggers?.map((nftCardTrigger, key) =>
              <PredictionModalCard nftCardTrigger={nftCardTrigger} triggerId={triggerId} key={`${nftCardTrigger.id}`} setTriggerId={setTriggerId} index={key + 1} />)}
          </div>}
          <div>

          </div>
          <ButtonGroup>
            <Button onClick={() => setReadyConfirmed(true)}>Submit</Button>
          </ButtonGroup>
        </ClaimModalWrapper>
      </ModalWrapper>}
      {cardPrediction?.nft_card_triggers && cardPrediction.nft_card_triggers?.length > 0 && triggerId !== -1 && readyConfirmed && <ModalWrapper open={open} onClose={onClose} width={391}>
        <ClaimModalWrapper>
          <div>
            <h3>{isClaimSubmitted ? claimStatus : "Submit Claim"}</h3>
            <p>
              {isClaimSubmitted
                ? message
                : `You are submitting a claim of ${cardPrediction.nft_card_triggers.find((value) => value.id === triggerId)?.trigger} for this Prediction`}
            </p>
          </div>
          <ButtonGroup>
            {isClaimSubmitted && <Button onClick={() => onClose()}>Done</Button>}
            {!isClaimSubmitted && (<>
              <Button onClick={handleSubmitButton}>Confirm</Button>
              <Button onClick={() => onClose()} variant="outlined">
                Cancel
              </Button>
            </>
            )}
          </ButtonGroup>
        </ClaimModalWrapper>
      </ModalWrapper>}
    </>
  );
};

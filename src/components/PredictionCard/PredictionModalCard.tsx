import { INftCardTrigger } from "../../models/nft_card_trigger";
import { PredictionModalCardWrapper } from "./styles";
import {

  CardBottomWrapper,

  PredictionCardWrapper,

} from "./styles";
import {
  CardModalOverlayWrapper,
} from "../DateCard/styles";
import { CardImgWrapper, Rarity } from "../MarketCard/styles";
const image = "/assets/nfts/new4.png";

export const PredictionModalCard: React.FC<{ nftCardTrigger: INftCardTrigger; triggerId: number; index: number; setTriggerId: (value: number) => void }> = ({
  nftCardTrigger, triggerId, setTriggerId, index
}) => {
  const handleClick = () => {
    if (nftCardTrigger?.id) {
      if (triggerId === nftCardTrigger.id) setTriggerId(-1)
      else setTriggerId(nftCardTrigger.id)
    }
  }
  return (
    <PredictionModalCardWrapper onClick={handleClick}>
      <h3 className="prediction-trigger">Trigger {index}</h3>
      <PredictionCardWrapper
        cardType="prediction"
        bg={image}
      >
        <CardImgWrapper>
          <img src={image} alt="nft" />
          <>
            {nftCardTrigger.rarity === 0 && <Rarity>Common</Rarity>}
            {nftCardTrigger.rarity === 1 && <Rarity>Uncommon</Rarity>}
            {nftCardTrigger.rarity === 2 && <Rarity>Rare</Rarity>}
          </>
        </CardImgWrapper>
        <CardBottomWrapper>{nftCardTrigger.owner_id}</CardBottomWrapper>
        {triggerId === nftCardTrigger.id && <CardModalOverlayWrapper />}
      </PredictionCardWrapper>
    </PredictionModalCardWrapper>
  )

};

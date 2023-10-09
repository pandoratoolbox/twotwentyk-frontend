import { useState, useEffect, useRef } from "react";
import { Modal as ModalWrapper } from "./Modal";
import { ButtonGroup, CancelListingModalWrapper, IdentityInfoWrapper } from "./styles";
import { Button } from "../Button";
import { PredictionModalCard } from "../PredictionCard/PredictionModalCard";
import { submitClaim } from "../../actions";
import { IconArrowDown1, IconConfirmBlue } from "../Icons";
import { INftCardIdentity } from "../../models/nft_card_identity";
import { INftCardPrediction } from "../../models/nft_card_prediction";
import { ICardPack } from "../../models/card_pack";
const image = "/assets/nfts/new2.png";
export const CancelListingModal: React.FC<{ open: boolean; onClose: () => void; nftCard: INftCardIdentity | INftCardPrediction | ICardPack; cardType: "Identity" | "Prediction" | "Card Pack" }> = ({
    open,
    onClose,
    nftCard,
    cardType
}) => {

    const [isContinue, setIsContinue] = useState(false)
    const [isCancel, setIsCancel] = useState(false)
    const [confirm, setConfirm] = useState(false)

    const handleClose = () => {
        setIsContinue(false)
        setIsCancel(false)
        setConfirm(false)
        onClose()
    }

    return (
        <>
            <ModalWrapper open={open} onClose={handleClose} width={isContinue && !isCancel ? 717 : 391} paddingClass={`${isContinue && !isCancel ? "smallPadding" : ""}`}>
                {!isContinue && <SaleNotification continueSale={() => setIsContinue(true)} cardType={cardType} />}
                {isContinue && !isCancel && <NftCardInfo cancelListing={() => setIsCancel(true)} nftCard={nftCard} cardType={cardType} />}
                {isCancel && !confirm && <CancelListing onCancelListing={() => setConfirm(true)} />}
                {confirm && <Confirm onConfirm={handleClose} />}
            </ModalWrapper>
        </>
    );
};

const SaleNotification = ({ continueSale, cardType }: { continueSale: () => void; cardType: string }) => {
    return (
        <CancelListingModalWrapper>
            <div>
                <h3>{cardType} for Sale</h3>
                <p className="bold">
                    This item is currently for sale in the marketplace, are you sure you want to open this pack?
                </p>
                <p>
                    If you continue, the card will be removed from the marketplace.
                </p>
            </div>
            <ButtonGroup>
                <Button onClick={() => continueSale()}>Continue</Button>
            </ButtonGroup>
        </CancelListingModalWrapper>
    )
}

const CancelListing = ({ onCancelListing }: { onCancelListing: () => void }) => {
    return (
        <CancelListingModalWrapper>
            <div>
                <h3>Cancel Listing</h3>
                <p className="bold">
                    Are you sure you want to cancel this listing?
                </p>
            </div>
            <ButtonGroup>
                <Button onClick={() => onCancelListing()}>Confirm</Button>
            </ButtonGroup>
        </CancelListingModalWrapper>
    )
}

const Confirm = ({ onConfirm }: { onConfirm: () => void }) => {
    return (
        <CancelListingModalWrapper>
            <div>
                <IconConfirmBlue />
                <p className="bold">
                    Success! Your identity is no longer listed for sale
                </p>
            </div>
            <ButtonGroup>
                <Button onClick={() => onConfirm()}>Done </Button>
            </ButtonGroup>
        </CancelListingModalWrapper>
    )
}

const NftCardInfo = ({ cancelListing, nftCard, cardType }: { cancelListing: () => void, nftCard: INftCardIdentity | INftCardPrediction | ICardPack; cardType: "Identity" | "Prediction" | "Card Pack" }) => {

    return <IdentityInfoWrapper>
        <div className="image-container">
            <img src={image} alt="" />
        </div>
        <div className="splitter"></div>
        <div className="identity-info">
            <h3 className="title">
                {cardType.toUpperCase()} FOR SALE
            </h3>
            <div className="contents-wrapper">
                {cardType === "Identity" && <IdentityContent nftCard={nftCard as INftCardIdentity} />}
                {cardType === "Prediction" && <PredictionContent nftCard={nftCard as INftCardPrediction} />}
                {cardType === "Card Pack" && <CardPackContent nftCard={nftCard as ICardPack} />}
            </div>
            <div className="listing-price">
                <div className="current-price">Current listing Price</div>
                <div>{nftCard.card_series?.cost_usd?.toString()} USD</div>
            </div>
            <ButtonGroup>
                <Button onClick={() => cancelListing()}>Cancel Listing</Button>
            </ButtonGroup>
        </div>
    </IdentityInfoWrapper>
}

const IdentityContent = ({ nftCard }: { nftCard: INftCardIdentity }) => {
    return (
        <>
            <h4>{nftCard?.celebrity_name ?? ""}</h4>
            <div className="property">
                <span>Properties</span>
                <IconArrowDown1 />
            </div>
            <div className="contents">
                <div className="content-row">
                    <span className="key">
                        Day/Month
                    </span>
                    <span>
                        {`${nftCard?.day ?? " "}/${nftCard?.month ?? " "}`}
                    </span>
                </div>
                <div className="content-row">
                    <span className="key">
                        Year
                    </span>
                    <span>
                        {nftCard?.year ?? ""}
                    </span>
                </div>
                <div className="content-row">
                    <span className="key">
                        Category
                    </span>
                    <span>
                        {nftCard?.category ?? ""}
                    </span>
                </div>
                <div className="content-row">
                    <span className="key">
                        Collection
                    </span>
                    <span>
                        {nftCard.card_series?.card_collection?.name ?? ""}
                    </span>
                </div>
            </div>
        </>)
}

const PredictionContent = ({ nftCard }: { nftCard: INftCardPrediction }) => {
    return (
        <>
            <h4>{nftCard?.celebrity_name ?? ""}</h4>
            <div className="property">
                <span>Properties</span>
                <IconArrowDown1 />
            </div>
            <div className="contents">
                <div className="content-row">
                    <span className="key">
                        Rarity
                    </span>
                    <span>
                        {nftCard.rarity === 0 ? "Common" : nftCard.rarity === 1 ? "Uncommon" : "Rare"}
                    </span>
                </div>
                {nftCard?.nft_card_triggers?.length && nftCard.nft_card_triggers.map((value) => <div className="content-row" key={value.id}>
                    <span className="key">
                        {value?.tier ?? ""}
                    </span>
                    <span>
                        {value?.trigger ?? ""}
                    </span>
                </div>)}
                <div className="content-row">
                    <span className="key">
                        Collection
                    </span>
                    <span>
                        {nftCard.card_series?.card_collection?.name ?? ""}
                    </span>
                </div>
            </div>
        </>)
}

const CardPackContent = ({ nftCard }: { nftCard: ICardPack }) => {
    const cardsLength = Object.values(nftCard?.cards ?? {}).reduce((prev, value) => (prev + (value?.length ? value.length : 0)), 0)

    return (
        <>
            <div className="property">
                <span>Properties</span>
                <IconArrowDown1 />
            </div>
            <div className="contents">
                <div className="content-row">
                    <span className="key">
                        Cards
                    </span>
                    <span>
                        {cardsLength}
                    </span>
                </div>
                <div className="content-row">
                    <span className="key">
                        Collection
                    </span>
                    <span>
                        {nftCard.card_series?.card_collection?.name ?? ""}
                    </span>
                </div>
            </div>
        </>)
}
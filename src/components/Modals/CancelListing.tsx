import { useState, useEffect, useRef } from "react";
import { Modal as ModalWrapper } from "./Modal";
import { ButtonGroup, CancelListingModalWrapper, IdentityInfoWrapper } from "./styles";
import { Button } from "../Button";
import { PredictionModalCard } from "../PredictionCard/PredictionModalCard";
import { submitClaim } from "../../actions";
import { IconArrowDown1, IconConfirmBlue } from "../Icons";
import { INftCardIdentity } from "../../models/nft_card_identity";
const image = "/assets/nfts/new2.png";
export const CancelListingModal: React.FC<{ open: boolean; onClose: () => void; identityNft: INftCardIdentity }> = ({
    open,
    onClose,
    identityNft
}) => {

    const [isContinue, setIsContinue] = useState(false)
    const [isCancel, setIsCancel] = useState(false)
    const [confirm, setConfirm] = useState(false)

    return (
        <>
            <ModalWrapper open={open} onClose={onClose} width={isContinue && !isCancel ? 717 : 391}>
                {!isContinue && <SaleNotification continueSale={() => setIsContinue(true)} />}
                {isContinue && !isCancel && <IdentityInfo cancelListing={() => setIsCancel(true)} identityNft={identityNft} />}
                {isCancel && !confirm && <CancelListing onCancelListing={() => setConfirm(true)} />}
                {confirm && <Confirm onConfirm={() => onClose()} />}
            </ModalWrapper>
        </>
    );
};

const SaleNotification = ({ continueSale }: { continueSale: () => void }) => {
    return (
        <CancelListingModalWrapper>
            <div>
                <h3>Identity for Sale</h3>
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

const IdentityInfo = ({ cancelListing, identityNft }: { cancelListing: () => void, identityNft: INftCardIdentity }) => {
    
    return <IdentityInfoWrapper>
        <div className="image-container">
            <img src={image} alt="" />
        </div>
        <div className="splitter"></div>
        <div className="identity-info">
            <h3 className="title">
                IDENTITY FOR SALE
            </h3>
            <div className="contents-wrapper">
                <h4>{identityNft?.celebrity_name ?? ""}</h4>
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
                            {`${identityNft?.day ?? " "}/${identityNft?.month ?? " "}`}
                        </span>
                    </div>
                    <div className="content-row">
                        <span className="key">
                            Year
                        </span>
                        <span>
                            {identityNft?.year ?? ""}
                        </span>
                    </div>
                    <div className="content-row">
                        <span className="key">
                            Category
                        </span>
                        <span>
                            {identityNft?.category ?? ""}
                        </span>
                    </div>
                    <div className="content-row">
                        <span className="key">
                            Collection
                        </span>
                        <span>
                            {identityNft.card_series?.card_collection?.name ?? ""}
                        </span>
                    </div>
                </div>
            </div>
            <div className="listing-price">
                <div className="current-price">Current listing Price</div>
                <div>{identityNft.card_series?.cost_usd?.toString()} USD</div>
            </div>
            <ButtonGroup>
                <Button onClick={() => cancelListing()}>Cancel Listing</Button>
            </ButtonGroup>
        </div>
    </IdentityInfoWrapper>
}
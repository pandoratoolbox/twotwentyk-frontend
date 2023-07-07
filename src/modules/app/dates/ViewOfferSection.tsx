import React from "react";
import { ViewDateCardProps } from "../../../types";
import {
  ButtonGroup,
  CardRarity,
  CloseButton,
  OfferButton,
  OfferPreviewCard,
  PreviewCardWrapper,
  PropertiesContent,
  PropertiesHeader,
  PropertiesWrapper,
  PropertyItem,
  SetPriceWrapper,
  ViewDateCardContainer,
  ViewDateCardWrapper,
  ViewOfferInfoWrapper,
} from "./styles";
import { IconArrowDown } from "../../../components";
import { useMyOfferContext } from "../../../context";

export const ViewOfferSection: React.FC<ViewDateCardProps> = ({
  isView,
  item,
  onClose,
}) => {
  const { myOfferContext, setMyOfferContext } = useMyOfferContext();
  const handleAccept = () => {
    const tempData = myOfferContext.map((offer: any) => {
      if (Number(offer.id) === Number(item.id)) {
        return { ...offer, status: 1 };
      } else {
        return offer;
      }
    });
    setMyOfferContext(tempData);
    onClose();
  };

  const handleDeny = () => {
    onClose();
    const tempData = myOfferContext.map((offer: any) => {
      if (Number(offer.id) === Number(item.id)) {
        return { ...offer, status: 2 };
      } else {
        return offer;
      }
    });
    setMyOfferContext(tempData);
  };
  return (
    <ViewDateCardWrapper isview={isView ? "true" : undefined}>
      <ViewDateCardContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>View Offer</h2>
        <SetPriceWrapper>
          <ViewOfferInfoWrapper>
            <div>
              <b>By {item.buyer}</b>
              <p>{new Date(item.date).toLocaleDateString()}</p>
            </div>
            <h1>$1,000 USD</h1>
          </ViewOfferInfoWrapper>
        </SetPriceWrapper>
        <PreviewCardWrapper style={{ marginTop: "36px" }}>
          <OfferPreviewCard bg={item?.image}>
            <CardRarity>Rare</CardRarity>
          </OfferPreviewCard>
        </PreviewCardWrapper>
        <PropertiesWrapper>
          <PropertiesHeader>
            <span>Card Properties</span>
            <IconArrowDown />
          </PropertiesHeader>
          <PropertiesContent>
            <PropertyItem>
              <p>Rarity</p>
              <span>Rare</span>
            </PropertyItem>
            <PropertyItem>
              <p>Type</p>
              <span>Year</span>
            </PropertyItem>
            <PropertyItem>
              <p>Year</p>
              <span>2023</span>
            </PropertyItem>
            <PropertyItem>
              <p>Collection</p>
              <span>Sports Series</span>
            </PropertyItem>
          </PropertiesContent>
        </PropertiesWrapper>
        <ButtonGroup>
          <OfferButton onClick={handleAccept}>Accept</OfferButton>
          <OfferButton className="deny" onClick={handleDeny}>
            Deny
          </OfferButton>
        </ButtonGroup>
      </ViewDateCardContainer>
    </ViewDateCardWrapper>
  );
};

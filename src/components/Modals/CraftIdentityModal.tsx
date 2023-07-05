import React from "react";
import { SellModalProps } from "../../types";
import { Modal as ModalWrapper } from "./Modal";
import { ModalHeader } from "./ModalHeader";

import {
  ButtonGroup,
  CraftIdentifyModalWrapper,
  CraftIdentifyModalHeader,
  CardsWrapper,
  CardGridWrapper,
  CraftingCardWrapper,
  CraftCard,
  Checkbox,
  CheckboxWrapper,
} from "./styles";
import { SelectBox } from "../SelectBox";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

const matchingIdentityOptions = [
  {
    label: "Conception",
    value: "conception",
  },
];

const nftData = [
  {
    id: 12,
    rarity: 0,
    image: "",
    name: "",
    is_crafted: false,
    day: 0,
    month: 0,
    year: 0,
  },
  {
    id: 13,
    rarity: 0,
    image: "",
    name: "",
    is_crafted: false,
    day: 0,
    month: 0,
    year: 0,
  },
  {
    id: 14,
    rarity: 0,
    image: "",
    name: "",
    is_crafted: false,
    day: 0,
    month: 0,
    year: 0,
  },
];

export const CraftIdentityModal: React.FC<SellModalProps> = ({
  open,
  onClose,
  isMarket,
  isOffer,
}) => {
  const navigate = useNavigate();

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      width={510}
      modalHeader={true}
      paddingClass="removePadding"
    >
      <ModalHeader bg={"#F2F5FF"} onClose={onClose}>
        <CraftIdentifyModalHeader>
          <p>Would you like to assign a name to your Identity?</p>
          <SelectBox
            options={matchingIdentityOptions}
            placeholder="Select matching Identity"
          />
        </CraftIdentifyModalHeader>
      </ModalHeader>
      <CardsWrapper>
        <CardGridWrapper>
          {nftData &&
            nftData.map((item, key) => (
              <CraftingCardWrapper key={key}>
                <CraftCard onClick={() => {}} bg={item.image}>
                  {item?.rarity === 0 && <span>Common</span>}
                  {item?.rarity === 1 && <span>Uncommon</span>}
                  {item?.rarity === 2 && <span>Rare</span>}
                  <p>{item?.name ? item?.name : "Crafting"}</p>
                </CraftCard>
              </CraftingCardWrapper>
            ))}
        </CardGridWrapper>
        <h3>Your cards will be sliced and diced to create this Identity.</h3>
      </CardsWrapper>
      <CraftIdentifyModalWrapper>
        <ButtonGroup>
          <CheckboxWrapper>
            <Checkbox>
              <input id={"crafting"} type="checkbox" value={"crafting"} />
              <label htmlFor={"crafting"}></label>
            </Checkbox>
            <span>
              Creating this Identity will burn all selected cards. This process
              is irreversible.
            </span>
          </CheckboxWrapper>

          <Button disabled={true}>Craft Identify</Button>
          <Button variant={"outlined"}>No Thanks</Button>
        </ButtonGroup>
      </CraftIdentifyModalWrapper>
    </ModalWrapper>
  );
};

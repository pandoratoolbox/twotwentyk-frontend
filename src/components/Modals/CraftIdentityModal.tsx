import React, { useEffect, useState } from "react";
import { CraftIdentityModalProps, SellModalProps } from "../../types";
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
import { useCelebritiesContext, useMonthContext } from "../../context";
import { ICelebrity } from "../../models/celebrity";

const matchingIdentityOptions = [
  {
    label: "Conception",
    value: "conception",
  },
];

export const CraftIdentityModal: React.FC<CraftIdentityModalProps> = ({
  open,
  onClose,
  onCraft,
  selectedCards,
  selectCelebrity
}) => {
  const { monthContext } = useMonthContext();
  const { celebritiesContext } = useCelebritiesContext();

  const navigate = useNavigate();

  const [checked, setChecked] = useState<boolean>(false);
  const [matches, setMatches] = useState<ICelebrity[]>([]);

  const chooseCelebrity = (v: string | string[]) => {
    let c = (celebritiesContext as Map<number,ICelebrity>).get(Number(v))
    if (c) {
      selectCelebrity(c);
    }
  }

  useEffect(() => {
    setChecked(false);
    let celebrities: ICelebrity[] = [];
    if (celebritiesContext) {
      Array.from<[number, ICelebrity]>(celebritiesContext).map(([key, value]) => {
        if (
          value.birth_year === selectedCards.year?.year &&
          value.birth_day === selectedCards.dayMonth?.day &&
          value.birth_month === selectedCards.dayMonth?.month &&
          value.category === selectedCards.category?.category
        )
          celebrities.push(value);
      });
    }
    setMatches(celebrities);
  }, [open]);
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
            options={matches.map(v => {return {label: v.name, value: String(v.id)}})}
            placeholder="Select matching Identity"
            onChange={chooseCelebrity}
          />
        </CraftIdentifyModalHeader>
      </ModalHeader>
      {monthContext && (
        <CardsWrapper>
          <CardGridWrapper>
            <CraftingCardWrapper key={"dayMonth"}>
              <CraftCard onClick={() => {}} bg={"/assets/nfts/2.png"}>
                {selectedCards.crafting?.rarity === 0 && <span>Common</span>}
                {selectedCards.crafting?.rarity === 1 && <span>Uncommon</span>}
                {selectedCards.crafting?.rarity === 2 && <span>Rare</span>}
                <p>
                  {selectedCards.dayMonth?.day}{" "}
                  {(monthContext as Map<number, string>).get(
                    selectedCards.dayMonth?.month
                      ? selectedCards.dayMonth?.month
                      : 1
                  )}
                </p>
              </CraftCard>
            </CraftingCardWrapper>
            <CraftingCardWrapper key={"year"}>
              <CraftCard onClick={() => {}} bg={"/assets/nfts/2.png"}>
                {selectedCards.year?.rarity === 0 && <span>Common</span>}
                {selectedCards.year?.rarity === 1 && <span>Uncommon</span>}
                {selectedCards.year?.rarity === 2 && <span>Rare</span>}
                <p>{selectedCards.year?.year}</p>
              </CraftCard>
            </CraftingCardWrapper>
            <CraftingCardWrapper key={"category"}>
              <CraftCard onClick={() => {}} bg={"/assets/nfts/2.png"}>
                {selectedCards.category?.rarity === 0 && <span>Common</span>}
                {selectedCards.category?.rarity === 1 && <span>Uncommon</span>}
                {selectedCards.category?.rarity === 2 && <span>Rare</span>}
                <p>{selectedCards.category?.category}</p>
              </CraftCard>
            </CraftingCardWrapper>
          </CardGridWrapper>
          <h3>Your cards will be sliced and diced to create this Identity.</h3>
        </CardsWrapper>
      )}
      <CraftIdentifyModalWrapper>
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

          <Button disabled={!checked} onClick={onCraft}>
            Craft Identity
          </Button>
          <Button variant={"outlined"} onClick={onClose}>
            No Thanks
          </Button>
        </ButtonGroup>
      </CraftIdentifyModalWrapper>
    </ModalWrapper>
  );
};

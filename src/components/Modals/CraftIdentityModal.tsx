import React, { useEffect, useState } from "react";
import { CraftIdentityModalProps, SelectBoxProps, SelectOptionProps, SellModalProps } from "../../types";
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
import { SelectOption } from "../SelectBox/SelectOption";

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

  // const navigate = useNavigate();

  const [checked, setChecked] = useState<boolean>(false);
  const [matches, setMatches] = useState<ICelebrity[]>([]);
const [optionSelected, setOptionSelected] = useState<boolean>(false)
const [clearSelect, setClearSelect] = useState<boolean>(false);

  const chooseCelebrity = (v: SelectOptionProps) => {
    if (v.value === "0") {
      selectCelebrity(null);
      setOptionSelected(true);
    }

    let c = (celebritiesContext as Map<number,ICelebrity>).get(Number(v.value))
    if (c) {
      selectCelebrity(c);
      setOptionSelected(true);
    }
  }


  useEffect(() => {
    setChecked(false);
    setOptionSelected(false);

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


  const [options, setOptions] = useState<{
    label: string;
    value: string;
  }[]>([])

  useEffect(() => {
    setOptions([{label: "None", value: "0"}, ...matches.map(v => {return {label: v.name, value: String(v.id)}})])
  }, [matches])

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
          <SelectOption
            options={options}
            placeholder="Select matching Identity"
            onSelect={chooseCelebrity}
            clear={clearSelect}
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
          {matches.length > 0 && !optionSelected && <h3>Please select a matching Identity from the list.</h3>}
          {matches.length > 0 && optionSelected && <h3>Your cards will be sliced and diced to create this Identity.</h3>}
          {matches.length === 0 && <h3>There are no matching identities for the selected combination of cards therefore is it not possible to craft.</h3>}
        </CardsWrapper>
      )}
      <CraftIdentifyModalWrapper>
        <ButtonGroup>
          <CheckboxWrapper>
            <Checkbox>
              <input
                id={"crafting"}
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <label htmlFor={"crafting"}></label>
            </Checkbox>
            <span>
              Creating this Identity will burn all selected cards. This process
              is irreversible.
            </span>
          </CheckboxWrapper>

          <Button disabled={!checked || !optionSelected || matches.length === 0} onClick={onCraft}>
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

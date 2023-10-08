import React, {useState, useEffect} from "react";
import { FilterGroupWrapper, FilterSectionWrapper, SortButton } from "./styles";
import { IconSort, SelectBox } from "../../../components";
import { SelectOptionProps, collectionOption } from "../../../types";
import {
  useAllRaritiesContext,
  useStatusContext,
} from "../../../context";

export const CraftingFilterSection: React.FC<{
  onClick: (filterType: string, selectedOptions: string[]) => void;
}> = ({ onClick }) => {
  const { allRaritiesContext } = useAllRaritiesContext();
  const { statusContext } = useStatusContext();

  const [optionsStatus, setOptionsStatus] = useState<SelectOptionProps[]>([]);
  const [optionsRarities, setOptionsRarities] = useState<SelectOptionProps[]>([]);
  const [optionsCollection, setOptionsCollection] = useState<SelectOptionProps[]>([]);
  const [optionsCardTypes, setOptionsCardTypes] = useState<SelectOptionProps[]>([]);

  useEffect(() => {
    if (statusContext && allRaritiesContext && collectionOption ) {
      setOptionsStatus(Array.from((statusContext as Map<number, {id: number, name: string}>).values()).map(v => {
        return {checked: false, value: v.id.toString(), label: v.name}
      }))

      setOptionsRarities(Array.from((allRaritiesContext as Map<number, {id: number, name: string}>).values()).map(v => {
        return {checked: false, value: v.id.toString(), label: v.name}
      }))

      setOptionsCollection(Array.from((collectionOption as Map<number, {id: number, name: string}>).values()).map(v => {
        return {checked: false, value: v.id.toString(), label: v.name}
      }))
    }
  }, [statusContext, allRaritiesContext, collectionOption ])

  return (
    <FilterSectionWrapper>
      <p>Filter traits</p>
      <FilterGroupWrapper>
        <SelectBox
          onClick={onClick}
          options={optionsCollection}
          placeholder="Collections"
        />
        <SelectBox
          isFilter
          options={optionsRarities}
          placeholder="All Rarities"
          onClick={onClick}
        />
        <SelectBox
          isFilter
          options={optionsStatus}
          placeholder="Status"
          onClick={onClick}
        />
        <SortButton>
          <IconSort />
        </SortButton>
      </FilterGroupWrapper>
    </FilterSectionWrapper>
  );
};

import React, { useEffect, useState } from "react";
import { FilterGroupWrapper, FilterSectionWrapper, SortButton } from "./styles";
import { IconSort, SelectBox } from "../../../components";
import {
  useCategoriesContext,
  useAllRaritiesContext,
  useStatusContext,
} from "../../../context";
import { SelectOptionProps, collectionOption } from "../../../types";

export const CategoryFilterSection: React.FC<{
  onClick: (filterType: string, selectedOptions: string[]) => void;
}> = ({ onClick }) => {
  const { categoriesContext } = useCategoriesContext();
  const { allRaritiesContext } = useAllRaritiesContext();
  const { statusContext } = useStatusContext();

  const [optionsStatus, setOptionsStatus] = useState<SelectOptionProps[]>([]);
  const [optionsRarities, setOptionsRarities] = useState<SelectOptionProps[]>([]);
  const [optionsCategories, setOptionsCategories] = useState<SelectOptionProps[]>([]);
  const [optionsCollection, setOptionsCollection] = useState<SelectOptionProps[]>([]);

  useEffect(() => {
    if (statusContext && categoriesContext && allRaritiesContext && collectionOption) {
      setOptionsStatus(Array.from((statusContext as Map<number, {id: number, name: string}>).values()).map(v => {
        return {checked: false, value: v.id.toString(), label: v.name}
      }))

      setOptionsRarities(Array.from((allRaritiesContext as Map<number, {id: number, name: string}>).values()).map(v => {
        return {checked: false, value: v.id.toString(), label: v.name}
      }))

      setOptionsCategories(Array.from((categoriesContext as Map<number, {id: number, name: string}>).values()).map(v => {
        return {checked: false, value: v.id.toString(), label: v.name}
      }))
  
      setOptionsCollection(Array.from((collectionOption as Map<number, {id: number, name: string}>).values()).map(v => {
        return {checked: false, value: v.id.toString(), label: v.name}
      }))
    }
  }, [statusContext, categoriesContext, allRaritiesContext, collectionOption])

  return (
    <FilterSectionWrapper>
      <p>Filter traits</p>
      <FilterGroupWrapper>
        <SelectBox
          isFilter
          placeholder="Category"
          onClick={onClick}
          options={optionsCategories}
        />
        <SelectBox
          options={optionsCollection}
          placeholder="Collections"
          onClick={onClick}
        />
        <SelectBox
          isFilter
          options={optionsRarities}
          onClick={onClick}
          placeholder="All Rarities"
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

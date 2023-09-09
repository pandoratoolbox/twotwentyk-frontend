import React, {useState, useEffect} from "react";
import { FilterSectionGrid, FilterSectionWrapper } from "./styles";
import { IconSort, SelectBox } from "../../components";
import { SortButton } from "../app/dates/styles";
import { collectionOption } from "./data";

import {
  useMarketCardTypesContext,
  useCardTypesContext,
  useAllRaritiesContext,
  useStatusContext,
  useCategoriesContext,
  useTriggersContext,
} from "../../context";
import { SelectOptionProps } from "../../types";

export const MFilterSection: React.FC<{ page?: string, onSelectTrigger?: (selected: number[] | null) => void, onSelectCategory?: (selected: number[] | null) => void, onSelectCardTypes?: (selected: number[] | null) => void, onSelectNftCollection?: (selected: number) => void, onSelectStatus?: (selected: number[] | null) => void, onSelectRarity?: (selected: number[] | null) => void }> = ({ page, onSelectCardTypes, onSelectCategory, onSelectNftCollection, onSelectRarity, onSelectStatus, onSelectTrigger }) => {
  const { marketCardTypesContext } = useMarketCardTypesContext();
  const { cardTypesContext } = useCardTypesContext();
  const { allRaritiesContext } = useAllRaritiesContext();
  const { statusContext } = useStatusContext();
  const { categoriesContext } = useCategoriesContext();
  const { triggersContext } = useTriggersContext();

  const [optionsRarity, setOptionsRarity] = useState<SelectOptionProps[]>([]);
  const [optionsCollection, setOptionsCollection] = useState<SelectOptionProps[]>([]);
  const [optionsStatus, setOptionsStatus] = useState<SelectOptionProps[]>([]);
  const [optionsCardTypes, setOptionsCardTypes] = useState<SelectOptionProps[]>([]);
  const [optionsCategories, setOptionsCategories] = useState<SelectOptionProps[]>([]);
  const [optionsTriggers, setOptionsTriggers] = useState<SelectOptionProps[]>([]);

  
  useEffect(() => {
    if (statusContext && categoriesContext && allRaritiesContext && cardTypesContext && marketCardTypesContext && triggersContext) {
    setOptionsStatus(Array.from((statusContext as Map<number, {id: number, name: string}>).values()).map(v => {
      return {checked: false, value: v.id.toString(), label: v.name}
    }))

    setOptionsCollection(Array.from((collectionOption as Map<number, {id: number, name: string}>).values()).map(v => {
      return {checked: false, value: v.id.toString(), label: v.name}
    }))

    setOptionsRarity(Array.from((allRaritiesContext as Map<number, {id: number, name: string}>).values()).map(v => {
      return {checked: false, value: v.id.toString(), label: v.name}
    }))

    setOptionsCategories(Array.from((categoriesContext as Map<number, {id: number, name: string}>).values()).map(v => {
      return {checked: false, value: v.id.toString(), label: v.name}
    }))

    setOptionsCardTypes(Array.from((cardTypesContext as Map<number, {id: number, name: string}>).values()).map(v => {
      return {checked: false, value: v.id.toString(), label: v.name}
    }))

    setOptionsTriggers(Array.from((triggersContext as Map<number, {id: number, name: string}>).values()).map(v => {
      return {checked: false, value: v.id.toString(), label: v.name}
    }))

  }
  }, [statusContext, categoriesContext, allRaritiesContext, cardTypesContext, marketCardTypesContext, triggersContext])

  const handleOptionSelect = (filterType: string, selected: string[]) => {
    switch (filterType) {
      case "Collections":
        onSelectNftCollection && onSelectNftCollection(Number(selected[0]))
        break
      case "Status":
        onSelectStatus && onSelectStatus(selected.map(v => { return Number(v)}))
        break
      case "Trigger Type":
        onSelectTrigger && onSelectTrigger(selected.map(v => {return Number(v)}))
        break
      case "Categories":
        onSelectCategory && onSelectCategory(selected.map(v => {return Number(v)}))
        break
      case "All Rarities":
        onSelectRarity && onSelectRarity(selected.map(v => {return Number(v)}))
        break
      case "Card Types":
       onSelectCardTypes && onSelectCardTypes(selected.map(v => {return Number(v)}))
       break
    }
  }

  return (
    <FilterSectionWrapper>
      <h3>Filter traits</h3>
      <FilterSectionGrid>
        {!page && (
          <>
            <SelectBox
              isFilter
              options={optionsCardTypes}
              placeholder="Card Types"
              onClick={handleOptionSelect}
            />
            <SelectBox options={optionsCollection} placeholder="Collections" onClick={handleOptionSelect}/>
            <SelectBox isFilter options={optionsStatus} placeholder="Status" onClick={handleOptionSelect}/>
          </>
        )}
        {page === "predictions" && (
          <>
            <SelectBox
              isFilter
              options={optionsTriggers}
              placeholder="Trigger Type"
              onClick={handleOptionSelect}
            />
            <SelectBox
              isFilter
              options={optionsCategories}
              placeholder="Categories"
              onClick={handleOptionSelect}
            />
            <SelectBox options={optionsCollection} placeholder="Collections" onClick={handleOptionSelect}/>
            <SelectBox
              isFilter
              options={optionsRarity}
              placeholder="All Rarities"
              onClick={handleOptionSelect}
            />
            <SelectBox isFilter options={optionsStatus} placeholder="Status" onClick={handleOptionSelect}/>
          </>
        )}
        {page === "identities" && (
          <>
            <SelectBox
              isFilter
              options={optionsCategories}
              placeholder="Categories"
              onClick={handleOptionSelect}
            />
            <SelectBox options={optionsCollection} placeholder="Collections" />
            <SelectBox
              isFilter
              options={optionsRarity}
              placeholder="All Rarities"
              onClick={handleOptionSelect}
            />
            <SelectBox isFilter options={optionsStatus} placeholder="Status" onClick={handleOptionSelect}/>
          </>
        )}
        {page === "packs" && (
          <>
            <SelectBox
              isFilter
              options={optionsCardTypes}
              placeholder="Card Types"
              onClick={handleOptionSelect}
            />
            <SelectBox options={optionsCollection} placeholder="Collections" onClick={handleOptionSelect}/>

            <SelectBox isFilter options={optionsStatus} placeholder="Status" onClick={handleOptionSelect}/>
          </>
        )}
        <SortButton>
          <IconSort />
        </SortButton>
      </FilterSectionGrid>
    </FilterSectionWrapper>
  );
};

import React from "react";
import { FilterGroupWrapper, FilterSectionWrapper, SortButton } from "./styles";
import { IconSort, SelectBox } from "../../../components";
import { collectionOption } from "./data";
import {
  useAllRaritiesContext,
  useStatusContext,
  useTriggersContext,
  useCategoriesContext,
} from "../../../context";

export const TriggerFilterSection: React.FC = () => {
  const { allRaritiesContext } = useAllRaritiesContext();
  const { statusContext } = useStatusContext();
  const { triggersContext } = useTriggersContext();
  const { categoriesContext } = useCategoriesContext();
  
  return (
    <FilterSectionWrapper>
      <p>Filter traits</p>
      <FilterGroupWrapper>
        <SelectBox
          isFilter
          placeholder="Triggers Type"
          newData={triggersContext}
        />
        <SelectBox isFilter newData={categoriesContext} placeholder="Categories" />
        <SelectBox
          isFilter
          newData={allRaritiesContext}
          placeholder="All Rarities"
        />

        <SelectBox isFilter newData={statusContext} placeholder="Status" />
        <SortButton>
          <IconSort />
        </SortButton>
      </FilterGroupWrapper>
    </FilterSectionWrapper>
  );
};

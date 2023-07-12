import React from "react";
import { FilterGroupWrapper, FilterSectionWrapper, SortButton } from "./styles";
import { IconSort, SelectBox } from "../../../components";
import {
  useAllRaritiesContext,
  useStatusContext,
  useTriggersContext,
  useCategoriesContext,
} from "../../../context";

export const TriggerFilterSection: React.FC<{
  onClick: (filterType: string, selectedOptions: string[]) => void;
}> = ({ onClick }) => {
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
          placeholder="Tier"
          newData={triggersContext}
          onClick={onClick}
        />
        <SelectBox
          isFilter
          newData={categoriesContext}
          placeholder="Categories"
          onClick={onClick}
        />
        <SelectBox
          isFilter
          newData={allRaritiesContext}
          placeholder="All Rarities"
          onClick={onClick}
        />

        <SelectBox
          isFilter
          newData={statusContext}
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

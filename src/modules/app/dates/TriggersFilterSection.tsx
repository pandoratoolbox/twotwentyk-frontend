import React from "react";
import { FilterGroupWrapper, FilterSectionWrapper, SortButton } from "./styles";
import { IconSort, SelectBox } from "../../../components";
import {
  useAllRaritiesContext,
  useStatusContext,
  useTriggersContext,
  useCategoriesContext,
  useTiersContext,
} from "../../../context";

export const TriggerFilterSection: React.FC<{
  onClick: (filterType: string, selectedOptions: string[]) => void;
}> = ({ onClick }) => {
  const { allRaritiesContext } = useAllRaritiesContext();
  const { statusContext } = useStatusContext();
  const { triggersContext } = useTriggersContext();
  const { categoriesContext } = useCategoriesContext();
  const { tiersContext } = useTiersContext();

  return (
    <FilterSectionWrapper>
      <p>Filter traits</p>
      <FilterGroupWrapper>
        <SelectBox
          isFilter
          placeholder="Trigger Tier"
          newData={tiersContext}
          onClick={onClick}
        />
        <SelectBox
          isFilter
          newData={triggersContext}
          placeholder="Trigger"
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

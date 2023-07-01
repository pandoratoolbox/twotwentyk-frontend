import React from "react";
import { FilterGroupWrapper, FilterSectionWrapper, SortButton } from "./styles";
import { IconSort, SelectBox } from "../../../components";
import { collectionOption } from "./data";
import {
  useAllRaritiesContext,
  useStatusContext,
  useTriggersContext,
} from "../../../context";

export const PredictionsFilterSection: React.FC = () => {
  const { allRaritiesContext } = useAllRaritiesContext();
  const { statusContext } = useStatusContext();
  const { triggersContext } = useTriggersContext();

  return (
    <FilterSectionWrapper>
      <p>Filter traits</p>
      <FilterGroupWrapper>
        <SelectBox options={collectionOption} placeholder="Collections" />
        <SelectBox
          isFilter
          newData={allRaritiesContext}
          placeholder="All Rarities"
        />
        <SelectBox
          isFilter
          placeholder="Triggers Type"
          newData={triggersContext}
        />

        <SelectBox isFilter newData={statusContext} placeholder="Status" />
        <SortButton>
          <IconSort />
        </SortButton>
      </FilterGroupWrapper>
    </FilterSectionWrapper>
  );
};

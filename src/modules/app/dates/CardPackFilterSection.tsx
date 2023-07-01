import React from "react";
import { FilterGroupWrapper, FilterSectionWrapper, SortButton } from "./styles";
import { IconSort, SelectBox } from "../../../components";
import { collectionOption } from "./data";
import {
  useAllRaritiesContext,
  useStatusContext,
} from "../../../context";

export const CardPackFilterSection: React.FC = () => {
  const { allRaritiesContext } = useAllRaritiesContext();
  const { statusContext } = useStatusContext();

  return (
    <FilterSectionWrapper>
      <p>Filter traits</p>
      <FilterGroupWrapper>
        <SelectBox
          isFilter
          newData={allRaritiesContext}
          placeholder="Pack Types"
        />
       
        <SelectBox options={collectionOption} placeholder="Collections" />

        <SelectBox isFilter newData={statusContext} placeholder="Status" />
        <SortButton>
          <IconSort />
        </SortButton>
      </FilterGroupWrapper>
    </FilterSectionWrapper>
  );
};

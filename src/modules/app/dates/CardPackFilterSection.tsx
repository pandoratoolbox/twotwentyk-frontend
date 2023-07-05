import React from "react";
import { FilterGroupWrapper, FilterSectionWrapper, SortButton } from "./styles";
import { IconSort, SelectBox } from "../../../components";
import { collectionOption } from "./data";
import { useAllRaritiesContext, useStatusContext } from "../../../context";

export const CardPackFilterSection: React.FC<{
  onClick: (filterType: string, selectedOptions: string[]) => void;
}> = ({ onClick }) => {
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
          onClick={onClick}
        />

        <SelectBox
          options={collectionOption}
          placeholder="Collections"
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

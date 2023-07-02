import React from "react";
import { FilterGroupWrapper, FilterSectionWrapper, SortButton } from "./styles";
import { IconSort, SelectBox } from "../../../components";
import { collectionOption } from "./data";
import {
  useCardTypesContext,
  useAllRaritiesContext,
  useStatusContext,
} from "../../../context";

export const DatesFilterSection: React.FC = () => {
  const { cardTypesContext } = useCardTypesContext();
  const { allRaritiesContext } = useAllRaritiesContext();
  const { statusContext } = useStatusContext();

  return (
    <FilterSectionWrapper>
      <p>Filter traits</p>
      <FilterGroupWrapper>
        <SelectBox
          isFilter
          placeholder="Card Types"
          newData={cardTypesContext}
        />
        <SelectBox options={collectionOption} placeholder="Collections" />
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

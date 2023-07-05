import React from "react";
import { FilterGroupWrapper, FilterSectionWrapper, SortButton } from "./styles";
import { IconSort, SelectBox } from "../../../components";
import { collectionOption } from "./data";
import {
  useCardTypesContext,
  useAllRaritiesContext,
  useStatusContext,
} from "../../../context";

export const DatesFilterSection: React.FC<{
  onClick: (filterType: string, selectedOptions: string[]) => void;
}> = ({ onClick }) => {
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
          onClick={onClick}
        />
        <SelectBox
          onClick={onClick}
          options={collectionOption}
          placeholder="Collections"
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

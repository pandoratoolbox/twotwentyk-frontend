import React from "react";
import { FilterGroupWrapper, FilterSectionWrapper, SortButton } from "./styles";
import { IconSort, SelectBox } from "../../../components";
import { collectionOption } from "./data";
import {
  useAllRaritiesContext,
  useStatusContext,
  useCategoriesContext,
} from "../../../context";

export const IdentitiesFilterSection: React.FC<{
  onClick: (filterType: string, selectedOptions: string[]) => void;
}> = ({ onClick }) => {
  const { allRaritiesContext } = useAllRaritiesContext();
  const { statusContext } = useStatusContext();
  const { categoriesContext } = useCategoriesContext();

  return (
    <FilterSectionWrapper>
      <p>Filter traits</p>
      <FilterGroupWrapper>
        <SelectBox
          isFilter
          newData={allRaritiesContext}
          placeholder="All Rarities"
          onClick={onClick}
        />

        <SelectBox
          options={collectionOption}
          placeholder="Collections"
          onClick={onClick}
        />
        <SelectBox
          isFilter
          placeholder="Category"
          newData={categoriesContext}
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

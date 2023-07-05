import React from "react";
import { FilterGroupWrapper, FilterSectionWrapper, SortButton } from "./styles";
import { IconSort, SelectBox } from "../../../components";
import { collectionOption } from "./data";
import {
  useCategoriesContext,
  useAllRaritiesContext,
  useStatusContext,
} from "../../../context";

export const CategoryFilterSection: React.FC<{
  onClick: (filterType: string, selectedOptions: string[]) => void;
}> = ({ onClick }) => {
  const { categoriesContext } = useCategoriesContext();
  const { allRaritiesContext } = useAllRaritiesContext();
  const { statusContext } = useStatusContext();

  return (
    <FilterSectionWrapper>
      <p>Filter traits</p>
      <FilterGroupWrapper>
        <SelectBox
          isFilter
          placeholder="Category"
          onClick={onClick}
          newData={categoriesContext}
        />
        <SelectBox
          options={collectionOption}
          placeholder="Collections"
          onClick={onClick}
        />
        <SelectBox
          isFilter
          newData={allRaritiesContext}
          onClick={onClick}
          placeholder="All Rarities"
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

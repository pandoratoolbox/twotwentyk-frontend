import React from "react";
import { FilterGroupWrapper, FilterSectionWrapper, SortButton } from "./styles";
import { IconSort, SelectBox } from "../../../components";
import { collectionOption } from "./data";
import {
  useCategoriesContext,
  useAllRaritiesContext,
  useStatusContext,
} from "../../../context";

export const CategoryFilterSection: React.FC = () => {
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
          newData={categoriesContext}
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

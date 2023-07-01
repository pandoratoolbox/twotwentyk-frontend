import React from "react";
import { FilterGroupWrapper, FilterSectionWrapper, SortButton } from "./styles";
import { IconSort, SelectBox } from "../../../components";
import { collectionOption } from "./data";
import {
  useAllRaritiesContext,
  useStatusContext,
  useCategoriesContext
} from "../../../context";

export const IdentitiesFilterSection: React.FC = () => {
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
        />
       
        <SelectBox options={collectionOption} placeholder="Collections" />
        <SelectBox
          isFilter
          placeholder="Category"
          newData={categoriesContext}
        />

        <SelectBox isFilter newData={statusContext} placeholder="Status" />
        <SortButton>
          <IconSort />
        </SortButton>
      </FilterGroupWrapper>
    </FilterSectionWrapper>
  );
};

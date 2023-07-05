import React from "react";
import { FilterSectionGrid, FilterSectionWrapper } from "./styles";
import { IconSort, SelectBox } from "../../components";
import { SortButton } from "../app/dates/styles";
import { collectionOption } from "./data";

import {
  useCardTypesContext,
  useAllRaritiesContext,
  useStatusContext,
  useCategoriesContext,
} from "../../context";

export const MFilterSection: React.FC<{ page?: string }> = ({ page }) => {
  const { cardTypesContext } = useCardTypesContext();
  const { allRaritiesContext } = useAllRaritiesContext();
  const { statusContext } = useStatusContext();
  const { categoriesContext } = useCategoriesContext();

  console.log(allRaritiesContext);
  return (
    <FilterSectionWrapper>
      <h3>Filter traits</h3>
      <FilterSectionGrid>
        {!page && (
          <>
            <SelectBox
              isFilter
              newData={cardTypesContext}
              placeholder="Card Types"
            />
            <SelectBox options={collectionOption} placeholder="Collections" />
            <SelectBox isFilter newData={statusContext} placeholder="Status" />
          </>
        )}
        {page === "predictions" && (
          <>
            <SelectBox
              isFilter
              newData={allRaritiesContext}
              placeholder="Trigger Type"
            />
            <SelectBox
              isFilter
              newData={categoriesContext}
              placeholder="Categories"
            />
            <SelectBox options={collectionOption} placeholder="Collections" />
            <SelectBox
              isFilter
              newData={allRaritiesContext}
              placeholder="All Rarities"
            />
            <SelectBox isFilter newData={statusContext} placeholder="Status" />
          </>
        )}
        {page === "identities" && (
          <>
            <SelectBox
              isFilter
              newData={categoriesContext}
              placeholder="Categories"
            />
            <SelectBox options={collectionOption} placeholder="Collections" />
            <SelectBox
              isFilter
              newData={allRaritiesContext}
              placeholder="All Rarities"
            />
            <SelectBox isFilter newData={statusContext} placeholder="Status" />
          </>
        )}
        {page === "packs" && (
          <>
            <SelectBox
              isFilter
              newData={cardTypesContext}
              placeholder="Card Types"
            />
            <SelectBox options={collectionOption} placeholder="Collections" />

            <SelectBox isFilter newData={statusContext} placeholder="Status" />
          </>
        )}
        <SortButton>
          <IconSort />
        </SortButton>
      </FilterSectionGrid>
    </FilterSectionWrapper>
  );
};

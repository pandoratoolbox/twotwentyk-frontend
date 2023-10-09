import React, { useState, useEffect } from "react";
import {
  FilterGroupWrapper,
  FilterSectionWrapper,
  SortButton,
  CardTooltip,
  TooltipContent,
  TooltipItem,
} from "./styles";
import { IconSortOption, IconSort, SelectBox } from "../../../components";
import {
  useAllRaritiesContext,
  useStatusContext,
  useCategoriesContext,
} from "../../../context";
import { SelectOptionProps, collectionOption } from "../../../types";

export const IdentitiesFilterSection: React.FC<{
  onClick: (filterType: string, selectedOptions: string[]) => void;
  clickSelect: (sortSelectOption: string) => void;
}> = ({ onClick, clickSelect }) => {
  const { allRaritiesContext } = useAllRaritiesContext();
  const { statusContext } = useStatusContext();
  const { categoriesContext } = useCategoriesContext();

  const [optionsStatus, setOptionsStatus] = useState<SelectOptionProps[]>([]);
  const [optionsRarities, setOptionsRarities] = useState<SelectOptionProps[]>(
    []
  );
  const [optionsCollection, setOptionsCollection] = useState<
    SelectOptionProps[]
  >([]);
  const [optionsCategories, setOptionsCategories] = useState<
    SelectOptionProps[]
  >([]);

  useEffect(() => {
    if (
      statusContext &&
      allRaritiesContext &&
      collectionOption &&
      categoriesContext
    ) {
      setOptionsStatus(
        Array.from(
          (statusContext as Map<number, { id: number; name: string }>).values()
        ).map((v) => {
          return { checked: false, value: v.id.toString(), label: v.name };
        })
      );

      setOptionsRarities(
        Array.from(
          (
            allRaritiesContext as Map<number, { id: number; name: string }>
          ).values()
        ).map((v) => {
          return { checked: false, value: v.id.toString(), label: v.name };
        })
      );

      setOptionsCollection(
        Array.from(
          (
            collectionOption as Map<number, { id: number; name: string }>
          ).values()
        ).map((v) => {
          return { checked: false, value: v.id.toString(), label: v.name };
        })
      );

      setOptionsCategories(
        Array.from(
          (
            categoriesContext as Map<number, { id: number; name: string }>
          ).values()
        ).map((v) => {
          return { checked: false, value: v.id.toString(), label: v.name };
        })
      );
    }
  }, [statusContext, allRaritiesContext, collectionOption, categoriesContext]);
  return (
    <FilterSectionWrapper>
      <p>Filter traits</p>
      <FilterGroupWrapper>
        <SelectBox
          isFilter
          options={optionsRarities}
          placeholder="All Rarities"
          onClick={onClick}
          key="all-rarities"
        />

        <SelectBox
          options={optionsCollection}
          placeholder="Collections"
          onClick={onClick}
          key="collections"
        />
        <SelectBox
          isFilter
          placeholder="Category"
          options={optionsCategories}
          onClick={onClick}
          key="category"
        />

        <SelectBox
          isFilter
          options={optionsStatus}
          placeholder="Status"
          onClick={onClick}
          key="status"
        />

        <CardTooltip className="sortTooltip">
          <SortButton>
            <IconSort />
          </SortButton>
          <TooltipContent className="tooltip-content">
            <div className="Sort-Options">
              <div className="OptionHeading">
                <span>Sort By</span>
              </div>
              <div
                className="sOption"
                onClick={() => clickSelect("Date-High-Low")}
              >
                <span>Date High-Low</span>
                <IconSortOption />
              </div>
              <div
                className="sOption"
                onClick={() => clickSelect("Date-Low-High")}
              >
                <span>Date Low-High</span>
                <IconSortOption />
              </div>
              <div className="sOption" onClick={() => clickSelect("Rearity")}>
                <span>Rearity</span>
                <IconSortOption />
              </div>
            </div>
          </TooltipContent>
        </CardTooltip>
      </FilterGroupWrapper>
    </FilterSectionWrapper>
  );
};

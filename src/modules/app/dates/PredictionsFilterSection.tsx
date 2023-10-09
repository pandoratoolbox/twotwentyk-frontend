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
  useTriggersContext,
} from "../../../context";
import { SelectOptionProps, collectionOption } from "../../../types";

export const PredictionsFilterSection: React.FC<{
  onClick: (filterType: string, selectedOptions: string[]) => void;
  clickSelect: (sortSelectOption: string) => void;
}> = ({ onClick, clickSelect }) => {
  const { allRaritiesContext } = useAllRaritiesContext();
  const { statusContext } = useStatusContext();
  const { triggersContext } = useTriggersContext();

  const [triggersList, setTriggersList] = useState<Map<string, string>>();

  const [optionsStatus, setOptionsStatus] = useState<SelectOptionProps[]>([]);
  const [optionsRarities, setOptionsRarities] = useState<SelectOptionProps[]>(
    []
  );
  const [optionsCollection, setOptionsCollection] = useState<
    SelectOptionProps[]
  >([]);
  const [optionsTriggers, setOptionsTriggers] = useState<SelectOptionProps[]>(
    []
  );

  useEffect(() => {
    if (
      statusContext &&
      allRaritiesContext &&
      collectionOption &&
      triggersContext
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

      setOptionsTriggers(
        Array.from(
          (
            triggersContext as Map<number, { id: number; name: string }>
          ).values()
        ).map((v) => {
          return { checked: false, value: v.id.toString(), label: v.name };
        })
      );
    }
  }, [statusContext, allRaritiesContext, collectionOption, triggersContext]);

  return (
    <FilterSectionWrapper>
      <p>Filter traits</p>
      <FilterGroupWrapper>
        <SelectBox
          options={optionsCollection}
          placeholder="Collections"
          onClick={onClick}
        />
        <SelectBox
          isFilter
          options={optionsRarities}
          placeholder="All Rarities"
          onClick={onClick}
        />
        <SelectBox
          isFilter
          placeholder="Triggers"
          options={optionsTriggers}
          onClick={onClick}
        />

        <SelectBox
          isFilter
          options={optionsStatus}
          placeholder="Status"
          onClick={onClick}
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

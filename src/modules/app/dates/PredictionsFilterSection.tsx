import React, {useState,useEffect} from "react";
import { FilterGroupWrapper, FilterSectionWrapper, SortButton } from "./styles";
import { IconSort, SelectBox } from "../../../components";
import { collectionOption } from "./data";
import {
  useAllRaritiesContext,
  useStatusContext,
  useTriggersContext,
} from "../../../context";

export const PredictionsFilterSection: React.FC<{
  onClick: (filterType: string, selectedOptions: string[]) => void;
}> = ({ onClick }) => {
  const { allRaritiesContext } = useAllRaritiesContext();
  const { statusContext } = useStatusContext();
  const { triggersContext } = useTriggersContext();

  const [triggersList, setTriggersList] = useState<Map<string,string>>()

  return (
    <FilterSectionWrapper>
      <p>Filter traits</p>
      <FilterGroupWrapper>
        <SelectBox
          options={collectionOption}
          placeholder="Collections"
          onClick={onClick}
        />
        <SelectBox
          isFilter
          newData={allRaritiesContext}
          placeholder="All Rarities"
          onClick={onClick}
        />
        <SelectBox
          isFilter
          placeholder="Triggers"
          newData={triggersContext}
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

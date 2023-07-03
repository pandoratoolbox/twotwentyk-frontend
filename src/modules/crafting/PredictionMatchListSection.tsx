import React, { useState } from "react";
import {
  ItemContent,
  ItemContentInfoWrapper,
  ItemHeader,
  ItemIconWrapper,
  MatchListGroup,
  MatchListInfoWrapper,
  MatchListItemWrapper,
  MatchListSectionWrapper,
  TriggerListType,
} from "./styles";
import { IconInfo } from "../../components";
import { matchList, triggerList } from "./data";
import { useCelebritiesContext } from "../../context";
import { IconCardAthlete } from "../../components";
import { ITrigger } from "../../models/trigger";
import { ICelebrity } from "../../models/celebrity";

export const PredictionMatchListSection: React.FC<{
  page: "identity" | "prediction";
  clickedCard: string | number | null;
}> = ({ page, clickedCard }) => {
  const [collapsed, setCollapsed] = useState<number>(-1);
  const { celebritiesContext } = useCelebritiesContext();

  return (
    <MatchListSectionWrapper>
      <h2>{page === "identity" ? "Identity Matches" : "Eligible Triggers"}</h2>
      {Number(clickedCard) > -1 ? (
        <p>
          {page === "identity"
            ? "Click for recipe"
            : "Only triggers relevant to selected identity are showing. Click to open item."}
        </p>
      ) : (
        <div className="empty-matched">
          Add at least one date or category card to the recipe to see possible
          Identity matches.
        </div>
      )}
      {Number(clickedCard) > -1 && (
        <MatchListGroup>
          {page === "prediction"
            ? triggerList.map((item, key) => (
                <TriggerListItem key={key} {...item} />
              ))
            : celebritiesContext &&
              Array.from<[number, ICelebrity]>(celebritiesContext).map(
                ([key, value]) => (
                  <MatchListItem
                    celebrity={value}
                    key={key}
                    onCollapsed={setCollapsed}
                    collapsed={collapsed === key}
                  />
                )
              )}
        </MatchListGroup>
      )}
    </MatchListSectionWrapper>
  );
};

const MatchListItem: React.FC<{
  celebrity: ICelebrity;
  // id: number;

  // name: string;
  onCollapsed: (id: number) => void;
  collapsed: boolean;
}> = ({ celebrity, onCollapsed, collapsed }) => {
  const [selected, setSelected] = useState<string>("");
  return (
    <MatchListItemWrapper>
      <ItemHeader onClick={() => onCollapsed(celebrity.id)}>
        <MatchListInfoWrapper>
          <ItemIconWrapper>
            {" "}
            <IconCardAthlete />
          </ItemIconWrapper>
          <p>{celebrity.name}</p>
        </MatchListInfoWrapper>
        <IconInfo />
      </ItemHeader>
      {collapsed && (
        <ItemContent>
          <ItemContentInfoWrapper
            className={selected === "red" ? "red active" : "red"}
            onClick={() => setSelected("red")}
          >
            <h4>Aug 3rd</h4>
            <h5>Not Owned</h5>
          </ItemContentInfoWrapper>
          <ItemContentInfoWrapper
            className={selected === "green" ? "green active" : "green"}
            onClick={() => setSelected("green")}
          >
            <h4>1977</h4>
            <h5>In Inventory</h5>
          </ItemContentInfoWrapper>
          <ItemContentInfoWrapper
            className={selected === "purple" ? "purple active" : "purple"}
            onClick={() => setSelected("purple")}
          >
            <h4>Athletes</h4>
            <h5>In Slot</h5>
          </ItemContentInfoWrapper>
        </ItemContent>
      )}
    </MatchListItemWrapper>
  );
};

const TriggerListItem: React.FC<{ type: string; name: string }> = ({
  type,
  name,
}) => {
  return (
    <MatchListItemWrapper>
      <ItemHeader>
        <MatchListInfoWrapper>
          <TriggerListType> {type}</TriggerListType>
          <p>{name}</p>
        </MatchListInfoWrapper>
        <div>
          <IconInfo />
        </div>
      </ItemHeader>
    </MatchListItemWrapper>
  );
};

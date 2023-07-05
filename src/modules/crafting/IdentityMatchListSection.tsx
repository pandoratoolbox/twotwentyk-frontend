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
import { ICelebrity } from "../../models/celebrity";
import { INftCardDayMonth } from "../../models/nft_card_day_month";
import { INftCardYear } from "../../models/nft_card_year";
import { INftCardCategory } from "../../models/nft_card_category";
import { INftCardIdentity } from "../../models/nft_card_identity";
import { INftCardTrigger } from "../../models/nft_card_trigger";
import { INftCardCrafting } from "../../models/nft_card_crafting";

export const IdentityMatchListSection: React.FC<{
  page: "identity" | "prediction";
  selectedCards: {
  crafting: INftCardCrafting | null;
  year: INftCardYear | null;
  dayMonth: INftCardDayMonth | null;
  category: INftCardCategory | null;
  };
  chooseCelebrity: React.Dispatch<React.SetStateAction<ICelebrity | null>>;
}> = ({ page, selectedCards, chooseCelebrity }) => {
  const [collapsed, setCollapsed] = useState<number>(-1);
  const { celebritiesContext } = useCelebritiesContext();
  //identity_matches = celebritiesContext.map(v => { if (v.birth_day == nft_card_day_month.day && v.birth_month == nft_card_day_month.month && v.birth_year == nft_card_year.year && v.category == nft_card_category.category) return v }
  
  return (
    <MatchListSectionWrapper>
      <h2>{page === "identity" ? "Identity Matches" : "Eligible Triggers"}</h2>
      {selectedCards.crafting != null && selectedCards.category != null && selectedCards.dayMonth != null && selectedCards.year != null ? (
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
      {selectedCards.crafting != null && selectedCards.category != null && selectedCards.dayMonth != null && selectedCards.year != null && (
        <MatchListGroup>
          {celebritiesContext &&
              Array.from<[number, ICelebrity]>(celebritiesContext).map(
                ([key, value]) => value.birth_year === selectedCards.year?.year && value.birth_day === selectedCards.dayMonth?.day && value.birth_month === selectedCards.dayMonth?.month && value.category === selectedCards.category?.category && (
                  <MatchListItem
                  chooseCelebrity={chooseCelebrity}
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
  chooseCelebrity: React.Dispatch<React.SetStateAction<ICelebrity | null>>;
  // id: number;

  // name: string;
  onCollapsed: (id: number) => void;
  collapsed: boolean;
}> = ({ celebrity, onCollapsed, collapsed, chooseCelebrity }) => {
  const [selected, setSelected] = useState<string>("");
  let clicked = () => {
    onCollapsed(celebrity.id);
    chooseCelebrity(celebrity);
    // console.log(celebrity)
  }
  return (
    <MatchListItemWrapper>
      <ItemHeader onClick={() => clicked()}>
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

import React, { useEffect, useState } from "react";
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
import { useMonthContext } from "../../context";

interface CelebrityMatch {
  id: number;
  name: string;
  match_year: boolean;
  match_month: boolean;
  match_day: boolean;
  match_category: boolean;
  birth_year: number;
  birth_month: number;
  birth_day: number;
  category: string;
}

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
  const [celebrityMatches, setCelebrityMatches] = useState<CelebrityMatch[]>(
    []
  );

  const refreshCelebrities = () => {
    let newCelebrities: CelebrityMatch[] = [];

    if (celebritiesContext) {
      (celebritiesContext as Map<number, ICelebrity>).forEach(
        (v: ICelebrity) => {
          let match: CelebrityMatch = {
            id: v.id,
            name: v.name,
            birth_month: v.birth_month,
            birth_year: v.birth_year,
            birth_day: v.birth_day,
            match_category: false,
            category: v.category,
            match_month: false,
            match_day: false,
            match_year: false
          };

          if (selectedCards.year) {
            if (selectedCards.year.year !== v.birth_year) {
              return;
            } else {
              match.match_year = true;
            }
          }
          if (selectedCards.dayMonth) {
            if (selectedCards.dayMonth.month !== v.birth_month) {
              return;
            } else {
              match.match_month = true;
            }

            if (selectedCards.dayMonth.day !== v.birth_day) {
              return;
            } else {
              match.match_day = true;
            }
          }
          if (selectedCards.category) {
            if (selectedCards.category.category !== v.category) {
              return;
            } else {
              match.match_category = true;
            }
          }
          newCelebrities.push(match);
        }
      );
    }

    console.log(newCelebrities)

    setCelebrityMatches(newCelebrities);
  };

  useEffect(() => {
    refreshCelebrities();
  }, [selectedCards, celebritiesContext]);
  //identity_matches = celebritiesContext.map(v => { if (v.birth_day == nft_card_day_month.day && v.birth_month == nft_card_day_month.month && v.birth_year == nft_card_year.year && v.category == nft_card_category.category) return v }

  return (
    <MatchListSectionWrapper>
      <h2>Identity Matches</h2>
      {selectedCards.category != null ||
      selectedCards.dayMonth != null ||
      selectedCards.year != null ? (
        <p>Click for recipe</p>
      ) : (
        <div className="empty-matched">
          Add at least one date or category card to the recipe to see possible
          Identity matches.
        </div>
      )}

      <MatchListGroup>
        {(selectedCards.year ||
          selectedCards.category ||
          selectedCards.dayMonth) &&
          celebrityMatches.map((v) => {
            return (
              <div>
                <MatchListItem
                  chooseCelebrity={chooseCelebrity}
                  celebrity={v}
                  key={v.id}
                  onCollapsed={setCollapsed}
                  collapsed={collapsed === v.id}
                />
              </div>
            );
          })}
      </MatchListGroup>
    </MatchListSectionWrapper>
  );
};

const MatchListItem: React.FC<{
  celebrity: CelebrityMatch;
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
  };

  const { monthContext } = useMonthContext();
  return (
    monthContext && (
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
              className={celebrity.match_day ? "owned" : "notowned"}
              onClick={() => setSelected(celebrity.match_day ? "green" : "red")}
            >
              <h4>
                {celebrity.birth_day}{" "}
                {(monthContext as Map<number, string>).get(
                  celebrity.birth_month
                )}
              </h4>
              <h5>{celebrity.match_day ? "In Slot" : "Not In Slot"}</h5>
            </ItemContentInfoWrapper>
            <ItemContentInfoWrapper
              className={celebrity.match_year ? "owned" : "notowned"}
              onClick={() =>
                setSelected(celebrity.match_year ? "red" : "red")
              }
            >
              <h4>{celebrity.birth_year}</h4>
              <h5 >{celebrity.match_year ? "In Slot" : "Not In Slot"}</h5>
            </ItemContentInfoWrapper>
            <ItemContentInfoWrapper
              className={celebrity.match_category ? "owned" : "notowned"}
              onClick={() => setSelected(celebrity.category ? "green" : "red")}
            >
              {celebrity.category && <h4>{celebrity.category}</h4>}
              <h5>{celebrity.match_category ? "In Slot" : "Not In Slot"}</h5>
            </ItemContentInfoWrapper>
          </ItemContent>
        )}
      </MatchListItemWrapper>
    )
  );
};

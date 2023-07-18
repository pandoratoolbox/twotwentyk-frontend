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
import { categoryOption } from "../app/dates/data";

interface CelebrityMatch {
  celebrity: ICelebrity;
  year_in_slot: boolean;
  daymonth_in_slot: boolean;
  category_in_slot: boolean;
  inventory_year: INftCardYear | null;
  inventory_daymonth: INftCardDayMonth | null;
  inventory_category: INftCardCategory | null;
}

export const IdentityMatchListSection: React.FC<{
  page: "identity" | "prediction";
  selectedCards: {
    crafting: INftCardCrafting | null;
    year: INftCardYear | null;
    dayMonth: INftCardDayMonth | null;
    category: INftCardCategory | null;
  };
  // onChooseCelebrity: React.Dispatch<React.SetStateAction<ICelebrity | null>>;
  onSelectCardCategory: (card: INftCardCategory) => void;
  onSelectCardDayMonth: (card: INftCardDayMonth) => void;
  onSelectCardYear: (card: INftCardYear) => void;
  myNfts: {
    year: INftCardYear[] | null;
    dayMonth: INftCardDayMonth[] | null;
    category: INftCardCategory[] | null;
  };
}> = ({
  page,
  selectedCards,
  // onChooseCelebrity,
  myNfts,
  onSelectCardCategory,
  onSelectCardDayMonth,
  onSelectCardYear,
}) => {
  const [collapsed, setCollapsed] = useState<number>(-1);
  const { celebritiesContext } = useCelebritiesContext();
  const [celebrityMatches, setCelebrityMatches] = useState<CelebrityMatch[]>(
    []
  );
  const [selectedSlot, setSelectedSlot] = useState<"category" | "year" | "dayMonth" | "">("")
  const [selectedCelebrityMatch, setSelectedCelebrityMatch] = useState<CelebrityMatch | null>(null)

  const refreshCelebrities = () => {
    let newCelebrities: CelebrityMatch[] = [];

    if (celebritiesContext) {
      (celebritiesContext as Map<number, ICelebrity>).forEach(
        (v: ICelebrity) => {
          let match: CelebrityMatch = {
            celebrity:v,
            category_in_slot: false,
            daymonth_in_slot: false,
            year_in_slot: false,
            inventory_year: null,
            inventory_daymonth: null,
            inventory_category: null,
          };

          if (selectedCards.year) {
            if (selectedCards.year.year !== v.birth_year) {
              return;
            } else {
              match.year_in_slot = true;
            }
          }
          if (selectedCards.dayMonth) {
            if (
              selectedCards.dayMonth.month !== v.birth_month &&
              selectedCards.dayMonth.day !== v.birth_day
            ) {
              return;
            } else {
              match.daymonth_in_slot = true;
            }
          }

          if (selectedCards.category) {
            if (selectedCards.category.category !== v.category) {
              return;
            } else {
              match.category_in_slot = true;
            }
          }

          if (myNfts.category) {
          myNfts.category.forEach((v) => {
            if (v.category === match.celebrity.category) match.inventory_category = v;
            return;
          });
        }

        if (myNfts.dayMonth) {
          myNfts.dayMonth.forEach((v) => {
            if (v.day === match.celebrity.birth_day && v.month === match.celebrity.birth_month)
              match.inventory_daymonth = v;
            return;
          });

        }

        if (myNfts.year) {
          myNfts.year.forEach((v) => {
            if (v.year === match.celebrity.birth_year) match.inventory_year = v;
            return;
          });

        }

          newCelebrities.push(match);
        }
      );
    }

    console.log(newCelebrities);

    setCelebrityMatches(newCelebrities);
  };

  const selectCelebrityMatch = (match: CelebrityMatch) => {
    setSelectedCelebrityMatch(match)
    // onChooseCelebrity(matcsh.celebrity)
  }

  const handleSelectCategory = (celebrity: CelebrityMatch) => {
    setSelectedCelebrityMatch(celebrity)
    setSelectedSlot("category")

    if (celebrity.category_in_slot) {
      return;
    }

    if (celebrity.inventory_category) {
      onSelectCardCategory(celebrity.inventory_category);
      celebrity.category_in_slot = true;
    }
    

  };

  const handleSelectDayMonth = (celebrity: CelebrityMatch) => {
    setSelectedCelebrityMatch(celebrity)
    setSelectedSlot("dayMonth")

    if (celebrity.daymonth_in_slot) {
      return;
    }

    if (celebrity.inventory_daymonth) {
      onSelectCardDayMonth(celebrity.inventory_daymonth);
      celebrity.daymonth_in_slot = true;
    }
  };

  const handleSelectYear = (celebrity: CelebrityMatch) => {
    setSelectedCelebrityMatch(celebrity)
    setSelectedSlot("year")

    if (celebrity.year_in_slot) {
      return;
    }

    if (celebrity.inventory_year) {
      onSelectCardYear(celebrity.inventory_year);
      celebrity.year_in_slot = true;
    }
    

  };

  useEffect(() => {
    refreshCelebrities();
  }, [selectedCards, celebritiesContext, myNfts]);
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
                  onSelectCelebrityMatch={selectCelebrityMatch}
                  celebrity={v}
                  key={v.celebrity.id}
                  onCollapsed={setCollapsed}
                  collapsed={collapsed === v.celebrity.id}
                  onSelectDayMonth={handleSelectDayMonth}
                  onSelectYear={handleSelectYear}
                  onSelectCategory={handleSelectCategory}
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
  onSelectCelebrityMatch: (celebrity: CelebrityMatch) => void;
  onSelectDayMonth: (celebrity: CelebrityMatch) => void;
  onSelectCategory: (celebrity: CelebrityMatch) => void;
  onSelectYear: (celebrity: CelebrityMatch) => void;
  onCollapsed: (id: number) => void;
  collapsed: boolean;
}> = ({ celebrity, onCollapsed, collapsed, onSelectCelebrityMatch, onSelectDayMonth, onSelectCategory, onSelectYear}) => {
  const [selected, setSelected] = useState<string>("");
  let clicked = () => {
    onCollapsed(celebrity.celebrity.id);
    onSelectCelebrityMatch(celebrity);
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
            <p>{celebrity.celebrity.name}</p>
          </MatchListInfoWrapper>
          <IconInfo />
        </ItemHeader>
        {collapsed && (
          <ItemContent>
            <ItemContentInfoWrapper
              className={
                celebrity.daymonth_in_slot
                  ? "green"
                  : celebrity.inventory_daymonth
                  ? "purple"
                  : "red"
              }
              onClick={() => onSelectDayMonth(celebrity)}
            >
              <h4>
                {celebrity.celebrity.birth_day}{" "}
                {(monthContext as Map<number, string>).get(
                  celebrity.celebrity.birth_month
                )}
              </h4>
              <h5>
                {celebrity.daymonth_in_slot
                  ? "In Slot"
                  : celebrity.inventory_daymonth
                  ? "In Inventory"
                  : "Not Owned"}
              </h5>
            </ItemContentInfoWrapper>
            <ItemContentInfoWrapper
              className={
                celebrity.year_in_slot
                  ? "green"
                  : celebrity.inventory_year
                  ? "purple"
                  : "red"
              }
              onClick={() => onSelectYear(celebrity)}
            >
              <h4>{celebrity.celebrity.birth_year}</h4>
              <h5>
                {celebrity.year_in_slot
                  ? "In Slot"
                  : celebrity.inventory_year
                  ? "In Inventory"
                  : "Not Owned"}
              </h5>
            </ItemContentInfoWrapper>
            <ItemContentInfoWrapper
              className={
                celebrity.category_in_slot
                  ? "green"
                  : celebrity.inventory_category
                  ? "purple"
                  : "red"
              }
              onClick={() => onSelectCategory(celebrity)}
            >
              {celebrity.celebrity.category && <h4>{celebrity.celebrity.category}</h4>}
              <h5>
                {celebrity.category_in_slot
                  ? "In Slot"
                  : celebrity.inventory_category
                  ? "In Inventory"
                  : "Not Owned"}
              </h5>
            </ItemContentInfoWrapper>
          </ItemContent>
        )}
      </MatchListItemWrapper>
    )
  );
};

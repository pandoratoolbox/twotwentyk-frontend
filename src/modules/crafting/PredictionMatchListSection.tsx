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
import { INftCardTrigger } from "../../models/nft_card_trigger";
import { INftCardIdentity } from "../../models/nft_card_identity";
import { INftCardCrafting } from "../../models/nft_card_crafting";

export const PredictionMatchListSection: React.FC<{
  selectedCards: {
    triggers: INftCardTrigger[] | null,
    identity: INftCardIdentity | null,
    crafting: INftCardCrafting | null
  };
}> = ({ selectedCards }) => {
const [triggerData, setTriggerData] = useState<ITrigger | null>(null);

  return (
    <MatchListSectionWrapper>
      <h2>Eligible Triggers</h2>
      {selectedCards.identity != null ? (
        <p>
          Only triggers relevant to selected identity are showing. Click to open item.
        </p>
      ) : (
        <div className="empty-matched">
          Choose an Identity card to see eligible triggers.
        </div>
      )}
      {selectedCards.identity !== null && (
        <MatchListGroup>
          {triggerList.map((item, key) => (
                <TriggerListItem key={key} {...item} />
              ))}
        </MatchListGroup>
      )}
    </MatchListSectionWrapper>
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

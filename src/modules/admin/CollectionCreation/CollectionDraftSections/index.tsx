import React from "react";
import { IconArrowUp } from "../../../../components";
import CardTypes from "./CollectionParameters/CardTypes";
import CardRarities from "./CollectionParameters/CardRarities";
import CardPackValue from "./CollectionParameters/CardPackValue";
import TriggerPrizePool from "./CollectionParameters/TriggerPrizePool";
import Standard from "./CardRarityProbability/Standard";
import Premium from "./CardRarityProbability/Premium";
import Elite from "./CardRarityProbability/Elite";

import {
  CDContainerWrapper,
  CDHead,
  CDCollectionParameterWrapper,
  FooterButtons,
} from "./styles";
import { ICardCollection } from "../../../../models/collection";

const CollectionDraftSections: React.FC<{collection: ICardCollection, onChange: (data: ICardCollection) => void}> = ({
  onChange,
  collection
}) => {
  return (
    <CDContainerWrapper>
      <CDCollectionParameterWrapper>
        <CDHead>
          <h3>Collection Parameters</h3>
          <IconArrowUp />
        </CDHead>
        <div className="cards">
          <CardTypes />
          <CardRarities />
        </div>
        <CardPackValue collection={collection} onChange={onChange} />
        <TriggerPrizePool collection={collection}/>

        <CDHead>
          <h3>Card rarity probability per pack </h3>
          <IconArrowUp />
        </CDHead>
        <Standard collection={collection}/>
      </CDCollectionParameterWrapper>
      <FooterButtons>
        <button className="btn-submit" onClick={() => {}}>Submit</button>
        <button className="btn-save" onClick={() => {}}>Save as Draft</button>
        <button className="btn-discard" onClick={() => {}}>Discard</button>
      </FooterButtons>
    </CDContainerWrapper>
  );
};

export default CollectionDraftSections;

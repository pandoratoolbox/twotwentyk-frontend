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

const CollectionDraftSections = () => {
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
        <CardPackValue />
        <TriggerPrizePool />

        <CDHead>
          <h3>Card rarity probability per pack </h3>
          <IconArrowUp />
        </CDHead>
        <Standard />
        <Premium />
        <Elite />
      </CDCollectionParameterWrapper>
      <FooterButtons>
        <button className="btn-submit">Submit</button>
        <button className="btn-save">Save as Draft</button>
        <button className="btn-discard">Discard</button>
      </FooterButtons>
    </CDContainerWrapper>
  );
};

export default CollectionDraftSections;

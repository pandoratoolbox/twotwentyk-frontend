import React, { useState, useEffect } from "react";
import { AdminSearchInput } from "../../../components";
import { AdminLayout } from "../../../layout";
import CollectionCreationTable from "../../../modules/admin/CollectionCreation/CollectionCreationTable";
import {
  CollectionCreationPageWrapper,
  CreateButton,
  PageActionWrapper,
} from "./styles";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";
import { ICardCollection } from "../../../models/card_collection";
import { useCardCollectionContext } from "../../../context";

export const CollectionCreationPage: React.FC = () => {
  const [filterValue, setFilterValue] = useState("");
  const { cardCollectionContext } = useCardCollectionContext()
  
  const navigate = useNavigate();

  const handleCreateCollection = () => {
    api.post("/card_collection", {})
    .then((response) => {
      let collection: ICardCollection = response.data
      navigate(`/admin/collection/${collection.id}/upload`)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleClick = (collection: ICardCollection) => {
    switch (collection.status) {
      case 0:
        navigate(`/admin/collection/${collection.id}/upload`)
        break;
      case 1:
        navigate(`/admin/collection/${collection.id}/config`)
        break;
      default:
        break;
    }
  }

  return (
    <AdminLayout>
      <CollectionCreationPageWrapper>
        <h1>Collection Creation</h1>
        <PageActionWrapper>
          <AdminSearchInput
            onChange={(e) => setFilterValue(e.target.value)}
            value={filterValue}
            bg="white"
          />
          <CreateButton onClick={() => {handleCreateCollection()}}>Add New Collection</CreateButton>
        </PageActionWrapper>
        <CollectionCreationTable data={cardCollectionContext ?? []} onClick={handleClick} />
      </CollectionCreationPageWrapper>
    </AdminLayout>
  );
};

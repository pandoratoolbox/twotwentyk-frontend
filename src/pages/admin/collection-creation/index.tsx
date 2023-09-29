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

export const CollectionCreationPage: React.FC = () => {
  const [filterValue, setFilterValue] = useState("");
  const [collections, setCollections] = useState([]); // [Collection]
  
  const navigate = useNavigate();

  const listCollections = () => {
    api.get("/card_collection")
    .then((response) => {
      setCollections(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }

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



  useEffect(() => {
    listCollections()
  }, []);
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
        <CollectionCreationTable data={collections} onClick={handleClick} />
      </CollectionCreationPageWrapper>
    </AdminLayout>
  );
};

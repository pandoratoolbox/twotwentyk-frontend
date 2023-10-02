import React, { useEffect, useState } from "react";
import {
  AdminSearchInput,
  IconArrowUp,
  IconThreeDot,
  IconFilter,
  TrashIcon,
  PencilAlt,
} from "../../../components";
import { AdminLayout } from "../../../layout";
import CollectionDraftSections from "../../../modules/admin/CollectionCreation/CollectionDraftSections";
import {
  CollectionCreationPageWrapper,
  CollectionHead,
  PageActionWrapper,
} from "./styles";
import api from "../../../config/api";
import { useNavigate, useParams } from "react-router-dom";
import { ICardCollection } from "../../../models/collection";

export const CollectionDraft: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [filterValue, setFilterValue] = useState("");
const [collection, setCollection] = useState<ICardCollection>();

useEffect(() => {
  api.get(`/card_collection/${params.collection_id}`).then((response) => {
    setCollection(response.data);
    if (response.data.status !== 1) {
      navigate("/admin/collection")
    }
  }
  ).catch((error) => {
    console.log(error);
  });
}
, [params]);

const handleChange = (e: any) => {
  
}


  return (
    <AdminLayout>
      {
      collection && (<CollectionCreationPageWrapper>
        <PageActionWrapper>
          <AdminSearchInput
            onChange={(e) => setFilterValue(e.target.value)}
            value={filterValue}
            bg="white"
          />
        </PageActionWrapper>
        <CollectionHead>
          <div>
            <h1>{collection.name} </h1>
            <IconArrowUp />
          </div>

          <div className="rightIcons">
            <IconThreeDot />
            <PencilAlt />
            <TrashIcon />
          </div>
        </CollectionHead>

        <CollectionDraftSections collection={collection} onChange={handleChange} />
      </CollectionCreationPageWrapper>)
}
    </AdminLayout>
  );
};

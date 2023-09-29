import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "../../../layout";
import { useEffect, useState } from "react";
import CollectionMetadataNeeded from "../../../modules/admin/CollectionCreation/CollectionMetadataNeeded";
import {
  CollectionCreationPageWrapper,
  CollectionHead,
} from "./styles";
import { ICardCollection } from "../../../models/card_collection";
import api from "../../../config/api";

export const CollectionMetaData: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [collection, setCollection] = useState<ICardCollection>();
  
  useEffect(() => {
    api.get(`/card_collection/${params.collection_id}`).then((response) => {
      setCollection(response.data);
      if (response.data.status !== 0) {
        navigate("/admin/collection")
      }
    }
    ).catch((error) => {
      console.log(error);
    });
  }, [params]);
  
  return (
    <AdminLayout>
      <CollectionCreationPageWrapper>
        <CollectionHead>
          <div>
            <h1>{collection?.name}</h1>
            <span>Metadata Needed</span>
          </div>
        </CollectionHead>

        <CollectionMetadataNeeded />
      </CollectionCreationPageWrapper>
    </AdminLayout>
  );
};

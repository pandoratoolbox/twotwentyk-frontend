import { AdminLayout } from "../../../layout";
import CollectionMetadataNeeded from "../../../modules/admin/CollectionCreation/CollectionMetadataNeeded";
import {
  CollectionCreationPageWrapper,
  CollectionHead,
} from "./styles";

export const CollectionMetaData: React.FC = () => {

  return (
    <AdminLayout>
      <CollectionCreationPageWrapper>
        <CollectionHead>
          <div>
            <h1>Conception Collection </h1>
            <span>Metadata Needed</span>
          </div>
        </CollectionHead>

        <CollectionMetadataNeeded />
      </CollectionCreationPageWrapper>
    </AdminLayout>
  );
};

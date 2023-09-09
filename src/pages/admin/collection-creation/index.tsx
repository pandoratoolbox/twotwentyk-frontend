import React, { useState } from "react";
import { AdminSearchInput } from "../../../components";
import { AdminLayout } from "../../../layout";
import CollectionCreationTable from "../../../modules/admin/CollectionCreation/CollectionCreationTable";
import {
  CollectionCreationPageWrapper,
  CreateButton,
  PageActionWrapper,
} from "./styles";

export const CollectionCreationPage: React.FC = () => {
  const [filterValue, setFilterValue] = useState("");

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
          <CreateButton>Add New Collection</CreateButton>
        </PageActionWrapper>
        <CollectionCreationTable />
      </CollectionCreationPageWrapper>
    </AdminLayout>
  );
};

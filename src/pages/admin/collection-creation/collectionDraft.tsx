import React, { useState } from "react";
import {
  AdminSearchInput,
  IconArrowUp,
  IconThreeDot,
  IconFilter,
} from "../../../components";
import { AdminLayout } from "../../../layout";
import CollectionCreationTable from "../../../modules/admin/CollectionCreationTable/CollectionCreationTable";
import {
  CollectionCreationPageWrapper,
  CollectionHead,
  PageActionWrapper,
} from "./styles";

export const CollectionDraft: React.FC = () => {
  const [filterValue, setFilterValue] = useState("");

  return (
    <AdminLayout>
      <CollectionCreationPageWrapper>
        <PageActionWrapper>
          <AdminSearchInput
            onChange={(e) => setFilterValue(e.target.value)}
            value={filterValue}
            bg="white"
          />
        </PageActionWrapper>
        <CollectionHead>
          <div>
            <h1>Conception Collection </h1>
            <IconArrowUp />
          </div>

          <div>
            <IconThreeDot />
            <IconFilter />
          </div>
        </CollectionHead>

        <CollectionCreationTable />
      </CollectionCreationPageWrapper>
    </AdminLayout>
  );
};

import React, { useState } from "react";
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

          <div className="rightIcons">
            <IconThreeDot />
            <PencilAlt />
            <TrashIcon />
          </div>
        </CollectionHead>

        <CollectionDraftSections />
      </CollectionCreationPageWrapper>
    </AdminLayout>
  );
};

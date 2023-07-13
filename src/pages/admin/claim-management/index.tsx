import React, { useState } from "react";
import { AdminLayout } from "../../../layout";
import {
  ClaimManagementPageWrapper,
  CreateButton,
  PageActionWrapper,
} from "./styles";
import { AdminSearchInput } from "../../../components";
import { ClaimManagementTable } from "../../../modules";

export const ClaimManagementPage: React.FC = () => {
  const [filterValue, setFilterValue] = useState("");

  return (
    <AdminLayout>
      <ClaimManagementPageWrapper>
        <h1>Claim Management</h1>
        <PageActionWrapper>
          <AdminSearchInput
            onChange={(e) => setFilterValue(e.target.value)}
            value={filterValue}
            bg="white"
          />
          <CreateButton>Create Post</CreateButton>
        </PageActionWrapper>
        <ClaimManagementTable filterValue={filterValue} />
      </ClaimManagementPageWrapper>
    </AdminLayout>
  );
};

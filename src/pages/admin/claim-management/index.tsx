import React, { useState, useEffect } from "react";
import { AdminLayout } from "../../../layout";
import {
  ClaimManagementPageWrapper,
  CreateButton,
  PageActionWrapper,
} from "./styles";
import { AdminSearchInput } from "../../../components";
import { ClaimManagementTable } from "../../../modules";
import { IClaim } from "../../../models/claim";
import api from "../../../config/api";

export const ClaimManagementPage: React.FC = () => {
  const [filterValue, setFilterValue] = useState("");

  const [claims, setClaims] = useState<IClaim[]>([]);

  const filterData = (query: string) => {
    return claims
        .map((item: IClaim) => ({
          ...item,
          statusStr:
            item.status === 0
              ? "requested"
              : item.status === 1
              ? "approved"
              : "rejected",
        }))
        .filter(
          (f: any) =>
            f.date.toLowerCase().includes(filterValue.toLowerCase()) ||
            f.predictions.toLowerCase().includes(filterValue.toLowerCase()) ||
            f.user.toLowerCase().includes(filterValue.toLowerCase()) ||
            f.statusStr.toLowerCase().includes(filterValue.toLowerCase())
        )
  }

  const fetchData = async () => {
    try {
      let res = await api.get<IClaim[]>("/claim");
      if (res.status === 200) {
        setClaims(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (claim: IClaim) => {
    try {
      let res = await api.put(`/claim/${claim.id}`, {
        status: 1,
      });
      if (res.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (claim: IClaim) => {
    try {
      let res = await api.put(`/claim/${claim.id}`, {
        status: 2,
      });
      if (res.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproveSelected = async (claims: IClaim[]) => {
    try {
      let res = await api.put(`/claim`, {
        status: 1,
        ids: claims.map((item) => item.id),
      });
      if (res.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectSelected = async (claims: IClaim[]) => {
    try {
      let ids = claims.map((item) => item.id);
      let res = await api.put(`/claim`, {
        status: 2,
        ids: ids,
      });
      if (res.status === 200) {
        let n: IClaim[] = []; 
        claims.forEach((item) => {
          if (ids.includes(item.id)) item.status = 2
          n.push(item)
        })
        setClaims(n);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

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
        <ClaimManagementTable allData={claims} onApprove={handleApprove} onApproveSelected={handleApproveSelected} onReject={handleReject} onRejectSelected={handleRejectSelected} />
      </ClaimManagementPageWrapper>
    </AdminLayout>
  );
};

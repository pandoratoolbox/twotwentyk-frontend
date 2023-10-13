import React, { useEffect, useState } from "react";
import { ClaimsSectionWrapper } from "./styles";
import { ClaimsTable } from "./ClaimsTable";
import { claimsData } from "./data";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { EmptyCards } from "../../../pages/app/dates/styles";
import { getClaim } from "../../../actions";
import { IClaim } from "../../../models/claim";

export const ClaimsSection: React.FC = () => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState<any>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resData = await getClaim();
    if (resData.success) {
      const tempData = resData.data.map((item: IClaim) => {
        return {
          id: item.id,
          created: item.created_at,
          event: item.article?.created_at ? item.article.created_at : "",
          submitted: item.created_at,
          identity: item.nft_prediction?.nft_identity?.celebrity_name,
          trigger: item.nft_trigger ?  item.nft_trigger.trigger : "",
          status: item.status,
        };
      });
      setAllData(tempData);
    }
  };

  return allData.length > 0 ? (
    <ClaimsSectionWrapper>
      <h2>Claims</h2>
      <ClaimsTable data={allData} />
    </ClaimsSectionWrapper>
  ) : (
    <EmptyCards>
      <h3>No Claims</h3>
      <p>You do not have any claims yet.</p>
      <Button className="buy-button" onClick={() => navigate("/marketplace/")}>
        GO TO PREDICTION
      </Button>
    </EmptyCards>
  );
};

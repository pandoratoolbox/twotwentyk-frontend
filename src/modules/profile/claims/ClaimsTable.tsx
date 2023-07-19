import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import {
  ClaimsTableWrapper,
  CliamsTableContainer,
  PaginatonWrapper,
  Status,
} from "./styles";

export const ClaimsTable: React.FC<{ data: any }> = ({ data }) => {
  const [allData, setAllData] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTableData(data.slice(0, 8));
    setAllData(data);
  }, [data]);

  const handlePagination = (number: number) => {
    setCurrentPage(number);
    setTableData(allData.slice(8 * (number - 1), 8 * (number - 1) + 8));
  };
  const renderStatus = (status: number) => {
    switch (status) {
      case 2:
        return (
          <Status color="#B01212" bg="#FFEBEB">
            Denied
          </Status>
        );
      case 3:
        return (
          <Status color="#1D74A5" bg="#D3EFFF">
            Paid
          </Status>
        );
      case 1:
        return (
          <Status color="#00632B" bg="#E8FCF1">
            Approved
          </Status>
        );
      case 0:
        return (
          <Status color="#976400" bg="#FFF5D5">
            Pending
          </Status>
        );

      default:
        return <>None</>;
    }
  };
  return (
    <>
      <CliamsTableContainer>
        <div>
          <ClaimsTableWrapper>
            <thead>
              <tr>
                <th>Prediction Created</th>
                <th>Event Date</th>
                <th>Claim Submitted</th>
                <th>Identity</th>
                <th>Trigger</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((item: any, key: number) => (
                  <tr key={key}>
                    <td>{item.created}</td>
                    <td>{item.event}</td>
                    <td>{item.submitted}</td>
                    <td className="identity">{item.identity}</td>
                    <td className="trigger">{item.trigger}</td>
                    <td>{renderStatus(item.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </ClaimsTableWrapper>
        </div>
      </CliamsTableContainer>
      <PaginatonWrapper>
        <p>
          Showing {currentPage} to 8 of {allData.length} results
        </p>{" "}
        <ResponsivePagination
          maxWidth={272}
          current={currentPage}
          total={Math.round(Number(allData.length / 8))}
          onPageChange={handlePagination}
        />
      </PaginatonWrapper>
    </>
  );
};

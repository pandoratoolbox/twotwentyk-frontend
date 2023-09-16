import React, { useEffect, useState } from "react";
import {
  AdminBadge,
  CMTableActionsWrapper,
  CMTableBodyWrapper,
  CMTableContainer,
  CMTableFooter,
  CMTableHeaderWrapper,
  CheckAllBox,
  ClaimManagementTableWrapper,
  MultiChecker,
  PageCounter,
  PaginationButton,
  TableActionButton,
  TableActionButtonWrapper,
  TableActions,
  TableFilter,
} from "./styles";
import {
  IconApprove,
  IconArrowDown,
  IconCheckboxFalse,
  IconCheckboxSome,
  IconCheckboxTrue,
  IconFilter,
  IconReject,
  IconTableSort,
  IconThreeDot,
} from "../../components";
import { IClaim } from "../../models/claim";

export const ClaimManagementTable: React.FC<{ allData: IClaim[], onApprove: (claim: IClaim) => void , onReject: (claim: IClaim) => void, onApproveSelected: (rows: IClaim[]) => void, onRejectSelected: (rows: IClaim[]) => void}> = ({
  allData,
  onApprove,
  onReject,
  onRejectSelected,
  onApproveSelected
}) => {
  const [tableData, setTableData] = useState<any>([]);
  // const [allData, setAllData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<IClaim[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sortKey, setSortKey] = useState({ name: "", count: 0 });
  const [selectedRows, setSelectedRows] = useState<Array<number>>([]);
 
  useEffect(() => {
    setFilteredData(allData);
  }, [allData]);

  useEffect(() => {
    setTotalPage(Math.ceil(filteredData.length / 15));
    setTableData(
      filteredData.slice(15 * (pageNumber - 1), 15 * (pageNumber - 1) + 15)
    );
  }, [filteredData, pageNumber, sortKey]);

  const handleSort = (sort: string) => {
    if (sort === sortKey.name) {
      setFilteredData((prev: any) => {
        if (sortKey.count === 0) {
          return prev.sort((a: any, b: any) =>
            sort === "status"
              ? b[sort] - a[sort]
              : b[sort].localeCompare(a[sort])
          );
        } else if (sortKey.count === 1) {
          return prev.sort((a: any, b: any) =>
            sort === "status"
              ? a[sort] - b[sort]
              : a[sort].localeCompare(b[sort])
          );
        } else return prev.sort((a: any, b: any) => a.id - b.id);
      });
      setSortKey((prev) => ({
        name: prev.count === 0 ? sort : prev.count === 1 ? sort : "",
        count: prev.count === 0 ? 1 : prev.count === 1 ? -1 : 0,
      }));
    } else {
      setFilteredData((prev: any) => {
        return prev.sort((a: any, b: any) => b[sort] - a[sort]);
      });
      setSortKey({
        name: sort,
        count: 1,
      });
    }
  };

  const handleApprove = (claim: IClaim) => {
    onApprove(claim)
  };

  const handleReject = (claim: IClaim) => {
    onReject(claim)
  };

  const handleApproveSelected = () => {
    let rows: IClaim[] = [];
    selectedRows.forEach((id) => {
      let claim = allData.find((f) => f.id === id);
      if (claim) {
        rows.push(claim);
      }
    });

    onApproveSelected(rows);
  }

  const handleRejectSelected = () => {
    let rows: IClaim[] = [];
    selectedRows.forEach((id) => {
      let claim = allData.find((f) => f.id === id);
      if (claim) {
        rows.push(claim);
      }
    });

    onRejectSelected(rows);
  }

  return (
    <ClaimManagementTableWrapper>
      <CMTableActionsWrapper>
        <MultiChecker>
          <CheckAllBox>
            <span
              onClick={() =>
                setSelectedRows((prev) =>
                  prev.length === filteredData.length
                    ? []
                    : filteredData.map((item: any) => item.id)
                )
              }
            >
              {selectedRows.length === 0 && <IconCheckboxFalse />}
              {selectedRows.length === filteredData.length && (
                <IconCheckboxTrue />
              )}
              {selectedRows.length > 0 &&
                selectedRows.length < filteredData.length && (
                  <IconCheckboxSome />
                )}
            </span>
            <IconArrowDown />
          </CheckAllBox>
          {selectedRows.length > 0 && (
            <TableActions>
              <div onClick={() => handleApproveSelected}>
                <IconApprove /> <span>Approve</span>
              </div>
              <div>
                <IconReject onClick={() => handleRejectSelected} />{" "}
                <span>Reject</span>
              </div>
            </TableActions>
          )}
        </MultiChecker>
        <TableFilter>
          <IconThreeDot />
          <IconFilter />
        </TableFilter>
      </CMTableActionsWrapper>
      <CMTableContainer>
        <CMTableHeaderWrapper>
          <tr>
            <th></th>
            <th style={{ width: 94 }}>
              <div onClick={() => handleSort("date")}>
                Date
                <span style={{ opacity: sortKey.name === "date" ? 1 : 0.3 }}>
                  <IconTableSort />
                </span>
              </div>
            </th>
            <th style={{ width: "40%" }}>
              <div onClick={() => handleSort("predictions")}>
                Predictions
                <span
                  style={{ opacity: sortKey.name === "predictions" ? 1 : 0.3 }}
                >
                  <IconTableSort />
                </span>
              </div>
            </th>
            <th>
              <div onClick={() => handleSort("user")}>
                User
                <span style={{ opacity: sortKey.name === "user" ? 1 : 0.3 }}>
                  <IconTableSort />
                </span>
              </div>
            </th>
            <th>
              <div onClick={() => handleSort("status")}>
                Status
                <span style={{ opacity: sortKey.name === "status" ? 1 : 0.3 }}>
                  <IconTableSort />
                </span>
              </div>
            </th>
            <th style={{ width: 200 }}></th>
          </tr>
        </CMTableHeaderWrapper>
        <CMTableBodyWrapper>
          {tableData.map((item: any, key: number) => (
            <tr key={key}>
              <td>
                <span
                  onClick={() =>
                    setSelectedRows((prev) =>
                      prev.filter((f) => f === item.id).length > 0
                        ? prev.filter((f) => f !== item.id)
                        : [...prev, item.id]
                    )
                  }
                >
                  {selectedRows.filter((f) => f === item.id).length > 0 ? (
                    <IconCheckboxTrue />
                  ) : (
                    <IconCheckboxFalse />
                  )}
                </span>
              </td>
              <td>{item.date}</td>
              <td>{item.predictions}</td>
              <td>{item.user}</td>
              <td>
                {item.status === 0 && "Requested"}
                {item.status === 1 && (
                  <AdminBadge color="#05BD7B">Approved</AdminBadge>
                )}
                {item.status === 2 && (
                  <AdminBadge color="#FF6D6D">Rejected</AdminBadge>
                )}
              </td>
              <td>
                <TableActionButtonWrapper>
                  <TableActionButton
                    onClick={() => handleApprove(item)}
                    className={`approve ${item.status !== 0 && "disabled"}`}
                  >
                    Approve
                  </TableActionButton>
                  <TableActionButton
                    onClick={() => handleReject(item)}
                    className={`reject  ${item.status !== 0 && "disabled"}`}
                  >
                    Reject
                  </TableActionButton>
                </TableActionButtonWrapper>
              </td>
            </tr>
          ))}
        </CMTableBodyWrapper>
      </CMTableContainer>
      <CMTableFooter>
        <PaginationButton
          disabled={pageNumber === 1 ? "true" : undefined}
          onClick={() => setPageNumber((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          Previous
        </PaginationButton>
        <PageCounter>
          {15 * (pageNumber - 1) + 1} - {15 * (pageNumber - 1) + 15} of{" "}
          {filteredData.length}
        </PageCounter>
        <PaginationButton
          disabled={pageNumber === totalPage ? "true" : undefined}
          onClick={() =>
            setPageNumber((prev) => (totalPage > prev ? prev + 1 : prev))
          }
        >
          Next
        </PaginationButton>
      </CMTableFooter>
    </ClaimManagementTableWrapper>
  );
};

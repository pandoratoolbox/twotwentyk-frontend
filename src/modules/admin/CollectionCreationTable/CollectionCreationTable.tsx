import React, { useState, useEffect } from "react";
import { IconTableSort, TrashIcon } from "../../../components";
import { collectionCreation } from "./data";
import {
  CCTableContainerWrapper,
  AdminBadge,
  CCTableContainer,
  CCTableHeaderWrapper,
  CCTableBodyWrapper,
} from "./styles";

const CollectionCreationTable = () => {
  const [allData, setAllData] = useState<any>([]);
  const [sortKey, setSortKey] = useState({ name: "", count: 0 });

  useEffect(() => {
    setAllData(collectionCreation.map((item, key) => ({ ...item, id: key })));
  }, []);

  return (
    <CCTableContainerWrapper>
      <CCTableContainer>
        <CCTableHeaderWrapper>
          <tr>
            <th>
              <div>
                Name
                <span style={{ opacity: sortKey.name === "name" ? 1 : 0.3 }}>
                  <IconTableSort />
                </span>
              </div>
            </th>
            <th>
              <div>
                Status
                <span style={{ opacity: sortKey.name === "status" ? 1 : 0.3 }}>
                  <IconTableSort />
                </span>
              </div>
            </th>
            <th>
              <div>
                Details
                <span style={{ opacity: sortKey.name === "details" ? 1 : 0.3 }}>
                  <IconTableSort />
                </span>
              </div>
            </th>

            <th></th>
          </tr>
        </CCTableHeaderWrapper>
        <CCTableBodyWrapper>
          {allData.map((item: any, key: number) => (
            <tr key={key}>
              <td>{item.name}</td>
              <td>
                {item.status === 0 && (
                  <AdminBadge color="#05BD7B">Live</AdminBadge>
                )}
                {item.status === 1 && (
                  <AdminBadge color="#0EA5E9">Draft</AdminBadge>
                )}
                {item.status === 2 && (
                  <AdminBadge color="#FF6D6D">MetaData Needed</AdminBadge>
                )}
                {item.status === 3 && (
                  <AdminBadge color="#E3A31C">Ready</AdminBadge>
                )}
              </td>
              <td>
                <span> {item.details}</span>
              </td>
              <td>
                <TrashIcon />
              </td>
            </tr>
          ))}
        </CCTableBodyWrapper>
      </CCTableContainer>
    </CCTableContainerWrapper>
  );
};

export default CollectionCreationTable;

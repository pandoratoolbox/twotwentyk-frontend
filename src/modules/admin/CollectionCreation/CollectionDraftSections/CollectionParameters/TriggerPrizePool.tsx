import React, { useState } from "react";
import { TrashIcon, PencilAlt, IconArrowUp } from "../../../../../components";
import {
  Card,
  CardHeader,
  CardBody,
  CardTable,
  CardTableHead,
  CardTableBody,
  CardTableTr,
  CardTableTd,
  CardTableTh,
  SaveButton,
} from "../styles";

type RowItem = {
  rowId: number;
  triggerType: string;
  prizePoolAmount: number;
};

const CollapsibleRow = ({
  rowData,
  isEditing,
  startEditing,
  updateRowData,
}: {
  rowData: RowItem;
  isEditing: boolean;
  startEditing: (rowId: number | null) => void;
  updateRowData: (rowId: number, updatedData: any) => void;
}) => {
  const { rowId, triggerType, prizePoolAmount } = rowData;

  const [formData, setFormData] = useState({
    prizePoolAmount: prizePoolAmount,
  });

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    updateRowData(rowId, { ...rowData, [name]: value });
  };

  // save handle
  const handleSave = () => {
    updateRowData(rowId, rowData);
    startEditing(null);
  };

  return (
    <CardTableTr>
      <CardTableTd>{triggerType}</CardTableTd>
      <CardTableTd>
        {isEditing ? (
          <input
            className="input-number"
            type="number"
            value={formData?.prizePoolAmount}
            onChange={handleSelectChange}
            name="prizePoolAmount"
          />
        ) : (
          prizePoolAmount
        )}
      </CardTableTd>

      <CardTableTd className="col-action">
        {isEditing ? (
          <>
            <SaveButton className="ml-auto" onClick={handleSave}>
              Save
            </SaveButton>
          </>
        ) : (
          <>
            <button
              className="svg-btn ml-auto"
              onClick={() => startEditing(rowId)}
            >
              <PencilAlt />
            </button>
          </>
        )}
      </CardTableTd>
    </CardTableTr>
  );
};

const TriggerPrizePool = () => {
  const [editingRow, setEditingRow] = useState<number | null>(null);

  // Sample data for your rows
  const rowDataList = [
    {
      rowId: 1,
      triggerType: "Minor Tier 1",
      prizePoolAmount: 6,
    },

    {
      rowId: 2,
      triggerType: "Minor Tier 2",
      prizePoolAmount: 13,
    },
    {
      rowId: 3,
      triggerType: "Major 1",
      prizePoolAmount: 6,
    },

    {
      rowId: 4,
      triggerType: "Major 2",
      prizePoolAmount: 13,
    },
  ];

  const updateRowData = (rowId: number, updatedData: RowItem) => {
    console.log(rowId, updatedData);
  };

  return (
    <Card>
      <CardHeader>
        Trigger prize pool amounts <IconArrowUp />
      </CardHeader>
      <CardBody>
        <CardTable>
          <CardTableHead>
            <CardTableTr>
              <CardTableTh className="TPPool-th">TRIGGER TYPE</CardTableTh>
              <CardTableTh className="TPPool-th">Prize Pool Amount</CardTableTh>

              <CardTableTh></CardTableTh>
            </CardTableTr>
          </CardTableHead>
          <CardTableBody>
            {rowDataList.map((rowData) => (
              <CollapsibleRow
                key={rowData.rowId}
                rowData={rowData}
                isEditing={rowData.rowId === editingRow}
                startEditing={setEditingRow}
                updateRowData={updateRowData}
              />
            ))}
          </CardTableBody>
        </CardTable>
      </CardBody>
    </Card>
  );
};

export default TriggerPrizePool;

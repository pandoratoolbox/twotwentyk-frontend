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
  Tabs,
} from "../styles";
import { ICardCollection } from "../../../../../models/collection";

type RowItem = {
  rowId: number;
  cardType: string;
  rarity: string;
  probability: number;
  triggerType?: string;
  triggerName?: string;
  rewType?: string;
  rewPackRarity?: string;
  regDefinition?: string;
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
  const {
    rowId,
    cardType,
    rarity,
    probability,
    triggerType,
    triggerName,
    rewType,
    rewPackRarity,
    regDefinition,
  } = rowData;

  const [formData, setFormData] = useState({
    probability: probability,
    rewType: rewType,
    rewPackRarity: rewPackRarity,
    regDefinition: regDefinition,
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
    <CardTableTr className="border-bottom">
      <CardTableTd>{cardType}</CardTableTd>
      <CardTableTd>{rarity}</CardTableTd>
      <CardTableTd>
        {isEditing ? (
          <input
            className="input-number"
            type="number"
            value={formData?.probability}
            onChange={handleSelectChange}
            name="probability"
          />
        ) : (
          `${probability}%`
        )}
      </CardTableTd>
      <CardTableTd>{triggerType}</CardTableTd>
      <CardTableTd>{triggerName}</CardTableTd>

      <CardTableTd>
        {isEditing ? (
          <input
            className="input-text"
            type="text"
            value={formData?.rewType}
            onChange={handleSelectChange}
            name="rewType"
          />
        ) : (
          rewType
        )}
      </CardTableTd>
      <CardTableTd>
        {isEditing ? (
          <input
            className="input-text"
            type="text"
            value={formData?.rewPackRarity}
            onChange={handleSelectChange}
            name="rewPackRarity"
          />
        ) : (
          rewPackRarity
        )}
      </CardTableTd>

      <CardTableTd>
        {isEditing ? (
          <input
            className="input-text"
            type="text"
            value={formData?.regDefinition}
            onChange={handleSelectChange}
            name="regDefinition"
          />
        ) : (
          regDefinition
        )}
      </CardTableTd>

      <CardTableTd className="col-action">
        {isEditing ? (
          <>
            <SaveButton className="ml-auto" onClick={handleSave}>
              Save
            </SaveButton>
            <button className="svg-btn">
              <TrashIcon />
            </button>
          </>
        ) : (
          <>
            <button
              className="svg-btn ml-auto"
              onClick={() => startEditing(rowId)}
            >
              <PencilAlt />
            </button>
            <button className="svg-btn">
              <TrashIcon />
            </button>
          </>
        )}
      </CardTableTd>
    </CardTableTr>
  );
};

const Standard = ({ collection }: { collection: ICardCollection }) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("Day & Month");

  const dayAndMonthData = [
    {
      rowId: 1,
      cardType: "Day & Month",
      rarity: "Core",
      probability: 10,
    },
    {
      rowId: 2,
      cardType: "Day & Month",
      rarity: "Uncommon",
      probability: 10,
    },
    {
      rowId: 3,
      cardType: "Day & Month",
      rarity: "Rare",
      probability: 10,
    },
  ];

  const yearData = [
    {
      rowId: 1,
      cardType: "Year",
      rarity: "Core",
      probability: 10,
    },
    {
      rowId: 2,
      cardType: "Year",
      rarity: "Uncommon",
      probability: 10,
    },
    {
      rowId: 3,
      cardType: "Year",
      rarity: "Rare",
      probability: 10,
    },
  ];

  const categoryData = [
    {
      rowId: 1,
      cardType: "Category",
      rarity: "Core",
      probability: 10,
    },
    {
      rowId: 2,
      cardType: "Category",
      rarity: "Uncommon",
      probability: 10,
    },
    {
      rowId: 3,
      cardType: "Category",
      rarity: "Rare",
      probability: 10,
    },
  ];
  const triggerData = [
    {
      rowId: 1,
      cardType: "Trigger",
      rarity: "Core",
      probability: 3,
      triggerType: "Major 1",
      triggerName: "--",
      rewType: "Cash",
      rewPackRarity: "",
      regDefinition: "0.9%",
    },
    {
      rowId: 2,
      cardType: "Trigger",
      rarity: "Core",
      probability: 8,
      triggerType: "Major 2",
      triggerName: "--",
      rewType: "Card Pack",
      rewPackRarity: "Standard",
      regDefinition: "0",
    },
  ];

  const updateRowData = (rowId: number, updatedData: RowItem) => {
    console.log(rowId, updatedData);
  };

  return (
    <Card>
      <CardHeader>
        Probabilities <IconArrowUp />
      </CardHeader>
      <CardBody>
        <Tabs>
          <div className="tabs-button">
            <button
              className={`tab ${activeTab === "Day & Month" ? "active" : ""}`}
              onClick={() => setActiveTab("Day & Month")}
            >
              Day & Month
              <span>35%</span>
            </button>
            <button
              className={`tab ${activeTab === "Year" ? "active" : ""}`}
              onClick={() => setActiveTab("Year")}
            >
              Year
              <span>25%</span>
            </button>
            <button
              className={`tab ${activeTab === "Category" ? "active" : ""}`}
              onClick={() => setActiveTab("Category")}
            >
              Category
              <span>25%</span>
            </button>
            <button
              className={`tab ${activeTab === "Trigger" ? "active" : ""}`}
              onClick={() => setActiveTab("Trigger")}
            >
              Trigger
              <span>25%</span>
            </button>
          </div>
          <div className="total-summary">
            <p>
              TOTAL PERCENTAGE SUMMARY: <span>100%</span>{" "}
            </p>
          </div>
        </Tabs>

        <CardTable>
          <CardTableHead>
            <CardTableTr>
              <CardTableTh className="TPPool-th">Card Type</CardTableTh>
              <CardTableTh className="TPPool-th">Rarity</CardTableTh>
              <CardTableTh className="TPPool-th">Probability</CardTableTh>
              {activeTab === "Trigger" && (
                <>
                  <CardTableTh className="TPPool-th">TRIGGER TYPE</CardTableTh>
                  <CardTableTh className="TPPool-th">TRIGGER NAME</CardTableTh>
                  <CardTableTh className="TPPool-th">rew. Type</CardTableTh>
                  <CardTableTh className="TPPool-th">
                    rew. Pack rarity
                  </CardTableTh>
                  <CardTableTh className="TPPool-th">
                    reg. definition
                  </CardTableTh>
                </>
              )}
              <CardTableTh></CardTableTh>
            </CardTableTr>
          </CardTableHead>
          <CardTableBody>
            {activeTab === "Day & Month" &&
              dayAndMonthData.map((rowData) => (
                <CollapsibleRow
                  key={rowData.rowId}
                  rowData={rowData}
                  isEditing={rowData.rowId === editingRow}
                  startEditing={setEditingRow}
                  updateRowData={updateRowData}
                />
              ))}
            {activeTab === "Year" &&
              yearData.map((rowData) => (
                <CollapsibleRow
                  key={rowData.rowId}
                  rowData={rowData}
                  isEditing={rowData.rowId === editingRow}
                  startEditing={setEditingRow}
                  updateRowData={updateRowData}
                />
              ))}
            {activeTab === "Category" &&
              categoryData.map((rowData) => (
                <CollapsibleRow
                  key={rowData.rowId}
                  rowData={rowData}
                  isEditing={rowData.rowId === editingRow}
                  startEditing={setEditingRow}
                  updateRowData={updateRowData}
                />
              ))}
            {activeTab === "Trigger" &&
              triggerData.map((rowData) => (
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

export default Standard;

import React, { useState } from "react";
import {
  TrashIcon,
  PencilAlt,
  IconArrowUp,
  IconArrowDown,
} from "../../../../../components";
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

type CollapsedRows = {
  [key: number]: boolean;
};

type RowItem = {
  rowId: number;
  packType: string;
  cardsPerPack: number;
  packsQty: number;
  price: number;
  guarRarity: string;
  guarQtyRarity: number;
  cardType: string[];
  guarQtyCardType: number[];
};

const CollapsibleRow = ({
  rowData,
  isExpanded,
  toggleCollapse,
  isEditing,
  startEditing,
  updateRowData,
}: {
  rowData: RowItem;
  isExpanded: boolean;
  toggleCollapse: (rowId: number) => void;
  isEditing: boolean;
  startEditing: (rowId: number | null) => void;
  updateRowData: (rowId: number, updatedData: any) => void;
}) => {
  const {
    rowId,
    packType,
    cardsPerPack,
    packsQty,
    price,
    guarRarity,
    guarQtyRarity,
    cardType,
    guarQtyCardType,
  } = rowData;

  const [formData, setFormData] = useState({
    packType: packType,
    cardsPerPack: cardsPerPack,
    packsQty: packsQty,
    price: price,
    guarRarity: guarRarity,
    guarQtyRarity: guarQtyRarity,
    cardType: cardType,
    guarQtyCardType: guarQtyCardType,
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
    toggleCollapse(rowId);
    updateRowData(rowId, rowData);
    startEditing(null);
  };

  return (
    <CardTableTr className={isExpanded ? "rowCollapsed" : ""}>
      <CardTableTd>
        {isEditing ? (
          <select
            name="packType"
            value={formData?.packType}
            onChange={handleSelectChange}
          >
            <option value="Standard">Standard</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
          </select>
        ) : (
          packType
        )}
      </CardTableTd>
      <CardTableTd>
        {isEditing ? (
          <input
            className="input-number"
            type="number"
            value={formData?.cardsPerPack}
            onChange={handleSelectChange}
            name="cardsPerPack"
          />
        ) : (
          cardsPerPack
        )}
      </CardTableTd>
      <CardTableTd>
        {isEditing ? (
          <input
            className="input-number"
            type="number"
            value={formData?.packsQty}
            onChange={handleSelectChange}
            name="packsQty"

            // onChange={(e) =>
            //   updateRowData(rowId, {
            //     ...rowData,
            //     packsQty: Number(e.target.value),
            //   })
            // }
          />
        ) : (
          packsQty
        )}
      </CardTableTd>
      <CardTableTd>
        {isEditing ? (
          <input
            className="input-number"
            type="number"
            value={price}
            onChange={handleSelectChange}
            name="price"
          />
        ) : (
          `$${price}`
        )}
      </CardTableTd>
      <CardTableTd>
        {isEditing ? (
          <select
            name="guarRarity"
            value={formData?.guarRarity}
            onChange={handleSelectChange}
          >
            <option value="Core">Core</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
          </select>
        ) : (
          guarRarity
        )}
      </CardTableTd>
      <CardTableTd>
        {isEditing ? (
          <input
            className="input-number"
            type="number"
            value={formData?.guarQtyRarity}
            onChange={handleSelectChange}
            name="guarQtyRarity"
          />
        ) : (
          guarQtyRarity
        )}
      </CardTableTd>
      <CardTableTd className="col-btn">
        {!isEditing && (
          <button
            className={isExpanded ? "expanded" : "collapsed"}
            onClick={() => toggleCollapse(rowId)}
          >
            See Details
          </button>
        )}

        <ul
          className={`collapsible-row-content ${
            isExpanded ? "expanded" : "collapsed"
          }`}
        >
          {cardType?.map((type, index) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
      </CardTableTd>
      <CardTableTd className="col-btn">
        {!isEditing && (
          <button
            className={isExpanded ? "expanded" : "collapsed"}
            onClick={() => toggleCollapse(rowId)}
          >
            {isExpanded ? <IconArrowUp /> : <IconArrowDown />}
          </button>
        )}

        <ul
          className={`collapsible-row-content ${
            isExpanded ? "expanded" : "collapsed"
          }`}
        >
          {guarQtyCardType?.map((qty, index) =>
            isEditing ? (
              <li key={index} className="edit-list">
                <input
                  className="input-number"
                  type="number"
                  value={qty}
                  onChange={handleSelectChange}
                  name={cardType[index]}
                />
              </li>
            ) : (
              <li key={index}>{qty}</li>
            )
          )}
        </ul>
      </CardTableTd>
      <CardTableTd className="col-action">
        {isEditing ? (
          <>
            <SaveButton onClick={handleSave}>Save</SaveButton>
            <button className="svg-btn">
              <TrashIcon />
            </button>
          </>
        ) : (
          <>
            <button
              className="svg-btn"
              onClick={() => {
                toggleCollapse(rowId);
                startEditing(rowId);
              }}
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


// Sample data for your rows
const rowDataList = [
  {
    rowId: 1,
    packType: "Standard",
    cardsPerPack: 6,
    packsQty: 10000,
    price: 5,
    guarRarity: "Core",
    guarQtyRarity: 4,
    cardType: ["Day & Month", "Year", "Category", "Crafting"],
    guarQtyCardType: [1, 3, 0, 0],
  },

  {
    rowId: 2,
    packType: "Premium",
    cardsPerPack: 13,
    packsQty: 20000,
    price: 25,
    guarRarity: "Core",
    guarQtyRarity: 2,
    cardType: ["Day & Month", "Year", "Category", "Crafting"],
    guarQtyCardType: [0, 0, 1, 0],
  },
];

const CardPackValue = () => {
  const [collapsedRows, setCollapsedRows] = useState<CollapsedRows>({});
  const [editingRow, setEditingRow] = useState<number | null>(null);

  const toggleCollapse = (rowId: number) => {
    setCollapsedRows({
      ...collapsedRows,
      [rowId]: !collapsedRows[rowId],
    });
  };

  const updateRowData = (rowId: number, updatedData: RowItem) => {
    console.log(rowId, updatedData);
  };

  return (
    <Card>
      <CardHeader>Card Pack Values/Specification <IconArrowUp /> </CardHeader>
      <CardBody>
        <CardTable>
          <CardTableHead>
            <CardTableTr>
              <CardTableTh>PACK TYPE</CardTableTh>
              <CardTableTh>CARDS PER PACK</CardTableTh>
              <CardTableTh>PACKS QTY</CardTableTh>
              <CardTableTh>price </CardTableTh>
              <CardTableTh>guar. rarity</CardTableTh>
              <CardTableTh>guar. QTY/rarity</CardTableTh>
              <CardTableTh>card type</CardTableTh>
              <CardTableTh>guar. QTY/card type</CardTableTh>
              <CardTableTh></CardTableTh>
            </CardTableTr>
          </CardTableHead>
          <CardTableBody>
            {rowDataList.map((rowData) => (
              <CollapsibleRow
                key={rowData.rowId}
                rowData={rowData}
                isExpanded={collapsedRows[rowData.rowId]}
                toggleCollapse={toggleCollapse}
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

export default CardPackValue;

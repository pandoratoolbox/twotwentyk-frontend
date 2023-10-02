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
import { CardTypeValue, ICardSeries, ICardCollection } from "../../../../../models/collection";

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
  rowData: ICardSeries;
  isExpanded: boolean;
  toggleCollapse: (rowId: number) => void;
  isEditing: boolean;
  startEditing: (rowId: number | null) => void;
  updateRowData: (rowId: number, updatedData: any) => void;
}) => {
  const {
    id,
    name, //tier
    cards_per_pack,
    card_pack_quantity,
    cost_usd,
  } = rowData;
  
  const guaranteed: CardTypeValue = {
    core: {
      day_month: 0,
      year: 0,
      trigger: {
        amount: 0,
      },
      category: 0,
      crafting: 0,
    },
    premium: {
      day_month: 0,
      year: 0,
      trigger: {
        amount: 0,
      },
      category: 0,
      crafting: 0,
    },
    elite: {
      day_month: 0,
      year: 0,
      trigger: {
        amount: 0,
      },
      category: 0,
      crafting: 0,
    },
  }
  const calculateTotalGuaranteed = (v: CardTypeValue) => {
    return v.category + v.day_month + v.year + v.trigger.amount;
  }


  const [formData, setFormData] = useState({
    cardsPerPack: cards_per_pack,
    packsQty: card_pack_quantity,
    price: cost_usd,
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
    updateRowData(id ? id : 0, { ...rowData, [name]: value });
  };

  // save handle
  const handleSave = () => {
    toggleCollapse(id ? id : 0);
    updateRowData(id ? id : 0, rowData);
    startEditing(null);
  };

  return (
    <CardTableTr className={isExpanded ? "rowCollapsed" : ""}>
      <CardTableTd>
          {name}
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
          cards_per_pack
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
          card_pack_quantity
        )}
      </CardTableTd>
      <CardTableTd>
        {isEditing ? (
          <input
            className="input-number"
            type="number"
            value={cost_usd}
            onChange={handleSelectChange}
            name="price"
          />
        ) : (
          `$${cost_usd}`
        )}
      </CardTableTd>

      {/* <div id="guaranteed"> */}
      <CardTableTd>
        Core
      </CardTableTd>
      <CardTableTd>
          {calculateTotalGuaranteed(guaranteed.core)}
      </CardTableTd>
      <CardTableTd className="col-btn">
        {!isEditing && (
          <button
            className={isExpanded ? "expanded" : "collapsed"}
            onClick={() => toggleCollapse(id ? id : 0)}
          >
            See Details
          </button>
        )}

        <ul
          className={`collapsible-row-content ${
            isExpanded ? "expanded" : "collapsed"
          }`}
        >
            <li key={0}>Day & Month</li>
            <li key={1}>Year</li>
            <li key={2}>Trigger</li>
            <li key={3}>Category</li>
            <li key={4}>Crafting</li>
        </ul>
      </CardTableTd>
      <CardTableTd className="col-btn">
        {!isEditing && (
          <button
            className={isExpanded ? "expanded" : "collapsed"}
            onClick={() => toggleCollapse(id ? id : 0)}
          >
            {isExpanded ? <IconArrowUp /> : <IconArrowDown />}
          </button>
        )}

        <ul
          className={`collapsible-row-content ${
            isExpanded ? "expanded" : "collapsed"
          }`}
        >
          { isEditing ? (
              <li key={0} className="edit-list">
                <input
                  className="input-number"
                  type="number"
                  value={guaranteed.core.day_month}
                  onChange={handleSelectChange}
                  name={"day_month"}
                />
              </li>
            ) : (
              <li key={0}>{guaranteed.core.day_month}</li>
            )}
        </ul>
      </CardTableTd>
      {/* </div> */}
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
                toggleCollapse(id ? id : 0);
                startEditing(id ? id : 0);
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

const CardPackValue: React.FC<{
  collection: ICardCollection;
  onChange: (data: ICardCollection) => void;
}> = ({
  collection,
  onChange
}) => {
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
            {collection.card_series && collection.card_series.map((rowData) => (
              <CollapsibleRow
                key={rowData.id}
                rowData={rowData}
                isExpanded={rowData.id ? collapsedRows[rowData.id] : false}
                toggleCollapse={toggleCollapse}
                isEditing={rowData.id === editingRow}
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

import React, { useState } from "react";
import { TrashIcon, PencilAlt } from "../../../../../components";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Entries,
  EntryAction,
  SaveButton,
} from "../styles";

const Rarities = [
  { id: 1, name: "Rare" },
  { id: 2, name: "Uncommon" },
  { id: 3, name: "Core" },
];

const CardRarities = () => {
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [editedText, setEditedText] = useState<{ [key: number]: string }>({});

  // Create a mapping of id values to array indices
  const idToIndexMap: { [key: number]: number } = {};
  Rarities.forEach((type, index) => {
    idToIndexMap[type.id] = index;
  });

  const handleEditClick = (id: number) => {
    const index = idToIndexMap[id];
    const newEditModes = { ...editMode };
    newEditModes[id] = true;
    setEditMode(newEditModes);

    // Set the edited text to the current text
    const newEditedText = { ...editedText };
    newEditedText[id] = Rarities[index].name;
    setEditedText(newEditedText);
  };

  const handleSaveClick = (id: number) => {
    const index = idToIndexMap[id];
    const newEditModes = { ...editMode };
    newEditModes[id] = false;
    setEditMode(newEditModes);

    // Update the Rarities array with the edited text
    const newRarities = [...Rarities];
    newRarities[index].name = editedText[id];
    // Send the updated data to your API or state management here if needed.

    // Clear the edited text
    const newEditedText = { ...editedText };
    newEditedText[id] = "";
    setEditedText(newEditedText);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newEditedText = { ...editedText };
    newEditedText[id] = event.target.value;
    setEditedText(newEditedText);
  };

  return (
    <Card>
      <CardHeader>Card Rarities</CardHeader>
      <CardBody>
        <Entries>
          {Rarities?.map((rarity, index) => (
            <li key={rarity.id}>
              {editMode[rarity.id] ? (
                <input
                  type="text"
                  className="input-text"
                  value={editedText[rarity.id]}
                  onChange={(e) => handleInputChange(e, rarity.id)}
                />
              ) : (
                <span>{rarity?.name}</span>
              )}
              <EntryAction>
                {editMode[rarity.id] ? (
                  <SaveButton onClick={() => handleSaveClick(rarity.id)}>
                    Save
                  </SaveButton>
                ) : (
                  <button
                    className="svg-btn"
                    onClick={() => handleEditClick(rarity.id)}
                  >
                    <PencilAlt />
                  </button>
                )}
                <TrashIcon />
              </EntryAction>
            </li>
          ))}
        </Entries>
      </CardBody>
      <CardFooter>
        <div className="newEntry">
          <span>+</span>
          <p>New entry</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardRarities;

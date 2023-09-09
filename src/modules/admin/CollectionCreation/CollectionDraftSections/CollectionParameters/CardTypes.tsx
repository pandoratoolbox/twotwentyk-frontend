import React, { useState } from "react";
import { TrashIcon, PencilAlt } from "../../../../../components";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Entries,
  EntryAction,
  SaveButton
} from "../styles";

const Types = [
  { id: 1, name: "Day & Month" },
  { id: 2, name: "Year" },
  { id: 3, name: "Trigger" },
  { id: 4, name: "Category" },
  { id: 5, name: "Crafting" },
];

const CardTypes = () => {
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [editedText, setEditedText] = useState<{ [key: number]: string }>({});

  // Create a mapping of id values to array indices
  const idToIndexMap: { [key: number]: number } = {};
  Types.forEach((type, index) => {
    idToIndexMap[type.id] = index;
  });

  const handleEditClick = (id: number) => {
    const index = idToIndexMap[id];
    const newEditModes = { ...editMode };
    newEditModes[id] = true;
    setEditMode(newEditModes);

    // Set the edited text to the current text
    const newEditedText = { ...editedText };
    newEditedText[id] = Types[index].name;
    setEditedText(newEditedText);
  };

  const handleSaveClick = (id: number) => {
    const index = idToIndexMap[id];
    const newEditModes = { ...editMode };
    newEditModes[id] = false;
    setEditMode(newEditModes);

    // Update the Types array with the edited text
    const newTypes = [...Types];
    newTypes[index].name = editedText[id];
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
      <CardHeader>Card Types</CardHeader>
      <CardBody>
        <Entries>
          {Types?.map((type) => (
            <li key={type.id}>
              {editMode[type.id] ? (
                <input
                  type="text"
                  className="input-text"
                  value={editedText[type.id]}
                  onChange={(e) => handleInputChange(e, type.id)}
                />
              ) : (
                <span>{type?.name}</span>
              )}
              <EntryAction>
                {editMode[type.id] ? (
                  <SaveButton onClick={() => handleSaveClick(type.id)}>
                    Save
                  </SaveButton>
                ) : (
                  <button
                    className="svg-btn"
                    onClick={() => handleEditClick(type.id)}
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

export default CardTypes;

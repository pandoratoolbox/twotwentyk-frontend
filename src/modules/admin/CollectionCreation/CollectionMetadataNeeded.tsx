import React, { useState } from "react";
import { CMContainerWrapper, FooterButtons } from "./styles";
import api from "../../../config/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CollectionMetadataNeeded = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [triggersFile, setTriggersFile] = useState<File | null>(null);
  const [celebritiesFile, setCelebritiesFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (event.target.id === "triggersFile") {
      if (file && (file.name.endsWith(".csv") || file.name.endsWith(".xls") || file.name.endsWith(".xlsx"))) {
        setTriggersFile(file);
        // You can perform further actions with the .xlsx file here
      } else {
        toast.error("Please select a valid .csv, .xls or .xlsx file.");
      }
    }

    if (event.target.id === "celebritiesFile") {
      if (file && (file.name.endsWith(".csv") || file.name.endsWith(".xls") || file.name.endsWith(".xlsx"))) {
        setCelebritiesFile(file);
        // You can perform further actions with the .xlsx file here
      } else {
        toast.error("Please select a valid .csv, .xls or .xlsx file.");
      }
    }
  };

  const handleSubmit = () => {
    if (triggersFile === null || celebritiesFile === null) {
      toast.error("Please select both files.");
      return;
    }
    // You can perform further actions with the selected files here
    var formData = new FormData();
    formData.append("triggers", triggersFile as Blob);
    formData.append("celebrities", celebritiesFile as Blob);

    api.post(`/card_collection/${params.collection_id}/metadata`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
        }})
    .then((response) => {
      console.log(response)
      navigate(`/admin/collection/${params.collection_id}/config`)
    })
    .catch((error) => {
      console.log(error);
    });

  }


  return (
    <CMContainerWrapper>
      <div className="upload">
        <h3>{triggersFile ? `File selected: ${triggersFile.name}` : "Upload Trigger List"}</h3>
        <p>.xlsx, .xls or .csv file</p>
        <label htmlFor="triggersFile">{triggersFile ? "Select File" : "Select File"}</label>
        <input
          type="file"
          id="triggersFile"
          // accept=".xlsx, .xls, .csv"
          onChange={handleFileChange}
          className="custom-file-input"
        />
      </div>
      <div className="upload">
      <h3>{celebritiesFile ? `File selected: ${celebritiesFile.name}` : "Upload Celebrity List"}</h3>
        <p>.xlsx, .xls or .csv file</p>
        <label htmlFor="celebritiesFile">{celebritiesFile ? "Select File" : "Select File"}</label>
        <input
          type="file"
          id="celebritiesFile"
          accept=".csv, .xls"
          onChange={handleFileChange}
          className="custom-file-input"
        />
      </div>

      <FooterButtons>
        <button className="btn-submit" onClick={handleSubmit}>Submit</button>
        <button className="btn-discard">Discard</button>
      </FooterButtons>
      {/* Display the selected files or additional components here */}
    </CMContainerWrapper>
  );
};

export default CollectionMetadataNeeded;

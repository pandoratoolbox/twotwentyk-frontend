import React, { useState } from "react";
import { CMContainerWrapper, FooterButtons } from "./styles";

const CollectionMetadataNeeded = () => {
  const [xlsxFile, setXlsxFile] = useState<File | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleXlsxFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.name.endsWith(".xlsx")) {
      setXlsxFile(file);
      // You can perform further actions with the .xlsx file here
    } else {
      alert("Please select a valid .xlsx file.");
    }
  };

  const handleCsvFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && (file.name.endsWith(".csv") || file.name.endsWith(".xls"))) {
      setCsvFile(file);
      // You can perform further actions with the .csv or .xls file here
    } else {
      alert("Please select a valid .csv or .xls file.");
    }
  };

  return (
    <CMContainerWrapper>
      <div className="upload">
        <h3>Upload Trigger List</h3>
        <p>.xlsx, .xls or .csv file</p>
        <label htmlFor="xlsxFile">Select File</label>
        <input
          type="file"
          id="xlsxFile"
          accept=".xlsx"
          onChange={handleXlsxFileChange}
          className="custom-file-input"
        />
      </div>
      <div className="upload">
        <h3>Upload Collection Metadata</h3>
        <p>.xlsx, .xls or .csv file</p>

        <label htmlFor="csvFile">Select File</label>
        <input
          type="file"
          id="csvFile"
          accept=".csv, .xls"
          onChange={handleCsvFileChange}
          className="custom-file-input"
        />
      </div>

      <FooterButtons>
        <button className="btn-submit">Submit</button>
        <button className="btn-discard">Discard</button>
      </FooterButtons>
      {/* Display the selected files or additional components here */}
    </CMContainerWrapper>
  );
};

export default CollectionMetadataNeeded;

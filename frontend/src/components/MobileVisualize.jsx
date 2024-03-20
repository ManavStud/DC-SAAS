import React, { useState } from "react";
import Graph from "react-graph-vis";
import axios from "axios";

function MobileVisualize() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("apk_file", selectedFile);

    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "/extract_manifest",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="pt-32">
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="apk_file">Select an APK file:</label>
        <input type="file" id="apk_file" onChange={handleFileInputChange} />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Analyze
        </button>
      </form>

      {data && (
        <div>
          <h3>Analysis Results:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default MobileVisualize;

import React, { useState } from "react";
import axios from "axios";

function MobSfJava() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("java_file", selectedFile);

    setIsLoading(true);

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/scan_java",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="pt-28 text-4xl font-bold mb-8">MobSF Scanner</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col items-center">
        <label className="mb-4 text-lg">
          Upload a Java file to analyze:
          <input
            type="file"
            onChange={handleFileInputChange}
            className="border-2 rounded-lg px-2 py-1 ml-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <span>
              <i className="fa fa-spinner fa-spin"></i> Analyzing...
            </span>
          ) : (
            <span>Analyze</span>
          )}
        </button>
      </form>
      {/* {analysisResult } */}
    </div>
  );
}

export default MobSfJava;

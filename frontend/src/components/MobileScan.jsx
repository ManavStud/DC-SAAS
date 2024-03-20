import { profileUser } from "./api/service";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MobileScan() {

   let token = localStorage.getItem("token"); 
   const navigate = useNavigate(); 
   const profileInit = () => { 
     profileUser(token).then((req, res) => { 
       if (req.data.status !== "failed") { 
         console.log(req.data); 
       } else { 
         navigate("/login"); 
       } 
     }); 
   }; 
  
   useEffect(() => { 
     profileInit(); 
   }, []);

  const [inputFile, setInputFile] = useState(null);
  const [outputData, setOutputData] = useState(null);

  const handleFileChange = (event) => {
    setInputFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("apk_file", inputFile);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/scan",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setOutputData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pt-32">
      <h1>Androguard Vulnerabilities Checker</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Check Vulnerabilities</button>
      </form>
      {outputData && (
        <div>
          <h2>Output:</h2>
          <pre>{JSON.stringify(outputData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default MobileScan;

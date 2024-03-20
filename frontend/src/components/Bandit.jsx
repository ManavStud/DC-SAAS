import { profileUser } from "./api/service";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Circles } from "react-loader-spinner";

function Bandit() {

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

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  // const [result, setResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(
        process.env.REACT_APP_NODE_API_BASE_URL + "/upload-bandit",
        formData
      )
      .then((response) => {
        setIsLoading(false);
        setMessage(response.data);
      })
      .catch((error) => {
        setMessage("");
      });
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="pt-28 text-4xl font-bold mb-8">Bandit</h1>
      <div>
        <label htmlFor="file-input">Choose a file: </label>
        <input id="file-input" type="file" onChange={handleFileInputChange} />
      </div>
      <br />
      <Circles
        height="80"
        width="80"
        color="#3b82f6"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={isLoading}
      />
      <br />
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        disabled={isLoading}
        onClick={handleFormSubmit}
      >
        Analyze
      </button>
      {message && <pre className="pt-12">Result: {message}</pre>}
      {/* {result && (
        <pre className="p-8">
          Test results:
          <br />
          Issue: [B311:blacklist] Standard pseudo-random generators are not
          suitable for security/cryptographic purposes.
          <br />
          Severity: Low Confidence: High
          <br />
          Location: test.py:58
          <br />
          57 <br />
          58 foodx = round(random.randrange(0, dis_width - snake_block) / 10.0)
          * 10.0
          <br />
          59 foody = round(random.randrange(0, dis_height - snake_block) / 10.0)
          * 10.0
          <br />
          --------------------------------------------------
          <br />
          Issue: [B311:blacklist] Standard pseudo-random generators are not
          suitable for security/cryptographic purposes.
          <br />
          Severity: Low Confidence: High
          <br />
          Location: test.py:59
          <br />
          58 foodx = round(random.randrange(0, dis_width - snake_block) / 10.0)
          * 10.0
          <br />
          59 foody = round(random.randrange(0, dis_height - snake_block) / 10.0)
          * 10.0
          <br />
          60 <br />
          <br />
          --------------------------------------------------
          <br />
          Issue: [B311:blacklist] Standard pseudo-random generators are not
          suitable for security/cryptographic purposes.
          <br />
          Severity: Low Confidence: High
          <br />
          Location: test.py:117
          <br />
          116 if x1 == foodx and y1 == foody:
          <br />
          117 foodx = round(random.randrange(0, dis_width - snake_block) / 10.0)
          * 10.0
          <br />
          118 foody = round(random.randrange(0, dis_height - snake_block) /
          10.0) * 10.0
          <br />
          --------------------------------------------------
          <br />
          Issue: [B311:blacklist] Standard pseudo-random generators are not
          suitable for security/cryptographic purposes.
          <br />
          Severity: Low Confidence: High
          <br />
          Location: test.py:118
          <br />
          117 foodx = round(random.randrange(0, dis_width - snake_block) / 10.0)
          * 10.0
          <br />
          118 foody = round(random.randrange(0, dis_height - snake_block) /
          10.0) * 10.0
          <br />
          119 Length_of_snake += 1<br />
          --------------------------------------------------
          <br />
          Code scanned:
          <br />
          Total lines of code: 94
          <br />
          Total lines skipped (#nosec): 0<br />
          Run metrics:
          <br />
          Total issues (by severity):
          <br />
          Undefined: 0<br />
          Low: 4<br />
          Medium: 0<br />
          High: 0<br />
          Total issues (by confidence):
          <br />
          Undefined: 0<br />
          Low: 0<br />
          Medium: 0<br />
          High: 4<br />
          Files skipped (0):
          <br />
        </pre>
      )} */}
    </div>
  );
}

export default Bandit;

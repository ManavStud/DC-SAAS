import { profileUser } from "./api/service";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AndroWarn() {
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
  const [result, setResult] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("apk_file", file);
    const response = await axios.post(
      process.env.REACT_APP_API_BASE_URL + "/analyze_apk_andro",
      formData
    );
    setResult(response.data);
  };

  return (
    <div className="pt-32">
      <form onSubmit={onSubmit}>
        <input type="file" accept=".apk" onChange={onFileChange} />
        <button type="submit">Analyze</button>
      </form>
      {result && (
        <div>
          <h2>Analysis Result</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default AndroWarn;

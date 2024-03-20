import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { ResultContext } from "../../context/ResultContext";
import list from "../../images/list-logo.png";
import { profileUser } from "../../components/api/service";

function Pylint() {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { result, setResult } = useContext(ResultContext);

  const profileInit = () => {
    profileUser(token).then((req, res) => {
      if (req.data.status !== "failed") {
        console.log(req.data);
        setUser(req.data.userValidation);
      } else {
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    profileInit();
  }, []);

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tool", "pylint");
    formData.append("domain", "source");
    formData.append("user_id", user._id);
    axios
      .post(
        process.env.REACT_APP_NODE_API_BASE_URL + "/upload-pylint",
        formData
      )
      .then((response) => {
        setIsLoading(false);
        setResult({
          input: file.name,
          tool: "pylint",
          domain: "source",
          result: response.data,
        });
        navigate("/result");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center pt-32 bg-dark min-h-screen h-full w-full" id="colo">
      <button
        className="fixed right-8 bottom-4 shadow-none text-[#d7dfe7] bg-light text-lg  font-bold py-2 px-2 rounded-full h-16 my-4 w-16"
        onClick={() => navigate("/pylint-history")}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={list} alt="list" width={36} />
        </div>
      </button>
      {!result && <h2 className="font-bold text-light">Pylint</h2>}
      <br />
      <br />
      {!result && (
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center sm:w-[40%] w-full px-12"
        >
          <div>
            <label htmlFor="file-input" className="text-light">
              Choose a file:{" "}
            </label>
            <input
              id="file-input"
              type="file"
              onChange={handleFileInputChange}
              className="text-light"
            />
          </div>
          <br />
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
          <br />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black w-full text-light font-bold py-2 px-4 rounded-lg shadow-sm shadow-light"
          >
            Analyze
          </button>
        </form>
      )}
    </div>
  );
}

export default Pylint;

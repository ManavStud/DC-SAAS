import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import Axios from "axios";
import list from "../../images/list-logo.png";
import { profileUser } from "../../components/api/service";
import TextBox from "../../components/TextBox";
import { ResultContext } from "../../context/ResultContext";


function Sqlmap() {
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

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const input = {
        input: inputText,
        tool: "sqlmap",
        domain: "web",
        user_id: user._id,
      };
      const response = await Axios.post(
        process.env.REACT_APP_NODE_API_BASE_URL + "/web",
        input
      );
      console.log(response);
      const resultText = await response.data;
      console.log(resultText);
      setIsLoading(false);
      setResult({
        input: inputText,
        tool: "sqlmap",
        domain: "web",
        result: resultText,
      });
      navigate("/result");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setResult("Error processing text");
    }
  };

  return (
    
    <div className="flex items-center justify-center pt-32 bg-dark min-h-screen h-full w-full" id="colo">
      <button
        className="fixed right-8 bottom-4 shadow-none text-[#d7dfe7] bg-light text-lg font-bold py-2 px-2 rounded-full h-16 my-4 w-16"
        onClick={() => navigate("/sqlmap-history")}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={list} alt="list" width={36} />
        </div>
      </button>
      {!result && (
        <h2 className="font-bold text-light" id="sqlinj"></h2>
      )}
      <br />
      {!result && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center sm:w-[40%] w-full px-12 mx-auto my-auto" // Center horizontally and vertically
        >
               <h2 className="font-bold text-light" id="sqlinj">SQL Injection</h2>

          <TextBox
            textInput="text-md text-light"
            textLabel="text-md text-light"
            width="w-full"
            height="h-12"
            hint="Enter Target URL"
            backgroundColor="bg-dark"
            position="left-2 md:left-3 top-2.5"
            border="border-dark border-2"
            span="px-1"
            input="px-3 md:px-4"
            div="mt-8"
            setState={setInputText}
            value={inputText}
            type="text"
          />
          <br />
          <div>
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
          </div>
          <br />
          <button
            type="submit"
            className="bg-black w-full text-light font-bold py-2 px-4 rounded-lg shadow-sm shadow-light"
          >
            Submit
          </button>
          <br />
        </form>
      )}
    </div>
  );
}

export default Sqlmap;

import React, { useContext } from "react";
import { ResultContext } from "../context/ResultContext";
import { useNavigate } from "react-router";

const Result = () => {
  const printOptions = {
    orientation: "landscape", // 'portrait' for portrait orientation
    background: true, // Enable background graphics
  };

  const navigate = useNavigate();

  const { result, setResult } = useContext(ResultContext);
  console.log(result);

  const downloadPDF = () => {
    window.print(printOptions);
  };

  return (
    <div
      id="pdf-content"
      className="bg-dark w-full flex flex-col items-center pt-36 min-h-screen h-full"
    >
      {result ? (
        <>
          <div className="flex flex-col items-start w-full bg-dark px-12 sm:px-24">
            <p className="text-medium font-bold text-2xl whitespace-pre-wrap break-all">
              Input : {result.input}
            </p>
            <br />
            <p className="text-medium font-bold text-2xl">
              Domain : {result.domain}
            </p>
            <br />
            <p className="text-medium font-bold text-2xl">
              Tool : {result.tool}
            </p>
            <br />
            <p className="text-medium font-bold text-2xl">Result :-</p>
            <br />
          </div>
          <pre className="bg-dark whitespace-pre-wrap break-all w-full px-12 sm:px-24 text-light text-md">
            {result.result}
          </pre>
          <br />
          <br />
          <button
            type="button"
            onClick={() => {
              setResult(null);
              navigate(-1);
            }}
            className="bg-black w-1/2 text-light font-bold py-2 px-4 rounded-lg shadow-sm shadow-light"
          >
            Retry
          </button>
          <br />
          <button
            type="button"
            onClick={downloadPDF}
            className="bg-black w-1/2 text-light font-bold py-2 px-4 rounded-lg shadow-sm shadow-light"
          >
            Download PDF
          </button>
          <br />
          <br />
        </>
      ) : (
        <div className="text-light h-screen text-2xl">Result not found</div>
      )}
    </div>
  );
};

export default Result;

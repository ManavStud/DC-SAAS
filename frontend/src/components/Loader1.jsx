import React from "react";
import loaderVideo from "../images/loaderVideo.mp4";
import back from "../images/back-icon.png";

const Loader1 = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="fixed right-8 bottom-4 shadow-none text-[#d7dfe7] bg-light text-lg  font-bold py-2 px-2 rounded-full h-16 my-4 w-16 z-10"
        onClick={() => window.location.reload()}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={back} alt="list" width={36} />
        </div>
      </button>
      <video autoPlay loop>
        <source src={loaderVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default Loader1;

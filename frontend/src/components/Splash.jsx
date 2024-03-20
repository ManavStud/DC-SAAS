import React, { useState } from "react";
import loaderVideo from "../images/loaderVideo.mp4";

const Splash = () => {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <div
      className={`fixed inset-0 min-h-screen flex items-center justify-center z-50 `}
    >
      {/* {!videoEnded && ( */}
        <video
          src={loaderVideo}
          autoPlay
          className="absolute inset-0 object-cover w-full h-full"
        //   onEnded={handleVideoEnd}
        />
      {/* )} */}
      
    </div>
  );
};

export default Splash;

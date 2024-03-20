// Web.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonImage2 from "../images/sqlmap.png";
import ButtonImage3 from "../images/whatweb.png";
import './shared.css';
import { Helmet } from 'react-helmet';


function Web() {
  const navigate = useNavigate();

  const [selectedTool, setSelectedTool] = useState(null);

  const handleNavigation = (link) => {
    navigate(link);
  };

  const cardList = [
    {
      img: ButtonImage2,
      link: "/sqlmap",
      title: "SqlMap",
      text: "Essential for automated SQL injection, aiding database takeover in vulnerability assessments.",
    },
    {
      img: ButtonImage3,
      link: "/whatweb",
      title: "Whatweb",
      text: "Uncover the web technology stack and vulnerabilities of target websites with ease.",
    },
  ];

  const handleCardClick = (tool) => {
    if (selectedTool && selectedTool.link === tool.link) {
      setSelectedTool(null);
    } else {
      setSelectedTool(tool);
    }
  };

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Khand&display=swap"
        />
      </Helmet>

      <div className={`bg-dark min-h-screen flex flex-col items-center justify-center`} style={{ backgroundImage: 'linear-gradient( #13042c, #240454, #240454,#3c2484,#4b2ea1,#3c2484,#240454)' }}>
        <div className="md:w-full text-light">
          <br /><br /><br /><br />
          <h2 className="para20">Web App Testing</h2><br></br>
          <p className="p2">Designed to fortify web applications against cyber threats. With specialized tools, it conducts thorough assessments, ensuring the resilience and security of web-based platforms by identifying and addressing vulnerabilities unique to the online environment.</p>
        </div><br></br>

      {/* Images and Information */}
      <div className="md:w-full mt-6 flex justify-center">
        {cardList.map((card, index) => (
           <div
           key={card.link}
           className={`group cursor-pointer h-80 w-112 md:h-96 md:w-112 mx-20 relative card-container`}
           onClick={() => handleCardClick(card)}
         >
            <div className={`rounded-xl overflow-hidden bg-dark flex card-content`}>
                <img
                  className={`h-full w-1/2 object-cover rounded-l-xl`}
                  src={card.img}
                  alt=""
                  style={{ margin: 0, padding: 0 }}
                />
              <div className="w-1/2 p-4 text-white">
                <h1 className="text-2xl font-bold mb-2">{card.title}</h1>
                <p className="text-base">{card.text}</p>
                <button onClick={() => handleNavigation(card.link)} className="use-tool-button mt-4">
                  Use Tool
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Web;

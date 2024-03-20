import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JestImage from "../images/jest.png";
import { profileUser } from "./api/service";
import "./shared.css";
import { Helmet } from 'react-helmet';

function APIPre() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const profileInit = async () => {
      try {
        const response = await profileUser(token);
        if (response.data.status !== "failed") {
          console.log(response.data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Handle error as needed (e.g., show an error message to the user)
      }
    };

    profileInit();
  }, [navigate, token]);

  const handleNavigation = (link) => {
    navigate(link);
  };

  const cardList = [
    {
      img: JestImage,
      link: "/api",
      title: "JEST Tool",
      text:
        "A powerful JavaScript testing framework that ensures your web applications are secure and function flawlessly.",
    },
  ];

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Khand&display=swap"
        />
      </Helmet>

      <div className="bg-dark min-h-screen flex flex-col items-center justify-center" style={{ backgroundImage: 'linear-gradient( #13042c, #240454, #240454,#3c2484,#4b2ea1,#3c2484,#240454)' }}>
        <div className="md:w-full text-light">
          <br /><br /><br /><br />
          <h2 className="para20">API Testing</h2><br></br>
          <p className="p2">Designed to fortify web applications against cyber threats. With specialized tools, it conducts thorough assessments, ensuring the resilience and security of web-based platforms by identifying and addressing vulnerabilities unique to the online environment.</p>
        </div><br></br>

        {/* Images and Information */}
        <div className="md:w-full mt-6 flex justify-center">
          {cardList.map((card) => (
            <div
              key={card.link}
              className="group cursor-pointer w-80 h-80 md:h-96 md:w-96 mx-6 card-container"
              onClick={() => handleNavigation(card.link)}
            >
              <div className="rounded-xl overflow-hidden bg-dark flex h-full card-content">
                <img
                  className="h-full w-1/2 object-cover rounded-l-xl"
                  src={card.img}
                  alt=""
                />
                <div className="w-1/2 p-4 text-white flex flex-col justify-between">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{card.title}</h1>
                    <p className="text-base">{card.text}</p>
                  </div>
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

export default APIPre;

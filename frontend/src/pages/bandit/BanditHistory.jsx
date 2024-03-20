import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../../images/back-icon.png";
import { getScanHistory, profileUser } from "../../components/api/service";
import { ResultContext } from "../../context/ResultContext";

function BanditHistory() {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [scans, setScans] = useState();
  const profileInit = () => {
    profileUser(token).then((req, res) => {
      if (req.data.status !== "failed") {
        console.log(req.data);
        setUser(req.data.userValidation);
        const domain = "source";
        const tool = "bandit";
        getScanHistory(domain, tool, req.data.userValidation._id)
          .then((req, res) => {
            console.log(req.data);
            setScans(req.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    profileInit();
  }, []);

  const { setResult } = React.useContext(ResultContext);

  return (
    <div className="pt-32 sm:px-24 px-6 bg-dark min-h-screen h-full w-full" id="colo">
      <button
        className="fixed right-8 bottom-4 shadow-none text-[#d7dfe7] bg-light text-lg  font-bold py-2 px-2 rounded-full h-16 my-4 w-16"
        onClick={() => navigate("/bandit")}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={back} alt="list" width={36} />
          {/* <BsRobot size={35} /> &nbsp; */}
        </div>
      </button>

      <h2 className="text-2xl font-bold text-light text-center">
        Scan History
      </h2>
      <div className="">
        {scans &&
          scans.map((scan, idx) => (
            <div
              key={scan._id}
              onClick={() => {
                console.log(scan.input, scan.domain, scan.tool, scan.result);
                setResult({
                  input: scan.input,
                  domain: scan.domain,
                  tool: scan.tool,
                  result: scan.result,
                });
                navigate("/result");
              }}
              className="block shadow-md cursor-pointer shadow-light my-6 p-4"
            >
              <div
                key={idx}
                className="text-light break-all whitespace-pre-line"
              >
                {idx + 1}
                {")"} Input : {scan.input}
              </div>
              <div key={scan.input} className="text-light">
                Domain : {scan.domain}
                <br />
                Tool : {scan.tool}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BanditHistory;

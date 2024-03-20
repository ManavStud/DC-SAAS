import React, { useContext } from "react";
import { useNavigate } from "react-router";
import permissions from "../../permissions";
import { AndroidResultContext } from "../../context/AndroidResultContext";

const AndroguardResult = () => {
  const printOptions = {
    orientation: "landscape", // 'portrait' for portrait orientation
    background: true, // Enable background graphics
  };

  const navigate = useNavigate();

  const { androidResult, setAndroidResult } = useContext(AndroidResultContext);
  console.log(androidResult);

  const downloadPDF = () => {
    window.print(printOptions);
  };

  return (
    <div
      id="pdf-content"
      className="bg-dark w-full flex flex-col items-center pt-36 min-h-screen h-full"
    >
      {androidResult ? (
        <>
          <div className="flex flex-col items-start w-full bg-dark px-12 sm:px-24">
            <p className="text-medium font-bold text-2xl whitespace-pre-wrap break-all">
              Input : {androidResult.input}
            </p>
            <br />
            <p className="text-medium font-bold text-2xl">
              Domain : {androidResult.domain}
            </p>
            <br />
            <p className="text-medium font-bold text-2xl">
              Tool : {androidResult.tool}
            </p>
            <br />
            <p className="text-medium font-bold text-2xl">Result :-</p>
            <br />
          </div>
          {androidResult.result && (
            <div className="w-full pl-28 pr-28">
              <p className="text-16 text-light">
                Analysis Result for {androidResult.result.package_name}:
              </p>
              <div className="flex flex-col">
                <p className="text-light">
                  <span className="font-bold text-light">Version Code:</span>{" "}
                  {androidResult.result.version_code}
                </p>
                <p className="text-light">
                  <span className="font-bold text-light">Version Name:</span>{" "}
                  {androidResult.result.version_name}
                </p>
                <p></p>
                <p>
                  {androidResult.result.permissions.length > 0 && (
                    <div className="w-full pt-8 overflow-x-auto">
                      <h2 className="pb-4 text-16px text-light">
                        Permissions:{" "}
                      </h2>
                      <table className="w-full table-auto shadow-lg shadow-light">
                        <thead className="shadow-lg shadow-light">
                          <tr className="bg-black border-1 border-light shadow-xl shadow-light">
                            <th className="px-4 py-2 text-light">
                              Permissions
                            </th>
                            <th className="px-4 py-2 text-light">Status</th>
                            <th className="px-4 py-2 text-light">Info</th>
                            <th className="px-4 py-2 text-light">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody className="">
                          {androidResult.result.permissions.map(
                            (permission) => {
                              // find the permission object that matches the permission string
                              const foundPermission = permissions.find(
                                (p) => p.Permission === permission
                              );

                              // if the permission is not found, skip rendering this row
                              if (!foundPermission) return null;

                              const statusColor = (() => {
                                switch (foundPermission.Status) {
                                  case "dangerous":
                                    return "bg-red-500";
                                  case "unknown":
                                    return "bg-gray-500";
                                  case "signature":
                                    return "bg-green-500";
                                  default:
                                    return "bg-blue-500";
                                }
                              })();
                              // otherwise, render the row with the permission details
                              return (
                                <tr className="bg-dark">
                                  <td className="border px-4 py-2 text-light">
                                    {permission}
                                  </td>
                                  <td
                                    className={`border font-bold px-4 py-2 m-4 ${statusColor}`}
                                  >
                                    {foundPermission.Status}
                                  </td>
                                  <td className="border px-4 py-2 text-light">
                                    {foundPermission.Info}
                                  </td>
                                  <td className="border px-4 py-2 text-light">
                                    {foundPermission.Description}
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </p>
                <br />
                <p>
                  <span className="font-bold text-light">Activities:</span>{" "}
                  {androidResult.result.activities.map((activity) => (
                    <p className="block text-light">{activity}</p>
                  ))}
                </p>
                <br />
                <p>
                  <span className="font-bold text-light">Services:</span>{" "}
                  {androidResult.result.services.map((service) => (
                    <p className="block text-light">{service}</p>
                  ))}
                </p>
                <br />
                <p>
                  <span className="font-bold text-light">Receivers:</span>{" "}
                  {androidResult.result.receivers.map((receiver) => (
                    <p className="block text-light">{receiver}</p>
                  ))}
                </p>
                <br />
                <p>
                  <span className="font-bold text-light">Providers:</span>{" "}
                  {androidResult.result.providers.map((provider) => (
                    <p className="block text-light">{provider}</p>
                  ))}
                </p>
                <br />
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setAndroidResult(null);
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

export default AndroguardResult;

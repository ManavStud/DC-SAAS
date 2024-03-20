import React, { useEffect, useState } from "react";
// import logo from "../assets/logoMusicart.png";
import TextBox from "../TextBox";
import "../../App.css";
import Loader from "../Loader";
import { RegisterUser, registerUser } from "../api/service";
import { useNavigate } from "react-router";
const Register = () => {
  // Init states
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const register = (event) => {
    event.preventDefault();
    // Activate the loader
    setLoader(true);
    // Create a new user
    if (name !== "" && mobileNumber !== "" && email !== "" && password !== "") {
      if (password !== confirmPassword) {
        setLoader(false);
        alert("Passwords do not match");
      } else {
        setLoader(false);
        const user = {
          name: name,
          mobile: Number(mobileNumber),
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        };
        // setName("");
        // setEmail("");
        // setMobileNumber("");
        // setPassword("");
        // setConfirmPassword("");
        registerUser(user)
          .then((req, res) => {
            // navigate("/");
            console.log(req.data);
            const { status, message } = req.data;
            console.log(status, message);
            if (status === "failed") {
              alert(message);
            } else {
              // alert(message);
              navigate("/");
            }
          })
          .catch((error) => {
            alert("Error in creating user " + error.message);
          });
      }
    } else {
      setLoader(false);
      alert("All fields are mandatory!");
    }
  };

  return (
    <div className="flex flex-col items-center h-full bg-cover" id="colo">
      {loader && (
        <div className="z-10 absolute flex flex-row items-center justify-center h-screen w-full">
          <Loader />
        </div>
      )}

      <div className="flex mt-16 md:mt-12 ">
        {/* <img src={logo} alt="logo" className="inline w-10 h-10" /> */}
        <h1 className="text-2xl md:text-4xl cursor-pointer pl-0 font-bold bg-clip-text" id="txt1">
          SaaS
        </h1>
      </div>
      <form
        onSubmit={register}
        className="p-6 bg-dark flex flex-col items-start drop-shadow-2xl mt-16 md:mt-12 w-5/6 sm:w-1/2 lg:w-1/3 rounded-xl shadow-md shadow-light" id="cd1"
      >
        <h2 class="font-semibold mb-4 text-2xl self-center" id="txt1">
          REGISTER
        </h2>
        <TextBox
          textInput="text-md text-white"
          textLabel="text-md text-white"
          width="w-full"
          height="h-12"
          hint="Name"
          backgroundColor="bg-dark"
          position="left-2 md:left-3 top-2.5"
          border="border-dark border-2"
          span="px-1"
          input="px-3 md:px-4"
          div="mt-8"
          type="text"
          setState={setName}
          value={name}
        />
        <TextBox
          textInput="text-md text-white"
          textLabel="text-md text-white"
          width="w-full"
          height="h-12"
          hint="Mobile Number"
          backgroundColor="bg-dark"
          position="left-2 md:left-3 top-2.5"
          border="border-dark border-2"
          span="px-1"
          input="px-3 md:px-4"
          div="mt-8"
          type="text"
          setState={setMobileNumber}
          value={mobileNumber}
        />
        <TextBox
          textInput="text-md text-white"
          textLabel="text-md text-white"
          width="w-full"
          height="h-12"
          hint="Email ID"
          backgroundColor="bg-dark"
          position="left-2 md:left-3 top-2.5"
          border="border-dark border-2"
          span="px-1"
          input="px-3 md:px-4"
          div="mt-8"
          type="email"
          setState={setEmail}
          value={email}
        />
        <TextBox
          textInput="text-md text-white"
          textLabel="text-md text-white"
          width="w-full"
          height="h-12"
          hint="Password"
          backgroundColor="bg-dark"
          position="left-2 md:left-3 top-2.5"
          border="border-dark border-2"
          span="px-1"
          input="px-3 md:px-4"
          div="mt-8"
          type="password"
          setState={setPassword}
          value={password}
        />
        <TextBox
          textInput="text-md text-white"
          textLabel="text-md text-white"
          
          width="w-full"
          height="h-12"
          hint="Confirm Password"
          backgroundColor="bg-dark"
          position="left-2 md:left-3 top-2.5"
          border="border-dark border-2"
          span="px-1"
          input="px-3 md:px-4"
          div="mt-8"
          type="password"
          setState={setConfirmPassword}
          value={confirmPassword}
        />
        <button
          type="submit"
          className="shadow-none w-full text-light bg-black font-bold py-2 px-4 hover:bg-darkMed hover:border hover:border-light rounded-xl h-10  my-4"
          id="cd2"
        >
          Continue
        </button>
      </form>
      <div className="mt-8 text-xs md:text-sm sm:w-1/2 lg:w-full flex items-center w-full md:px-1 px-9">
        <hr className="border-t w-full border-light flex-grow" />
        <span className="w-full text-center" id="txt1">Already a user?</span>
        <hr className="border-t w-full border-light flex-grow" />
      </div>
      <button
        onClick={() => navigate("/login")}
        className=" shadow-none w-82 text-light bg-black font-bold py-2 px-4 hover:bg-black rounded-xl h-10 my-4"
      id="txt1"
      >
        Login to your account
      </button>
    </div>
  );
};

export default Register;
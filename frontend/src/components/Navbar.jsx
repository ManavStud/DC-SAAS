import React, { useState } from "react";
import { AiOutlineMail, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import logo from "../images/logo2.png";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';
import "./nav1.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="fixed w-full h-20  shadow-xl z-[100] bg-black rounded-sm border-1 border-medium " id="cd">
      <div className="flex justify-between items-center w-full h-full px-7 2xl:px-18">
        <img
          src={logo}
          onClick={() => navigate("/")}
          className="cursor-pointer h-8"
          alt="Deepcytes"
          style={{ width: '220px', height: '100px' }}
        />
        <div class="menu-bar">

          <ul>
           
          <li className="font-bold  text-md text-medium hover:text-light uppercase"><a href="/">Home</a> </li>
          {/* <li className="font-bold  text-md text-medium hover:text-light uppercase"><a href="/">Services</a> </li> */}
          <li className="font-bold text-md text-medium hover:text-light uppercase">
              <ScrollLink to="services" smooth={true} duration={500}>
                Services
              </ScrollLink>
              
            </li>
         
          <li className="font-bold text-md text-medium hover:text-light uppercase"><a href="#">Resources </a>
            <div class="dropdown-menu">
              <ul>
              <li className="font-bold  text-md text-medium hover:text-light uppercase"><a href="/web">Web</a> </li>
              <li className="font-bold  text-md text-medium hover:text-light uppercase"><a href="/mobile">Mobile</a></li>
              <li className="font-bold  text-md text-medium hover:text-light uppercase"><a href="/api-pre">API</a></li>
              <li className="font-bold text-md text-medium hover:text-light uppercase"><a href="/source">Source code</a></li>
 
              </ul>
              </div>
        </li>
            <button className="shadow-none" onClick={() => navigate("/logout")}>
              <li className="font-bold text-md text-medium hover:text-light uppercase">
                Logout
              </li>
            </button>

            <div class="search">
          <a href="#" class="button">24x7 Cyber helpline</a>
        </div>


          </ul>
          <div onClick={handleNav} className="md:hidden">
            <AiOutlineMenu color="#00ffef" size={25} />
          </div>
        </div>
      </div>
      <div
        className={nav ? "fixed left-0 top-0 w-full h-screen bg-black/70" : ""}
      >
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-dark py-10 px-6 ease-in duration-500"
              : "hidden"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <h1 className="text-2xl text-light">Red Teaming</h1>
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-light p-3 cursor-pointer"
              >
                <AiOutlineClose color="#00ffef" size={15} />
              </div>
            </div>
            <br />
            <br />
            {/* <div className="border-b border-gray-300 my-4">
              <p className="w-[100%] md:w-[90%] py-2 text-light">
                Let's build something legendary
              </p>
            </div> */}
          </div>
          <div>
            <ul className="uppercase font-bold">
              <a href="/">
                <li className="py-4 text-md text-light">Home</li>
              </a>
              <a href="/web">
                <li className="py-4 text-md text-light">Web</li>
              </a>
              <a href="/mobile">
                <li className="py-4 text-md text-light">Mobile</li>
              </a>
              <a href="/api-pre">
                <li className="py-4 text-md text-light">API</li>
              </a>
              <a href="/source">
                <li className="py-4 text-md text-light">Source code</li>
              </a>
              <a href="/logout">
                <li className="py-4 text-md text-light">Logout</li>
              </a>
            </ul>

              



            <div className="pt-[40%]">
              <p className="uppercase tracking widest  text-light">
                Let's connect
              </p>
              <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                <a
                  href="https://www.linkedin.com/in/japneetrajput/"
                  className="rounded-full shadow-lg shadow-light p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                >
                  <FaLinkedinIn color="#00ffef" size={18} />
                </a>
                <a
                  href="https://github.com/JapneetRajput"
                  className="rounded-full shadow-lg shadow-light p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                >
                  <FaGithub color="#00ffef" size={18} />
                </a>
                <a
                  href="mailto:japneetrajput2804@gmail.com"
                  className="rounded-full shadow-lg shadow-light p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                >
                  <AiOutlineMail color="#00ffef" size={18} />
                </a>
                <a
                  href="tel:+918104235686"
                  className="rounded-full shadow-lg shadow-light p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                >
                  <BsFillPersonLinesFill color="#00ffef" size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  

};


export default Navbar;

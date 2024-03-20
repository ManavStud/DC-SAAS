import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Web from "./components/Web";
import Mobile from "./components/Mobile";
import API from "./pages/jest/Jest";
import Source from "./components/Source";
import MobileVisualize from "./components/MobileVisualize";
import { Routes, Route, useLocation } from "react-router-dom";
import MobileScan from "./components/MobileScan";
import Pylint from "./pages/pylint/Pylint";
import AndroWarn from "./components/AndroWarn";
import MobileVulnerabilities from "./components/MobileVulnerabilities";
import MobSFScan from "./components/MobSFScan";
import MobSfJava from "./components/MobSfJava";
import APIPre from "./components/APIPre";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Register from "./components/auth/Register";
import Sqlmap from "./pages/sqlmap/Sqlmap";
import SqlmapHistory from "./pages/sqlmap/SqlmapHistory";
import WhatwebHistory from "./pages/whatweb/WhatwebHistory";
import Whatweb from "./pages/whatweb/Whatweb";
import { ResultProvider } from "./context/ResultContext";
import Result from "./components/Result";
import Androguard from "./pages/androguard/Androguard";
import JestHistory from "./pages/jest/JestHistory";
import PylintHistory from "./pages/pylint/PylintHistory";
import BanditHistory from "./pages/bandit/BanditHistory";
import Bandit from "./pages/bandit/Bandit";
import AndroguardHistory from "./pages/androguard/AndroguardHistory";
import { AndroidResultProvider } from "./context/AndroidResultContext";
import AndroguardResult from "./pages/androguard/AndroguardResult";
import footer from "./components/footer.jsx";

function App() {
  const location = useLocation();
  const { pathname } = location;
  // Array of URLs where the navbar should be hidden
  const hiddenUrls = ["/login", "/register"];

  // Check if the current URL is in the hiddenUrls array
  const shouldHideNavbar = hiddenUrls.includes(pathname);
  return (
    <div className="bg-dark ">
      {!shouldHideNavbar && <Navbar />}
      <ResultProvider>
        <AndroidResultProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/api" element={<API />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/mobile" element={<Mobile />} />
            <Route exact path="/androguard" element={<Androguard />} />
            <Route path="/web/:id" component={Web} />
           
            <Route
              exact
              path="/mobile-visualize"
              element={<MobileVisualize />}
            />
            <Route exact path="/mobile-scan" element={<MobileScan />} />
            <Route exact path="/mobile-androwarn" element={<AndroWarn />} />
            <Route exact path="/api-pre" element={<APIPre />} />
            <Route
              exact
              path="/mobile-andropytool"
              element={<MobileVulnerabilities />}
            />
            <Route exact path="/mobile-mobsf" element={<MobSFScan />} />
            <Route exact path="/mobile-mobsf-java" element={<MobSfJava />} />
            <Route exact path="/web" element={<Web />} />
            <Route exact path="/source" element={<Source />} />
            <Route exact path="/bandit" element={<Bandit />} />
            <Route exact path="/pylint" element={<Pylint />} />
            <Route exact path="/sqlmap" element={<Sqlmap />} />
            <Route exact path="/sqlmap-history" element={<SqlmapHistory />} />
            <Route exact path="/whatweb-history" element={<WhatwebHistory />} />
            <Route exact path="/jest-history" element={<JestHistory />} />
            <Route exact path="/pylint-history" element={<PylintHistory />} />
            <Route exact path="/bandit-history" element={<BanditHistory />} />
            <Route
              exact
              path="/androguard-history"
              element={<AndroguardHistory />}
            />
            <Route
              exact
              path="/androguard-history"
              element={<AndroguardHistory />}
            />
            <Route exact path="/whatweb" element={<Whatweb />} />
            <Route exact path="/result" element={<Result />} />
            <Route
              exact
              path="/androguard-result"
              element={<AndroguardResult />}
            />
          </Routes>
        </AndroidResultProvider>
      </ResultProvider>
    </div>
  );
}

export default App;

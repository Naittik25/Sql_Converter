import React, { useState, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./SqlConverter.css";
import appLogo from "../assets/image.png";
import { IoCode } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BsChatLeft } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GiUsbKey } from "react-icons/gi";
import About from "./About";
import Info from "./Info";
import Chat from "./Chat";
import Profile from "./Profile";
import { showError } from "../utils/toast";

export default function App() {
  const [sqlText, setSqlText] = useState("");
  const [ipynbText, setIpynbText] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const timerRef = useRef(null);
  const [activePage, setActivePage] = useState("Home");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
    setFileName(nameWithoutExtension);

    const reader = new FileReader();
    reader.onload = (ev) => {
      setSqlText(ev.target.result);
      setIpynbText("");
      setSeconds(0);
    };
    reader.readAsText(file);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    setSeconds(0);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);

    try {
      // const {token} = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : {};
      // if(!token) return alert("You must be logged in to convert files!");

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("target", selectedFile);

      const response = await fetch("http://localhost:8080/gemini/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Server sent back HTML instead of JSON:", responseText);
        throw new Error(
          `Server crashed (Status ${response.status}). Check your Node.js backend terminal for the exact error!`,
        );
      }

      if (!response.ok) {
        throw new Error(data.error || "Conversion failed");
      }

      setIpynbText(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Conversion error:", error);
      showError(error.message);
    } finally {
      clearInterval(timerRef.current);
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!ipynbText) return;
    const blob = new Blob([ipynbText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName ? `${fileName}.ipynb` : "converted_spark.ipynb";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      <div className="header-banner">
        <img src={appLogo} alt="App Logo" className="header-logo" />
        <h1 className="header-title">SQL~SparkSQL Code Migration</h1>
      </div>
      <div className="center-part">
        <div className="sidebar-slim">
          <div
            title="Home"
            className={`sidebar-icon-wrapper ${activePage === "Home" ? "active" : ""}`}
            onClick={() => setActivePage("Home")}
          >
            <IoCode size={24} />
          </div>
          <div 
            title="Plugins"
            className={`sidebar-icon-wrapper ${activePage === "Plugins" ? "active" : ""}`}
            onClick={() => setActivePage("Plugins")}
          >
            <GiUsbKey size={24} />
             
          </div>
          <div
            title="About"
            className={`sidebar-icon-wrapper ${activePage === "About" ? "active" : ""}`}
            onClick={() => setActivePage("About")}
          >
            <BiUser size={24} />
          </div>
          <div
            title="Info"
            className={`sidebar-icon-wrapper ${activePage === "Info" ? "active" : ""}`}
            onClick={() => setActivePage("Info")}
          >
            <IoIosInformationCircleOutline size={24} />
          </div>
          <div
            title="Chat"
            className={`sidebar-icon-wrapper ${activePage === "Chat" ? "active" : ""}`}
            onClick={() => setActivePage("Chat")}
          >
            <BsChatLeft size={24} />
          </div>
          <div
            className="sidebar-bottom-group"
            style={{ marginTop: "auto", marginBottom: "15px" }}
          >
            <div
              title="Profile"
              className={`sidebar-icon-wrapper ${activePage === "Profile" ? "active" : ""}`}
              onClick={() => setActivePage("Profile")}
            >
              <CgProfile size={24} />
            </div>
          </div>
        </div>

        <div className="page-wrapper">
          {activePage === "Profile" && <Profile />}
          {activePage === "About" && <About />}
          {activePage === "Info" && <Info />}
          {activePage === "Config" && <Config />}

          {(activePage === "Home" || activePage === "Chat") && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                overflow: "hidden",
              }}
            >
              {activePage === "Chat" && <Chat />}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  overflow: "hidden",
                }}
              >
                <div className="control-bar">
                  <div className="control-left">
                    <div className="upload-wrapper">
                      <label className="btn btn-convert">
                        Upload .txt
                        <input
                          type="file"
                          accept=".txt"
                          onChange={handleUpload}
                          style={{ display: "none" }}
                        />
                      </label>
                      <span className="file-name-label">
                        {fileName ? `📄 ${fileName}.txt` : "No file selected"}
                      </span>
                    </div>
                  </div>

                  <div className="control-center">
                    <button
                      className="btn btn-convert"
                      onClick={handleConvert}
                      disabled={!sqlText || isConverting}
                    >
                      {isConverting ? "Converting..." : "Convert!"}
                    </button>
                    <span className="time-tracker">
                      {isConverting ? (
                        <>⚡ Igniting Spark... {seconds}s</>
                      ) : seconds > 0 ? (
                        <>🚀 Sparked in {seconds}s!</>
                      ) : (
                        <>⏱️ Ready to ignite</>
                      )}
                    </span>
                  </div>

                  <div className="control-right">
                    <button
                      className="btn btn-convert"
                      onClick={handleDownload}
                      disabled={!ipynbText}
                    >
                      Download .ipynb
                    </button>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="workspace">
                  <div className="pane">
                    <div className="pane-content">
                      <SyntaxHighlighter
                        language="sql"
                        style={vs}
                        wrapLongLines={false}
                        className="syntax-highlighter-custom"
                        showLineNumbers={true}
                        lineNumberStyle={{
                          minWidth: "3em",
                          paddingRight: "1em",
                          color: "#999",
                          textAlign: "right",
                        }}
                      >
                        {sqlText ||
                          "-- Your uploaded .txt file content will appear here..."}
                      </SyntaxHighlighter>
                    </div>
                  </div>

                  <div className="pane">
                    <div className="pane-content">
                      {/* <textarea
                        className="pane-textarea"
                        value={ipynbText}
                        readOnly
                        placeholder="Converted .ipynb code will appear here..."
                      /> */}
                      <SyntaxHighlighter
                        language="json"
                        style={vs}
                        showLineNumbers={true}
                        className="syntax-highlighter-custom"
                      >
                        {ipynbText ||
                          "Converted .ipynb code will appear here..."}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="footer-bar">
            <p>
              &copy; {new Date().getFullYear()} Flytics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

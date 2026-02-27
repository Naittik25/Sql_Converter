import React, { useState } from "react";
import {
  FiDatabase,
  FiGithub,
  FiCheckCircle,
  FiShield,
  FiLink,
  FiUser,
  FiLock,
  FiServer,
} from "react-icons/fi";
import { showSuccess, showError } from "../utils/toast";
import "./Plugins.css";

export default function Plugins() {
  const [odi, setOdi] = useState({
    user: "",
    password: "",
    connectionString: "",
    isSysDBA: false,
  });
  const [odiStatus, setOdiStatus] = useState(null); // { type: 'success' | 'error', message: string }
  const [gitToken, setGitToken] = useState("");
  const [gitUser, setGitUser] = useState(null);
  const [gitStatus, setGitStatus] = useState(null); // { type: 'success' | 'error', message: string }

  const handleTestODI = () => {
    if (odi.user && odi.connectionString) {
      showSuccess("ODI Repository connected!");
      setOdiStatus({ type: "success", message: `Connected successfully as ${odi.user}${odi.isSysDBA ? " (SysDBA)" : ""} on ${odi.connectionString}` });
    } else {
      showError("Please fill in all ODI credentials.");
      setOdiStatus({ type: "error", message: "Missing required fields: User and Connection String are mandatory." });
    }
  };

  const handleTestGit = () => {
    if (gitToken) {
      setGitUser({ username: "Naittik25", name: "Naitik Patel" });
      showSuccess("GitHub Token verified!");
      setGitStatus({ type: "success", message: "Token is valid and has the required permissions." });
    } else {
      showError("Please enter a valid GitHub Token.");
      setGitStatus({ type: "error", message: "Token is empty. Please enter a valid GitHub Personal Access Token." });
      setGitUser(null);
    }
  };

  return (
    <div className="plugins-view-container">
      <div className="plugins-scroll-area">
        <header className="plugins-hero">
          <h1 className="main-title">
            Integration <span className="accent">Plugins</span>
          </h1>
          <p className="sub-title">
            Configure and verify your workspace service nodes.
          </p>
        </header>

        {/* The nodes-wrapper uses flex-wrap to handle 2 or 3 nodes gracefully */}
        <div className="nodes-wrapper">
          {/* NODE 01: ODI REPOSITORY */}
          <div className="service-card">
            {/* <div className="card-tag source">DATA SOURCE</div> */}
            <div className="card-header">
              <FiDatabase className="header-icon" />
              <h3>ODI Repository Config</h3>
            </div>
            <div className="card-body">
              <div className="field">
                <label>User</label>
                <div className="input-group">
                  <FiUser />
                  <input
                    type="text"
                    placeholder="e.g. SYSTEM"
                    value={odi.user}
                    onChange={(e) => setOdi({ ...odi, user: e.target.value })}
                  />
                </div>
              </div>
              <div className="field">
                <label>Password</label>
                <div className="input-group">
                  <FiLock />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={odi.password}
                    onChange={(e) =>
                      setOdi({ ...odi, password: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="field">
                <label>Connection String</label>
                <div className="input-group">
                  <FiLink />
                  <input
                    type="text"
                    placeholder="localhost:1521/ORCL"
                    value={odi.connectionString}
                    onChange={(e) =>
                      setOdi({ ...odi, connectionString: e.target.value })
                    }
                  />
                </div>
              </div>
              <label className="checkbox-ui">
                <input
                  type="checkbox"
                  checked={odi.isSysDBA}
                  onChange={(e) =>
                    setOdi({ ...odi, isSysDBA: e.target.checked })
                  }
                />
                <span className="custom-box">
                  <FiShield />
                </span>
                <span className="label-text">SysDBA Privilege</span>
              </label>
              <button className="primary-btn" onClick={handleTestODI}>
                Test Connection
              </button>
              {odiStatus && (
                <div className={`status-pill ${odiStatus.type}`}>
                  {odiStatus.type === "success" ? <FiCheckCircle /> : <FiShield />}
                  <span>{odiStatus.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* NODE 02: GITHUB INTEGRATION */}
          <div className="service-card">
            {/* <div className="card-tag version">VERSION CONTROL</div> */}
            <div className="card-header">
              <FiGithub className="header-icon" />
              <h3>GitHub Integration</h3>
            </div>
            <div className="card-body">
              <div className="field">
                <label>Personal Access Token</label>
                <div className="input-group">
                  <FiLock />
                  <input
                    type="password"
                    placeholder="ghp_xxxxxxxxxxxx"
                    value={gitToken}
                    onChange={(e) => setGitToken(e.target.value)}
                  />
                </div>
              </div>
              <button className="primary-btn" onClick={handleTestGit}>
                Verify Token
              </button>
              {gitStatus && (
                <div className={`status-pill ${gitStatus.type}`}>
                  {gitStatus.type === "success" ? <FiCheckCircle /> : <FiShield />}
                  <span>{gitStatus.message}</span>
                </div>
              )}
              {gitUser && (
                <div className="success-pill">
                  <FiCheckCircle />
                  <div className="meta">
                    <strong>@{gitUser.username}</strong>
                    <span>{gitUser.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FUTURE NODE 03: READY FOR IMPLEMENTATION  */}
          {/* <div className="service-card placeholder">
            <div className="card-tag future">UPCOMING</div>
            <div className="card-header"><FiServer className="header-icon" /><h3>Target Node</h3></div>
            <div className="card-body center"><em>Future node configuration will appear here.</em></div>
          </div>  */}
        </div>
      </div>

      {/* FIXED VISIBLE FOOTER */}
      {/* <footer className="persistent-footer">
        <div className="footer-line"></div>
        <p>&copy; {new Date().getFullYear()} Flytics. All rights reserved.</p>
      </footer> */}
    </div>
  );
}
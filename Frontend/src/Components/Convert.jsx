import React, { useState } from "react";
import { 
  FiGithub, FiUploadCloud, FiCheckCircle, 
  FiFileText, FiUser, FiBox, FiLock, FiDatabase, FiFolder
} from "react-icons/fi";
import { showSuccess, showError } from "../utils/toast";
import "./Convert.css";

export default function Convert() {
  const [gitConfig, setGitConfig] = useState({
    token: "",
    owner: "",
    repo: "",
    folder: "",
  });
  
  const [isPushing, setIsPushing] = useState(false);
  const [pushedFiles, setPushedFiles] = useState([]);
  const [repositoryAssets, setRepositoryAssets] = useState([]);

  const handleGitPush = async () => {
    const dbCredentials = {
      db_user: "sys", 
      db_pass: "12345678",
      db_host: "localhost:1521",
      db_service: "orclpdb"
    };

    if (!gitConfig.token || !gitConfig.owner || !gitConfig.repo) {
      showError("Please provide GitHub token, owner, and repository name.");
      return;
    }

    setIsPushing(true);
    setPushedFiles([]);

    try {
      const response = await fetch("http://localhost:8080/oracle/github/push-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...dbCredentials,
          gh_token: gitConfig.token,
          gh_owner: gitConfig.owner,
          gh_repo: gitConfig.repo,
          gh_folder: gitConfig.folder
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "GitHub Push failed");

      const fileNames = data.files.map(f => f.file);
      setRepositoryAssets(fileNames);

      for (const fileName of fileNames) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setPushedFiles((prev) => [...prev, fileName]);
      }
      
      showSuccess(`Successfully pushed ${data.files.length} ODI files to GitHub!`);
    } catch (error) {
      showError(error.message);
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className="git-push-view-container">
      <div className="git-push-scroll-area">
        <header className="git-push-hero">
          <h1 className="main-title">ODI to <span className="accent">Data Bricks</span></h1>
          <p className="sub-title">Verify and transfer repository text assets to your version control system.</p>
        </header>

        <div className="nodes-wrapper">
          <div className="service-card">
            <div className="card-header">
              <FiGithub className="header-icon" />
              <h3>GitHub Destination</h3>
            </div>
            <div className="card-body">
              <div className="field">
                <label>Personal Access Token</label>
                <div className="input-group">
                  <FiLock />
                  <input 
                    type="text" 
                    placeholder="ghp_xxxxxxxxxxxx" 
                    value={gitConfig.token}
                    onChange={(e) => setGitConfig({...gitConfig, token: e.target.value})}
                  />
                </div>
              </div>
              <div className="field">
                <label>Repository Owner</label>
                <div className="input-group">
                  <FiUser />
                  <input 
                    type="text" 
                    placeholder="e.g. Naittik25" 
                    value={gitConfig.owner}
                    onChange={(e) => setGitConfig({...gitConfig, owner: e.target.value})}
                  />
                </div>
              </div>
              <div className="field">
                <label>Repository Name</label>
                <div className="input-group">
                  <FiBox />
                  <input 
                    type="text" 
                    placeholder="e.g. Sql_Converter" 
                    value={gitConfig.repo}
                    onChange={(e) => setGitConfig({...gitConfig, repo: e.target.value})}
                  />
                </div>
              </div>
              <div className="field">
                <label>Repository Folder</label>
                <div className="input-group">
                  <FiFolder />
                  <input 
                    type="text" 
                    placeholder="e.g. odi_files" 
                    value={gitConfig.folder}
                    onChange={(e) => setGitConfig({...gitConfig, folder: e.target.value})}
                  />
                </div>
              </div>
              <button className="primary-btn" onClick={handleGitPush} disabled={isPushing}>
                {isPushing ? "Syncing Assets..." : <><FiUploadCloud /> Push to GitHub</>}
              </button>
            </div>
          </div>

          <div className="service-card">
            <div className="card-header">
              <FiDatabase className="header-icon" />
              <h3>Repository Assets</h3>
            </div>
            <div className="card-body">
              <div className="file-display-zone grid-mode">
                <div className="file-grid-container">
                  {repositoryAssets.length === 0 && !isPushing && (
                    <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '50px' }}>
                      Ready to sync from Oracle Repository.
                    </p>
                  )}
                  {repositoryAssets.map((file, index) => (
                    <div key={index} className={`file-row-small ${pushedFiles.includes(file) ? "done" : ""}`}>
                      <FiFileText className="file-icon" />
                      <span className="file-name">{file}</span>
                      {pushedFiles.includes(file) && <FiCheckCircle className="file-ok" />}
                    </div>
                  ))}
                </div>

                {pushedFiles.length > 0 && pushedFiles.length === repositoryAssets.length && !isPushing && (
                  <div className="deployment-hint">
                    <FiCheckCircle /> <span>Ready for conversion to .ipynb</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
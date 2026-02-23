import React, { useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './SqlConverter.css';
import appLogo from '../assets/image.png'; 

export default function App() {
  const [sqlText, setSqlText] = useState("");
  const [ipynbText, setIpynbText] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [fileName, setFileName] = useState(""); 
  
  const timerRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Save the file name without the .txt extension
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
    setIsConverting(true);
    setSeconds(0);
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 3000));
      setIpynbText('{\n "cells": [{"cell_type": "code", "source": ["spark.sql(...)"]}],\n "nbformat": 4\n}');
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
    
    // Download with the original file name
    a.download = fileName ? `${fileName}.ipynb` : "converted_spark.ipynb";
    
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      
      {/* --- TOP GREEN HEADER --- */}
      <div className="header-banner">
        <img src={appLogo} alt="App Logo" className="header-logo" />
        <h1 className="header-title">SQL to Spark SQL Converter</h1>
      </div>

      {/* --- CONTROL BAR --- */}
      <div className="control-bar">
        
        {/* Upload Section with File Name Display */}
        <div className="control-left">
          <div className="upload-wrapper">
            <label className="btn btn-outline">
              Upload .txt
              <input type="file" accept=".txt" onChange={handleUpload} style={{ display: 'none' }} />
            </label>
            <span className="file-name-label">
              {fileName ? `📄 ${fileName}.txt` : "No file selected"}
            </span>
          </div>
        </div>

        <div className="control-center"> 
          <button className="btn btn-convert" onClick={handleConvert} disabled={!sqlText || isConverting}>
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
          <button className="btn btn-outline" onClick={handleDownload} disabled={!ipynbText}>
            Download .ipynb
          </button>
        </div>
      </div>

      <div className="divider"></div>

      {/* --- FULL SCREEN WORKSPACE --- */}
      <div className="workspace">
        
        <div className="pane">
          {/* <div className="pane-header">Paste one version of a text here (Standard SQL)</div> */}
          <div className="pane-content">
            <SyntaxHighlighter 
              language="sql" 
              style={vs} 
              wrapLongLines={false} 
              className="syntax-highlighter-custom"
            >
              {sqlText || "-- Your uploaded .txt file content will appear here..."}
            </SyntaxHighlighter>
          </div>
        </div>

        <div className="pane">
          {/* <div className="pane-header">Paste another version of the text here (Jupyter Notebook)</div> */}
          <div className="pane-content">
            <textarea 
              className="pane-textarea" 
              value={ipynbText} 
              readOnly 
              placeholder="Converted .ipynb code will appear here..." 
            />
          </div>
        </div>

      </div>
    </div>
  );
}
import React, { useState, useRef } from 'react';
import './SqlConverter.css'; // <--- THIS LINK IS THE MOST IMPORTANT PART

export default function App() {
  const [sqlText, setSqlText] = useState("");
  const [ipynbText, setIpynbText] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
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
    const blob = new Blob([ipynbText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "file.ipynb";
    a.click();
  };

  return (
    <div className="container-full">
      <h2 className="title-main">SQL to Spark SQL Converter</h2>

      {/* Control Panel (Upper Side) */}
      <div className="control-panel">
        <div className="upload-btn-wrapper">
          <input type="file" accept=".txt" onChange={handleUpload} />
        </div>

        <div className="convert-section">
          <button className="btn-blue" onClick={handleConvert} disabled={!sqlText || isConverting}>
            {isConverting ? "Converting..." : "Convert to Spark SQL"}
          </button>
          <span style={{fontWeight: 'bold'}}>Time taken: {seconds}s</span>
        </div>

        <div className="download-section">
          <button className="btn-green" onClick={handleDownload} disabled={!ipynbText}>
            Download .ipynb
          </button>
        </div>
      </div>

      {/* Side-by-Side Text Views */}
      <div className="views-row">
        <div className="box-wrapper">
          <h4>Input (.txt)</h4>
          <textarea className="text-area" value={sqlText} readOnly placeholder="SQL shows here..." />
        </div>

        <div className="box-wrapper">
          <h4>Output (.ipynb)</h4>
          <textarea className="text-area" value={ipynbText} readOnly placeholder="Notebook JSON shows here..." />
        </div>
      </div>
    </div>
  );
}
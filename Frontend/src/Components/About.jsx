import React from "react";
import "./About.css";
import { FiTarget, FiZap, FiShield, FiCpu, FiAward, FiArrowRight } from "react-icons/fi";

export default function About() {
  return (
    <div className="fw-light-page">
      <div className="fw-grid-layer"></div>
      
      <div className="fw-scroll-container">

        {/* HERO SECTION */}
        <section className="fw-hero-section">
          <div className="fw-hero-text">
            <div className="fw-eyebrow-text">// ODI → Databricks Migration Platform</div>
            <h1>
              Migrate <span className="fw-stroke-text">Smarter.</span><br />
              Run <span className="fw-stroke-text fw-blue">Faster.</span>
            </h1>
            <p className="fw-hero-desc">
              Transform Oracle Data Integrator mappings into production-ready PySpark on Databricks — 
              automated, accurate, and AI-assisted.
            </p>
          </div>

          <div className="fw-visual-flow">
            <div className="fw-node-stack">
              <div className="fw-box-node node-blue">Oracle ODI</div>
              <div className="fw-node-connector">↓</div>
              <div className="fw-box-node node-orange">Flytics Engine</div>
              <div className="fw-node-connector">↓</div>
              <div className="fw-box-node node-blue">Databricks</div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="fw-stats-bar">
          <div className="fw-stat-item">
            <h2>90%</h2>
            <p>Auto Conversion Rate</p>
          </div>
          <div className="fw-stat-item">
            <h2>10×</h2>
            <p>Faster Migration</p>
          </div>
          <div className="fw-stat-item">
            <h2>200+</h2>
            <p>Mappings / Engagement</p>
          </div>
          <div className="fw-stat-item">
            <h2>0</h2>
            <p>Vendor Lock-in</p>
          </div>
        </section>

        {/* CORE CAPABILITIES */}
        <section className="fw-main-section">
          <h3 className="fw-section-heading">// Core Capabilities</h3>
          <div className="fw-capabilities-grid">
            <div className="fw-feature-card orange-top">
              <FiTarget className="feat-icon" />
              <h4>ODI Repository Parser</h4>
              <p>Reads and parses ODI XML exports, resolving mappings and lineage automatically.</p>
            </div>
            <div className="fw-feature-card blue-top">
              <FiZap className="feat-icon blue" />
              <h4>AI-Powered Code Gen</h4>
              <p>Claude-driven MCP orchestration converts Oracle SQL & ODI logic into PySpark notebooks.</p>
            </div>
            <div className="fw-feature-card teal-top">
              <FiShield className="feat-icon teal" />
              <h4>Enterprise Ready</h4>
              <p>SOC2-aligned architecture. No data leaves your secure cloud environment.</p>
            </div>
          </div>
        </section>

        {/* PROCESS FLOW */}
        <section className="fw-main-section">
          <h3 className="fw-section-heading">// Migration Process — 4 Phases</h3>
          <div className="fw-phases-row">
            <div className="fw-phase-step"><div className="p-num">01</div><div className="p-text">Ingest</div></div>
            <div className="fw-phase-step"><div className="p-num">02</div><div className="p-text">Analyze</div></div>
            <div className="fw-phase-step"><div className="p-num">03</div><div className="p-text">Convert</div></div>
            <div className="fw-phase-step"><div className="p-num">04</div><div className="p-text">Deploy</div></div>
          </div>
        </section>

        {/* FOOTER */}
        <section className="fw-footer-cta">
          <h2>Ready to accelerate your migration?</h2>
          <button className="fw-btn-filled">Book a Demo →</button>
        </section>
      </div>
    </div>
  );
}
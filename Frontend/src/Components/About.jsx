import React from 'react';
import './About.css'; 

import { FaDatabase, FaCogs, FaRobot, FaChartLine } from "react-icons/fa";
import { BiTargetLock } from "react-icons/bi";
import { FiLayers, FiCpu, FiPieChart } from "react-icons/fi";

export default function About() {
  return (
    <div className="about-page-wrapper">
      
      {/* --- HERO SECTION --- */}
      <div className="about-hero-section">
        <h1 className="about-hero-title">Empowering Data Engineering</h1>
        <p className="about-hero-subtitle">
          At Flytics, we believe in the <strong>"Ease of Business Decision."</strong> Our team of technologists and domain experts is dedicated to accelerating your growth by transforming legacy architectures into modern, scalable cloud environments.
        </p>
      </div>

      <div className="about-main-content">
        
        {/* --- EXPERTISE SECTION --- */}
        <div className="about-section-header">
          <h2>Our Expertise</h2>
          <div className="header-underline"></div>
        </div>

        <div className="expertise-row">
          <div className="expertise-card">
            <div className="expertise-icon"><FaDatabase /></div>
            <h4>Data Engineering</h4>
            <p>Building robust systems to transform legacy architectures at scale.</p>
          </div>
          <div className="expertise-card">
            <div className="expertise-icon"><FaCogs /></div>
            <h4>Data Integration</h4>
            <p>Improving efficiency through seamless integration across platforms.</p>
          </div>
          <div className="expertise-card">
            <div className="expertise-icon"><FaRobot /></div>
            <h4>AI & ML</h4>
            <p>Deploying smart, GenAI-enabled models to accelerate complex migrations.</p>
          </div>
          <div className="expertise-card">
            <div className="expertise-icon"><FaChartLine /></div>
            <h4>Data Analytics</h4>
            <p>Drawing actionable insights via visually rich, interactive dashboards.</p>
          </div>
        </div>

        {/* --- HOW IT WORKS (Updated Content) --- */}
        <div className="about-section-header" style={{ marginTop: '60px' }}>
          <h2>How Flytics Works</h2>
          <div className="header-underline"></div>
        </div>

        <div className="workflow-horizontal">
          <div className="workflow-step">
            <div className="workflow-icon"><BiTargetLock /></div>
            <h4>1. Assess & Frame</h4>
            <p>Identify legacy bottlenecks and define a clear roadmap for your cloud modernization.</p>
          </div>
          
          <div className="workflow-step">
            <div className="workflow-icon"><FiLayers /></div>
            <h4>2. Extract Assets</h4>
            <p>Securely pull legacy scripts, ODI codes, and evaluate critical data dependencies.</p>
          </div>

          <div className="workflow-step">
            <div className="workflow-icon"><FiCpu /></div>
            <h4>3. AI Transformation</h4>
            <p>Apply advanced GenAI models to translate and optimize your logic for Databricks.</p>
          </div>

          <div className="workflow-step">
            <div className="workflow-icon"><FiPieChart /></div>
            <h4>4. Deploy & Validate</h4>
            <p>Deliver structured, ready-to-run Spark code for immediate cloud deployment.</p>
          </div>
        </div>

        {/* --- CONNECT SECTION (With New Email Link) --- */}
        <div className="about-connect-box">
          <div className="connect-text-area">
            <h3>Ready to transform your workflow?</h3>
            <p>Talk to our experts today and see how Flytics can accelerate your data journey.</p>
            
            {/* NEW EMAIL SECTION */}
            <p className="inquiry-email">
              <strong>Inquiries:</strong> <a href="mailto:services@flyticsglob.com">services@flyticsglob.com</a>
            </p>
          </div>
          
          <div className="about-button-group">
            <a href="https://flyticsglob.com/index.html" target="_blank" rel="noopener noreferrer" className="about-link-btn primary-btn">
              Visit Website
            </a>
            <a href="https://www.linkedin.com/company/flytics/" target="_blank" rel="noopener noreferrer" className="about-link-btn linkedin-btn">
              Follow on LinkedIn
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
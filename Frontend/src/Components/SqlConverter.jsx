import React,{useState, useRef} from "react";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';

import './SqlConverter.css';

export default function SqlConverter() {
    return (
        <div className="sql-converter">
            <h2>SQL Converter</h2>
            <textarea placeholder="Enter SQL query here..." rows={10} cols={50}></textarea>
            <button>Convert to NoSQL</button>
            <h3>Converted NoSQL Query:</h3>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`// NoSQL query will be displayed here after conversion`}
            </SyntaxHighlighter>
        </div>
    );
}
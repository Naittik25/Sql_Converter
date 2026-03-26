import axios from "../api/axios";

// conversionType: "sql-sparksql" | "plsql-sparksql" | "sql-pyspark"

export const generateClaude = async (file, conversionType = "sql-sparksql") => {
  const formData = new FormData();
  formData.append("target", file);

  const res = await axios.post(`/claude/${conversionType}/generate`, formData);
  return res.data;
};

export const claudeChat = async (data) => {
  const res = await axios.post("/claude/chat", data);
  return res.data;
};

export const getClaudeFiles = async (params, conversionType = "sql-sparksql") => {
  const res = await axios.get(`/claude/${conversionType}/files`, { params });
  return res.data;
};

export const convertClaudeFromGithub = async (data, conversionType = "sql-sparksql") => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `http://localhost:8080/claude/${conversionType}/convert-from-github`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return response;
};
 
export const convertClaudeSelected = async (data, conversionType = "sql-sparksql") => {
  const res = await axios.post(`/claude/${conversionType}/convert-selected`, data);
  return res.data;
};
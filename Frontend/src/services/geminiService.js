import axios from "../api/axios";

// conversionType: "sql-sparksql" | "plsql-sparksql" | "sql-pyspark"

export const generateGemini = async (file, conversionType = "sql-sparksql") => {
  const formData = new FormData();
  formData.append("target", file);

  const res = await axios.post(`/gemini/${conversionType}/generate`, formData);
  return res.data;
};

export const getGeminiFiles = async (params, conversionType = "sql-sparksql") => {
  const res = await axios.get(`/gemini/${conversionType}/files`, { params });
  return res.data;
};

// export const convertFromGithub = async (data, , conversionType = "sql-sparksql") => {
//   const res = await axios.post(`/gemini/${conversionType}/convert-from-github`, data);
//   return res.data;
// };

export const convertFromGithub = async (data, conversionType = "sql-sparksql") => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:8080/gemini/${conversionType}/convert-from-github`, {  
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response; // ❗ return full response, not response.json()
};

export const convertSelected = async (data, conversionType = "sql-sparksql") => {
  const res = await axios.post(`/gemini/${conversionType}/convert-selected`, data);
  return res.data;
};
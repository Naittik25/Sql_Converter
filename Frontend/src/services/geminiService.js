import axios from "../api/axios";

export const generateGemini = async (file) => {
  const formData = new FormData();
  formData.append("target", file);

  const res = await axios.post("/gemini/generate", formData);
  return res.data;
};

export const getGeminiFiles = async (params) => {
  const res = await axios.get("/gemini/files", { params });
  return res.data;
};

// export const convertFromGithub = async (data) => {
//   const res = await axios.post("/gemini/convert-from-github", data);
//   return res.data;
// };

export const convertFromGithub = async (data) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:8080/gemini/convert-from-github", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response; // ❗ return full response, not response.json()
};

export const convertSelected = async (data) => {
  const res = await axios.post("/gemini/convert-selected", data);
  return res.data;
};
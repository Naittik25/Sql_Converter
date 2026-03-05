import axios from "../api/axios";

export const generateClaude = async (file) => {
  const formData = new FormData();
  formData.append("target", file);

  const res = await axios.post("/claude/generate", formData);
  return res.data;
};

export const claudeChat = async (data) => {
  const res = await axios.post("/claude/chat", data);
  return res.data;
};

export const getClaudeFiles = async (params) => {
  const res = await axios.get("/claude/files", { params });
  return res.data;
};
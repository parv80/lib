import axios from "axios";

const base = process.env.REACT_APP_API_URL;

const api = {
  getBooks: (q) => {
    if (q) return axios.get(`${base}/books?q=${q}`);
    return axios.get(`${base}/books`);
  },

  addBook: (data) => axios.post(`${base}/books`, data),

  summary: () => axios.get(`${base}/books/summary`),

  issueBook: (data) => axios.post(`${base}/issues/issue`, data),

  currentIssues: () => axios.get(`${base}/issues/current`),

  returnBook: (data) => axios.post(`${base}/issues/return`, data),
};

export default api;


import axios from "axios";

const base = process.env.REACT_APP_API_URL; 

const api = {
  // GET /api/books?q=...
  getBooks: (q) =>
    axios.get(`${base}/api/books`, { params: q ? { q } : {} }),

  // POST /api/books
  addBook: (data) => axios.post(`${base}/api/books`, data),

  // GET /api/books/summary
  summary: () => axios.get(`${base}/api/books/summary`),

  // POST /api/issues/issue
  issueBook: (data) => axios.post(`${base}/api/issues/issue`, data),

  // GET /api/issues/current
  currentIssues: () => axios.get(`${base}/api/issues/current`),

  // POST /api/issues/return
  returnBook: (data) => axios.post(`${base}/api/issues/return`, data),
};

export default api;

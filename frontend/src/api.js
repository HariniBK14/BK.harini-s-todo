import axios from "axios";

const API = "https://bk-harini-s-todo.onrender.com";

export const getTodos = () => axios.get(`${API}/todos`);

export const getTodo = (id) =>
  axios.get(`${API}/todos/${id}`);

export const createTodo = (data) =>
  axios.post(`${API}/todos`, data);

export const deleteTodo = (id) =>
  axios.delete(`${API}/todos/${id}`);

export const updateTodo = (id, data) =>
  axios.put(`${API}/todos/${id}`, data);
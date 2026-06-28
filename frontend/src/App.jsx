import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./pages/TodoList.jsx";
import TodoDetail from "./pages/TodoDetail.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todo" element={<TodoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
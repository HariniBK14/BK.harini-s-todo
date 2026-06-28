import React, { useEffect, useState } from "react";
import { getTodo } from "../api";

export default function TodoDetail() {
  const [todo, setTodo] = useState(null);
  const id = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    const load = async () => {
      const res = await getTodo(id);
      setTodo(res.data);
    };
    load();
  }, [id]);

  if (!todo) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1 className="title">📌 Todo Details</h1>

      <div className="card glow pulse">
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
        <p>Status: {todo.completed ? "Done ✅" : "Pending ⏳"}</p>
      </div>
    </div>
  );
}
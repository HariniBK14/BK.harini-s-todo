import React, { useEffect, useState } from "react";
import { getTodos, createTodo, deleteTodo, updateTodo } from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [search, setSearch] = useState("");

  const nav = useNavigate();

  // Load data once
  const load = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  // ⚡ FAST ADD (optimistic UI)
  const addTodo = async () => {
    if (!title) return;

    const newTodo = {
      id: Date.now().toString(),
      title,
      description: desc,
      status: "Pending"
    };

    setTodos(prev => [newTodo, ...prev]);
    setTitle("");
    setDesc("");

    try {
      await createTodo(newTodo);
    } catch (err) {
      console.log(err);
    }
  };

  // ⚡ FAST DELETE
  const handleDelete = async (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));

    try {
      await deleteTodo(id);
    } catch (err) {
      console.log(err);
    }
  };

  // ⚡ FAST TOGGLE STATUS
  const toggleStatus = async (todo) => {
    const updated = {
      ...todo,
      status: todo.status === "Completed" ? "Pending" : "Completed"
    };

    setTodos(prev =>
      prev.map(t => (t.id === todo.id ? updated : t))
    );

    try {
      await updateTodo(todo.id, updated);
    } catch (err) {
      console.log(err);
    }
  };

  // SEARCH FILTER
  const filtered = todos.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const total = todos.length;
  const completed = todos.filter(t => t.status === "Completed").length;

  return (
    <div className="container">

      {/* TITLE */}
      <h1 className="title">⚡ Harini's TODO</h1>

      {/* STATS */}
      <div className="stats">
        <div>Total Tasks: {total}</div>
        <div>Completed: {completed}</div>
      </div>

      {/* INPUT */}
      <div className="card glow">
        <input
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Task description..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button onClick={addTodo}>➕ Add Task</button>
      </div>

      {/* SEARCH */}
      <div className="card">
        <input
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "80%" }}
        />
      </div>

      {/* LIST */}
      <div className="list">
        {filtered.map((todo, i) => (
          <motion.div
            key={todo.id}
            className="todo"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div onClick={() => nav(`/todo?id=${todo.id}`)}>
              <h3>
                {todo.title}{" "}
                <span style={{
                  color: todo.status === "Completed" ? "#00ff00" : "#ffcc00"
                }}>
                  [{todo.status}]
                </span>
              </h3>
              <p>{todo.description}</p>
            </div>

            <div>
              <button onClick={() => toggleStatus(todo)}>✔</button>
              <button className="delete" onClick={() => handleDelete(todo.id)}>✖</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="footer">
        Developed by Harini B K
      </div>

    </div>
  );
}